import { NextResponse } from "next/server";
import { db } from "@/server/db";
import { withAdmin } from "@/server/auth";
import { randomBytes } from "crypto";

export const GET = withAdmin(async () => {
  const { data, error } = await db()
    .from("api_keys")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
});

export const POST = withAdmin(async (req) => {
  const body = await req.json();
  if (!body.name || typeof body.name !== "string") {
    return NextResponse.json({ error: "Name is required" }, { status: 400 });
  }

  const key = `fk_live_${randomBytes(24).toString("hex")}`;

  const { data, error } = await db()
    .from("api_keys")
    .insert({ name: body.name, key })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
});

export const DELETE = withAdmin(async (req) => {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) return NextResponse.json({ error: "ID is required" }, { status: 400 });

  const { error } = await db().from("api_keys").delete().eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  
  return NextResponse.json({ ok: true });
});
