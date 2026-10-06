import { Icon } from "@/components/icons";

/**
 * Hero product visual: a crafted, always-dark "order confirmed" screen that
 * shows what a buyer actually gets. Illustrative only (sample key, no data).
 * Colours are fixed (not theme tokens) so it reads as a real app window in
 * both light and dark mode.
 */
export function HeroVisual() {
  return (
    <div
      role="img"
      aria-label="Illustration of the Forgekit order screen: payment confirmed, license key ready to copy, GST invoice and activation status."
      className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#0B0C0F] text-[#F7F8F8] shadow-[0_40px_120px_-30px_rgba(2,6,23,0.55)] ring-1 ring-black/5"
    >
      {/* Title bar */}
      <div className="flex h-11 items-center gap-3 border-b border-white/[0.06] bg-white/[0.02] px-4">
        <div className="flex gap-1.5">
          <i className="block h-3 w-3 rounded-full bg-white/[0.12]" />
          <i className="block h-3 w-3 rounded-full bg-white/[0.12]" />
          <i className="block h-3 w-3 rounded-full bg-white/[0.12]" />
        </div>
        <div className="mx-auto flex h-6 items-center gap-1.5 rounded-md border border-white/[0.06] bg-white/[0.03] px-3 text-[11px] text-white/50">
          <Icon name="lock" size={10} strokeWidth={2.2} />
          forgekit.in/order
        </div>
        <div className="w-[52px]" />
      </div>

      <div className="grid md:grid-cols-[200px_1fr] lg:grid-cols-[200px_1fr_260px]">
        {/* Sidebar */}
        <aside className="hidden border-r border-white/[0.06] p-3 md:block">
          <div className="px-2 pb-3 pt-1 text-[11px] font-medium uppercase tracking-[0.08em] text-white/35">
            Your order
          </div>
          {[
            { icon: "check", label: "Payment", active: false },
            { icon: "key", label: "License key", active: true },
            { icon: "invoice", label: "GST invoice", active: false },
            { icon: "download", label: "Downloads", active: false },
            { icon: "headset", label: "Support", active: false },
          ].map((i) => (
            <div
              key={i.label}
              className={`mb-0.5 flex items-center gap-2.5 rounded-lg px-2 py-2 text-[13px] ${
                i.active ? "bg-white/[0.06] text-white" : "text-white/55"
              }`}
            >
              <Icon name={i.icon as "key"} size={15} strokeWidth={1.8} />
              {i.label}
            </div>
          ))}
        </aside>

        {/* Main */}
        <div className="min-w-0 p-5 sm:p-7">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <div className="text-[12px] text-white/45">Order confirmed</div>
              <div className="mt-1 text-[20px] font-semibold tracking-[-0.02em] sm:text-[22px]">
                Your license is ready
              </div>
            </div>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-2.5 py-1 text-[11px] font-medium text-emerald-300">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              Paid via UPI
            </span>
          </div>

          {/* License key */}
          <div className="relative mt-6 overflow-hidden rounded-xl border border-white/[0.08] bg-gradient-to-b from-white/[0.05] to-white/[0.015] p-4 sm:p-5">
            <div className="pointer-events-none absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-sky-400/[0.08] to-transparent" />
            <div className="flex items-center justify-between text-[11px] font-medium uppercase tracking-[0.08em] text-white/40">
              License key
              <span className="normal-case tracking-normal text-white/35">Also sent to your email</span>
            </div>
            <div className="mt-3 flex items-center justify-between gap-3">
              <code className="truncate font-mono text-[15px] font-medium tracking-[0.06em] text-white sm:text-[18px]">
                FKIT-7Q2M-K9XD-4LPA
              </code>
              <span className="inline-flex flex-none items-center gap-1.5 rounded-lg bg-white px-3 py-1.5 text-[12px] font-semibold text-[#0B0C0F]">
                <Icon name="copy" size={13} strokeWidth={2} />
                Copy
              </span>
            </div>
          </div>

          {/* Detail tiles */}
          <div className="mt-4 grid grid-cols-3 gap-3">
            {[
              { k: "Plan", v: "Lifetime" },
              { k: "Invoice", v: "GST · PDF" },
              { k: "Status", v: "Active", live: true },
            ].map((t) => (
              <div key={t.k} className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-3">
                <div className="text-[11px] text-white/40">{t.k}</div>
                <div className="mt-1 flex items-center gap-1.5 text-[13px] font-medium">
                  {t.live && (
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping-soft rounded-full bg-sky-400" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-sky-400" />
                    </span>
                  )}
                  {t.v}
                </div>
              </div>
            ))}
          </div>

          {/* Terminal */}
          <div className="mt-4 hidden rounded-xl border border-white/[0.06] bg-black/40 p-4 font-mono text-[12px] leading-6 sm:block">
            <div className="text-white/40">
              <span className="text-sky-400">$</span> app activate FKIT-7Q2M-K9XD-4LPA
            </div>
            <div className="text-emerald-300">✓ License verified. Activated on this device.</div>
          </div>
        </div>

        {/* Timeline */}
        <aside className="hidden border-l border-white/[0.06] p-6 lg:block">
          <div className="text-[11px] font-medium uppercase tracking-[0.08em] text-white/35">Delivery</div>
          <ol className="relative mt-5 space-y-6 before:absolute before:bottom-2 before:left-[9px] before:top-2 before:w-px before:bg-white/[0.08]">
            {[
              { t: "Payment received", d: "Verified by Razorpay", done: true },
              { t: "Key generated", d: "Unique to your order", done: true },
              { t: "Email sent", d: "Key + GST invoice", done: true },
              { t: "Ready to activate", d: "Paste key in the app", done: false },
            ].map((s) => (
              <li key={s.t} className="relative flex gap-3 pl-0">
                <span
                  className={`relative z-10 flex h-[19px] w-[19px] flex-none items-center justify-center rounded-full ${
                    s.done ? "bg-sky-500 text-white" : "border border-sky-400/60 bg-[#0B0C0F]"
                  }`}
                >
                  {s.done ? (
                    <Icon name="check" size={11} strokeWidth={3} />
                  ) : (
                    <span className="h-1.5 w-1.5 animate-pulse-glow rounded-full bg-sky-400" />
                  )}
                </span>
                <div>
                  <div className="text-[13px] font-medium leading-[19px]">{s.t}</div>
                  <div className="text-[12px] text-white/40">{s.d}</div>
                </div>
              </li>
            ))}
          </ol>
        </aside>
      </div>
    </div>
  );
}
