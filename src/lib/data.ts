// Data layer. Products and plans come from Supabase (server only).
// Orders, licenses, customers and the dashboard live in src/server/admin-queries.ts.
// Money: the database stores INTEGER PAISE. The app-level `Plan.priceInr`
// is whole rupees (paise / 100), so UI code is unchanged.

import "server-only";
import { unstable_cache } from "next/cache";
import { db } from "@/server/db";
import type { BillingType, Plan, Product } from "./types";

export { lowestPrice } from "./product-utils";

export const PRODUCTS_TAG = "products";

type PlanRow = {
  id: string;
  type: "monthly" | "one_time";
  price: number;
  active: boolean;
};

type ProductRow = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  features: string[];
  icon: Product["icon"];
  preview: Product["preview"];
  status: "live" | "draft";
  access_url: string | null;
  key_prefix: string;
  trial_days: number;
  updated_at: string;
  plans: PlanRow[];
};

const SELECT =
  "slug,name,tagline,description,features,icon,preview,status,access_url,key_prefix,trial_days,updated_at,plans(id,type,price,active)";

const dateFormat = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "short",
  year: "numeric",
  timeZone: "Asia/Kolkata",
});

export function paiseToRupees(paise: number): number {
  return Math.round(paise) / 100;
}

function toPlan(row: PlanRow): Plan {
  const type: BillingType = row.type === "monthly" ? "monthly" : "one-time";
  return { id: row.id, type, priceInr: paiseToRupees(row.price) };
}

function toProduct(row: ProductRow): Product {
  return {
    slug: row.slug,
    name: row.name,
    tagline: row.tagline,
    description: row.description,
    icon: row.icon,
    features: row.features,
    preview: row.preview,
    status: row.status,
    updatedAt: dateFormat.format(new Date(row.updated_at)),
    accessUrl: row.access_url,
    keyPrefix: row.key_prefix,
    trialDays: row.trial_days || 0,
    // Monthly first, then one-time, so the UI order is stable.
    plans: row.plans
      .filter((p) => p.active)
      .sort((a, b) => (a.type === b.type ? 0 : a.type === "monthly" ? -1 : 1))
      .map(toPlan),
  };
}

const loadProducts = unstable_cache(
  async (liveOnly: boolean): Promise<Product[]> => {
    let query = db().from("products").select(SELECT).order("created_at", { ascending: true });
    if (liveOnly) query = query.eq("status", "live");
    const { data, error } = await query;
    if (error) throw new Error(`Failed to load products: ${error.message}`);
    return (data as unknown as ProductRow[]).map(toProduct).filter((p) => p.plans.length > 0 || !liveOnly);
  },
  ["products"],
  { revalidate: 60, tags: [PRODUCTS_TAG] },
);

export async function getProducts(): Promise<Product[]> {
  return loadProducts(true);
}

export async function getAllProductsAdmin(): Promise<Product[]> {
  return loadProducts(false);
}

const loadProduct = unstable_cache(
  async (slug: string): Promise<Product | undefined> => {
    const { data, error } = await db()
      .from("products")
      .select(SELECT)
      .eq("slug", slug)
      .maybeSingle();
    if (error) throw new Error(`Failed to load product: ${error.message}`);
    return data ? toProduct(data as unknown as ProductRow) : undefined;
  },
  ["product-by-slug"],
  { revalidate: 60, tags: [PRODUCTS_TAG] }
);

export async function getProduct(slug: string): Promise<Product | undefined> {
  return loadProduct(slug);
}

/** Looks up a plan by id. Price always comes from the database. */
export async function findPlan(
  planId: string,
): Promise<{ product: Product; plan: Plan } | undefined> {
  if (!/^[0-9a-f-]{36}$/i.test(planId)) return undefined;
  const { data, error } = await db()
    .from("plans")
    .select("id,products!inner(slug,status)")
    .eq("id", planId)
    .eq("active", true)
    .maybeSingle();
  if (error) throw new Error(`Failed to load plan: ${error.message}`);
  if (!data) return undefined;
  const slug = (data as unknown as { products: { slug: string; status: string } }).products;
  if (slug.status !== "live") return undefined;
  const product = await getProduct(slug.slug);
  const plan = product?.plans.find((p) => p.id === planId);
  return product && plan ? { product, plan } : undefined;
}
