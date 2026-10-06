import { NextResponse, type NextRequest } from "next/server";
import { sessionClient } from "@/server/auth";

export async function GET(req: NextRequest) {
  const supabase = await sessionClient();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${req.nextUrl.origin}/api/auth/callback`,
    },
  });

  if (data.url) {
    return NextResponse.redirect(data.url);
  }
  return NextResponse.json({ error: error?.message || "Failed to start Google auth" }, { status: 400 });
}
