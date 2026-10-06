import { ButtonLink } from "@/components/ui";
import { Logo } from "@/components/logo";
import { Icon } from "@/components/icons";

export default function NotFound() {
  return (
    <div data-store className="relative flex min-h-[100vh] items-center justify-center overflow-hidden py-20">
      <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[500px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(59_130_246/0.08),transparent)] mix-blend-plus-lighter" />

      <div className="wrap flex max-w-[560px] flex-col items-center text-center">
        <Logo variant="auto" />
        
        <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-sapphire-500/20 bg-sapphire-500/10 px-3.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-sapphire-600 dark:text-sapphire-400">
          <span className="h-1.5 w-1.5 rounded-full bg-sapphire-500" />
          404 Error
        </div>

        <h1 className="mt-6 text-[32px] font-bold tracking-[-0.02em] text-ink sm:text-[40px]">
          Page not found
        </h1>
        
        <p className="mt-4 text-[16px] leading-[1.6] text-ink/70">
          The link you followed might be broken, or the product or order page you are searching for does not exist.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <ButtonLink href="/products" className="h-12 bg-ink px-6 text-[15px] shadow-[0_4px_16px_rgba(0,0,0,0.1)] transition-transform hover:-translate-y-0.5 dark:shadow-[0_4px_16px_rgba(255,255,255,0.1)]">
            Browse products <Icon name="arrow" size={16} strokeWidth={2.5} className="-rotate-45" />
          </ButtonLink>
          <ButtonLink href="/" variant="secondary" className="h-12 border-ink/[0.12] px-6 text-[15px] hover:border-ink/[0.25]">
            Return home
          </ButtonLink>
        </div>
      </div>
    </div>
  );
}
