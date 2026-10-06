"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

/** URL-driven list state (search, status tab, page). The server re-renders on change. */
export function useListNav() {
  const router = useRouter();
  const pathname = usePathname();
  const sp = useSearchParams();

  function href(patch: Record<string, string | undefined>) {
    const next = new URLSearchParams(sp.toString());
    for (const [k, v] of Object.entries(patch)) {
      if (v) next.set(k, v);
      else next.delete(k);
    }
    const qs = next.toString();
    return qs ? `${pathname}?${qs}` : pathname;
  }

  const push = (patch: Record<string, string | undefined>) => router.push(href(patch));
  const urlQuery = sp.get("q") ?? "";
  const status = sp.get("status") ?? "all";
  const page = Math.max(Number.parseInt(sp.get("page") ?? "1", 10) || 1, 1);

  // Debounced search box.
  const [q, setQ] = useState(urlQuery);
  const first = useRef(true);
  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    const t = setTimeout(() => {
      if (q.trim() !== urlQuery) router.replace(href({ q: q.trim() || undefined, page: undefined }));
    }, 350);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q]);

  return { q, setQ, status, page, push };
}
