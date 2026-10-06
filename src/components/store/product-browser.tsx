"use client";

import { useMemo, useState } from "react";
import { Icon } from "@/components/icons";
import { ProductCard } from "@/components/product-card";
import type { Product } from "@/lib/types";

type Filter = "all" | "monthly" | "one-time";
type Sort = "newest" | "price-low" | "price-high" | "name";

export function ProductBrowser({
  products,
  initialFilter = "all",
}: {
  products: Product[];
  initialFilter?: Filter;
}) {
  const [filter, setFilter] = useState<Filter>(initialFilter);
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<Sort>("newest");

  const counts = useMemo(
    () => ({
      all: products.length,
      monthly: products.filter((p) => p.plans.some((x) => x.type === "monthly")).length,
      "one-time": products.filter((p) => p.plans.some((x) => x.type === "one-time")).length,
    }),
    [products],
  );

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = products.filter((p) => {
      const matchesFilter = filter === "all" || p.plans.some((x) => x.type === filter);
      const matchesQuery =
        !q || p.name.toLowerCase().includes(q) || p.tagline.toLowerCase().includes(q);
      return matchesFilter && matchesQuery;
    });
    const min = (p: Product) => Math.min(...p.plans.map((x) => x.priceInr));
    if (sort === "price-low") list.sort((a, b) => min(a) - min(b));
    if (sort === "price-high") list.sort((a, b) => min(b) - min(a));
    if (sort === "name") list.sort((a, b) => a.name.localeCompare(b.name));
    return list;
  }, [products, filter, query, sort]);

  const chips: { id: Filter; label: string }[] = [
    { id: "all", label: "All" },
    { id: "monthly", label: "Monthly" },
    { id: "one-time", label: "One-time" },
  ];

  return (
    <>
      <div className="wrap flex flex-wrap items-center justify-between gap-4 pb-2 pt-8">
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by billing">
          {chips.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setFilter(c.id)}
              aria-pressed={filter === c.id}
              className={`inline-flex h-10 items-center rounded-xl border px-4 text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
                filter === c.id
                  ? "border-ink bg-ink text-paper shadow-md"
                  : "border-ink/15 bg-paper/80 text-ink/80 hover:bg-wash hover:border-sky-600/30"
              }`}
            >
              {c.label} ({counts[c.id]})
            </button>
          ))}
        </div>
        <div className="flex flex-wrap gap-3">
          <label className="flex h-10 min-w-[260px] items-center gap-2.5 rounded-xl border border-ink/15 bg-paper/90 backdrop-blur-md px-3.5 shadow-sm transition-all focus-within:border-sky-600 focus-within:ring-2 focus-within:ring-sky-100">
            <Icon name="search" size={16} className="text-ink/50" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by tool name or feature..."
              aria-label="Search products"
              className="w-full bg-transparent text-xs sm:text-sm font-medium outline-none placeholder:text-ink/40"
            />
          </label>
          <label className="flex h-10 items-center gap-2 rounded-xl border border-ink/15 bg-paper/90 backdrop-blur-md px-3.5 text-xs font-semibold uppercase tracking-wider text-ink/80 shadow-sm">
            <span className="sr-only">Sort products</span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as Sort)}
              className="bg-transparent outline-none cursor-pointer"
            >
              <option value="newest">Sort: Newest</option>
              <option value="price-low">Price: low to high</option>
              <option value="price-high">Price: high to low</option>
              <option value="name">Name</option>
            </select>
          </label>
        </div>
      </div>

      <div className="wrap pb-20 pt-6">
        {visible.length === 0 ? (
          <div className="rounded-2xl border border-ink/10 bg-paper/90 p-12 text-center shadow-sm backdrop-blur-xl">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-wash text-ink/50 mb-3">
              <Icon name="search" size={24} />
            </div>
            <div className="text-base font-bold text-ink">No matching products found</div>
            <p className="mt-1 text-xs text-ink/65 max-w-[360px] mx-auto">
              {query ? `No tools match "${query}". Try searching for another keyword or clear filters.` : "Create active products in the admin panel to populate this catalogue."}
            </p>
          </div>
        ) : (
          <div className="grid gap-8 [grid-template-columns:repeat(auto-fit,minmax(min(320px,100%),1fr))]">
            {visible.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        )}
        <p className="mt-10 text-xs font-normal leading-relaxed text-ink/65 border-t border-ink/10 pt-6">
          * All prices are quoted in ₹ INR. Monthly subscriptions renew every month and can be cancelled anytime before renewal. One-time licenses provide perpetual access. License keys are issued automatically upon Razorpay payment verification.
        </p>
      </div>
    </>
  );
}
