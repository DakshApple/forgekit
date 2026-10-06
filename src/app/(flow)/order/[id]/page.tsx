import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Icon } from "@/components/icons";
import { CopyKeyButton } from "@/components/store/copy-key-button";
import { Steps } from "@/components/store/steps";
import { RevealObserver } from "@/components/site/reveal-observer";
import { Reveal } from "@/components/site/reveal";
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
  const order = await getOrderByToken(id);
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
    <>
      <RevealObserver />
      <div className="wrap pb-24 pt-[80px]">
        <Steps current={3} />

        <div className="mx-auto mt-16 max-w-[760px]">
          <Reveal delay={0}>
            <div className="flex items-center gap-5">
              <div className="flex h-12 w-12 flex-none items-center justify-center rounded-full bg-sapphire-500 text-white shadow-[0_0_24px_rgba(59,130,246,0.3)]">
                <Icon name="check" size={24} strokeWidth={2.4} />
              </div>
              <h1 className="title text-left">Payment received</h1>
            </div>
          </Reveal>
          
          <Reveal delay={60}>
            <p className="mt-6 text-[17px] leading-[1.6] text-ink/70">
              Thank you, {firstName}. Your license key is below, and a copy is on its
              way to <span className="font-semibold text-ink">{order.customerEmail}</span>.
            </p>
          </Reveal>

          <Reveal delay={120} className="mt-10 overflow-hidden rounded-[20px] border border-sapphire-500/20 bg-paper/80 shadow-[0_8px_40px_-12px_rgba(59,130,246,0.1)] backdrop-blur-xl">
            <div className="bg-gradient-to-br from-sapphire-600 to-sapphire-800 px-6 py-8 text-white md:px-10">
              <div className="flex items-center justify-between gap-4">
                <span className="text-[13px] font-medium tracking-wide text-white/70 uppercase">License key</span>
                <span className="rounded-md border border-white/20 bg-white/10 px-2.5 py-0.5 text-[12px] font-semibold tracking-wider text-white backdrop-blur-md uppercase">Active</span>
              </div>
              <div className="mt-4 flex flex-wrap items-center justify-between gap-6">
                <div className="break-all font-mono text-[22px] font-medium leading-[1.4] tracking-wider md:text-[32px]">
                  {order.licenseKey}
                </div>
                <CopyKeyButton value={order.licenseKey} />
              </div>
            </div>
            <dl className="px-6 py-4 text-[14px] leading-5 md:px-10">
              {rows.map(([k, v], i) => (
                <div key={k} className={`flex justify-between gap-4 py-4 ${i ? "border-t border-ink/[0.06]" : ""}`}>
                  <dt className="font-medium text-ink/60">{k}</dt>
                  <dd className="font-semibold text-ink text-right">{v}</dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <Reveal delay={180} className="mt-8 flex flex-wrap gap-4">
            <ButtonLink href="#" className="h-12 bg-ink px-6 text-[15px] shadow-[0_4px_16px_rgba(0,0,0,0.1)] transition-transform hover:-translate-y-0.5 dark:shadow-[0_4px_16px_rgba(255,255,255,0.1)]">
              Open {order.productName} <Icon name="arrow" size={16} strokeWidth={2.5} className="-rotate-45" />
            </ButtonLink>
            <ButtonLink href="#" variant="secondary" className="h-12 border-ink/[0.12] px-6 text-[15px] hover:border-ink/[0.25]">
              <Icon name="download" size={16} /> Download receipt
            </ButtonLink>
          </Reveal>

          <Reveal delay={240} className="mt-20">
            <div className="text-[20px] font-bold tracking-[-0.01em] text-ink">What to do next</div>
            <div className="mt-6 grid gap-4 [grid-template-columns:repeat(auto-fit,minmax(min(220px,100%),1fr))]">
              {[
                ["Open the tool", "Use the button above, or the link in your email."],
                ["Enter your key", "Paste it once when the tool asks for it."],
                ["Keep the email", "It holds your key and order number if you need support."],
              ].map(([t, b], i) => (
                <div key={t} className="rounded-2xl border border-ink/[0.08] bg-wash/50 p-6 shadow-sm backdrop-blur-md">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full border border-ink/[0.12] bg-paper text-[13px] font-bold text-ink shadow-sm">{i + 1}</div>
                  <div className="mt-4 text-[15px] font-semibold text-ink">{t}</div>
                  <div className="mt-1.5 text-[14px] leading-[1.6] text-ink/65">{b}</div>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={300} className="mt-12 flex flex-wrap items-center justify-between gap-6 rounded-2xl border border-ink/[0.08] bg-wash/30 px-6 py-6 text-[14px] leading-[1.6] md:px-8">
            <span className="max-w-[480px] text-ink/70">
              Email not here in a few minutes? Check spam, then write to{" "}
              <span className="font-medium text-ink">{site.supportEmail}</span> with order {order.id}. A person replies, usually {site.supportReply}.
            </span>
            <Link href="/products" className="font-medium text-ink transition-colors hover:text-sapphire-600 dark:hover:text-sapphire-400">Back to products</Link>
          </Reveal>
        </div>
      </div>
    </>
  );
}
