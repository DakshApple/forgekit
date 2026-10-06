"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Icon } from "@/components/icons";
import { Button, Field } from "@/components/ui";
import { startCheckout } from "@/lib/api";
import { formatInr } from "@/lib/format";

type Errors = Partial<Record<"email" | "name" | "phone" | "terms", string>>;

export function CheckoutForm({
  planId,
  priceInr,
}: {
  planId: string;
  priceInr: number;
}) {
  const router = useRouter();
  const [errors, setErrors] = useState<Errors>({});
  const [busy, setBusy] = useState(false);
  const [failed, setFailed] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const email = String(f.get("email") ?? "").trim();
    const name = String(f.get("name") ?? "").trim();
    const phone = String(f.get("phone") ?? "").trim();
    const business = String(f.get("business") ?? "").trim();
    const gstin = String(f.get("gstin") ?? "").trim();
    const terms = f.get("terms") === "on";

    const next: Errors = {};
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = "Enter a valid email. Your key is sent here.";
    if (name.length < 2) next.name = "Enter your full name.";
    if (phone.replace(/\D/g, "").length < 10) next.phone = "Enter a 10 digit phone number.";
    if (!terms) next.terms = "Please accept the terms to continue.";
    setErrors(next);
    if (Object.keys(next).length) return;

    setBusy(true);
    setFailed(false);
    try {
      const { orderId } = await startCheckout({ planId, email, name, phone, business, gstin });
      router.push(`/order/${orderId}`);
    } catch {
      setFailed(true);
      setBusy(false);
    }
  }

  const err = (m?: string) =>
    m ? (
      <p role="alert" className="mt-2 text-xs font-medium leading-[18px]">
        {m}
      </p>
    ) : null;

  return (
    <form onSubmit={onSubmit} noValidate>
      <div className="card flex flex-col gap-[22px] p-6 md:p-7">
        <div className="text-base font-bold">Your details</div>

        <div>
          <Field label="Email" htmlFor="email" hint="Your license key is sent here. Please check it is correct.">
            <input id="email" name="email" type="email" autoComplete="email" className="input" aria-invalid={!!errors.email} />
          </Field>
          {err(errors.email)}
        </div>

        <div>
          <Field label="Full name" htmlFor="name">
            <input id="name" name="name" type="text" autoComplete="name" className="input" aria-invalid={!!errors.name} />
          </Field>
          {err(errors.name)}
        </div>

        <div className="grid gap-[22px] sm:grid-cols-2">
          <div>
            <Field label="Phone" htmlFor="phone">
              <input id="phone" name="phone" type="tel" autoComplete="tel" className="input" aria-invalid={!!errors.phone} />
            </Field>
            {err(errors.phone)}
          </div>
          <Field label="Business name (optional)" htmlFor="business">
            <input id="business" name="business" type="text" autoComplete="organization" className="input" placeholder="Your business" />
          </Field>
        </div>

        <Field label="GSTIN (optional)" htmlFor="gstin">
          <input id="gstin" name="gstin" type="text" className="input uppercase" placeholder="Add it to get GST on your invoice" />
        </Field>

        <div>
          <label className="flex cursor-pointer items-start gap-3 text-[13px] font-light leading-5">
            <input type="checkbox" name="terms" defaultChecked className="mt-0.5 h-[18px] w-[18px] flex-none accent-ink" />
            <span>
              I agree to the{" "}
              <Link href="/terms" className="border-b border-ink font-medium">Terms of service</Link>, the{" "}
              <Link href="/privacy" className="border-b border-ink font-medium">Privacy policy</Link> and the{" "}
              <Link href="/refunds" className="border-b border-ink font-medium">Refund policy</Link>.
            </span>
          </label>
          {err(errors.terms)}
        </div>
      </div>

      {failed && (
        <p role="alert" className="mt-4 rounded-lg border border-dashed border-ink p-4 text-sm">
          The payment did not go through. You have not been charged for a key. Please try again.
        </p>
      )}

      <Button type="submit" size="lg" className="mt-6 w-full" disabled={busy}>
        {busy ? "Opening Razorpay" : `Pay ${formatInr(priceInr)} with Razorpay`}
        {!busy && <Icon name="arrow" size={16} />}
      </Button>
      <div className="mt-4 flex flex-wrap items-center justify-center gap-2.5">
        <span className="text-xs text-ink/65">Pay with</span>
        {["UPI", "Cards", "Netbanking"].map((m) => (
          <span key={m} className="rounded-md border border-ink/25 px-2.5 py-1 text-xs font-medium">{m}</span>
        ))}
      </div>
      <p className="mt-3 text-center text-xs font-light leading-[18px] text-ink/65">
        Payments are processed by Razorpay. Forgekit never sees or stores your card details.
      </p>
    </form>
  );
}
