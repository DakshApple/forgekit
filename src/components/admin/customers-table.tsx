"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Pager, SearchBox, TableShell } from "@/components/admin/page-header";
import { useListNav } from "@/components/admin/use-list-nav";
import { Button, StatusChip } from "@/components/ui";
import { formatInr } from "@/lib/format";
import type { Customer, License, Order } from "@/lib/types";

const cols = "grid grid-cols-[minmax(200px,1.6fr)_56px_100px_90px_80px] gap-3";

export function CustomersTable({
  customers,
  orders,
  licenses,
  total,
  pageSize,
}: {
  customers: Customer[];
  orders: Order[];
  licenses: License[];
  total: number;
  pageSize: number;
}) {
  const { q, setQ, page, push } = useListNav();
  const [selectedEmail, setSelectedEmail] = useState(customers[0]?.email);
  const rows = customers;

  const selected = customers.find((c) => c.email === selectedEmail);
  const theirOrders = orders.filter((o) => o.customerEmail === selectedEmail);
  const theirLicenses = licenses.filter((l) => l.customerEmail === selectedEmail);

  return (
    <div className="mt-8 flex flex-wrap items-start gap-6">
      <div className="min-w-0 flex-1 basis-[520px]">
        <SearchBox value={q} onChange={setQ} placeholder="Search name, email or business" />
        <div className="mt-4">
          <TableShell minWidth={600}>
            <div className={`${cols} px-6 py-3 text-xs font-medium text-ink/60`}>
              <span>Customer</span><span>Orders</span><span>Spent</span><span>Active keys</span><span>Last order</span>
            </div>
            {rows.map((c) => {
              const on = c.email === selectedEmail;
              return (
                <button
                  key={c.email}
                  type="button"
                  onClick={() => setSelectedEmail(c.email)}
                  aria-pressed={on}
                  className={`${cols} w-full items-center border-t px-6 py-4 text-left text-sm transition ${
                    on ? "border-ink bg-ink text-paper" : "border-ink/10 hover:bg-tint"
                  }`}
                >
                  <span>
                    <span className="block font-medium">{c.name}</span>
                    <span className={`block text-[13px] font-light ${on ? "text-paper/70" : "text-ink/65"}`}>{c.email}</span>
                  </span>
                  <span>{c.orders}</span>
                  <span className="font-bold">{formatInr(c.spentInr)}</span>
                  <span>{c.activeKeys}</span>
                  <span>{c.lastOrder}</span>
                </button>
              );
            })}
            {rows.length === 0 && (
              <div className="border-t border-ink/10 px-6 py-10 text-center text-sm text-ink/65">No customers match.</div>
            )}
            <Pager page={page} pageSize={pageSize} total={total} shown={rows.length} noun="customers" onPage={(p) => push({ page: p > 1 ? String(p) : undefined })} />
          </TableShell>
        </div>
      </div>

      {selected && (
        <aside className="card w-full flex-none p-7 lg:w-[380px]">
          <div className="text-[13px] font-medium text-ink/65">Customer</div>
          <div className="mt-3 text-[28px] font-bold leading-8 tracking-[-0.03em]">{selected.name}</div>
          <div className="mt-1.5 break-all text-sm font-light text-ink/75">{selected.email}</div>

          <dl className="mt-5 text-sm">
            {[
              ["Business", selected.business ?? "Not given"],
              ["Phone", selected.phone ?? "Not given"],
              ["First order", selected.firstOrder],
              ["Total spent", formatInr(selected.spentInr)],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between gap-3 border-t border-ink/10 py-3.5">
                <dt className="font-light text-ink/70">{k}</dt>
                <dd className="text-right font-medium">{v}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-6 text-[13px] font-medium">Orders and keys</div>
          <ul className="mt-2">
            {theirOrders.length === 0 && <li className="py-3 text-sm text-ink/65">No orders yet.</li>}
            {theirOrders.map((o) => {
              const lic = theirLicenses.find((l) => l.orderId === o.id);
              return (
                <li key={o.id} className="flex items-center justify-between gap-3 border-t border-ink/10 py-3.5">
                  <span>
                    <span className="block text-sm font-medium">{o.id} · {o.productName}</span>
                    <span className="block text-xs font-light text-ink/65">{o.licenseKey ?? "No key issued"}</span>
                  </span>
                  {lic ? <StatusChip status={lic.status} /> : <StatusChip status={o.status} />}
                </li>
              );
            })}
          </ul>

          <div className="mt-6 flex flex-wrap gap-3">
            <Button type="button">Resend key email</Button>
            <Link href="/admin/licenses" className="inline-flex h-12 items-center rounded-lg border border-ink/25 px-6 text-[15px] font-medium hover:bg-tint">
              Open licenses
            </Link>
          </div>
        </aside>
      )}
    </div>
  );
}
