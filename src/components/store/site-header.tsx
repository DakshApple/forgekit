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
  { href: "/#terms", label: "Pricing & Refunds" },
  { href: "/#faq", label: "FAQ" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-ink/10 bg-paper/70 backdrop-blur-xl shadow-sm transition-all">
      <div className="wrap flex min-h-[72px] items-center justify-between">
        <Logo />
        <nav className="hidden items-center gap-8 text-xs font-semibold uppercase tracking-wider md:flex">
          {links.map((l) => {
            const isActive = pathname.startsWith("/products") && l.href === "/products";
            return (
              <Link
                key={l.href}
                href={l.href}
                className={
                  isActive
                    ? "text-indigo-600 font-bold"
                    : "text-ink/70 hover:text-indigo-600 transition-colors"
                }
              >
                {l.label}
              </Link>
            );
          })}
          <ButtonLink href="/products" size="sm" className="shadow-sm hover:shadow-md transition-all">
            Browse products
          </ButtonLink>
        </nav>
        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-ink/15 bg-paper/80 backdrop-blur-md md:hidden"
        >
          <Icon name={open ? "close" : "menu"} size={20} />
        </button>
      </div>
      {open && (
        <nav className="border-t border-ink/10 bg-paper/95 backdrop-blur-xl md:hidden">
          <div className="wrap flex flex-col py-3">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="border-b border-ink/10 py-3.5 text-sm font-medium text-ink/80 hover:text-indigo-600"
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
