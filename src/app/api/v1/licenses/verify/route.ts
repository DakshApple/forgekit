import { NextResponse } from "next/server";
import { db } from "@/server/db";
import { z } from "zod";

const schema = z.object({
  license_key: z.string(),
  machine_id: z.string().min(1),
  product_slug: z.string().optional(),
});

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

    if (!existingActivation) {
      return NextResponse.json({ 
        error: "Machine not activated for this license",
        valid: false
      }, { status: 403 });
    }

    // Update last_verified_at to track active usage
    await db()
      .from("license_activations")
      .update({ last_verified_at: new Date().toISOString() })
      .eq("id", existingActivation.id);

    return NextResponse.json({ 
      valid: true,
      message: "License verified successfully"
    });

  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid request payload" }, { status: 400 });
    }
    console.error("License verification error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}
