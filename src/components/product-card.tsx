import Link from "next/link";
import { AppWindow } from "@/components/app-window";
import { Icon } from "@/components/icons";
import { SpotlightCard } from "@/components/site/spotlight-card";
import { formatInr } from "@/lib/format";
import { lowestPrice } from "@/lib/product-utils";
import type { Product } from "@/lib/types";

export function ProductCard({ product }: { product: Product }) {
  const from = lowestPrice(product);
  const hasMultiple = product.plans.length > 1;

  return (
    <SpotlightCard className="group flex h-full flex-col overflow-hidden rounded-2xl border border-ink/[0.08] bg-wash/60">
      <Link href={`/products/${product.slug}`} className="flex h-full flex-col outline-none">
        <div className="relative flex h-[240px] items-end justify-center overflow-hidden border-b border-ink/[0.06] bg-ink/[0.02] px-6 pt-8 transition-colors duration-300 group-hover:bg-ink/[0.04]">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(100%_100%_at_50%_100%,rgb(59_130_246/0.08),transparent)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          <AppWindow
            product={product}
            className="w-full translate-y-4 rounded-b-none border-b-0 shadow-lift transition-transform duration-300 group-hover:translate-y-2 group-focus-visible:translate-y-2"
          />
        </div>

        <div className="flex flex-1 flex-col p-6 sm:p-8">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h3 className="text-[20px] font-semibold tracking-[-0.01em] text-ink transition-colors group-hover:text-sapphire-600 dark:group-hover:text-sapphire-400">
                {product.name}
              </h3>
              <p className="mt-1.5 text-[14px] leading-[1.5] text-ink/65">{product.tagline}</p>
            </div>
            <span className="flex-none rounded-full border border-ink/[0.08] bg-paper px-2.5 py-1 text-[11px] font-medium text-ink/70 shadow-sm">
              Instant access
            </span>
          </div>

          <div className="mt-auto pt-6">
            <div className="flex items-center justify-between border-t border-ink/[0.06] pt-5">
              <div className="flex items-baseline gap-1.5">
                {hasMultiple && <span className="text-[13px] text-ink/60">from</span>}
                <span className="text-[20px] font-semibold tracking-tight text-ink">
                  {formatInr(from.priceInr)}
                </span>
              </div>
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-ink/[0.05] text-ink transition-[transform,background-color] duration-300 group-hover:-translate-y-0.5 group-hover:bg-sapphire-500 group-hover:text-white">
                <Icon name="arrow" size={14} strokeWidth={2.5} className="-rotate-45" />
              </span>
            </div>
          </div>
        </div>
      </Link>
    </SpotlightCard>
  );
}
