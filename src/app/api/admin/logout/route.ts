import { NextResponse } from "next/server";
import { sessionClient, withAdmin } from "@/server/auth";

export const POST = withAdmin(async () => {
  const supabase = await sessionClient();
  await supabase.auth.signOut();
  return NextResponse.json({ ok: true });
});
