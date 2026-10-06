import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader, TableShell } from "@/components/admin/page-header";
import { StatusChip } from "@/components/ui";
import { formatInr } from "@/lib/format";
import { getDashboard, listOrders } from "@/server/admin-queries";

export const metadata: Metadata = { title: "Admin dashboard" };

export default async function DashboardPage() {
  const [d, recent] = await Promise.all([getDashboard(), listOrders({ q: "", status: "", page: 1 })]);
  const orders = recent.rows;
  const weeks = d.weeks;
  const max = Math.max(1, ...weeks.map((w) => w.value));
  const count = (s: "active" | "expired" | "revoked") => d.licenses[s];
  const total = Math.max(1, d.licenses.active + d.licenses.expired + d.licenses.revoked);
  const o = d.orders30d;
  const change =
    d.revenuePrev30d > 0
      ? Math.round(((d.revenue30d - d.revenuePrev30d) / d.revenuePrev30d) * 100)
      : null;

  const kpis = [
    {
      label: "Revenue, last 30 days",
      value: formatInr(d.revenue30d),
      note:
        change === null
          ? "No revenue in the 30 days before"
          : `${change >= 0 ? "Up" : "Down"} ${Math.abs(change)}% on the month before`,
    },
    {
      label: "Orders",
      value: String(o.paid + o.pending + o.failed + o.refunded),
      note: `${o.paid} paid, ${o.failed} failed, ${o.refunded} refunded`,
    },
    { label: "Active licenses", value: String(d.licenses.active), note: `${d.expiring7d} expire this week` },
    { label: "New customers", value: String(d.newCustomers30d), note: "In the last 30 days" },
  ];

  return (
    <>
      <PageHeader title="Dashboard" description="What sold, what is active, what needs a look." />

      <div className="mt-8 grid gap-4 [grid-template-columns:repeat(auto-fit,minmax(min(240px,100%),1fr))]">
        {kpis.map((k) => (
          <div key={k.label} className="card p-6">
            <div className="text-[13px] font-medium text-ink/65">{k.label}</div>
            <div className="mt-3 text-[34px] font-bold leading-10 tracking-[-0.03em]">{k.value}</div>
            <div className="mt-2 text-xs font-light text-ink/65">{k.note}</div>
          </div>
        ))}
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1.6fr_1fr]">
        <div className="card p-6">
          <div className="text-base font-bold">Revenue by week</div>
          <div className="mt-6 flex h-[220px] items-end gap-4 border-b border-ink">
            {weeks.map((w) => (
              <div key={w.label} className="flex flex-1 flex-col items-center justify-end gap-2">
                <span className="text-xs font-medium">{formatInr(w.value)}</span>
                <div className="w-full rounded-t-md bg-ink" style={{ height: `${(w.value / max) * 160}px` }} />
              </div>
            ))}
          </div>
          <div className="mt-2 flex gap-4">
            {weeks.map((w) => (
              <div key={w.label} className="flex-1 text-center text-xs text-ink/65">{w.label}</div>
            ))}
          </div>
        </div>

        <div className="card p-6">
          <div className="text-base font-bold">License status</div>
          <div className="mt-6 flex h-4 overflow-hidden rounded-full border border-ink">
            <div className="bg-ink" style={{ width: `${(count("active") / total) * 100}%` }} />
            <div
              className="bg-[repeating-linear-gradient(45deg,transparent_0_4px,rgba(10,10,10,0.5)_4px_6px)]"
              style={{ width: `${(count("expired") / total) * 100}%` }}
            />
            <div className="bg-paper" style={{ width: `${(count("revoked") / total) * 100}%` }} />
          </div>
          <ul className="mt-6 space-y-3 text-sm">
            {(["active", "expired", "revoked"] as const).map((s) => (
              <li key={s} className="flex items-center justify-between gap-3">
                <StatusChip status={s} />
                <span className="font-medium">{count(s)}</span>
              </li>
            ))}
          </ul>
          <Link href="/admin/licenses" className="mt-6 inline-block text-sm font-medium underline underline-offset-4">
            Open license manager
          </Link>
        </div>
      </div>

      <div className="mt-6">
        <div className="mb-4 flex items-center justify-between">
          <div className="text-base font-bold">Recent orders</div>
          <Link href="/admin/orders" className="text-sm font-medium underline underline-offset-4">All orders</Link>
        </div>
        <TableShell minWidth={720}>
          <div className="grid grid-cols-[90px_1.4fr_1fr_90px_100px] gap-4 px-6 py-3 text-xs font-medium text-ink/60">
            <span>Order</span><span>Customer</span><span>Product</span><span>Amount</span><span>Status</span>
          </div>
          {orders.slice(0, 5).map((o) => (
            <div key={o.id} className="grid grid-cols-[90px_1.4fr_1fr_90px_100px] items-center gap-4 border-t border-ink/10 px-6 py-4 text-sm hover:bg-tint">
              <span className="font-medium">{o.id}</span>
              <span>
                <span className="block font-medium">{o.customerName}</span>
                <span className="block text-[13px] font-light text-ink/65">{o.customerEmail}</span>
              </span>
              <span>{o.productName}</span>
              <span className="font-bold">{formatInr(o.amountInr)}</span>
              <span><StatusChip status={o.status} /></span>
            </div>
          ))}
        </TableShell>
      </div>
    </>
  );
}
