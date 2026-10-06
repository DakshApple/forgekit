import { NextResponse } from "next/server";
import { db } from "@/server/db";
import { z } from "zod";

const schema = z.object({
  license_key: z.string(),
  machine_id: z.string().min(1),
  product_slug: z.string().optional(),
});

const MAX_ACTIVATIONS = 3;

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { license_key, machine_id, product_slug } = schema.parse(body);

    // 1. Fetch the license and check its status
    const { data: license, error: licenseError } = await db()
      .from("licenses")
      .select("id, status, ends_at, product_id, products (slug)")
      .eq("key", license_key)
      .single();

    if (licenseError || !license) {
      return NextResponse.json({ error: "Invalid license key" }, { status: 404 });
    }

    if (license.status !== "active") {
      return NextResponse.json({ error: `License is ${license.status}` }, { status: 403 });
    }

    if (license.ends_at && new Date(license.ends_at) < new Date()) {
      return NextResponse.json({ error: "License has expired" }, { status: 403 });
    }

    // Optional: Check if the key belongs to the right product
    if (product_slug && (license.products as any).slug !== product_slug) {
      return NextResponse.json({ error: "License is for a different product" }, { status: 400 });
    }

    // 2. Fetch current activations
    const { data: activations, error: actError } = await db()
      .from("license_activations")
      .select("id, machine_id")
      .eq("license_id", license.id);

    if (actError) throw actError;

    const existingActivation = activations.find(a => a.machine_id === machine_id);

    if (existingActivation) {
      // Already activated on this machine, just update last_verified_at
      await db()
        .from("license_activations")
        .update({ last_verified_at: new Date().toISOString() })
        .eq("id", existingActivation.id);
        
      return NextResponse.json({ 
        valid: true, 
        message: "Machine already activated",
        activations: activations.length,
        max_activations: MAX_ACTIVATIONS
      });
    }

    // 3. Check limit
    if (activations.length >= MAX_ACTIVATIONS) {
      return NextResponse.json({ 
        error: "Activation limit reached", 
        activations: activations.length,
        max_activations: MAX_ACTIVATIONS
      }, { status: 403 });
    }

    // 4. Activate new machine
    const { error: insertError } = await db()
      .from("license_activations")
      .insert({
        license_id: license.id,
        machine_id: machine_id
      });

    if (insertError) throw insertError;

    // Log the event
    await db().from("license_events").insert({
      license_id: license.id,
      actor: "system",
      type: "activated",
      detail: `Machine ${machine_id} activated`
    });

    return NextResponse.json({ 
      valid: true,
      message: "Machine activated successfully",
      activations: activations.length + 1,
      max_activations: MAX_ACTIVATIONS
    });

  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid request payload" }, { status: 400 });
    }
    console.error("License activation error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
