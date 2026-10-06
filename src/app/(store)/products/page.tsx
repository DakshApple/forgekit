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
      <section className="border-b border-ink/10 bg-wash">
        <div className="wrap pb-14 pt-14 md:pt-16">
          <div className="eyebrow">Products</div>
          <h1 className="mt-3.5 text-[34px] font-bold leading-[1.08] tracking-tightest md:text-5xl">
            Small tools for everyday business
          </h1>
          <p className="lead mt-4 max-w-[600px]">
            {products.length} tools today. Every price is fixed and shown on the
            card. Pay monthly or once, and get your license key by email.
          </p>
        </div>
      </section>
      <ProductBrowser products={products} initialFilter={initial} />
    </>
  );
}
