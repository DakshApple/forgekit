import type { ReactNode } from "react";

export function LegalPage({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: ReactNode;
}) {
  return (
    <div className="wrap max-w-[780px] pb-24 pt-14">
      <div className="eyebrow">Legal</div>
      <h1 className="mt-3.5 text-[34px] font-bold leading-[1.1] tracking-tightest md:text-5xl">
        {title}
      </h1>
      <p className="mt-3 text-sm font-light text-ink/65">Last updated {updated}</p>
      <div className="mt-10 space-y-8 text-[15px] font-light leading-[26px] text-ink/85">
        {children}
      </div>
    </div>
  );
}

export function LegalSection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section>
      <h2 className="text-xl font-bold tracking-[-0.02em] text-ink">{title}</h2>
      <div className="mt-2 space-y-3">{children}</div>
    </section>
  );
}
