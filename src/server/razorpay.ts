import "server-only";
import { getEnv } from "./env";

const API = "https://api.razorpay.com/v1";

export class RazorpayError extends Error {
  constructor(public status: number, message: string) {
    super(message);
  }
}

async function call<T>(method: "GET" | "POST", path: string, body?: unknown): Promise<T> {
  const env = getEnv();
  const auth = Buffer.from(`${env.NEXT_PUBLIC_RAZORPAY_KEY_ID}:${env.RAZORPAY_KEY_SECRET}`).toString("base64");
  const res = await fetch(`${API}${path}`, {
    method,
    headers: { Authorization: `Basic ${auth}`, "Content-Type": "application/json" },
    body: body === undefined ? undefined : JSON.stringify(body),
    signal: AbortSignal.timeout(10_000),
    cache: "no-store",
  });
  const json = (await res.json().catch(() => ({}))) as { error?: { description?: string } };
  if (!res.ok) throw new RazorpayError(res.status, json.error?.description ?? "Razorpay request failed");
  return json as T;
}

export type RzpOrder = { id: string; amount: number; currency: string };
export type RzpPlan = { id: string };
export type RzpSubscription = { id: string };
export type RzpPayment = {
  id: string;
  order_id: string | null;
  amount: number;
  amount_refunded: number;
  status: string;
  refund_status: "partial" | "full" | null;
  created_at: number;
};

export const razorpay = {
  createOrder: (a: { amountPaise: number; receipt: string; notes: Record<string, string> }) =>
    call<RzpOrder>("POST", "/orders", {
      amount: a.amountPaise, currency: "INR", receipt: a.receipt, notes: a.notes,
    }),

  createPlan: (a: { name: string; amountPaise: number }) =>
    call<RzpPlan>("POST", "/plans", {
      period: "monthly", interval: 1,
      item: { name: a.name, amount: a.amountPaise, currency: "INR" },
    }),

  /** total_count is the maximum number of billing cycles (120 months). */
  createSubscription: (a: { planId: string; notes: Record<string, string> }) =>
    call<RzpSubscription>("POST", "/subscriptions", {
      plan_id: a.planId, total_count: 120, customer_notify: 1, notes: a.notes,
    }),

  fetchPayment: (id: string) => call<RzpPayment>("GET", `/payments/${encodeURIComponent(id)}`),

  listPayments: (fromUnix: number, toUnix: number, skip: number) =>
    call<{ items: RzpPayment[] }>("GET", `/payments?from=${fromUnix}&to=${toUnix}&count=100&skip=${skip}`),
};
