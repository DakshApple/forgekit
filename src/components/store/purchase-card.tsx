"use client";

import { useState } from "react";
import Link from "next/link";
import { Icon, type IconName } from "@/components/icons";
import { formatInr } from "@/lib/format";
import { site } from "@/lib/site";
import type { Product } from "@/lib/types";

export function PurchaseCard({ product }: { product: Product }) {
  const [planId, setPlanId] = useState(product.plans[0].id);
  const plan = product.plans.find((p) => p.id === planId) ?? product.plans[0];
  const monthly = plan.type === "monthly";

  const perks: { icon: IconName; text: string }[] = [
    { icon: "mail", text: "License key emailed on payment" },
    { icon: "refund", text: `Refund within ${site.refundDays} days if it does not work as described` },
    { icon: "card", text: "UPI, card or netbanking" },
    { icon: "user", text: "No account needed" },
  ];

  return (
    <div className="relative overflow-hidden rounded-2xl border border-ink/[0.08] bg-paper/80 p-8 shadow-sm backdrop-blur-xl">
      <div className="text-[15px] font-bold text-ink">
        {product.plans.length > 1 ? "Choose your plan" : "Your plan"}
      </div>
      <div className="mt-4 flex flex-col gap-3" role="radiogroup" aria-label="Plan">
        {product.plans.map((p) => {
          const on = p.id === planId;
          return (
            <button
              key={p.id}
              type="button"
              role="radio"
              aria-checked={on}
              onClick={() => setPlanId(p.id)}
              className={`flex w-full items-center justify-between gap-4 rounded-xl border px-[18px] py-4 text-left transition-all ${
                on
                  ? "border-sapphire-500 bg-sapphire-500/5 shadow-[0_0_0_2px_rgba(59,130,246,0.1)]"
                  : "border-ink/[0.12] bg-transparent hover:border-ink/[0.25]"
              }`}
            >
              <span className="flex items-center gap-3.5">
                <span
                  className={`flex h-[18px] w-[18px] flex-none items-center justify-center rounded-full border-[1.5px] transition-colors ${
                    on ? "border-sapphire-500 bg-sapphire-500" : "border-ink/40"
                  }`}
                >
                  {on && <span className="h-1.5 w-1.5 rounded-full bg-paper" />}
                </span>
                <span>
                  <span className="block text-[15px] font-medium leading-[22px] text-ink">
                    {p.type === "monthly" ? "Monthly" : "One-time"}
                  </span>
                  <span className="block text-[12px] font-medium leading-[18px] text-ink/60">
                    {p.type === "monthly" ? "Renews every month" : "Pay once, keep it"}
                  </span>
                </span>
              </span>
              <span className="text-[17px] font-bold leading-6 text-ink">{formatInr(p.priceInr)}</span>
            </button>
          );
        })}
      </div>

      <div className="mt-8 border-t border-ink/[0.06] pt-6">
        <div className="flex items-baseline gap-2">
          <span className="text-[44px] font-bold leading-[48px] tracking-[-0.04em] text-ink">
            {formatInr(plan.priceInr)}
          </span>
          <span className="text-[15px] font-medium text-ink/60">
            {monthly ? "/ month" : "once"}
          </span>
        </div>
        <p className="mt-2 text-[13px] leading-5 text-ink/65">
          {monthly
            ? "Renews every month. Your license stays active while you keep paying."
            : "Paid once. No renewals."}
        </p>
      </div>

      <Link
        href={`/checkout?plan=${plan.id}`}
        className="group mt-8 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-ink px-6 text-[15px] font-semibold text-paper shadow-[0_4px_16px_rgba(0,0,0,0.1)] transition-transform hover:-translate-y-0.5 dark:shadow-[0_4px_16px_rgba(255,255,255,0.1)]"
      >
        Buy license
        <Icon name="arrow" size={16} strokeWidth={2.5} className="-rotate-45 opacity-70 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
      </Link>
      <p className="mt-4 text-center text-[12px] font-medium text-ink/50">
        Secure payment by Razorpay
      </p>

      <ul className="mt-6 flex flex-col gap-3.5 border-t border-ink/[0.06] pt-6 text-[13px] leading-5 text-ink/75">
        {perks.map((p) => (
          <li key={p.text} className="flex items-center gap-3">
            <Icon name={p.icon} size={16} strokeWidth={2} className="flex-none text-ink/50" />
            {p.text}
          </li>
        ))}
      </ul>
    </div>
  );
}
