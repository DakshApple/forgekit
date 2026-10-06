// Client-side API stubs. These do NOT talk to a backend yet.
// Replace each body with a real fetch() to your API routes.

export type CheckoutInput = {
  planId: string;
  email: string;
  name: string;
  phone: string;
  business?: string;
  gstin?: string;
};

export type CheckoutResult = { orderId: string };

/**
 * TODO(backend): POST /api/checkout
 *  1. Validate input on the server.
 *  2. Create a Razorpay order for the plan's price and store a pending order row.
 *  3. Return the Razorpay order id; open Razorpay Checkout on the client.
 *  4. On the Razorpay webhook (payment.captured), verify the signature,
 *     create the license key, email it, then mark the order paid.
 *  The browser redirect to /order/[id] is only a convenience. Never issue a
 *  key from the redirect.
 */
export async function startCheckout(input: CheckoutInput): Promise<CheckoutResult> {
  const res = await fetch("/api/checkout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || "Failed to start checkout");
  }
  return res.json();
}

export async function updateLicenseStatus(
  key: string,
  status: "active" | "expired" | "revoked",
): Promise<void> {
  const res = await fetch(`/api/admin/licenses/${encodeURIComponent(key)}/status`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status }),
  });
  if (!res.ok) throw new Error("Failed to update license status");
}

export async function saveProduct(payload: any): Promise<void> {
  const res = await fetch("/api/admin/products", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || "Failed to save product");
  }
}
