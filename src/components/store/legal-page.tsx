import type { ReactNode } from "react";
import { Icon } from "@/components/icons";

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
    <div className="relative overflow-hidden pt-12 pb-28">
      {/* Background ambient glow */}
      <div className="pointer-events-none absolute -top-32 left-1/2 -z-10 h-[400px] w-[700px] -translate-x-1/2 rounded-full bg-gradient-to-tr from-indigo-500/10 via-purple-500/5 to-transparent blur-3xl opacity-70" />

      <div className="wrap max-w-[920px]">
        {/* Header */}
        <div className="border-b border-ink/10 pb-10">
          <div className="eyebrow inline-flex items-center gap-2 rounded-full border border-indigo-500/20 bg-indigo-500/5 px-3 py-1 text-xs font-semibold text-indigo-700">
            <span className="h-1.5 w-1.5 rounded-full bg-indigo-600" />
            COMPLIANCE & LEGAL
          </div>
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl md:text-5xl">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-3 text-base font-normal leading-relaxed text-ink/75 max-w-[640px]">
              {subtitle}
            </p>
          )}
          <div className="mt-5 flex items-center gap-4 text-xs font-medium text-ink/60">
            <span className="inline-flex items-center gap-1.5">
              <Icon name="check" size={14} className="text-emerald-600" strokeWidth={2.5} />
              Effective Date: {updated}
            </span>
            <span>•</span>
            <span className="inline-flex items-center gap-1.5">
              <Icon name="lock" size={14} className="text-indigo-600" />
              IT Act (India) & GDPR Compliant Framework
            </span>
          </div>
        </div>

        {/* Content Body */}
        <div className="mt-12 space-y-10 text-[15px] font-normal leading-[1.75] text-ink/85">
          {children}
        </div>
      </div>
    </div>
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
    <section id={id} className="scroll-mt-24 rounded-2xl border border-ink/10 bg-paper/90 p-6 sm:p-8 shadow-sm backdrop-blur-xl transition-all hover:border-ink/20">
      <h2 className="text-lg sm:text-xl font-extrabold tracking-tight text-ink border-b border-ink/10 pb-3 mb-4">
        {title}
      </h2>
      <div className="space-y-4 text-sm sm:text-[15px] font-normal leading-relaxed text-ink/80">
        {children}
      </div>
    </section>
  );
}
