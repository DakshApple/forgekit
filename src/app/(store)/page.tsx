import Link from "next/link";
import { Icon } from "@/components/icons";
import { ProductCard } from "@/components/product-card";
import { BentoGrid } from "@/components/site/bento-grid";
import { CtaSection } from "@/components/site/cta-section";
import { FaqAccordion } from "@/components/site/faq-accordion";
import { Hero } from "@/components/site/hero";
import { RevealObserver } from "@/components/site/reveal-observer";
import { Reveal } from "@/components/site/reveal";
import { SectionHeading } from "@/components/site/section-heading";
import { TrustStrip } from "@/components/site/trust-strip";
import { getProducts } from "@/lib/data";

export default async function HomePage() {
  const products = await getProducts();
  const featured = products.slice(0, 3);

  return (
    <div className="store-root">
      <RevealObserver />
      <Hero />
      <TrustStrip />

      <section className="section bg-paper">
        <div className="wrap">
          <SectionHeading
            kicker="Marketplace"
            title="Useful products for your work."
            body="Discover our collection of hand-crafted digital tools. Purchase instantly, with no complex setup or mandatory subscriptions."
          />

          <ul className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:gap-8">
            {featured.map((p, i) => (
              <Reveal as="li" key={p.slug} delay={i * 60}>
                <ProductCard product={p} />
              </Reveal>
            ))}
          </ul>

          <Reveal delay={featured.length * 60} className="mt-16 flex justify-center">
            <Link
              href="/products"
              className="group inline-flex h-12 items-center gap-2 rounded-[10px] bg-ink px-6 text-[15px] font-medium text-paper shadow-[0_8px_24px_-8px_rgba(0,0,0,0.2)] transition-[transform,box-shadow] duration-150 ease-out hover:-translate-y-0.5 hover:shadow-[0_14px_32px_-10px_rgba(0,0,0,0.3)] dark:shadow-[0_8px_24px_-8px_rgba(255,255,255,0.15)] dark:hover:shadow-[0_14px_32px_-10px_rgba(255,255,255,0.25)]"
            >
              Explore full marketplace
              <Icon name="arrow" size={16} strokeWidth={2.2} className="transition-transform duration-150 group-hover:translate-x-0.5" />
            </Link>
          </Reveal>
        </div>
      </section>

      <BentoGrid />
      <FaqAccordion />
      <CtaSection />
    </div>
  );
}
