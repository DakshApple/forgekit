import type { Product } from "@/lib/types";

/** A small app window drawn in CSS. Stands in for product screenshots (sample data). */
export function AppWindow({
  product,
  className = "",
}: {
  product: Product;
  className?: string;
}) {
  return (
    <div
      className={`overflow-hidden rounded-[10px] border border-ink/15 bg-paper shadow-float ${className}`}
    >
      <div className="flex h-8 items-center gap-1.5 border-b border-ink/10 bg-wash px-3">
        <i className="block h-2 w-2 rounded-full bg-ink/15" />
        <i className="block h-2 w-2 rounded-full bg-ink/15" />
        <i className="block h-2 w-2 rounded-full bg-ink/15" />
        <span className="ml-3 text-[11px] text-ink/50">{product.name}</span>
      </div>
      <div className="px-3.5 pb-1 pt-3 text-[13px] font-bold">
        {product.preview.title}
      </div>
      {product.preview.rows.map((r) => (
        <div
          key={r.label}
          className="flex items-center justify-between gap-3 border-t border-ink/10 px-3.5 py-2.5 text-xs leading-4"
        >
          <span>{r.label}</span>
          <span className="font-medium">{r.value}</span>
        </div>
      ))}
    </div>
  );
}
