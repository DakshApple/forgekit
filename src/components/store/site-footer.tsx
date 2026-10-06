import Link from "next/link";
import { Logo } from "@/components/logo";
import { site } from "@/lib/site";

function Col({
  title,
  items,
}: {
  title: string;
  items: { label: string; href: string }[];
}) {
  return (
    <div className="min-w-[140px]">
      <div className="text-[13px] font-bold">{title}</div>
      {items.map((i) => (
        <Link
          key={i.label}
          href={i.href}
          className="mt-3 block text-sm text-ink/70 hover:text-ink"
        >
          {i.label}
        </Link>
      ))}
    </div>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-ink/10 bg-wash">
      <div className="wrap flex flex-wrap justify-between gap-x-16 gap-y-10 pb-8 pt-14">
        <div className="max-w-[340px] flex-1 basis-[280px]">
          <Logo />
          <p className="mt-5 text-sm font-light leading-6 text-ink/70">
            Small software for small businesses. Fixed prices, license key by
            email.
          </p>
          <p className="mt-4 text-[13px] font-light leading-[22px] text-ink/65">
            A product of {site.company}
            <br />
            {site.location}
          </p>
        </div>
        <Col
          title="Shop"
          items={[
            { label: "All products", href: "/products" },
            { label: "Monthly plans", href: "/products?billing=monthly" },
            { label: "One-time", href: "/products?billing=one-time" },
          ]}
        />
        <Col
          title="Help"
          items={[
            { label: "How it works", href: "/#how" },
            { label: "FAQ", href: "/#faq" },
            { label: "Contact support", href: `mailto:${site.supportEmail}` },
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
        <div className="min-w-[200px]">
          <div className="text-[13px] font-bold">Contact</div>
          <a
            href={`mailto:${site.supportEmail}`}
            className="mt-3 block text-sm text-ink/70 hover:text-ink"
          >
            {site.supportEmail}
          </a>
          <div className="mt-3 text-sm text-ink/70">{site.supportHours}</div>
        </div>
      </div>
      <div className="wrap pb-9">
        <div className="flex flex-wrap justify-between gap-3 border-t border-ink/10 pt-6 text-xs text-ink/60">
          <span>
            {new Date().getFullYear()} {site.company}. All rights reserved.
          </span>
          <span>Prices in INR. Payments processed by Razorpay.</span>
        </div>
      </div>
    </footer>
  );
}
