"use client";

import { useEffect, useState } from "react";
import { Pager, SearchBox, Tabs, TableShell } from "@/components/admin/page-header";
import { useListNav } from "@/components/admin/use-list-nav";
import { Button, StatusChip } from "@/components/ui";
import { updateLicenseStatus } from "@/lib/api";
import type { License, LicenseEvent, LicenseStatus } from "@/lib/types";

type Tab = "all" | LicenseStatus;
const cols = "grid grid-cols-[minmax(150px,1.1fr)_96px_minmax(190px,1.5fr)_92px_92px] gap-3";
const statuses: LicenseStatus[] = ["active", "expired", "revoked"];

export function LicenseManager({
  initial,
  initialEvents,
  total,
  pageSize,
  counts,
}: {
  initial: License[];
  initialEvents: Record<string, LicenseEvent[]>;
  total: number;
  pageSize: number;
  counts: Record<string, number>;
}) {
  const [licenses, setLicenses] = useState(initial);
  const [events, setEvents] = useState(initialEvents);
  const { q, setQ, status: statusParam, page, push } = useListNav();
  const tab: Tab = (["active", "expired", "revoked"].includes(statusParam) ? statusParam : "all") as Tab;
  const [selectedKey, setSelectedKey] = useState(initial[0]?.key);
  const [saving, setSaving] = useState(false);

  // The server sends a new page whenever the URL changes.
  useEffect(() => {
    setLicenses(initial);
    setEvents(initialEvents);
    setSelectedKey((k) => (initial.some((l) => l.key === k) ? k : initial[0]?.key));
  }, [initial, initialEvents]);

  const count = (s: LicenseStatus) => counts[s] ?? 0;
  const allCount = Object.values(counts).reduce((a, b) => a + b, 0);
  const rows = licenses;

  const selected = licenses.find((l) => l.key === selectedKey);

  async function setStatus(status: LicenseStatus) {
    if (!selected || selected.status === status) return;
    setSaving(true);
    await updateLicenseStatus(selected.key, status);
    setLicenses((prev) => prev.map((l) => (l.key === selected.key ? { ...l, status } : l)));
    setEvents((prev) => ({
      ...prev,
      [selected.key]: [
        { at: "Just now", text: `Status changed from ${selected.status} to ${status} by admin` },
        ...(prev[selected.key] ?? []),
      ],
    }));
    setSaving(false);
  }

  return (
    <>
      <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
        <Tabs
          value={tab}
          onChange={(t) => push({ status: t === "all" ? undefined : t, page: undefined })}
          tabs={[
            { id: "all", label: "All", count: allCount },
            { id: "active", label: "Active", count: count("active") },
            { id: "expired", label: "Expired", count: count("expired") },
            { id: "revoked", label: "Revoked", count: count("revoked") },
          ]}
        />
        <SearchBox value={q} onChange={setQ} placeholder="Search key, email or name" />
      </div>

      <div className="mt-6 flex flex-wrap items-start gap-6">
        <div className="min-w-0 flex-1 basis-[520px]">
          <TableShell minWidth={640}>
            <div className={`${cols} px-6 py-3 text-xs font-medium text-ink/60`}>
              <span>Key</span><span>Product</span><span>Customer</span><span>Ends</span><span>Status</span>
            </div>
            {rows.map((l) => {
              const on = l.key === selectedKey;
              return (
                <button
                  key={l.key}
                  type="button"
                  onClick={() => setSelectedKey(l.key)}
                  aria-pressed={on}
                  className={`${cols} w-full items-center border-t px-6 py-4 text-left text-sm transition ${
                    on ? "border-ink bg-ink text-paper" : "border-ink/10 hover:bg-tint"
                  }`}
                >
                  <span className="text-[13px] font-medium tracking-[0.03em]">{l.key}</span>
                  <span>
                    {l.productName}
                    <span className={`block text-xs font-light ${on ? "text-paper/70" : "text-ink/60"}`}>
                      {l.planType === "monthly" ? "Monthly" : "One-time"}
                    </span>
                  </span>
                  <span className="min-w-0">
                    <span className="block font-medium">{l.customerName}</span>
                    <span className={`block truncate text-[13px] font-light ${on ? "text-paper/70" : "text-ink/65"}`}>{l.customerEmail}</span>
                  </span>
                  <span>{l.endDate ?? "Never"}</span>
                  <span>
                    {on ? (
                      <span className="inline-flex h-[26px] items-center rounded-md border border-paper px-3 text-xs font-medium capitalize">{l.status}</span>
                    ) : (
                      <StatusChip status={l.status} />
                    )}
                  </span>
                </button>
              );
            })}
            {rows.length === 0 && (
              <div className="border-t border-ink/10 px-6 py-10 text-center text-sm text-ink/65">No licenses match.</div>
            )}
            <Pager page={page} pageSize={pageSize} total={total} shown={rows.length} noun="licenses" onPage={(p) => push({ page: p > 1 ? String(p) : undefined })} />
          </TableShell>
        </div>

        {selected && (
          <aside className="card w-full flex-none p-7 lg:w-[380px]">
            <div className="text-[13px] font-medium text-ink/65">License</div>
            <div className="mt-3 break-all text-xl font-bold leading-7 tracking-[0.03em]">{selected.key}</div>
            <div className="mt-1.5 text-sm font-light text-ink/75">
              {selected.productName} · {selected.planType === "monthly" ? "Monthly" : "One-time"}
            </div>

            <dl className="mt-5 text-sm">
              {[
                ["Customer", selected.customerName],
                ["Email", selected.customerEmail],
                ["Order", selected.orderId],
                ["Issued", selected.issued],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between gap-3 border-t border-ink/10 py-3">
                  <dt className="font-light text-ink/70">{k}</dt>
                  <dd className="break-all text-right font-medium">{v}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-6 text-[13px] font-medium">Status</div>
            <div className="mt-2.5 grid grid-cols-3 overflow-hidden rounded-lg border border-ink" role="radiogroup" aria-label="License status">
              {statuses.map((s) => {
                const on = selected.status === s;
                return (
                  <button
                    key={s}
                    type="button"
                    role="radio"
                    aria-checked={on}
                    disabled={saving}
                    onClick={() => setStatus(s)}
                    className={`h-11 border-ink text-sm font-medium capitalize transition [&:not(:first-child)]:border-l disabled:opacity-60 ${
                      on ? "bg-ink text-paper" : "bg-paper hover:bg-tint"
                    }`}
                  >
                    {s}
                  </button>
                );
              })}
            </div>
            <p className="mt-2.5 text-xs font-light leading-[18px] text-ink/65">
              Revoked keys stop working straight away. Changes are logged below. Sample only, nothing is saved yet.
            </p>

            {selected.endDate && (
              <div className="mt-6">
                <label htmlFor="ends" className="label">Extend end date</label>
                <div className="flex gap-2">
                  <input id="ends" type="text" defaultValue={selected.endDate} className="input" />
                  <Button variant="secondary" type="button">Save</Button>
                </div>
              </div>
            )}

            <div className="mt-7 text-[13px] font-medium">Activity</div>
            <ul className="mt-3 space-y-3">
              {(events[selected.key] ?? [{ at: selected.issued, text: "Key issued after payment" }]).map((e, i) => (
                <li key={i} className="border-l border-ink pl-3.5 text-[13px] leading-5">
                  <span className="block text-ink/60">{e.at}</span>
                  {e.text}
                </li>
              ))}
            </ul>

            <Button variant="secondary" type="button" className="mt-6 w-full">Resend key email</Button>
          </aside>
        )}
      </div>
    </>
  );
}
