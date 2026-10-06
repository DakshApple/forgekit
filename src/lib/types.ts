export type BillingType = "monthly" | "one-time";

export type Plan = {
  id: string;
  type: BillingType;
  /** Price in INR, whole rupees. */
  priceInr: number;
};

export type PreviewRow = { label: string; value: string };

export type Product = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  icon: "invoice" | "calendar" | "star" | "box" | "quote" | "user-plus";
  plans: Plan[];
  features: string[];
  /** Mini app window shown on cards and the product page (sample data). */
  preview: { title: string; rows: PreviewRow[] };
  status: "live" | "draft";
  updatedAt: string;
  /** Where buyers open the tool. Null until the founder sets it. */
  accessUrl: string | null;
  /** License key prefix, 2 to 6 capital letters. */
  keyPrefix: string;
  trialDays: number;
};

export type OrderStatus = "paid" | "pending" | "failed" | "refunded";
export type LicenseStatus = "active" | "expired" | "revoked";

export type Order = {
  id: string;
  date: string;
  customerEmail: string;
  customerName: string;
  productSlug: string;
  productName: string;
  planType: BillingType;
  amountInr: number;
  razorpayId: string;
  status: OrderStatus;
  licenseKey: string | null;
};

export type License = {
  key: string;
  productSlug: string;
  productName: string;
  planType: BillingType;
  customerEmail: string;
  customerName: string;
  orderId: string;
  status: LicenseStatus;
  issued: string;
  /** null for one-time licenses that never expire. */
  endDate: string | null;
};

export type LicenseEvent = {
  at: string;
  text: string;
};

export type Customer = {
  email: string;
  name: string;
  business?: string;
  phone?: string;
  orders: number;
  spentInr: number;
  activeKeys: number;
  lastOrder: string;
  firstOrder: string;
};
