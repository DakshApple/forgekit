import { NextResponse } from "next/server";
import { withAdmin } from "@/server/auth";
import { getAllProductsAdmin } from "@/lib/data";

export const GET = withAdmin(async () => NextResponse.json({ rows: await getAllProductsAdmin() }));

export const POST = withAdmin(async (req) => {
  const { db } = await import("@/server/db");
  const payload = await req.json();
  const { oldSlug, plans, ...productData } = payload;
  
  if (!productData.key_prefix) {
    let p = productData.name.split(" ").map((w: string) => w[0]).join("").toUpperCase().replace(/[^A-Z]/g, "");
    if (p.length < 2) p = (p + "XX").slice(0, 2);
    productData.key_prefix = p.slice(0, 3) || "NEW";
  }

  // Find existing product ID by oldSlug if we are editing
  let existingProductId = null;
  if (oldSlug) {
    const { data: existing } = await db().from("products").select("id").eq("slug", oldSlug).maybeSingle();
    if (existing) existingProductId = existing.id;
  }

  // Update or insert product
  let product;
  if (existingProductId) {
    const { data, error } = await db()
      .from("products")
      .update(productData)
      .eq("id", existingProductId)
      .select("id")
      .single();
    if (error) return NextResponse.json({ error: error.message }, { status: 400 });
    product = data;
  } else {
    const { data, error } = await db()
      .from("products")
      .insert(productData)
      .select("id")
      .single();
    if (error) return NextResponse.json({ error: error.message }, { status: 400 });
    product = data;
  }

  // Sync plans
  if (product && plans) {
    // Deactivate all first
    await db().from("plans").update({ active: false }).eq("product_id", product.id);
    
    // Upsert the active plans
    if (plans.length > 0) {
      const plansToInsert = plans.map((p: any) => ({
        product_id: product.id,
        type: p.type,
        price: Math.round(p.priceInr * 100),
        active: true,
      }));
      const { error: plansError } = await db()
        .from("plans")
        .upsert(plansToInsert, { onConflict: "product_id,type" });
        
      if (plansError) return NextResponse.json({ error: plansError.message }, { status: 400 });
    }
  }

  return NextResponse.json({ ok: true });
});
