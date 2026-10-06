import { NextResponse } from "next/server";
import { withAdmin } from "@/server/auth";
import { db } from "@/server/db";

export const PUT = withAdmin(async (req, admin, { params }) => {
  const { slug } = await params;
  const payload = await req.json();
  const { error } = await db().from("products").update(payload).eq("slug", slug);
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ ok: true });
});
