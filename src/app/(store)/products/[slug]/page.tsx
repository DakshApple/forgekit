import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AppWindow } from "@/components/app-window";
import { Icon } from "@/components/icons";
import { ProductCard } from "@/components/product-card";
import { PurchaseCard } from "@/components/store/purchase-card";
import { RevealObserver } from "@/components/site/reveal-observer";
import { Reveal } from "@/components/site/reveal";
import { getProduct, getProducts } from "@/lib/data";
import { site } from "@/lib/site";
import { getAdmin } from "@/server/auth";

type Params = { slug: string };

export const revalidate = 60;

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
  const admin = await getAdmin();
  if (!product || (product.status !== "live" && !admin)) notFound();

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
      <RevealObserver />
      
      {/* Background elements */}
      <div className="pointer-events-none fixed inset-0 -z-10 bg-wash/30" />
      <div className="pointer-events-none absolute left-0 top-0 -z-10 h-[800px] w-full bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(59,130,246,0.08),transparent)]" />
      
      <div className="wrap pt-[96px] text-[13px] font-medium tracking-wide text-ink/50">
        <Link href="/products" className="transition-colors hover:text-ink">Products</Link>
        <span className="mx-2">/</span>
        <span className="text-ink">{product.name}</span>
      </div>

      <section>
        <div className="wrap flex flex-wrap items-start gap-12 pb-24 pt-8 lg:gap-20">
          <div className="min-w-0 flex-1 basis-[580px]">
            <Reveal delay={0}>
              <div className="inline-flex items-center rounded-full border border-ink/[0.08] bg-paper px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-ink/70 shadow-sm">
                {billingTags}
              </div>
            </Reveal>
            <Reveal delay={60}>
              <h1 className="mt-5 text-[40px] font-bold leading-[1.08] tracking-[-0.03em] text-ink md:text-[56px]">
                {product.name}
              </h1>
            </Reveal>
            <Reveal delay={120}>
              <p className="mt-6 max-w-[600px] text-[18px] leading-[1.6] text-ink/70">
                {product.description}
              </p>
            </Reveal>

            <Reveal delay={180} className="mt-12 overflow-hidden rounded-[20px] border border-ink/[0.08] bg-wash px-6 pt-10 shadow-sm md:px-12 md:pt-12">
              <AppWindow product={product} className="rounded-b-none border-b-0 shadow-2xl" />
            </Reveal>
            <p className="mt-4 text-[13px] text-ink/50">Screens shown with sample data.</p>

            <Reveal delay={240} className="mt-20">
              <h2 className="text-[24px] font-bold tracking-[-0.02em] text-ink">What it does</h2>
              <ul className="mt-6 flex flex-col gap-4">
                {product.features.map((f) => (
                  <li key={f} className="flex gap-4 border-b border-ink/[0.06] pb-4 text-[16px] leading-[1.6] text-ink/80 last:border-none">
                    <Icon name="check" size={20} className="mt-[3px] flex-none text-sapphire-500" />
                    {f}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={300} className="mt-20">
              <h2 className="text-[24px] font-bold tracking-[-0.02em] text-ink">What is included</h2>
              <div className="mt-8 grid gap-4 [grid-template-columns:repeat(auto-fit,minmax(min(240px,100%),1fr))]">
                {[
                  ["License key", "Emailed as soon as payment is verified."],
                  ["Access link", "Opens the tool. Enter your key once."],
                  ["Email support", `${site.supportEmail}, with your order number.`],
                ].map(([t, b]) => (
                  <div key={t} className="rounded-2xl border border-ink/[0.08] bg-paper/60 p-6 shadow-sm backdrop-blur-md">
                    <div className="text-[15px] font-semibold text-ink">{t}</div>
                    <div className="mt-2 text-[14px] leading-[1.6] text-ink/65">{b}</div>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={360} className="mt-20">
              <h2 className="text-[24px] font-bold tracking-[-0.02em] text-ink">Product details</h2>
              <dl className="mt-8 overflow-hidden rounded-2xl border border-ink/[0.08] bg-paper/60 shadow-sm backdrop-blur-md">
                {details.map(([k, v], i) => (
                  <div key={k} className={`flex justify-between gap-4 px-6 py-4 text-[14px] ${i ? "border-t border-ink/[0.06]" : ""}`}>
                    <dt className="font-medium text-ink/60">{k}</dt>
                    <dd className="font-semibold text-ink text-right">{v}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>

          <Reveal delay={240} className="w-full flex-none md:sticky md:top-32 md:w-[420px]">
            <PurchaseCard product={product} />
          </Reveal>
        </div>
      </section>

      <section className="border-t border-ink/[0.06] bg-wash/50">
        <div className="wrap pb-24 pt-20">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-5">
            <h2 className="text-[28px] font-bold tracking-[-0.03em] text-ink">More tools</h2>
            <Link href="/products" className="group flex items-center gap-1.5 text-[15px] font-medium text-ink transition-colors hover:text-sapphire-600 dark:hover:text-sapphire-400">
              View all products
              <Icon name="arrow" size={14} strokeWidth={2.5} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:gap-8">
            {related.map((p, i) => (
              <Reveal as="div" key={p.slug} delay={i * 60}>
                <ProductCard product={p} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
