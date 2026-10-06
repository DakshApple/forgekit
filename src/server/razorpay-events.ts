import "server-only";
import { z } from "zod";
import {
  applyCharge,
  applyRefund,
  markOrderFailed,
  noteOnOrderLicense,
  orderByRazorpayOrderId,
  orderByRazorpaySubscriptionId,
} from "./fulfillment";
import { log } from "./log";
import { razorpay } from "./razorpay";

const payment = z.object({
  id: z.string(),
  order_id: z.string().nullable().optional(),
  amount: z.number().int(),
  created_at: z.number(),
  amount_refunded: z.number().optional(),
  refund_status: z.string().nullable().optional(),
});
const envelope = z.object({
  event: z.string(),
  payload: z.object({
    payment: z.object({ entity: payment }).optional(),
    subscription: z.object({ entity: z.object({ id: z.string() }) }).optional(),
    refund: z
      .object({ entity: z.object({ id: z.string(), payment_id: z.string(), amount: z.number().optional() }) })
      .optional(),
  }),
});

/** Returns a short outcome string for logs. Throws to make Razorpay retry. */
export async function handleRazorpayEvent(raw: unknown): Promise<string> {
  const parsed = envelope.safeParse(raw);
  if (!parsed.success) return "ignored_unrecognised_shape";
  const { event, payload } = parsed.data;
  const pay = payload.payment?.entity;

  switch (event) {
    case "payment.captured": {
      if (!pay?.order_id) return "ignored_no_order";
      const order = await orderByRazorpayOrderId(pay.order_id);
      // Subscription invoice payments carry an invoice order, handled via subscription.charged.
      if (!order) return "ignored_unknown_order";
      const r = await applyCharge({
        order, paymentId: pay.id, amountPaise: pay.amount, paidAt: new Date(pay.created_at * 1000),
      });
      if (r.outcome === "amount_mismatch") log.error({ orderId: order.id }, "captured amount differs from order amount");
      return r.outcome;
    }

    case "subscription.charged": {
      const subId = payload.subscription?.entity.id;
      if (!subId || !pay) return "ignored_incomplete";
      const order = await orderByRazorpaySubscriptionId(subId);
      if (!order) return "ignored_unknown_subscription";
      const r = await applyCharge({
        order, paymentId: pay.id, amountPaise: pay.amount, paidAt: new Date(pay.created_at * 1000),
      });
      if (r.outcome === "amount_mismatch") log.error({ orderId: order.id }, "charged amount differs from order amount");
      return r.outcome;
    }

    case "payment.failed": {
      if (!pay?.order_id) return "ignored_no_order";
      await markOrderFailed(pay.order_id);
      return "failed_recorded";
    }

    case "refund.processed": {
      const refund = payload.refund?.entity;
      if (!refund) return "ignored_incomplete";
      // Decide full vs partial from the payment, fetched if the event did not include it.
      let full: boolean;
      if (pay && pay.amount_refunded !== undefined) {
        full = pay.refund_status === "full" || pay.amount_refunded >= pay.amount;
      } else {
        const p = await razorpay.fetchPayment(refund.payment_id);
        full = p.refund_status === "full" || p.amount_refunded >= p.amount;
      }
      return applyRefund({ paymentId: refund.payment_id, full, refundId: refund.id });
    }

    case "subscription.cancelled":
    case "subscription.halted":
    case "subscription.completed": {
      const subId = payload.subscription?.entity.id;
      if (!subId) return "ignored_incomplete";
      const order = await orderByRazorpaySubscriptionId(subId);
      if (!order) return "ignored_unknown_subscription";
      await noteOnOrderLicense(order.id, event.replace(".", "_"), `Razorpay ${event}. The license ends at its current end date.`);
      return "noted";
    }

    default:
      return "ignored_event";
  }
}
