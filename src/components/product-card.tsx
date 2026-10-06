import Link from "next/link";
import { billingLabel, formatInr } from "@/lib/format";
import { lowestPrice } from "@/lib/product-utils";
import type { Product } from "@/lib/types";
import { AppWindow } from "./app-window";

export function ProductCard({ product }: { product: Product }) {
  const from = lowestPrice(product);
  const hasBoth = product.plans.length > 1;
  return (
    <Link
      href={`/products/${product.slug}`}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-ink/10 bg-paper/80 shadow-sm backdrop-blur-xl transition-all duration-300 hover:-translate-y-1.5 hover:border-sky-500/30 hover:shadow-2xl hover:shadow-sky-500/5"
    >
      <div className="h-[210px] overflow-hidden bg-wash/60 px-6 pt-6 border-b border-ink/10">
        <AppWindow
          product={product}
          className="rounded-b-none border-b-0 shadow-lg"
        />
      </div>
      <div className="flex flex-1 flex-col gap-4 p-6 sm:p-7">
        <div>
          <div className="text-xl font-bold leading-7 text-ink group-hover:text-sky-950 transition-colors">
            {product.name}
          </div>
          <div className="mt-1.5 text-xs font-normal leading-relaxed text-ink/75">
            {product.tagline}
          </div>
        </div>
        <div className="mt-auto flex items-center justify-between border-t border-ink/10 pt-4">
          <div>
            {hasBoth && (
              <span className="mr-1 text-xs font-normal text-ink/60">from</span>
            )}
            <span className="text-2xl font-extrabold text-ink tracking-tight">
              {formatInr(from.priceInr)}
            </span>
            <span className="text-xs font-normal text-ink/65">
              {" "}
              {billingLabel(from.type)}
            </span>
          </div>
          <span className="inline-flex items-center gap-1 text-xs font-bold text-sky-600 group-hover:translate-x-1 transition-transform">
            View tool →
          </span>
        </div>
      </div>
    </Link>
  );
}
