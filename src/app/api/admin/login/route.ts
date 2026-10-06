import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import { getEnv } from "@/server/env";
import { sessionClient } from "@/server/auth";
import { isLockedOut, recordAttempt } from "@/server/login-throttle";

const body = z.object({
  email: z.string().trim().toLowerCase().email().max(254),
  password: z.string().min(1).max(128),
});

const GENERIC = { error: "Invalid email or password." };

function clientIp(req: NextRequest): string {
  return req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
}

export async function POST(req: NextRequest) {
  // CSRF: login must come from our own origin too.
  const origin = req.headers.get("origin");
  if (!origin || new URL(origin).host !== req.nextUrl.host) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  const parsed = body.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json(GENERIC, { status: 400 });
  const { email, password } = parsed.data;
  const ip = clientIp(req);

  if (await isLockedOut(email, ip)) {
    return NextResponse.json(
      { error: "Too many attempts. Try again in 15 minutes." },
      { status: 429, headers: { "Retry-After": "900" } },
    );
  }

  // Not on the allowlist: count it and answer exactly like a wrong password.
  if (!getEnv().ADMIN_EMAILS.includes(email)) {
    await recordAttempt(email, ip, false);
    return NextResponse.json(GENERIC, { status: 401 });
  }

  const supabase = await sessionClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) {
    await recordAttempt(email, ip, false);
    return NextResponse.json(GENERIC, { status: 401 });
  }
  await recordAttempt(email, ip, true);
  return NextResponse.json({ ok: true });
}
