import "server-only";
import { db } from "./db";
import type { Customer, License, LicenseEvent, Order } from "@/lib/types";

export const PAGE_SIZE = 25;

export type Page<T> = { rows: T[]; total: number; page: number; pageSize: number };

const day = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", timeZone: "Asia/Kolkata" });
const dayYear = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "Asia/Kolkata" });
const dayTime = new Intl.DateTimeFormat("en-GB", {
  day: "numeric", month: "short", hour: "2-digit", minute: "2-digit", hour12: false, timeZone: "Asia/Kolkata",
});

const toRupees = (paise: number | string) => Number(paise) / 100;
const planType = (t: string): Order["planType"] => (t === "monthly" ? "monthly" : "one-time");

export function pageParams(raw: { page?: string; q?: string; status?: string }, allowed: readonly string[]) {
  const page = Math.min(Math.max(Number.parseInt(raw.page ?? "1", 10) || 1, 1), 10_000);
  const q = (raw.q ?? "").trim().slice(0, 100);
  const status = raw.status && allowed.includes(raw.status) ? raw.status : "";
  return { page, q, status };
}

function fail(what: string, error: { message: string }): never {
  throw new Error(`${what} failed: ${error.message}`);
}

type OrderRow = {
  id: string; created_at: string; customer_email: string; customer_name: string;
  product_slug: string; product_name: string; plan_type: string; amount: number;
  razorpay_id: string; status: Order["status"]; license_key: string | null; total: number;
};

export async function listOrders(opts: { q: string; status: string; page: number }): Promise<Page<Order>> {
  const { data, error } = await db().rpc("admin_list_orders", {
    p_q: opts.q, p_status: opts.status, p_limit: PAGE_SIZE, p_offset: (opts.page - 1) * PAGE_SIZE,
  });
  if (error) fail("Listing orders", error);
  const rows = (data as OrderRow[]).map((r): Order => ({
    id: r.id,
    date: day.format(new Date(r.created_at)),
    customerEmail: r.customer_email,
    customerName: r.customer_name,
    productSlug: r.product_slug,
    productName: r.product_name,
    planType: planType(r.plan_type),
    amountInr: toRupees(r.amount),
    razorpayId: r.razorpay_id,
    status: r.status,
    licenseKey: r.license_key,
  }));
  return { rows, total: Number((data as OrderRow[])[0]?.total ?? 0), page: opts.page, pageSize: PAGE_SIZE };
}

async function counts(fn: "admin_order_counts" | "admin_license_counts"): Promise<Record<string, number>> {
  const { data, error } = await db().rpc(fn);
  if (error) fail("Counting", error);
  const out: Record<string, number> = {};
  for (const r of data as { status: string; n: number }[]) out[r.status] = Number(r.n);
  return out;
}
export const orderCounts = () => counts("admin_order_counts");
export const licenseCounts = () => counts("admin_license_counts");

type LicenseRow = {
  key: string; product_slug: string; product_name: string; plan_type: string;
  customer_email: string; customer_name: string; order_id: string; status: License["status"];
  issued_at: string; ends_at: string | null; total: number;
};

const toLicense = (r: LicenseRow): License => ({
  key: r.key,
  productSlug: r.product_slug,
  productName: r.product_name,
  planType: planType(r.plan_type),
  customerEmail: r.customer_email,
  customerName: r.customer_name,
  orderId: r.order_id,
  status: r.status,
  issued: dayYear.format(new Date(r.issued_at)),
  endDate: r.ends_at ? dayYear.format(new Date(r.ends_at)) : null,
});

export async function listLicenses(opts: { q: string; status: string; page: number }): Promise<Page<License>> {
  const { data, error } = await db().rpc("admin_list_licenses", {
    p_q: opts.q, p_status: opts.status, p_limit: PAGE_SIZE, p_offset: (opts.page - 1) * PAGE_SIZE,
  });
  if (error) fail("Listing licenses", error);
  const list = data as LicenseRow[];
  return { rows: list.map(toLicense), total: Number(list[0]?.total ?? 0), page: opts.page, pageSize: PAGE_SIZE };
}

/** Activity log for a set of license keys, newest first. */
export async function licenseEventsByKey(keys: string[]): Promise<Record<string, LicenseEvent[]>> {
  if (keys.length === 0) return {};
  const { data, error } = await db()
    .from("license_events")
    .select("type,detail,actor,created_at,licenses!inner(key)")
    .in("licenses.key", keys)
    .order("created_at", { ascending: false });
  if (error) fail("Loading license events", error);
  const out: Record<string, LicenseEvent[]> = {};
  for (const e of data as unknown as {
    type: string; detail: string; actor: string; created_at: string; licenses: { key: string };
  }[]) {
    const actor = e.actor === "system" ? "" : ` (${e.actor.replace("admin:", "admin ")})`;
    (out[e.licenses.key] ??= []).push({
      at: dayTime.format(new Date(e.created_at)).replace(",", ""),
      text: `${e.detail || e.type}${actor}`,
    });
  }
  return out;
}

type CustomerRow = {
  email: string; name: string; business: string | null; phone: string | null;
  orders: number; spent: number; active_keys: number;
  last_order: string | null; first_order: string | null; total: number;
};

