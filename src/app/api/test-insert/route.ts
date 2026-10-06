import { NextResponse } from "next/server";
import { db } from "@/server/db";

export async function GET() {
  const productData = {
    slug: "test-product-" + Date.now(),
    name: "Test Product",
    tagline: "Test Tagline",
    description: "Test Description",
    features: ["Feature 1", "Feature 2"],
    trial_days: 0,
    icon: "box",
    status: "draft",
    access_url: "https://example.com",
    key_prefix: "TST",
  };

  const { data, error } = await db()
    .from("products")
    .insert(productData)
    .select("id")
    .single();

  if (error) {
    return NextResponse.json({ error: error.message, details: error.details, hint: error.hint }, { status: 400 });
  }

  return NextResponse.json({ ok: true, data });
}
