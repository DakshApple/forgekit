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
      className="card card-hover flex flex-col overflow-hidden"
    >
      <div className="h-[200px] overflow-hidden bg-tint px-6 pt-6">
        <AppWindow
          product={product}
          className="rounded-b-none border-b-0 shadow-[0_8px_24px_rgba(10,10,10,0.08)]"
        />
      </div>
      <div className="flex flex-1 flex-col gap-4 p-6">
        <div>
          <div className="text-xl font-bold leading-7 tracking-[-0.02em]">
            {product.name}
          </div>
          <div className="mt-1 text-sm font-light leading-[22px] text-ink/70">
            {product.tagline}
          </div>
        </div>
        <div className="mt-auto flex items-center justify-between border-t border-ink/10 pt-4">
          <div>
            {hasBoth && (
              <span className="mr-1 text-[13px] font-light text-ink/65">from</span>
            )}
            <span className="text-2xl font-bold leading-[30px] tracking-[-0.02em]">
              {formatInr(from.priceInr)}
            </span>
            <span className="text-[13px] font-light text-ink/65">
              {" "}
              {billingLabel(from.type)}
            </span>
          </div>
          <span className="text-sm font-medium">View details</span>
        </div>
      </div>
    </Link>
  );
}
