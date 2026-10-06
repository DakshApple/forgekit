"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Icon } from "@/components/icons";
import { Logo } from "@/components/logo";
import { ThemeToggle } from "./theme-toggle";

const links = [
  { href: "/products", label: "Products" },
  { href: "/#pricing", label: "Pricing" },
  { href: "/#how", label: "How it works" },
  { href: "/#faq", label: "Support" },
];

/** Floating centred glass pill. Gains blur + shadow and shrinks slightly after 40px. */
export function GlassNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let ticking = false;
    const update = () => {
      ticking = false;
      setScrolled(window.scrollY > 40);
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu on navigation and on Escape.
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const elevated = scrolled || open;

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:pt-4">
      <div
        className={`pointer-events-auto mx-auto w-full max-w-[920px] origin-top rounded-[28px] border transition-[transform,background-color,box-shadow,border-color] duration-300 ease-out ${
          elevated
            ? "scale-[0.985] border-ink/10 bg-paper/75 shadow-[0_8px_32px_-12px_rgb(0_0_0/0.18)] backdrop-blur-xl backdrop-saturate-150"
            : "border-ink/[0.06] bg-paper/50 backdrop-blur-md"
        }`}
      >
        <nav aria-label="Main" className="flex h-14 items-center justify-between gap-3 pl-5 pr-2">
          <Logo variant="auto" width={92} />

          <ul className="hidden items-center gap-1 md:flex">
            {links.map((l) => {
              const active = l.href === "/products" && pathname.startsWith("/products");
              return (
                <li key={l.href}>
                  <Link
                    id={`nav-${l.label.toLowerCase().replace(/\s+/g, "-")}`}
                    href={l.href}
                    aria-current={active ? "page" : undefined}
                    className={`rounded-full px-3.5 py-2 text-[14px] font-medium transition-colors duration-150 ${
                      active ? "bg-ink/[0.06] text-ink" : "text-ink/65 hover:text-ink"
                    }`}
                  >
                    {l.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-1">
            <ThemeToggle />
            <Link
              id="nav-cta"
              href="/products"
              className="hidden h-9 items-center gap-1.5 rounded-full bg-ink px-4 text-[14px] font-medium text-paper transition-[transform,opacity] duration-150 ease-out hover:-translate-y-px hover:opacity-90 sm:inline-flex"
            >
              Browse products
              <Icon name="arrow" size={14} strokeWidth={2.2} />
            </Link>
            <button
              type="button"
              id="nav-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((v) => !v)}
              className="flex h-9 w-9 items-center justify-center rounded-full text-ink/80 hover:bg-ink/[0.06] md:hidden"
            >
              <Icon name={open ? "close" : "menu"} size={18} />
            </button>
          </div>
        </nav>

        {open && (
          <div id="mobile-menu" className="border-t border-ink/[0.08] px-3 pb-3 pt-2 md:hidden">
            <ul className="flex flex-col">
              {links.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-between rounded-xl px-3 py-3 text-[15px] font-medium text-ink/80 hover:bg-ink/[0.04] hover:text-ink"
                  >
                    {l.label}
                    <Icon name="arrow" size={14} className="text-ink/40" />
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              href="/products"
              onClick={() => setOpen(false)}
              className="mt-2 flex h-11 items-center justify-center rounded-xl bg-ink text-[15px] font-medium text-paper"
            >
              Browse products
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
