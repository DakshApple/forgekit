"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Icon } from "@/components/icons";
import { Logo } from "@/components/logo";
import { ButtonLink } from "@/components/ui";

const links = [
  { href: "/products", label: "Products" },
  { href: "/#how", label: "How it works" },
  { href: "/#terms", label: "Pricing and refunds" },
  { href: "/#faq", label: "FAQ" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-ink/10 bg-paper/95 backdrop-blur">
      <div className="wrap flex min-h-[72px] items-center justify-between">
        <Logo />
        <nav className="hidden items-center gap-8 text-sm md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={
                pathname.startsWith("/products") && l.href === "/products"
                  ? "font-medium"
                  : "text-ink/80 hover:text-ink"
              }
            >
              {l.label}
            </Link>
          ))}
          <ButtonLink href="/products" size="sm">
            Browse products
          </ButtonLink>
        </nav>
        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-ink/25 md:hidden"
        >
          <Icon name={open ? "close" : "menu"} size={20} />
        </button>
      </div>
      {open && (
        <nav className="border-t border-ink/10 bg-paper md:hidden">
          <div className="wrap flex flex-col py-2">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="border-b border-ink/10 py-4 text-[15px]"
              >
                {l.label}
              </Link>
            ))}
            <div className="py-4">
              <ButtonLink href="/products" className="w-full">
                Browse products
              </ButtonLink>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}
