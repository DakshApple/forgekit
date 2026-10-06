import Link from "next/link";
import { Icon } from "@/components/icons";
import { site } from "@/lib/site";
import { HeroVisual } from "./hero-visual";

/** Converging beam lines behind the hero visual (decorative). */
function Beams() {
  const paths = [
    "M0 40 C 320 60, 480 300, 600 560",
    "M1200 40 C 880 60, 720 300, 600 560",
    "M120 0 C 360 140, 520 320, 600 560",
    "M1080 0 C 840 140, 680 320, 600 560",
    "M300 0 C 450 200, 560 360, 600 560",
    "M900 0 C 750 200, 640 360, 600 560",
  ];
  return (
    <svg
      aria-hidden
      className="pointer-events-none absolute inset-x-0 top-0 mx-auto hidden h-[640px] w-full max-w-[1400px] md:block"
      viewBox="0 0 1200 600"
      preserveAspectRatio="none"
      fill="none"
    >
      <defs>
        <linearGradient id="beam-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#0EA5E9" stopOpacity="0" />
          <stop offset="0.6" stopColor="#3B82F6" stopOpacity="0.9" />
          <stop offset="1" stopColor="#0EA5E9" stopOpacity="0" />
        </linearGradient>
      </defs>
      {paths.map((d, i) => (
        <g key={d}>
          <path d={d} stroke="rgb(var(--ink) / 0.07)" strokeWidth="1" />
          <path
            d={d}
            stroke="url(#beam-grad)"
            strokeWidth="1.25"
            pathLength={220}
            strokeDasharray="44 176"
            className="animate-beam"
            style={{ animationDelay: `${i * 0.45}s` }}
          />
        </g>
      ))}
    </svg>
  );
}

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative isolate overflow-hidden pt-16 sm:pt-24">
      {/* Backdrop: grid, glow, beams */}
      <div aria-hidden className="bg-grid pointer-events-none absolute inset-x-0 top-0 -z-10 h-[820px]" />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[-280px] -z-10 h-[640px] w-[1100px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(59_130_246/0.16),transparent)] dark:bg-[radial-gradient(closest-side,rgb(59_130_246/0.22),transparent)]"
      />
      <Beams />

      <div className="wrap relative text-center">
        <Link
          href="/products"
          id="hero-announcement"
          className="group inline-flex animate-fade-in-up items-center gap-2.5 rounded-full border border-ink/10 bg-paper/70 py-1 pl-1 pr-3.5 text-[13px] font-medium text-ink/75 opacity-0 shadow-soft backdrop-blur-md transition-colors duration-150 hover:border-ink/20 hover:text-ink"
        >
          <span className="rounded-full bg-gradient-to-r from-sapphire-500 to-sapphire-400 px-2.5 py-0.5 text-[12px] font-semibold text-white">
            New
          </span>
          Instant license delivery
          <Icon name="arrow" size={13} strokeWidth={2.2} className="transition-transform duration-150 group-hover:translate-x-0.5" />
        </Link>

        <h1
          id="hero-title"
          className="display text-gradient mx-auto mt-7 max-w-[900px] animate-fade-in-up-delay pb-2 opacity-0"
        >
          Useful products.
          <br />
          Ready to use.
        </h1>

        <p className="mx-auto mt-6 max-w-[560px] animate-fade-in-up-delay-2 text-[17px] leading-[1.6] text-ink/65 opacity-0 sm:text-[19px]">
          A curated marketplace of premium digital tools. Buy exactly what you need, with no complex setup or hidden fees.
        </p>

        <div className="mt-9 flex animate-fade-in-up-delay-2 flex-wrap items-center justify-center gap-3 opacity-0">
          <Link
            id="hero-cta-primary"
            href="/products"
            className="group inline-flex h-12 items-center gap-2 rounded-[10px] bg-ink px-6 text-[15px] font-medium text-paper shadow-[0_8px_24px_-8px_rgb(37_99_235/0.5)] transition-[transform,box-shadow] duration-150 ease-out hover:-translate-y-0.5 hover:shadow-[0_14px_32px_-10px_rgb(37_99_235/0.6)]"
          >
            Browse products
            <Icon name="arrow" size={16} strokeWidth={2.2} className="transition-transform duration-150 group-hover:translate-x-0.5" />
          </Link>
          <Link
            id="hero-cta-secondary"
            href="/#how"
            className="inline-flex h-12 items-center gap-2 rounded-[10px] border border-ink/[0.12] bg-paper/60 px-6 text-[15px] font-medium text-ink backdrop-blur-sm transition-[transform,border-color] duration-150 ease-out hover:-translate-y-0.5 hover:border-ink/25"
          >
            How it works
          </Link>
        </div>

        <ul className="mt-8 flex animate-fade-in-up-delay-2 flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[13px] text-ink/60 opacity-0">
          {["GST invoice included", `${site.refundDays}-day refunds`, "Secured by Razorpay"].map((t) => (
            <li key={t} className="inline-flex items-center gap-1.5">
              <Icon name="check" size={14} strokeWidth={2.4} className="text-accent" />
              {t}
            </li>
          ))}
        </ul>
      </div>

      {/* Product visual */}
      <div className="relative mx-auto mt-16 max-w-[1180px] px-4 sm:mt-20 sm:px-6">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-[10%] bottom-[-10%] top-[20%] -z-10 rounded-full bg-[radial-gradient(closest-side,rgb(59_130_246/0.45),rgb(14_165_233/0.15)_55%,transparent)] blur-2xl"
        />
        <div className="animate-fade-in-up-delay-2 opacity-0">
          <div className="hero-tilt">
            <HeroVisual />
          </div>
        </div>
        {/* Fade into the page */}
        <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-paper" />
      </div>
      <p className="sr-only">The screen above is an illustration with a sample license key.</p>
    </section>
  );
}
