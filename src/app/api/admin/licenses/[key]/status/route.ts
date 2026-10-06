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

    const { data: license } = await db().from("licenses").select("order_id").eq("key", key).single();
    
    if (status === "revoked" && license) {
      const { data: order } = await db().from("orders").select("razorpay_subscription_id").eq("id", license.order_id).single();
      if (order?.razorpay_subscription_id) {
        import("@/server/razorpay").then(m => m.razorpay.cancelSubscription(order.razorpay_subscription_id!)).catch(console.error);
      }
    }

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
