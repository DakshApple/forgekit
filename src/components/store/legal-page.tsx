import type { ReactNode } from "react";
import { Icon } from "@/components/icons";
import { RevealObserver } from "@/components/site/reveal-observer";
import { Reveal } from "@/components/site/reveal";

export function LegalPage({
  title,
  updated,
  subtitle,
  children,
}: {
  title: string;
  updated: string;
  subtitle?: string;
  children: ReactNode;
}) {
  return (
    <>
      <RevealObserver />
      <div className="relative overflow-hidden pt-[120px] pb-32">
        <div className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[500px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(59_130_246/0.08),transparent)] mix-blend-plus-lighter" />

        <div className="wrap max-w-[840px]">
          <div className="border-b border-ink/[0.06] pb-12">
            <Reveal delay={0}>
              <div className="inline-flex items-center gap-2 rounded-full border border-sapphire-500/20 bg-sapphire-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-sapphire-600 dark:text-sapphire-400">
                <span className="h-1.5 w-1.5 rounded-full bg-sapphire-500" />
                Legal
              </div>
            </Reveal>
            <Reveal delay={60}>
              <h1 className="title mt-5">{title}</h1>
            </Reveal>
            {subtitle && (
              <Reveal delay={120}>
                <p className="mt-4 max-w-[640px] text-[17px] leading-[1.6] text-ink/70">
                  {subtitle}
                </p>
              </Reveal>
            )}
            <Reveal delay={180}>
              <div className="mt-6 flex flex-wrap items-center gap-4 text-[13px] font-medium text-ink/50">
                <span className="inline-flex items-center gap-1.5">
                  <Icon name="check" size={14} className="text-sapphire-500" strokeWidth={2.5} />
                  Effective Date: {updated}
                </span>
                <span>•</span>
                <span className="inline-flex items-center gap-1.5">
                  <Icon name="lock" size={14} className="text-sapphire-500" />
                  IT Act (India) & GDPR Compliant Framework
                </span>
              </div>
            </Reveal>
          </div>

          <div className="mt-12 space-y-8 text-[15px] leading-[1.7] text-ink/80">
            {children}
          </div>
        </div>
      </div>
    </>
  );
}

export function LegalSection({
  id,
  title,
  children,
}: {
  id?: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <Reveal as="section" id={id} delay={180} className="scroll-mt-24 rounded-[20px] border border-ink/[0.08] bg-wash/50 p-6 shadow-sm backdrop-blur-md sm:p-10">
      <h2 className="border-b border-ink/[0.06] pb-4 mb-6 text-[20px] font-bold tracking-[-0.01em] text-ink">
        {title}
      </h2>
      <div className="space-y-4 text-[15px] leading-[1.7] text-ink/75">
        {children}
      </div>
    </Reveal>
  );
}
