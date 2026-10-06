"use client";

import { useMemo, useState } from "react";
import { Icon } from "@/components/icons";
import { ProductCard } from "@/components/product-card";
import { Reveal } from "@/components/site/reveal";
import type { Product } from "@/lib/types";

type Sort = "newest" | "price-low" | "price-high" | "name";

export function ProductBrowser({
  products,
}: {
  products: Product[];
}) {
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<Sort>("newest");

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = products.filter((p) => {
      const matchesQuery =
        !q || p.name.toLowerCase().includes(q) || p.tagline.toLowerCase().includes(q);
      return matchesQuery;
    });
    const min = (p: Product) => Math.min(...p.plans.map((x) => x.priceInr));
    if (sort === "price-low") list.sort((a, b) => min(a) - min(b));
    if (sort === "price-high") list.sort((a, b) => min(b) - min(a));
    if (sort === "name") list.sort((a, b) => a.name.localeCompare(b.name));
    return list;
  }, [products, query, sort]);

  return (
    <>
      <div className="wrap sticky top-[64px] z-10 flex flex-wrap items-center justify-end gap-4 border-b border-ink/[0.04] bg-paper/80 py-4 backdrop-blur-xl">
        <div className="flex flex-wrap gap-3">
          <label className="flex h-10 min-w-[260px] items-center gap-2.5 rounded-xl border border-ink/[0.08] bg-wash/50 px-3.5 shadow-sm transition-all focus-within:border-sapphire-500/50 focus-within:ring-2 focus-within:ring-sapphire-500/10 hover:border-ink/[0.15]">
            <Icon name="search" size={16} className="text-ink/50" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by tool name or feature..."
              aria-label="Search products"
              className="w-full bg-transparent text-[14px] font-medium text-ink outline-none placeholder:text-ink/50"
            />
          </label>
          <label className="flex h-10 items-center gap-2 rounded-xl border border-ink/[0.08] bg-wash/50 px-3.5 text-[12px] font-semibold uppercase tracking-wider text-ink/70 shadow-sm hover:border-ink/[0.15]">
            <span className="sr-only">Sort products</span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as Sort)}
              className="cursor-pointer bg-transparent outline-none"
            >
              <option value="newest">Sort: Newest</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="name">Name</option>
            </select>
          </label>
        </div>
      </div>

      <div className="wrap pb-24 pt-12">
        {visible.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-ink/[0.08] bg-wash/30 py-24 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-ink/[0.04] text-ink/40">
              <Icon name="search" size={24} />
            </div>
            <div className="mt-4 text-[16px] font-semibold text-ink">No matching products found</div>
            <p className="mt-2 max-w-[360px] text-[14px] text-ink/60">
              {query
                ? `No tools match "${query}". Try searching for another keyword.`
                : "Create active products in the admin panel to populate this catalogue."}
            </p>
          </div>
        ) : (
          <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:gap-8">
            {visible.map((p, i) => (
              <Reveal as="li" key={p.slug} delay={i * 40}>
                <ProductCard product={p} />
              </Reveal>
            ))}
          </ul>
        )}
        
        <p className="mt-16 border-t border-ink/[0.06] pt-8 text-[13px] leading-relaxed text-ink/50">
          * All prices are quoted in ₹ INR. License keys are issued automatically upon Razorpay payment verification.
        </p>
      </div>
    </>
  );
}
