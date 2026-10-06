import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

// Edge middleware: first line of defence for /admin and /api/admin.
// Every route handler and the panel layout ALSO check the session (see
// src/server/auth.ts). Never rely on this file alone.

export const SESSION_SECONDS = 60 * 60 * 8; // sliding 8 hour session

const PUBLIC_PATHS = ["/admin/login", "/api/admin/login"];
const SAFE_METHODS = new Set(["GET", "HEAD", "OPTIONS"]);

function allowlist(): string[] {
  return (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
}

function sameOrigin(request: NextRequest): boolean {
  const origin = request.headers.get("origin");
  if (!origin) return false;
  try {
    return new URL(origin).host === request.nextUrl.host;
  } catch {
    return false;
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isApi = pathname.startsWith("/api/");

  // CSRF: every state changing request must come from our own origin.
  if (!SAFE_METHODS.has(request.method) && !sameOrigin(request)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  if (PUBLIC_PATHS.includes(pathname)) return NextResponse.next();

  let response = NextResponse.next({ request });
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "",
    {
      cookieOptions: {
        maxAge: SESSION_SECONDS,
        sameSite: "lax",
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        path: "/",
      },
      cookies: {
        getAll: () => request.cookies.getAll(),
        setAll: (list) => {
          list.forEach(({ name, value }) => request.cookies.set(name, value));
          response = NextResponse.next({ request });
          list.forEach(({ name, value, options }) => response.cookies.set(name, value, options));
        },
      },
    },
  );

  const { data } = await supabase.auth.getUser();
  const email = data.user?.email?.toLowerCase();
  if (!data.user || !email || !allowlist().includes(email)) {
    if (isApi) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }
  response.headers.set("Cache-Control", "no-store");
  return response;
}

export const config = { matcher: ["/admin/:path*", "/api/admin/:path*"] };
