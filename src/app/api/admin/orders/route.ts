import { NextResponse } from "next/server";
import { withAdmin } from "@/server/auth";
import { listOrders, orderCounts, pageParams } from "@/server/admin-queries";

export const GET = withAdmin(async (req) => {
  const sp = Object.fromEntries(req.nextUrl.searchParams);
  const f = pageParams(sp, ["paid", "pending", "failed", "refunded"]);
  const [list, counts] = await Promise.all([listOrders(f), orderCounts()]);
  return NextResponse.json({ ...list, counts });
});
