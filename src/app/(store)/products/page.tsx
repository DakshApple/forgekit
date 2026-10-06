import type { Metadata } from "next";
import { ProductBrowser } from "@/components/store/product-browser";
import { RevealObserver } from "@/components/site/reveal-observer";
import { Reveal } from "@/components/site/reveal";
import { getProducts } from "@/lib/data";

export const metadata: Metadata = {
  title: "Products",
  description: "Small tools for everyday business. Fixed prices, license key by email.",
};

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <>
      <RevealObserver />
      <section className="relative overflow-hidden border-b border-ink/[0.06] pt-32 pb-16">
        <div className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[600px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(59_130_246/0.1),transparent)] mix-blend-plus-lighter" />
        <div className="wrap relative">
          <Reveal delay={0}>
            <div className="eyebrow inline-flex items-center gap-2 rounded-full border border-sapphire-500/20 bg-sapphire-500/10 px-3 py-1 text-[11px] font-semibold tracking-wider uppercase text-sapphire-600 dark:text-sapphire-400">
              <span className="h-1.5 w-1.5 rounded-full bg-sapphire-500" />
              Catalogue
            </div>
          </Reveal>
          <Reveal delay={60}>
            <h1 className="title mt-5 text-ink">Useful products for your work.</h1>
          </Reveal>
          <Reveal delay={120}>
            <p className="mt-4 max-w-[640px] text-[17px] leading-[1.6] text-ink/70">
              {products.length === 0
                ? "No live products loaded yet. Create your products in the admin panel to display them here."
                : `${products.length} active tools available. Fixed prices in ₹ INR. Select a plan and receive your license key instantly by email.`}
            </p>
          </Reveal>
        </div>
      </section>
      <ProductBrowser products={products} />
    </>
  );
}
