import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AppWindow } from "@/components/app-window";
import { Icon } from "@/components/icons";
import { ProductCard } from "@/components/product-card";
import { PurchaseCard } from "@/components/store/purchase-card";
import { Tag } from "@/components/ui";
import { getProduct, getProducts } from "@/lib/data";
import { site } from "@/lib/site";

type Params = { slug: string };

export const revalidate = 60;

// Pages are rendered on demand and cached, so builds do not need the database.
export async function generateStaticParams() {
  return [];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) return {};
  
  return { 
    title: product.name, 
    description: product.tagline,
    openGraph: {
      title: product.name,
      description: product.tagline,
      url: `/products/${slug}`,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: product.name,
      description: product.tagline,
    }
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product || product.status !== "live") notFound();

  const related = (await getProducts()).filter((p) => p.slug !== slug).slice(0, 3);
  const billingTags = product.plans.length > 1 ? "Monthly or one-time" : product.plans[0].type === "monthly" ? "Monthly" : "One-time";

  const details = [
    ["Made by", "Forgekit"],
    ["Works in", "Any modern browser"],
    ["Last updated", product.updatedAt],
    ["Refunds", `Within ${site.refundDays} days of purchase`],
  ];

  return (
    <>
      <div className="wrap pt-7 text-[13px] leading-5 text-ink/60">
        <Link href="/products" className="hover:text-ink">Products</Link>
        <span className="mx-2">/</span>
        <span className="font-medium text-ink">{product.name}</span>
      </div>

      <section>
        <div className="wrap flex flex-wrap items-start gap-14 pb-20 pt-8">
          <div className="min-w-0 flex-1 basis-[580px]">
            <div className="flex flex-wrap gap-2 opacity-0 animate-fade-in-up">
              <Tag>{billingTags}</Tag>
            </div>
            <h1 className="mt-5 text-[36px] font-bold leading-[1.08] tracking-tightest md:text-[52px] opacity-0 animate-fade-in-up-delay">
              {product.name}
            </h1>
            <p className="mt-5 max-w-[600px] text-[17px] font-light leading-8 text-ink/80 md:text-[19px] opacity-0 animate-fade-in-up-delay-2">
              {product.description}
            </p>

            <div className="mt-10 overflow-hidden rounded-2xl bg-tint px-5 pt-8 md:px-10 md:pt-10 opacity-0 animate-fade-in-up-delay-2">
              <div className="animate-float-idle">
                <AppWindow product={product} className="rounded-b-none border-b-0" />
              </div>
              <div className="h-8" />
            </div>
            <p className="mt-2.5 text-xs text-ink/55">Screens shown with sample data.</p>

            <div className="mt-14">
              <h2 className="text-[26px] font-bold leading-tight tracking-[-0.03em]">What it does</h2>
              <ul className="mt-3">
                {product.features.map((f) => (
                  <li key={f} className="flex gap-3.5 border-b border-ink/10 py-3.5 text-base font-light leading-[26px]">
                    <Icon name="check" size={20} strokeWidth={2.2} className="mt-[3px] flex-none" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-14">
              <h2 className="text-[26px] font-bold leading-tight tracking-[-0.03em]">What is included</h2>
              <div className="mt-6 grid gap-4 [grid-template-columns:repeat(auto-fit,minmax(min(200px,100%),1fr))]">
                {[
                  ["License key", "Emailed as soon as payment is verified."],
                  ["Access link", "Opens the tool. Enter your key once."],
                  ["Email support", `${site.supportEmail}, with your order number.`],
                ].map(([t, b]) => (
                  <div key={t} className="card p-[22px]">
                    <div className="text-base font-bold leading-6">{t}</div>
                    <div className="mt-1.5 text-sm font-light leading-[22px] text-ink/75">{b}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-14">
              <h2 className="text-[26px] font-bold leading-tight tracking-[-0.03em]">Product details</h2>
              <dl className="card mt-5 px-6 py-1">
                {details.map(([k, v], i) => (
                  <div key={k} className={`flex justify-between gap-4 py-4 text-sm ${i ? "border-t border-ink/10" : ""}`}>
                    <dt className="font-light text-ink/70">{k}</dt>
                    <dd className="font-medium">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>

          <aside className="w-full flex-none md:sticky md:top-24 md:w-[400px] opacity-0 animate-fade-in-up-delay">
            <PurchaseCard product={product} />
          </aside>
        </div>
      </section>

      <section className="border-t border-ink/10 bg-wash">
        <div className="wrap pb-24 pt-20">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-5">
            <h2 className="h2">More tools</h2>
            <Link href="/products" className="text-[15px] font-medium">View all products</Link>
          </div>
          <div className="grid gap-6 [grid-template-columns:repeat(auto-fit,minmax(min(280px,100%),1fr))]">
            {related.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
