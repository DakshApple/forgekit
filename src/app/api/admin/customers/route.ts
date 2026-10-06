import { NextResponse } from "next/server";
import { withAdmin } from "@/server/auth";
import { listCustomers, pageParams } from "@/server/admin-queries";

export const GET = withAdmin(async (req) => {
  const sp = Object.fromEntries(req.nextUrl.searchParams);
  return NextResponse.json(await listCustomers(pageParams(sp, [])));
});
