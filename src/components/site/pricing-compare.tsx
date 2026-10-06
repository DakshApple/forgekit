import Link from "next/link";
import { Icon } from "@/components/icons";
import { SectionHeading } from "./section-heading";
import { Reveal } from "./reveal";

export function PricingCompare() {
  return (
    <section id="pricing" className="section relative border-y border-ink/[0.06] bg-wash/30">
      <div className="mesh absolute inset-0 opacity-40 dark:opacity-20" />
      <div className="wrap relative">
        <SectionHeading
          kicker="Clear pricing"
          title="Two ways to own."
          body="We do not believe in forcing subscriptions. Every product is available for a one-time fee, or a low monthly price if you prefer."
        />

        <div className="mx-auto mt-14 grid max-w-[840px] gap-6 md:grid-cols-2 lg:gap-8">
          <Reveal delay={0} className="flex flex-col rounded-2xl border border-ink/[0.08] bg-paper/60 p-8 shadow-sm backdrop-blur-xl">
            <div className="text-[13px] font-medium text-ink/50">Subscription</div>
            <div className="mt-2 text-[24px] font-semibold tracking-[-0.02em] text-ink">Monthly pass</div>
            <p className="mt-2 text-[14px] leading-[1.6] text-ink/65">
              Low commitment. Pay as you go, cancel anytime before the next month.
            </p>
            <ul className="mt-8 flex flex-1 flex-col gap-3 text-[14px]">
              <li className="flex gap-3"><Icon name="check" size={16} className="mt-0.5 text-accent" /> Starts at ₹499/mo</li>
              <li className="flex gap-3"><Icon name="check" size={16} className="mt-0.5 text-accent" /> Cancel anytime via email</li>
              <li className="flex gap-3"><Icon name="check" size={16} className="mt-0.5 text-accent" /> Active as long as you pay</li>
              <li className="flex gap-3"><Icon name="check" size={16} className="mt-0.5 text-accent" /> Free 7-day trials available</li>
            </ul>
            <Link
              href="/products?billing=monthly"
              className="mt-8 flex h-11 items-center justify-center rounded-xl border border-ink/[0.12] bg-transparent text-[14px] font-medium transition-colors hover:bg-ink/[0.04]"
            >
              View monthly tools
            </Link>
          </Reveal>

          <Reveal delay={60} className="relative flex flex-col rounded-2xl border border-sapphire-500/30 bg-paper/80 p-8 shadow-glow backdrop-blur-xl">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-sapphire-500/20 bg-sapphire-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-sapphire-600 backdrop-blur-md dark:text-sapphire-400">
              Recommended
            </div>
            <div className="text-[13px] font-medium text-sapphire-600 dark:text-sapphire-400">Perpetual</div>
            <div className="mt-2 text-[24px] font-semibold tracking-[-0.02em] text-ink">Lifetime license</div>
            <p className="mt-2 text-[14px] leading-[1.6] text-ink/65">
              Pay once and own the version you bought forever. No recurring billing.
            </p>
            <ul className="mt-8 flex flex-1 flex-col gap-3 text-[14px]">
              <li className="flex gap-3"><Icon name="check" size={16} className="mt-0.5 text-accent" /> Starts at ₹3,999</li>
              <li className="flex gap-3"><Icon name="check" size={16} className="mt-0.5 text-accent" /> No monthly or yearly fees</li>
              <li className="flex gap-3"><Icon name="check" size={16} className="mt-0.5 text-accent" /> Never expires or gets revoked</li>
              <li className="flex gap-3"><Icon name="check" size={16} className="mt-0.5 text-accent" /> Yours to keep</li>
            </ul>
            <Link
              href="/products?billing=one-time"
              className="mt-8 flex h-11 items-center justify-center rounded-xl bg-ink text-[14px] font-medium text-paper shadow-md transition-transform hover:-translate-y-px"
            >
              View lifetime tools
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
