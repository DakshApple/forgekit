import { createHmac, timingSafeEqual } from "node:crypto";

/**
 * Verifies the X-Razorpay-Signature header: hex HMAC SHA256 of the RAW request
 * body with the webhook secret. Constant-time compare.
 */
export function verifyWebhookSignature(
  rawBody: string,
  signature: string | null | undefined,
  secret: string,
): boolean {
  if (!signature || !/^[0-9a-fA-F]{64}$/.test(signature)) return false;
  const expected = createHmac("sha256", secret).update(rawBody, "utf8").digest();
  const given = Buffer.from(signature, "hex");
  return given.length === expected.length && timingSafeEqual(given, expected);
}
