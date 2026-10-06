import type { ReactNode } from "react";
import { Icon } from "@/components/icons";
import { site } from "@/lib/site";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";

function BentoCard({
  step,
  title,
  body,
  visual,
  className = "",
  delay = 0,
}: {
  step: string;
  title: string;
  body: string;
  visual: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <Reveal as="li" delay={delay} className={className}>
      <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-ink/[0.08] bg-wash/60 transition-[transform,border-color] duration-150 ease-out hover:-translate-y-0.5 hover:border-ink/[0.16]">
        <div aria-hidden className="relative flex h-[200px] items-center justify-center overflow-hidden px-6">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_80%_at_50%_100%,rgb(59_130_246/0.10),transparent)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          {visual}
        </div>
        <div className="border-t border-ink/[0.06] p-6">
          <div className="font-mono text-[12px] text-accent">{step}</div>
          <h3 className="mt-2 text-[18px] font-semibold tracking-[-0.02em] text-ink">{title}</h3>
          <p className="mt-1.5 text-[15px] leading-[1.6] text-ink/65">{body}</p>
        </div>
      </div>
    </Reveal>
  );
}

const panel = "rounded-xl border border-ink/[0.08] bg-paper shadow-soft";

function ChooseVisual() {
  return (
    <div className={`${panel} w-full max-w-[340px] p-2`}>
      <div className="relative">
        <div className="absolute inset-x-0 top-0 h-11 animate-slide-list rounded-lg border border-sapphire-500/30 bg-sapphire-500/[0.07]" />
        {[0.7, 0.55, 0.62].map((w, i) => (
          <div key={i} className="relative flex h-11 items-center gap-3 px-3">
            <span className="h-6 w-6 flex-none rounded-md bg-ink/[0.08]" />
            <span className="h-2 rounded-full bg-ink/[0.12]" style={{ width: `${w * 100}%` }} />
            <span className="ml-auto h-2 w-10 flex-none rounded-full bg-ink/[0.08]" />
          </div>
        ))}
      </div>
    </div>
  );
}

function PayVisual() {
  return (
    <div className={`${panel} w-full max-w-[340px] p-4`}>
      <div className="flex items-center justify-between">
        <span className="text-[12px] text-ink/50">Pay with</span>
        <span className="h-2 w-14 rounded-full bg-ink/[0.1]" />
      </div>
      <div className="mt-3 grid grid-cols-3 gap-2 text-[12px] font-medium">
        <span className="rounded-lg border border-sapphire-500/40 bg-sapphire-500/[0.07] py-2 text-center text-accent">UPI</span>
        <span className="rounded-lg border border-ink/[0.08] py-2 text-center text-ink/60">Card</span>
        <span className="rounded-lg border border-ink/[0.08] py-2 text-center text-ink/60">Netbanking</span>
      </div>
      <div className="relative mt-3">
        <span className="absolute inset-0 animate-ping-soft rounded-lg bg-sapphire-500/30" />
        <div className="relative flex h-9 items-center justify-center gap-1.5 rounded-lg bg-ink text-[13px] font-medium text-paper">
          <Icon name="lock" size={12} strokeWidth={2.2} /> Pay securely
        </div>
      </div>
    </div>
  );
}

function KeyVisual() {
  return (
    <div className={`${panel} w-full max-w-[280px] p-4`}>
      <div className="text-[11px] font-medium uppercase tracking-[0.08em] text-ink/45">Your key</div>
      <div className="mt-2 flex items-center font-mono text-[14px] font-medium tracking-[0.04em] text-ink">
        <span className="animate-type-key whitespace-nowrap">FKIT-7Q2M-K9XD</span>
        <span className="ml-0.5 h-4 w-[2px] animate-caret bg-sapphire-500" />
      </div>
    </div>
  );
}

function ActivateVisual() {
  return (
    <div className={`${panel} w-full max-w-[280px] p-4`}>
      <div className="flex h-10 items-center justify-between rounded-lg border border-ink/[0.1] bg-wash px-3 font-mono text-[12px] text-ink/70">
        FKIT-••••-••••-4LPA
        <span className="flex h-5 w-5 animate-check-pop items-center justify-center rounded-full bg-emerald-500 text-white">
          <Icon name="check" size={12} strokeWidth={3} />
        </span>
      </div>
      <div className="mt-2.5 text-[12px] font-medium text-emerald-700 dark:text-emerald-400">Activated on this device</div>
    </div>
  );
}

function HelpVisual() {
  return (
    <div className="flex w-full max-w-[280px] flex-col gap-2 text-[12px]">
      <div className="self-end rounded-2xl rounded-br-md bg-ink px-3 py-2 text-paper">Where is my invoice?</div>
      <div className="flex items-end gap-2">
        <span className="flex h-6 w-6 flex-none items-center justify-center rounded-full bg-gradient-to-br from-sapphire-500 to-sapphire-400 text-[9px] font-bold text-white">
          FK
        </span>
        <div className={`${panel} rounded-2xl rounded-bl-md px-3 py-2 text-ink/80`}>Attached. It is in your email too.</div>
      </div>
    </div>
  );
}

export function BentoGrid() {
  return (
    <section id="how" aria-labelledby="how-title" className="section scroll-mt-24">
      <div className="wrap">
        <SectionHeading
          id="how-title"
          kicker="How it works"
          title={<>From checkout to working software, in one sitting.</>}
          body="No sign-up, no sales call. Five short steps from picking a tool to using it."
        />
        <ul className="mt-16 grid gap-4 md:grid-cols-6">
          <BentoCard
            className="md:col-span-3"
            step="01"
            title="Choose a tool"
            body="Every page says what the tool does and what it costs. No hidden fees."
            visual={<ChooseVisual />}
          />
          <BentoCard
            className="md:col-span-3"
            delay={60}
            step="02"
            title="Pay in rupees"
            body="UPI, card or netbanking through Razorpay. We never see your card details."
            visual={<PayVisual />}
          />
          <BentoCard
            className="md:col-span-2"
            delay={120}
            step="03"
            title="Get your key instantly"
            body="Created the moment payment is verified, shown on screen and emailed."
            visual={<KeyVisual />}
          />
          <BentoCard
            className="md:col-span-2"
            delay={180}
            step="04"
            title="Activate"
            body="Open the app, paste your key once, and you are in."
            visual={<ActivateVisual />}
          />
          <BentoCard
            className="md:col-span-2"
            delay={240}
            step="05"
            title="Help from a real person"
            body={`Email us and someone replies ${site.supportReply}.`}
            visual={<HelpVisual />}
          />
        </ul>
      </div>
    </section>
  );
}
