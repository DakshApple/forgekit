import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { CheckoutForm } from "@/components/store/checkout-form";
import { Icon } from "@/components/icons";
import { Steps } from "@/components/store/steps";
import { RevealObserver } from "@/components/site/reveal-observer";
import { Reveal } from "@/components/site/reveal";
import { findPlan } from "@/lib/data";
import { billingLabel, formatInr } from "@/lib/format";
import { site } from "@/lib/site";

export const dynamic = "force-dynamic";

export const metadata: Metadata = { title: "Checkout" };

export default async function CheckoutPage({
  searchParams,
}: {
  searchParams: Promise<{ plan?: string }>;
}) {
  const { plan: planId } = await searchParams;
  const found = planId ? await findPlan(planId) : undefined;
  if (!found) redirect("/products");
  const { product, plan } = found;
  const monthly = plan.type === "monthly";

  return (
    <>
      <RevealObserver />
      <div className="wrap pb-24 pt-[80px]">
        <Link
          href={`/products/${product.slug}`}
          className="group inline-flex items-center gap-1.5 text-[14px] font-medium text-ink/50 transition-colors hover:text-ink"
        >
          <Icon name="arrow" size={14} className="rotate-135 transition-transform group-hover:-translate-x-0.5" /> Back to {product.name}
        </Link>

        <div className="mt-8">
          <Steps current={1} />
        </div>

        <div className="mt-12 flex flex-wrap items-start gap-12 lg:gap-20">
          <div className="min-w-0 flex-1 basis-[520px]">
            <Reveal delay={0}>
              <h1 className="title text-left">Checkout</h1>
            </Reveal>
            <Reveal delay={60}>
              <p className="mt-3 max-w-[560px] text-[16px] leading-[1.6] text-ink/70">
                No account needed. We use your email to send the license key and
                your phone number for the payment.
              </p>
            </Reveal>
            <Reveal delay={120} className="mt-10">
              <CheckoutForm planId={plan.id} priceInr={plan.priceInr} />
            </Reveal>
          </div>

          <Reveal delay={120} className="w-full flex-none md:sticky md:top-24 md:w-[420px]">
            <div className="overflow-hidden rounded-[20px] border border-ink/[0.08] bg-paper/80 p-8 shadow-sm backdrop-blur-xl">
              <div className="text-[15px] font-bold text-ink">Order summary</div>
              <div className="mt-6 flex items-center gap-4">
                <div className="flex h-14 w-14 flex-none items-center justify-center rounded-xl border border-ink/[0.08] bg-wash/50 shadow-sm">
                  <Icon name={product.icon} size={24} strokeWidth={1.8} className="text-ink" />
                </div>
                <div>
                  <div className="text-[17px] font-bold leading-6 tracking-[-0.01em] text-ink">{product.name}</div>
                  <div className="text-[13px] font-medium text-ink/60">
                    {monthly ? "Monthly license" : "One-time license"}
                  </div>
                </div>
              </div>
              <dl className="mt-8 text-[14px] leading-5 text-ink/75">
                <div className="flex justify-between gap-4 border-t border-ink/[0.06] py-4">
                  <dt className="font-medium text-ink/60">Price</dt>
                  <dd className="font-semibold text-ink text-right">{formatInr(plan.priceInr)} {monthly ? "/ month" : billingLabel(plan.type)}</dd>
                </div>
                <div className="flex justify-between gap-4 border-t border-ink/[0.06] py-4">
                  <dt className="font-medium text-ink/60">{monthly ? "Renews" : "Billing"}</dt>
                  <dd className="font-semibold text-ink text-right">{monthly ? "Every month, cancel anytime" : "Paid once, no renewal"}</dd>
                </div>
                <div className="flex justify-between gap-4 border-t border-ink/[0.06] py-4">
                  <dt className="font-medium text-ink/60">Delivery</dt>
                  <dd className="font-semibold text-ink text-right">Key by email</dd>
                </div>
              </dl>
              <div className="mt-4 flex items-baseline justify-between gap-4 border-t border-ink/[0.12] pt-6">
                <span className="text-[16px] font-semibold text-ink">Total today</span>
                <span className="text-[36px] font-bold tracking-[-0.03em] text-ink">{formatInr(plan.priceInr)}</span>
              </div>
            </div>

            <ul className="mt-6 flex flex-col gap-4 px-2 text-[13px] leading-[1.6] text-ink/65">
              <li className="flex items-start gap-3.5">
                <Icon name="refund" size={16} strokeWidth={2} className="mt-0.5 flex-none text-ink/40" />
                Refund within {site.refundDays} days if the product does not work as described.
              </li>
              <li className="flex items-start gap-3.5">
                <Icon name="mail" size={16} strokeWidth={2} className="mt-0.5 flex-none text-ink/40" />
                Your key appears on the next page and is emailed to you. Not there? Check spam, then write to {site.supportEmail}.
              </li>
              <li className="flex items-start gap-3.5">
                <Icon name="headset" size={16} strokeWidth={2} className="mt-0.5 flex-none text-ink/40" />
                Sold and supported by {site.company}, Ahmedabad.
              </li>
            </ul>
          </Reveal>
        </div>
      </div>
    </>
  );
}
