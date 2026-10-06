"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * One IntersectionObserver for every [data-reveal] element on the page.
 * Mounted once in the store layout (~1 KB). Each element animates once.
 */
export function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    const show = (el: Element) => el.setAttribute("data-shown", "");
    const pending = () => document.querySelectorAll("[data-reveal]:not([data-shown])");

    if (!("IntersectionObserver" in window)) {
      pending().forEach(show);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            show(entry.target);
            io.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );

    const observeAll = () => pending().forEach((el) => io.observe(el));
    observeAll();

    // Pick up elements rendered later (filters, client navigation).
    let queued = false;
    const mo = new MutationObserver(() => {
      if (queued) return;
      queued = true;
      requestAnimationFrame(() => {
        queued = false;
        observeAll();
      });
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, [pathname]);

  return null;
}
