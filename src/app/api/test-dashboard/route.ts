import { NextResponse } from "next/server";
import { getDashboard, listOrders } from "@/server/admin-queries";

export async function GET() {
  try {
    const d = await getDashboard();
    const o = await listOrders({ q: "", status: "", page: 1 });
    return NextResponse.json({ ok: true, d: Object.keys(d), orders: o.total });
  } catch (err: any) {
    return NextResponse.json({ error: err.message, stack: err.stack }, { status: 500 });
  }
}
