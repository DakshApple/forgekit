import type { ReactNode } from "react";

export function PageHeader({
  title,
  description,
  actions,
}: {
  title: string;
  description?: string;
  actions?: ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-5">
      <div>
        <div className="eyebrow">Admin</div>
        <h1 className="mt-3 text-[34px] font-bold leading-[1.1] tracking-tightest md:text-[44px]">
          {title}
        </h1>
        {description && (
          <p className="mt-2.5 max-w-[560px] text-[15px] font-light leading-6 text-ink/70">
            {description}
          </p>
        )}
      </div>
      {actions && <div className="flex flex-wrap gap-3">{actions}</div>}
    </div>
  );
}

export function Tabs<T extends string>({
  tabs,
  value,
  onChange,
}: {
  tabs: { id: T; label: string; count?: number }[];
  value: T;
  onChange: (id: T) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2" role="tablist">
      {tabs.map((t) => (
        <button
          key={t.id}
          type="button"
          role="tab"
          aria-selected={value === t.id}
          onClick={() => onChange(t.id)}
          className={`inline-flex h-10 items-center gap-2 rounded-lg border px-4 text-sm font-medium transition ${
            value === t.id
              ? "border-ink bg-ink text-paper"
              : "border-ink/25 bg-paper hover:bg-tint"
          }`}
        >
          {t.label}
          {t.count !== undefined && (
            <span className="font-light">{t.count}</span>
          )}
        </button>
      ))}
    </div>
  );
}

export function SearchBox({
  value,
  onChange,
  placeholder,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
}) {
  return (
    <label className="flex h-10 min-w-[260px] items-center gap-2.5 rounded-lg border border-ink/25 px-3.5 focus-within:border-ink">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="11" cy="11" r="7" />
        <path d="M20 20l-4-4" />
      </svg>
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label={placeholder}
        className="w-full bg-transparent text-sm outline-none placeholder:text-ink/40"
      />
    </label>
  );
}

export function TableShell({
  minWidth,
  children,
}: {
  minWidth: number;
  children: ReactNode;
}) {
  return (
    <div className="card overflow-hidden">
      <div className="overflow-x-auto">
        <div style={{ minWidth }}>{children}</div>
      </div>
    </div>
  );
}

export function Pager({
  page,
  pageSize,
  total,
  shown,
  noun,
  onPage,
}: {
  page: number;
  pageSize: number;
  total: number;
  shown: number;
  noun: string;
  onPage: (page: number) => void;
}) {
  const from = shown === 0 ? 0 : (page - 1) * pageSize + 1;
  const to = (page - 1) * pageSize + shown;
  const hasPrev = page > 1;
  const hasNext = to < total;
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 border-t border-ink/10 px-6 py-4 text-[13px] text-ink/70">
      <span>{total === 0 ? `No ${noun}` : `Showing ${from} to ${to} of ${total} ${noun}`}</span>
      <span className="flex gap-2">
        <button type="button" disabled={!hasPrev} onClick={() => onPage(page - 1)} className="h-9 rounded-lg border border-ink/25 px-3.5 text-[13px] font-medium hover:bg-tint disabled:opacity-40">Previous</button>
        <button type="button" disabled={!hasNext} onClick={() => onPage(page + 1)} className="h-9 rounded-lg border border-ink bg-ink px-3.5 text-[13px] font-medium text-paper hover:bg-ink/85 disabled:opacity-40">Next</button>
      </span>
    </div>
  );
}
