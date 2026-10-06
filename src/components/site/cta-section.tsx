import Link from "next/link";
import { Reveal } from "./reveal";

export function CtaSection() {
  return (
    <section className="relative overflow-hidden bg-ink py-[120px] dark:bg-wash/20 dark:border-t dark:border-ink/[0.06] md:py-[180px]">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[600px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(59_130_246/0.25),transparent)] mix-blend-screen dark:mix-blend-plus-lighter"
      />
      <div className="wrap relative text-center text-paper dark:text-ink">
        <Reveal>
          <h2 className="title mx-auto max-w-[700px]">
            Start building your business, not your software stack.
          </h2>
        </Reveal>
        <Reveal delay={60}>
          <p className="mt-5 text-[18px] text-paper/70 dark:text-ink/70">
            A growing marketplace of premium tools. Instant access, no hassle.
          </p>
        </Reveal>
        <Reveal delay={120}>
          <Link
            href="/products"
            className="group mt-10 inline-flex h-13 items-center rounded-xl bg-paper px-8 text-[16px] font-semibold text-ink shadow-[0_8px_32px_-8px_rgb(255_255_255/0.25)] transition-[transform,box-shadow] duration-150 ease-out hover:-translate-y-1 hover:shadow-[0_16px_40px_-8px_rgb(255_255_255/0.35)] dark:bg-ink dark:text-paper dark:shadow-[0_8px_32px_-8px_rgba(59,130,246,0.3)] dark:hover:shadow-[0_16px_40px_-8px_rgba(59,130,246,0.4)]"
          >
            Browse the marketplace
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
