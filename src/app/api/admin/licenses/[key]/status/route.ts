import { NextResponse, type NextRequest } from "next/server";
import { withAdmin } from "@/server/auth";
import { db } from "@/server/db";
import { z } from "zod";

const schema = z.object({
  status: z.enum(["active", "expired", "revoked"]),
});

export const POST = withAdmin(async (req, admin, { params }) => {
  try {
    const { key } = await params;
    const body = await req.json();
    const { status } = schema.parse(body);

    const { error } = await db()
      .from("licenses")
      .update({ status })
      .eq("key", key);

    if (error) throw new Error(error.message);
    
    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 400 });
  }
});
