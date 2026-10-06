import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import type { LicenseStatus, OrderStatus } from "@/lib/types";

type Variant = "primary" | "secondary" | "inverse" | "ghost-inverse";

const base =
  "inline-flex items-center justify-center gap-2.5 whitespace-nowrap rounded-lg border text-[15px] font-medium transition disabled:cursor-not-allowed disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary: "border-ink bg-ink text-paper hover:bg-ink/85",
  secondary: "border-ink/25 bg-paper text-ink hover:bg-tint",
  inverse: "border-paper bg-paper text-ink hover:bg-paper/90",
  "ghost-inverse": "border-paper/40 bg-transparent text-paper hover:bg-paper/10",
};

const sizes = {
  sm: "h-10 px-[18px] text-sm",
  md: "h-12 px-6",
  lg: "h-[52px] px-6 text-base",
};

type Size = keyof typeof sizes;

export function ButtonLink({
  href,
  variant = "primary",
  size = "md",
  className = "",
  children,
}: {
  href: string;
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
    </Link>
  );
}

export function Button({
  variant = "primary",
  size = "md",
  className = "",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
}) {
  return (
    <button
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    />
  );
}

export function Tag({
  children,
  solid = false,
}: {
  children: ReactNode;
  solid?: boolean;
}) {
  return (
    <span
      className={`inline-flex h-[22px] items-center rounded-md border px-2 text-[11px] font-medium ${
        solid ? "border-ink bg-ink text-paper" : "border-ink/25"
      }`}
    >
      {children}
    </span>
  );
}

/**
 * Status chips read without color: filled, outlined, dashed with strike, hatched.
 */
export function StatusChip({
  status,
}: {
  status: LicenseStatus | OrderStatus;
}) {
  const style: Record<string, string> = {
    active: "border-ink bg-ink text-paper",
    paid: "border-ink bg-ink text-paper",
    expired: "border-ink bg-paper text-ink",
    pending: "border-ink bg-paper text-ink",
    revoked: "border-dashed border-ink bg-paper text-ink/70 line-through",
    failed: "border-dashed border-ink bg-paper text-ink/70 line-through",
    refunded:
      "border-ink text-ink bg-[repeating-linear-gradient(45deg,transparent_0_4px,rgba(10,10,10,0.14)_4px_6px)]",
  };
  return (
    <span
      className={`inline-flex h-[26px] items-center whitespace-nowrap rounded-md border px-3 text-xs font-medium capitalize leading-none ${style[status]}`}
    >
      {status}
    </span>
  );
}

export function Field({
  label,
  htmlFor,
  hint,
  children,
}: {
  label: string;
  htmlFor: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="label">
        {label}
      </label>
      {children}
      {hint && (
        <p className="mt-2 text-xs font-light leading-[18px] text-ink/65">
          {hint}
        </p>
      )}
    </div>
  );
}