export async function listCustomers(opts: { q: string; page: number }): Promise<Page<Customer>> {
  const { data, error } = await db().rpc("admin_list_customers", {
    p_q: opts.q, p_limit: PAGE_SIZE, p_offset: (opts.page - 1) * PAGE_SIZE,
  });
  if (error) fail("Listing customers", error);
  const list = data as CustomerRow[];
  const rows = list.map((r): Customer => ({
    email: r.email,
    name: r.name,
    business: r.business ?? undefined,
    phone: r.phone ?? undefined,
    orders: Number(r.orders),
    spentInr: toRupees(r.spent),
    activeKeys: Number(r.active_keys),
    lastOrder: r.last_order ? day.format(new Date(r.last_order)) : "",
    firstOrder: r.first_order ? dayYear.format(new Date(r.first_order)) : "",
  }));
  return { rows, total: Number(list[0]?.total ?? 0), page: opts.page, pageSize: PAGE_SIZE };
}

/** Orders and licenses of the given customers, for the customer detail panel. */
export async function ordersAndLicensesFor(
  emails: string[],
): Promise<{ orders: Order[]; licenses: License[] }> {
  if (emails.length === 0) return { orders: [], licenses: [] };
  const { data, error } = await db()
    .from("orders")
    .select(
      "id,created_at,amount,status,razorpay_payment_id,customers!inner(email,name),products(slug,name),plans(type),licenses(key,status,issued_at,ends_at)",
    )
    .in("customers.email", emails)
    .order("created_at", { ascending: false })
    .limit(500);
  if (error) fail("Loading customer orders", error);
  type Row = {
    id: string; created_at: string; amount: number; status: Order["status"];
    razorpay_payment_id: string | null;
    customers: { email: string; name: string };
    products: { slug: string; name: string };
    plans: { type: string };
    licenses: { key: string; status: License["status"]; issued_at: string; ends_at: string | null } | null;
  };
  const orders: Order[] = [];
  const licenses: License[] = [];
  for (const r of data as unknown as Row[]) {
    const lic = Array.isArray(r.licenses) ? r.licenses[0] ?? null : r.licenses;
    orders.push({
      id: r.id,
      date: day.format(new Date(r.created_at)),
      customerEmail: r.customers.email,
      customerName: r.customers.name,
      productSlug: r.products.slug,
      productName: r.products.name,
      planType: planType(r.plans.type),
      amountInr: toRupees(r.amount),
      razorpayId: r.razorpay_payment_id ?? "",
      status: r.status,
      licenseKey: lic?.key ?? null,
    });
    if (lic) {
      licenses.push(
        toLicense({
          key: lic.key, product_slug: r.products.slug, product_name: r.products.name,
          plan_type: r.plans.type, customer_email: r.customers.email, customer_name: r.customers.name,
          order_id: r.id, status: lic.status, issued_at: lic.issued_at, ends_at: lic.ends_at, total: 0,
        }),
      );
    }
  }
  return { orders, licenses };
}

export type Dashboard = {
  revenue30d: number;
  revenuePrev30d: number;
  orders30d: { paid: number; pending: number; failed: number; refunded: number };
  licenses: { active: number; expired: number; revoked: number };
  expiring7d: number;
  newCustomers30d: number;
  weeks: { label: string; value: number }[];
};

export async function getDashboard(): Promise<Dashboard> {
  const { data, error } = await db().rpc("admin_dashboard");
  if (error) fail("Loading dashboard", error);
  const d = data as {
    revenue_30d: number; revenue_prev_30d: number;
    orders_30d: Dashboard["orders30d"]; licenses: Dashboard["licenses"];
    expiring_7d: number; new_customers_30d: number; weeks: { week: string; paise: number }[];
  };
  return {
    revenue30d: toRupees(d.revenue_30d),
    revenuePrev30d: toRupees(d.revenue_prev_30d),
    orders30d: d.orders_30d,
    licenses: d.licenses,
    expiring7d: Number(d.expiring_7d),
    newCustomers30d: Number(d.new_customers_30d),
    weeks: d.weeks.map((w) => ({
      label: day.format(new Date(`${w.week}T00:00:00+05:30`)),
      value: toRupees(w.paise),
    })),
  };
}

/** Confirmation page lookup. Only by the unguessable public token. */
export async function getOrderByToken(token: string): Promise<Order | undefined> {
  if (!/^[A-Za-z0-9_-]{20,64}$/.test(token)) return undefined;
  const { data, error } = await db()
    .from("orders")
    .select(
      "id,created_at,amount,status,razorpay_payment_id,customers(email,name),products(slug,name),plans(type),licenses(key)",
    )
    .eq("public_token", token)
    .maybeSingle();
  if (error) fail("Loading order", error);
  if (!data) return undefined;
  const r = data as unknown as {
    id: string; created_at: string; amount: number; status: Order["status"];
    razorpay_payment_id: string | null;
    customers: { email: string; name: string };
    products: { slug: string; name: string };
    plans: { type: string };
    licenses: { key: string } | { key: string }[] | null;
  };
  const lic = Array.isArray(r.licenses) ? r.licenses[0] : r.licenses;
  return {
    id: r.id,
    date: day.format(new Date(r.created_at)),
    customerEmail: r.customers.email,
    customerName: r.customers.name,
    productSlug: r.products.slug,
    productName: r.products.name,
    planType: planType(r.plans.type),
    amountInr: toRupees(r.amount),
    razorpayId: r.razorpay_payment_id ?? "",
    status: r.status,
    // The key is only ever returned for paid orders.
    licenseKey: r.status === "paid" ? lic?.key ?? null : null,
  };
}
