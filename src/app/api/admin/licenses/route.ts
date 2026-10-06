import { NextResponse } from "next/server";
import { withAdmin } from "@/server/auth";
import { licenseCounts, listLicenses, pageParams } from "@/server/admin-queries";

export const GET = withAdmin(async (req) => {
  const sp = Object.fromEntries(req.nextUrl.searchParams);
  const f = pageParams(sp, ["active", "expired", "revoked"]);
  const [list, counts] = await Promise.all([listLicenses(f), licenseCounts()]);
  return NextResponse.json({ ...list, counts });
});
