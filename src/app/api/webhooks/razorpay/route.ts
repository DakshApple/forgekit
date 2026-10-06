import { createHash } from "node:crypto";
import { NextResponse, type NextRequest } from "next/server";
import { db } from "@/server/db";
import { getEnv } from "@/server/env";
import { log } from "@/server/log";
import { handleRazorpayEvent } from "@/server/razorpay-events";
import { verifyWebhookSignature } from "@/server/webhook-signature";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  // The signature covers the exact bytes Razorpay sent, so read the raw text.
  const raw = await req.text();
  const signature = req.headers.get("x-razorpay-signature");
  if (!verifyWebhookSignature(raw, signature, getEnv().RAZORPAY_WEBHOOK_SECRET)) {
    log.warn("razorpay webhook rejected: bad signature");
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  let payload: unknown;
  try {
    payload = JSON.parse(raw);
  } catch {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }

  const eventId =
    req.headers.get("x-razorpay-event-id") ?? `sha256:${createHash("sha256").update(raw).digest("hex")}`;

  // Idempotency: record the event first. A duplicate that is already processed is a no-op.
  const { error: insertError } = await db()
    .from("webhook_events")
    .insert({ provider: "razorpay", event_id: eventId, payload });
  if (insertError) {
    if (insertError.code !== "23505") {
      log.error({ eventId }, "could not record webhook event");
      return NextResponse.json({ error: "Temporary failure" }, { status: 500 });
    }
    const { data: existing } = await db()
      .from("webhook_events")
      .select("processed_at")
      .eq("event_id", eventId)
      .maybeSingle();
    if ((existing as { processed_at: string | null } | null)?.processed_at) {
      return NextResponse.json({ ok: true, duplicate: true });
    }
    // Earlier attempt did not finish. Fall through and process it again; the
    // database functions are idempotent per payment.
  }

  try {
    const outcome = await handleRazorpayEvent(payload);
    await db()
      .from("webhook_events")
      .update({ processed_at: new Date().toISOString() })
      .eq("event_id", eventId);
    log.info({ eventId, outcome }, "razorpay webhook processed");
    return NextResponse.json({ ok: true });
  } catch (err) {
    log.error({ eventId, err: err instanceof Error ? err.message : "unknown" }, "razorpay webhook failed");
    // 500 makes Razorpay retry; the event stays unprocessed.
    return NextResponse.json({ error: "Temporary failure" }, { status: 500 });
  }
}
