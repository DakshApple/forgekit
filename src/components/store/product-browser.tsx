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
              className={`inline-flex h-10 items-center rounded-full border px-[18px] text-sm font-medium transition ${
                filter === c.id
                  ? "border-ink bg-ink text-paper"
                  : "border-ink/25 bg-paper hover:bg-tint"
              }`}
            >
              {c.label} {counts[c.id]}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap gap-3">
          <label className="flex h-10 min-w-[240px] items-center gap-2.5 rounded-lg border border-ink/25 px-3.5 focus-within:border-ink">
            <Icon name="search" size={16} />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products"
              aria-label="Search products"
              className="w-full bg-transparent text-sm outline-none placeholder:text-ink/40"
            />
          </label>
          <label className="flex h-10 items-center gap-2 rounded-lg border border-ink/25 px-3.5 text-sm font-medium">
            <span className="sr-only">Sort products</span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as Sort)}
              className="bg-transparent outline-none"
            >
              <option value="newest">Sort: Newest</option>
              <option value="price-low">Price: low to high</option>
              <option value="price-high">Price: high to low</option>
              <option value="name">Name</option>
            </select>
          </label>
        </div>
      </div>

      <div className="wrap pb-16 pt-6">
        {visible.length === 0 ? (
          <div className="card p-10 text-center text-[15px] text-ink/70">
            No products match that search.
          </div>
        ) : (
          <div className="grid gap-6 [grid-template-columns:repeat(auto-fit,minmax(min(320px,100%),1fr))]">
            {visible.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        )}
        <p className="mt-8 text-[13px] font-light leading-[22px] text-ink/70">
          All prices in INR. Monthly licenses renew every month and can be
          stopped before renewal. One-time licenses are paid once. Your key is
          emailed when payment is verified. Screens shown with sample data.
        </p>
      </div>
    </>
  );
}
