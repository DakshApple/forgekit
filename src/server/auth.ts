import "server-only";
import { cookies } from "next/headers";
import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { getEnv } from "./env";

export const SESSION_SECONDS = 60 * 60 * 8;

export type Admin = { id: string; email: string };

/** Supabase client bound to the request cookies (anon key, user session). */
export async function sessionClient() {
  const env = getEnv();
  const store = await cookies();
  return createServerClient(env.NEXT_PUBLIC_SUPABASE_URL, env.NEXT_PUBLIC_SUPABASE_ANON_KEY, {
    cookieOptions: {
      maxAge: SESSION_SECONDS,
      sameSite: "lax",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
    },
    cookies: {
      getAll: () => store.getAll(),
      setAll: (list) => {
        try {
          list.forEach(({ name, value, options }) => store.set(name, value, options));
        } catch {
          // Called from a Server Component: cookies are read only. Middleware refreshes them.
        }
      },
    },
  });
}

/** Returns the signed in admin, or null. Validates the token with Supabase and the allowlist. */
export async function getAdmin(): Promise<Admin | null> {
  const supabase = await sessionClient();
  const { data } = await supabase.auth.getUser();
  const email = data.user?.email?.toLowerCase();
  if (!data.user || !email) return null;
  if (!getEnv().ADMIN_EMAILS.includes(email)) return null;
  return { id: data.user.id, email };
}

function sameOrigin(req: NextRequest): boolean {
  const origin = req.headers.get("origin");
  if (!origin) return false;
  try {
    return new URL(origin).host === req.nextUrl.host;
  } catch {
    return false;
  }
}

type Ctx = { params: Promise<Record<string, string>> };

/** Wraps an /api/admin route handler with the session check and CSRF origin check. */
export function withAdmin(
  handler: (req: NextRequest, admin: Admin, ctx: Ctx) => Promise<Response>,
) {
  return async (req: NextRequest, ctx: Ctx): Promise<Response> => {
    const safe = ["GET", "HEAD", "OPTIONS"].includes(req.method);
    if (!safe && !sameOrigin(req)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
    const admin = await getAdmin();
    if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const res = await handler(req, admin, ctx);
    res.headers.set("Cache-Control", "no-store");
    return res;
  };
}
