import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { CheckoutForm } from "@/components/store/checkout-form";
import { Icon } from "@/components/icons";
import { Steps } from "@/components/store/steps";
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
    <div className="wrap pb-24 pt-10">
      <Link
        href={`/products/${product.slug}`}
        className="inline-flex items-center gap-2 text-sm font-medium text-ink/70 hover:text-ink"
      >
        <Icon name="back" size={16} /> Back to {product.name}
      </Link>

      <div className="mt-7">
        <Steps current={1} />
      </div>

      <div className="mt-10 flex flex-wrap items-start gap-14">
        <div className="min-w-0 flex-1 basis-[520px]">
          <h1 className="text-[34px] font-bold leading-[1.15] tracking-tightest md:text-[40px]">
            Checkout
          </h1>
          <p className="mt-3 max-w-[560px] text-base font-light leading-[26px] text-ink/75">
            No account needed. We use your email to send the license key and
            your phone number for the payment.
          </p>
          <div className="mt-8">
            <CheckoutForm planId={plan.id} priceInr={plan.priceInr} />
          </div>
        </div>

        <aside className="w-full flex-none md:sticky md:top-8 md:w-[400px]">
          <div className="card p-7 shadow-lift">
            <div className="text-base font-bold">Order summary</div>
            <div className="mt-5 flex items-center gap-3.5">
              <div className="flex h-14 w-14 flex-none items-center justify-center rounded-[10px] border border-ink/10 bg-tint">
                <Icon name={product.icon} size={24} strokeWidth={1.6} />
              </div>
              <div>
                <div className="text-[17px] font-bold leading-6 tracking-[-0.01em]">{product.name}</div>
                <div className="text-[13px] font-light text-ink/70">
                  {monthly ? "Monthly license" : "One-time license"}
                </div>
              </div>
            </div>
            <dl className="mt-6 text-sm leading-5">
              <div className="flex justify-between gap-4 border-t border-ink/10 py-3.5">
                <dt className="font-light">Price</dt>
                <dd className="font-medium">{formatInr(plan.priceInr)} {monthly ? "/ month" : billingLabel(plan.type)}</dd>
              </div>
              <div className="flex justify-between gap-4 border-t border-ink/10 py-3.5">
                <dt className="font-light">{monthly ? "Renews" : "Billing"}</dt>
                <dd className="text-right font-medium">{monthly ? "Every month, cancel anytime" : "Paid once, no renewal"}</dd>
              </div>
              <div className="flex justify-between gap-4 border-t border-ink/10 py-3.5">
                <dt className="font-light">Delivery</dt>
                <dd className="font-medium">Key by email</dd>
              </div>
            </dl>
            <div className="mt-2 flex items-baseline justify-between gap-4 border-t border-ink pt-5">
              <span className="text-[15px] font-medium">Total today</span>
              <span className="text-[34px] font-bold leading-10 tracking-[-0.03em]">{formatInr(plan.priceInr)}</span>
            </div>
          </div>

          <ul className="mt-4 flex flex-col gap-3.5 px-2 text-[13px] font-light leading-5 text-ink/80">
            <li className="flex items-start gap-3">
              <Icon name="refund" size={18} strokeWidth={1.8} className="mt-px flex-none" />
              Refund within {site.refundDays} days if the product does not work as described.
            </li>
            <li className="flex items-start gap-3">
              <Icon name="mail" size={18} strokeWidth={1.8} className="mt-px flex-none" />
              Your key appears on the next page and is emailed to you. Not there? Check spam, then write to {site.supportEmail}.
            </li>
            <li className="flex items-start gap-3">
              <Icon name="headset" size={18} strokeWidth={1.8} className="mt-px flex-none" />
              Sold and supported by {site.company}, Ahmedabad.
            </li>
          </ul>
        </aside>
      </div>
    </div>
  );
}
