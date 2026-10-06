import Link from "next/link";
import { Logo } from "@/components/logo";
import { site } from "@/lib/site";
import { ThemeToggle } from "../site/theme-toggle";

function Col({
  title,
  items,
}: {
  title: string;
  items: { label: string; href: string }[];
}) {
  return (
    <div className="min-w-[140px]">
      <div className="text-[13px] font-semibold tracking-wide text-ink">{title}</div>
      <ul className="mt-4 flex flex-col gap-3">
        {items.map((i) => (
          <li key={i.label}>
            <Link
              href={i.href}
              className="text-[14px] text-ink/60 transition-colors hover:text-ink"
            >
              {i.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-ink/[0.06] bg-wash/30 pb-10 pt-16 md:pb-16 md:pt-24">
      <div className="wrap flex flex-wrap justify-between gap-12 lg:gap-20">
        <div className="max-w-[320px]">
          <Logo variant="auto" width={110} />
          <p className="mt-5 text-[14px] leading-[1.6] text-ink/60">
            Small software for small businesses. Fixed prices, license key by email. Built independently in {site.location.split(",")[0]}.
          </p>
          <div className="mt-6">
            <ThemeToggle className="-ml-2" />
          </div>
        </div>
        
        <div className="flex flex-wrap gap-12 lg:gap-20">
          <Col
            title="Shop"
            items={[
              { label: "All products", href: "/products" },
              { label: "Monthly plans", href: "/products?billing=monthly" },
              { label: "One-time licenses", href: "/products?billing=one-time" },
            ]}
          />
          <Col
            title="Support"
            items={[
              { label: "How it works", href: "/#how" },
              { label: "FAQ", href: "/#faq" },
              { label: "Contact us", href: `mailto:${site.supportEmail}` },
            ]}
          />
          <Col
            title="Legal"
            items={[
              { label: "Terms of service", href: "/terms" },
              { label: "Privacy policy", href: "/privacy" },
              { label: "Refund policy", href: "/refunds" },
            ]}
          />
        </div>
      </div>

      <div className="wrap mt-16 md:mt-24">
        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-ink/[0.06] pt-8 text-[13px] text-ink/50">
          <p>
            &copy; {new Date().getFullYear()} {site.company}. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <span>Prices in INR.</span>
            <span>Payments processed by Razorpay.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
