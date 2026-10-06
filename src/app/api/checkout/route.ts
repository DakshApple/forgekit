import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import { db } from "@/server/db";
import { razorpay } from "@/server/razorpay";
import { randomBytes } from "node:crypto";
import { log } from "@/server/log";

const inputSchema = z.object({
  planId: z.string().uuid(),
  email: z.string().email(),
  name: z.string().min(1),
  phone: z.string().optional(),
  business: z.string().optional(),
  gstin: z.string().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const json = await req.json();
    const input = inputSchema.parse(json);

    const email = input.email.trim().toLowerCase();

    // 1. Find Plan and Product
    const { data: planData, error: planError } = await db()
      .from("plans")
      .select("id, type, price, razorpay_plan_id, products (id, name, trial_days)")
      .eq("id", input.planId)
      .eq("active", true)
      .single();

    if (planError || !planData) {
      return NextResponse.json({ error: "Invalid or inactive plan" }, { status: 400 });
    }

    const { type, price, products } = planData as any;
    const productId = products.id;
    const trialDays = products.trial_days || 0;
    let rzpPlanId = planData.razorpay_plan_id;

    // 2. Just-in-time Razorpay Plan creation for subscriptions
    if (type === "monthly" && !rzpPlanId) {
      const p = await razorpay.createPlan({
        name: `${products.name} - Monthly`,
        amountPaise: price,
      });
      rzpPlanId = p.id;
      await db().from("plans").update({ razorpay_plan_id: rzpPlanId }).eq("id", planData.id);
    }

    // 3. Upsert Customer
    const { data: custData, error: custError } = await db()
      .from("customers")
      .upsert({
        email,
        name: input.name,
        phone: input.phone || null,
        business: input.business || null,
        gstin: input.gstin || null,
      }, { onConflict: "email" })
      .select("id")
      .single();

    if (custError || !custData) {
      log.error({ err: custError.message }, "customer upsert failed");
      return NextResponse.json({ error: "Failed to create customer" }, { status: 500 });
    }

    const customerId = custData.id;
    const publicToken = randomBytes(16).toString("hex");

    let rzpOrderId: string | null = null;
    let rzpSubId: string | null = null;

    if (type === "monthly") {
      const startAt = trialDays > 0 ? Math.floor(Date.now() / 1000) + (trialDays * 86400) : undefined;
      const sub = await razorpay.createSubscription({
        planId: rzpPlanId,
        notes: { planId: input.planId, email },
        startAt,
      });
      rzpSubId = sub.id;
    } else {
      const ord = await razorpay.createOrder({
        amountPaise: price,
        receipt: `receipt_${publicToken.substring(0,8)}`,
        notes: { planId: input.planId, email },
      });
      rzpOrderId = ord.id;
    }

    // 4. Create Order
    const { data: orderData, error: orderError } = await db()
      .from("orders")
      .insert({
        public_token: publicToken,
        customer_id: customerId,
        product_id: productId,
        plan_id: input.planId,
        amount: price,
        razorpay_order_id: rzpOrderId,
        razorpay_subscription_id: rzpSubId,
      })
      .select("id")
      .single();

    if (orderError || !orderData) {
      log.error({ err: orderError.message }, "order creation failed");
      return NextResponse.json({ error: "Failed to create order" }, { status: 500 });
    }

    // Return the razorpay order id OR subscription id as `orderId` to satisfy the frontend.
    return NextResponse.json({ orderId: rzpOrderId || rzpSubId });

  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: "Validation failed" }, { status: 400 });
    }
    log.error({ err: err instanceof Error ? err.message : String(err) }, "checkout failed");
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
