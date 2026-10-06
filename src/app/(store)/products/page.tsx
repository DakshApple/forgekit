import type { Metadata } from "next";
import { ProductBrowser } from "@/components/store/product-browser";
import { getProducts } from "@/lib/data";



export const metadata: Metadata = {
  title: "Products",
  description: "Small tools for everyday business. Fixed prices, license key by email.",
};

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ billing?: string }>;
}) {
  const { billing } = await searchParams;
  const products = await getProducts();
  const initial = billing === "monthly" || billing === "one-time" ? billing : "all";

  return (
    <>
      <section className="relative overflow-hidden pt-12 pb-14 border-b border-ink/10">
        <div className="pointer-events-none absolute -top-20 left-1/2 -z-10 h-[400px] w-[700px] -translate-x-1/2 rounded-full bg-gradient-to-tr from-sky-500/10 via-blue-600/5 to-transparent blur-3xl opacity-75" />
        <div className="wrap">
          <div className="eyebrow inline-flex items-center gap-2 rounded-full border border-sky-500/20 bg-sky-500/5 px-3 py-1 text-xs font-semibold text-sky-950">
            <span className="h-1.5 w-1.5 rounded-full bg-sky-600" />
            CATALOGUE
          </div>
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl md:text-5xl">
            Software suite for everyday business
          </h1>
          <p className="lead mt-3.5 max-w-[620px] text-base text-ink/75">
            {products.length === 0
              ? "No live products loaded yet. Create your products in the admin panel to display them here."
              : `${products.length} active tools available. Fixed prices in ₹ INR. Select a plan and receive your license key instantly by email.`}
          </p>
        </div>
      </section>
      <ProductBrowser products={products} initialFilter={initial} />
    </>
  );
}
