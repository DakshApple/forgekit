"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { Icon, type IconName } from "@/components/icons";
import { Logo } from "@/components/logo";

const nav: { href: string; label: string; icon: IconName }[] = [
  { href: "/admin/dashboard", label: "Dashboard", icon: "dashboard" },
  { href: "/admin/products", label: "Products", icon: "box" },
  { href: "/admin/licenses", label: "Licenses", icon: "key" },
  { href: "/admin/orders", label: "Orders", icon: "invoice" },
  { href: "/admin/customers", label: "Customers", icon: "users" },
];

function Sidebar({ onNavigate, email }: { onNavigate?: () => void; email: string }) {
  const pathname = usePathname();
  const router = useRouter();

  async function signOut() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.replace("/admin/login");
    router.refresh();
  }
  return (
    <div className="flex h-full flex-col justify-between gap-10 bg-ink px-5 py-7 text-paper">
      <div>
        <div className="mb-10 ml-4">
          <Logo variant="white" width={104} href="/admin/dashboard" />
        </div>
        <div className="mb-3 ml-4 text-xs font-medium text-paper/50">Manage</div>
        <nav className="flex flex-col gap-1">
          {nav.map((n) => {
            const on = pathname.startsWith(n.href);
            return (
              <Link
                key={n.href}
                href={n.href}
                onClick={onNavigate}
                aria-current={on ? "page" : undefined}
                className={`flex h-12 items-center gap-3.5 rounded-lg px-4 text-sm font-medium transition ${
                  on ? "bg-paper text-ink" : "text-paper/70 hover:bg-paper/10 hover:text-paper"
                }`}
              >
                <Icon name={n.icon} size={20} />
                {n.label}
              </Link>
            );
          })}
        </nav>
      </div>
      <div className="border-t border-paper/20 px-4 pt-5">
        <div className="break-all text-[13px] font-medium leading-5">{email}</div>
        <button
          type="button"
          onClick={signOut}
          className="mt-1.5 inline-flex items-center gap-2 text-[13px] text-paper/70 hover:text-paper"
        >
          <Icon name="logout" size={14} /> Sign out
        </button>
      </div>
    </div>
  );
}

export function AdminShell({ children, email }: { children: React.ReactNode; email: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen lg:flex">
      {/* desktop sidebar */}
      <aside className="sticky top-0 hidden h-screen w-[248px] flex-none lg:block">
        <Sidebar email={email} />
      </aside>

      {/* mobile top bar */}
      <div className="sticky top-0 z-30 flex h-16 items-center justify-between bg-ink px-5 text-paper lg:hidden">
        <Logo variant="white" width={92} href="/admin/dashboard" />
        <button
          type="button"
          aria-label="Open menu"
          onClick={() => setOpen(true)}
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-paper/30"
        >
          <Icon name="menu" size={20} />
        </button>
      </div>
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            aria-label="Close menu"
            className="absolute inset-0 bg-ink/50"
            onClick={() => setOpen(false)}
          />
          <div className="absolute inset-y-0 left-0 w-[272px] max-w-[85%]">
            <Sidebar email={email} onNavigate={() => setOpen(false)} />
          </div>
        </div>
      )}

      <main className="min-w-0 flex-1 px-5 pb-20 pt-8 md:px-10 lg:px-12 lg:pt-10">
        {children}
      </main>
    </div>
  );
}
