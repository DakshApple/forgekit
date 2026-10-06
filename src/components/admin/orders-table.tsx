"use client";

import { Pager, SearchBox, Tabs, TableShell } from "@/components/admin/page-header";
import { useListNav } from "@/components/admin/use-list-nav";
import { StatusChip } from "@/components/ui";
import { formatInr } from "@/lib/format";
import type { Order, OrderStatus } from "@/lib/types";

type Tab = "all" | OrderStatus;
const cols = "grid grid-cols-[90px_70px_minmax(200px,1.4fr)_110px_90px_150px_100px_160px] gap-4";

export function OrdersTable({
  orders,
  total,
  pageSize,
  counts,
}: {
  orders: Order[];
  total: number;
  pageSize: number;
  counts: Record<string, number>;
}) {
  const { q, setQ, status, page, push } = useListNav();
  const tab = (["paid", "pending", "failed", "refunded"].includes(status) ? status : "all") as Tab;
  const all = Object.values(counts).reduce((a, b) => a + b, 0);

  return (
    <>
      <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
        <Tabs
          value={tab}
          onChange={(t) => push({ status: t === "all" ? undefined : t, page: undefined })}
          tabs={[
            { id: "all", label: "All", count: all },
            { id: "paid", label: "Paid", count: counts.paid ?? 0 },
            { id: "pending", label: "Pending", count: counts.pending ?? 0 },
            { id: "failed", label: "Failed", count: counts.failed ?? 0 },
            { id: "refunded", label: "Refunded", count: counts.refunded ?? 0 },
          ]}
        />
        <SearchBox value={q} onChange={setQ} placeholder="Search order, email or payment id" />
      </div>

      <div className="mt-6">
        <TableShell minWidth={1020}>
          <div className={`${cols} px-6 py-3 text-xs font-medium text-ink/60`}>
            <span>Order</span><span>Date</span><span>Customer</span><span>Product</span><span>Amount</span><span>Razorpay id</span><span>Status</span><span>License</span>
          </div>
          {orders.map((o) => (
            <div key={o.id} className={`${cols} items-center border-t border-ink/10 px-6 py-4 text-sm hover:bg-tint`}>
              <span className="font-medium">{o.id}</span>
              <span>{o.date}</span>
              <span>
                <span className="block font-medium">{o.customerName}</span>
                <span className="block text-[13px] font-light text-ink/65">{o.customerEmail}</span>
              </span>
              <span>{o.productName}</span>
              <span className="font-bold">{formatInr(o.amountInr)}</span>
              <span className="text-[13px] font-light">{o.razorpayId || "Awaiting payment"}</span>
              <span><StatusChip status={o.status} /></span>
              <span className="text-[13px] font-medium tracking-[0.03em]">{o.licenseKey ?? "None"}</span>
            </div>
          ))}
          {orders.length === 0 && (
            <div className="border-t border-ink/10 px-6 py-10 text-center text-sm text-ink/65">No orders match.</div>
          )}
          <Pager
            page={page}
            pageSize={pageSize}
            total={total}
            shown={orders.length}
            noun="orders"
            onPage={(p) => push({ page: p > 1 ? String(p) : undefined })}
          />
        </TableShell>
      </div>
    </>
  );
}
