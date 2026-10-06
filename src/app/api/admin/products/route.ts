import { NextResponse } from "next/server";
import { withAdmin } from "@/server/auth";
import { getAllProductsAdmin } from "@/lib/data";

export const GET = withAdmin(async () => NextResponse.json({ rows: await getAllProductsAdmin() }));

export const POST = withAdmin(async (req) => {
  const { db } = await import("@/server/db");
  const payload = await req.json();
  const { error } = await db().from("products").insert(payload);
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ ok: true });
});
