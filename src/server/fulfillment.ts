import "server-only";
import { db } from "./db";
import { generateLicenseKey } from "./keygen";
import { log } from "./log";

export type ChargeOutcome =
  | { outcome: "issued"; licenseId: string }
  | { outcome: "renewed"; licenseId: string }
  | { outcome: "duplicate" | "ignored_refunded" | "ignored_extra_payment" | "amount_mismatch" };

type OrderRef = { id: string; amount: number; keyPrefix: string };

export async function orderByRazorpayOrderId(rzpOrderId: string): Promise<OrderRef | null> {
  return findOrder("razorpay_order_id", rzpOrderId);
}
export async function orderByRazorpaySubscriptionId(subId: string): Promise<OrderRef | null> {
  return findOrder("razorpay_subscription_id", subId);
}

async function findOrder(column: string, value: string): Promise<OrderRef | null> {
  const { data, error } = await db()
    .from("orders")
    .select("id,amount,products(key_prefix)")
    .eq(column, value)
    .maybeSingle();
  if (error) throw new Error(`Order lookup failed: ${error.message}`);
  if (!data) return null;
  const row = data as unknown as { id: string; amount: number; products: { key_prefix: string } };
  return { id: row.id, amount: row.amount, keyPrefix: row.products.key_prefix };
}

/**
 * Applies one captured payment in a single database transaction (see
 * apply_charge). Generates the license key here with a secure RNG and retries
 * on the astronomically unlikely unique collision.
 */
export async function applyCharge(args: {
  order: OrderRef;
  paymentId: string;
  amountPaise: number;
  paidAt: Date;
}): Promise<ChargeOutcome> {
  for (let attempt = 0; attempt < 5; attempt++) {
    const { data, error } = await db().rpc("apply_charge", {
      p_order_id: args.order.id,
      p_payment_id: args.paymentId,
      p_amount: args.amountPaise,
      p_paid_at: args.paidAt.toISOString(),
      p_key: generateLicenseKey(args.order.keyPrefix),
    });
    if (error) {
      if (error.code === "23505" && error.message.includes("licenses_key_key")) {
        log.warn({ orderId: args.order.id, attempt }, "license key collision, retrying");
        continue;
      }
      throw new Error(`apply_charge failed: ${error.message}`);
    }
    const r = data as { outcome: ChargeOutcome["outcome"]; license_id?: string };
    if (r.outcome === "issued" || r.outcome === "renewed") {
      return { outcome: r.outcome, licenseId: String(r.license_id) };
    }
    return { outcome: r.outcome } as ChargeOutcome;
  }
  throw new Error("Could not generate a unique license key");
}

export async function markOrderFailed(rzpOrderId: string): Promise<void> {
  const { error } = await db()
    .from("orders")
    .update({ status: "failed" })
    .eq("razorpay_order_id", rzpOrderId)
    .eq("status", "pending");
  if (error) throw new Error(`markOrderFailed failed: ${error.message}`);
}

export async function applyRefund(args: {
  paymentId: string;
  full: boolean;
  refundId: string;
}): Promise<string> {
  const { data, error } = await db().rpc("apply_refund", {
    p_payment_id: args.paymentId,
    p_full: args.full,
    p_refund_id: args.refundId,
  });
  if (error) throw new Error(`apply_refund failed: ${error.message}`);
  return (data as { outcome: string }).outcome;
}

/** Adds a system note to the license of an order, if it has one. */
export async function noteOnOrderLicense(orderId: string, type: string, detail: string) {
  const { data } = await db().from("licenses").select("id").eq("order_id", orderId).maybeSingle();
  if (!data) return;
  const { error } = await db()
    .from("license_events")
    .insert({ license_id: (data as { id: string }).id, actor: "system", type, detail });
  if (error) throw new Error(`License note failed: ${error.message}`);
}
