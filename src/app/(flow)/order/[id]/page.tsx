import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Icon } from "@/components/icons";
import { CopyKeyButton } from "@/components/store/copy-key-button";
import { Steps } from "@/components/store/steps";
import { ButtonLink, StatusChip } from "@/components/ui";
import { formatInr } from "@/lib/format";
import { getOrderByToken } from "@/server/admin-queries";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Order confirmation" };

export default async function ConfirmationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  // The URL carries the unguessable public order token, never the order number.
  const order = await getOrderByToken(id);
  // A confirmation is only for paid orders that have a key.
  if (!order || order.status !== "paid" || !order.licenseKey) notFound();

  const monthly = order.planType === "monthly";
  const firstName = order.customerName.split(" ")[0];

  const rows: [string, string][] = [
    ["Product", order.productName],
    ["Plan", monthly ? "Monthly" : "One-time"],
    ["Amount paid", formatInr(order.amountInr)],
    ...(monthly ? ([["Next renewal", "6 Nov 2026"]] as [string, string][]) : []),
    ["Order", order.id],
    ["Razorpay payment ID", order.razorpayId],
  ];

  return (
    <div className="wrap pb-24 pt-10">
      <Steps current={3} />

      <div className="mx-auto mt-14 max-w-[760px]">
        <div className="flex items-center gap-5">
          <div className="flex h-[52px] w-[52px] flex-none items-center justify-center rounded-full bg-ink text-paper">
            <Icon name="check" size={26} strokeWidth={2.4} />
          </div>
          <h1 className="text-[30px] font-bold leading-[1.15] tracking-tightest md:text-4xl">
            Payment received
          </h1>
        </div>
        <p className="mt-5 text-[17px] font-light leading-7 text-ink/80">
          Thank you, {firstName}. Your license key is below, and a copy is on its
          way to <span className="font-medium text-ink">{order.customerEmail}</span>.
        </p>

        <div className="card mt-8 overflow-hidden shadow-lift">
          <div className="bg-ink px-6 py-7 text-paper md:px-8">
            <div className="flex items-center justify-between gap-4">
              <span className="text-[13px] font-medium text-paper/70">License key</span>
              <span className="rounded-md border border-paper/60 px-2.5 text-xs font-medium leading-5">Active</span>
            </div>
            <div className="mt-3.5 flex flex-wrap items-center justify-between gap-4">
              <div className="break-all text-[22px] font-medium leading-[44px] tracking-[0.05em] md:text-[34px]">
                {order.licenseKey}
              </div>
              <CopyKeyButton value={order.licenseKey} />
            </div>
          </div>
          <dl className="px-6 py-2 text-sm leading-5 md:px-8">
            {rows.map(([k, v], i) => (
              <div key={k} className={`flex justify-between gap-4 py-3.5 ${i ? "border-t border-ink/10" : ""}`}>
                <dt className="font-light">{k}</dt>
                <dd className="text-right font-medium">{v}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <ButtonLink href="#">
            Open {order.productName} <Icon name="arrow" size={16} />
          </ButtonLink>
          <ButtonLink href="#" variant="secondary">
            <Icon name="download" size={16} /> Download receipt
          </ButtonLink>
        </div>

        <div className="mt-14">
          <div className="text-lg font-bold tracking-[-0.01em]">What to do next</div>
          <div className="mt-5 grid gap-4 [grid-template-columns:repeat(auto-fit,minmax(min(200px,100%),1fr))]">
            {[
              ["Open the tool", "Use the button above, or the link in your email."],
              ["Enter your key", "Paste it once when the tool asks for it."],
              ["Keep the email", "It holds your key and order number if you need support."],
            ].map(([t, b], i) => (
              <div key={t} className="card p-5">
                <div className="flex h-7 w-7 items-center justify-center rounded-full border border-ink text-xs font-medium">{i + 1}</div>
                <div className="mt-3.5 text-[15px] font-bold leading-[22px]">{t}</div>
                <div className="mt-1 text-[13px] font-light leading-5 text-ink/75">{b}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-ink/10 bg-wash px-6 py-5 text-sm leading-[22px]">
          <span className="max-w-[480px] font-light">
            Email not here in a few minutes? Check spam, then write to{" "}
            <span className="font-medium">{site.supportEmail}</span> with order {order.id}. A person replies, usually {site.supportReply}.
          </span>
          <Link href="/products" className="font-medium">Back to products</Link>
        </div>
      </div>
    </div>
  );
}
