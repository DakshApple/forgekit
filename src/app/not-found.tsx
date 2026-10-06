import { ButtonLink } from "@/components/ui";
import { Logo } from "@/components/logo";
import { Icon } from "@/components/icons";

export default function NotFound() {
  return (
    <div className="relative overflow-hidden min-h-[85vh] flex items-center justify-center py-20">
      {/* Soft background ambient glow */}
      <div className="pointer-events-none absolute -top-20 left-1/2 -z-10 h-[450px] w-[750px] -translate-x-1/2 rounded-full bg-gradient-to-tr from-indigo-500/10 via-purple-500/5 to-transparent blur-3xl opacity-70" />

      <div className="wrap max-w-[560px] text-center flex flex-col items-center">
        <Logo />
        
        <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-indigo-500/20 bg-indigo-500/5 px-3.5 py-1 text-xs font-semibold text-indigo-700">
          <span className="h-1.5 w-1.5 rounded-full bg-indigo-600" />
          404 ERROR
        </div>

        <h1 className="h1 mt-4 text-3xl font-extrabold sm:text-4xl text-ink">
          Page not found
        </h1>
        
        <p className="lead mt-4 text-sm sm:text-base leading-relaxed text-ink/75">
          The link you followed might be broken, or the product or order page you are searching for does not exist.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <ButtonLink href="/products" className="h-11 px-6 text-sm">
            Browse products <Icon name="arrow" size={16} />
          </ButtonLink>
          <ButtonLink href="/" variant="secondary" className="h-11 px-6 text-sm">
            Return home
          </ButtonLink>
        </div>
      </div>
    </div>
  );
}
