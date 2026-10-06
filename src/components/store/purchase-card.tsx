"use client";

import { useState } from "react";
import { Icon, type IconName } from "@/components/icons";
import { ButtonLink } from "@/components/ui";
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
    <div className="card p-7 shadow-lift">
      <div className="text-[15px] font-bold">
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
              className={`flex w-full items-center justify-between gap-4 rounded-[10px] border px-[18px] py-4 text-left transition ${
                on
                  ? "border-[1.5px] border-ink shadow-[0_0_0_3px_rgba(10,10,10,0.08)]"
                  : "border-ink/25 hover:border-ink/50"
              }`}
            >
              <span className="flex items-center gap-3.5">
                <span
                  className={`flex h-[18px] w-[18px] flex-none items-center justify-center rounded-full border-[1.5px] ${
                    on ? "border-ink" : "border-ink/40"
                  }`}
                >
                  {on && <span className="h-2 w-2 rounded-full bg-ink" />}
                </span>
                <span>
                  <span className="block text-[15px] font-medium leading-[22px]">
                    {p.type === "monthly" ? "Monthly" : "One-time"}
                  </span>
                  <span className="block text-xs font-light leading-[18px] text-ink/65">
                    {p.type === "monthly" ? "Renews every month" : "Pay once, keep it"}
                  </span>
                </span>
              </span>
              <span className="text-[17px] font-bold leading-6">{formatInr(p.priceInr)}</span>
            </button>
          );
        })}
      </div>

      <div className="mt-6 border-t border-ink/10 pt-5">
        <div className="flex items-baseline gap-2">
          <span className="text-[44px] font-bold leading-[48px] tracking-[-0.04em]">
            {formatInr(plan.priceInr)}
          </span>
          <span className="text-[15px] font-light text-ink/65">
            {monthly ? "/ month" : "once"}
          </span>
        </div>
        <p className="mt-2 text-[13px] font-light leading-5 text-ink/70">
          {monthly
            ? "Renews every month. Your license stays active while you keep paying."
            : "Paid once. No renewals."}
        </p>
      </div>

      <ButtonLink
        href={`/checkout?plan=${plan.id}`}
        size="lg"
        className="mt-6 w-full"
      >
        Buy license
      </ButtonLink>
      <p className="mt-3 text-center text-xs font-light text-ink/65">
        Secure payment by Razorpay
      </p>

      <ul className="mt-5 flex flex-col gap-3 border-t border-ink/10 pt-5 text-[13px] leading-5">
        {perks.map((p) => (
          <li key={p.text} className="flex items-center gap-3">
            <Icon name={p.icon} size={18} strokeWidth={1.8} className="flex-none" />
            {p.text}
          </li>
        ))}
      </ul>
    </div>
  );
}
