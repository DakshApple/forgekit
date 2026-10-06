// Loads the six sample products and their plans into the database.
// Idempotent: safe to run many times. Prices are converted to integer paise.
// Run: npm run db:seed   (needs NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY)

import { createClient } from "@supabase/supabase-js";
import { z } from "zod";
import { products } from "../src/lib/sample-products";

const env = z
  .object({
    NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
    SUPABASE_SERVICE_ROLE_KEY: z.string().min(20),
  })
  .parse(process.env);

const KEY_PREFIX: Record<string, string> = {
  "invoice-kit": "IK",
  "booking-kit": "BK",
  "review-kit": "RK",
  "stock-kit": "SK",
  "quote-kit": "QK",
  "lead-kit": "LK",
};

async function main() {
  const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY, {
    auth: { persistSession: false },
  });

  for (const p of products) {
    const keyPrefix = KEY_PREFIX[p.slug];
    if (!keyPrefix) throw new Error(`No key prefix defined for ${p.slug}`);

    const { data: row, error } = await supabase
      .from("products")
      .upsert(
        {
          slug: p.slug,
          name: p.name,
          tagline: p.tagline,
          description: p.description,
          features: p.features,
          icon: p.icon,
          preview: p.preview,
          status: p.status,
          key_prefix: keyPrefix,
        },
        { onConflict: "slug" },
      )
      .select("id")
      .single();
    if (error || !row) throw new Error(`Product ${p.slug}: ${error?.message}`);

    for (const plan of p.plans) {
      const { error: planError } = await supabase.from("plans").upsert(
        {
          product_id: row.id,
          type: plan.type === "monthly" ? "monthly" : "one_time",
          price: Math.round(plan.priceInr * 100),
          active: true,
        },
        { onConflict: "product_id,type" },
      );
      if (planError) throw new Error(`Plan ${p.slug}/${plan.type}: ${planError.message}`);
    }
    process.stdout.write(`seeded ${p.slug}\n`);
  }
}

main().catch((err: unknown) => {
  process.stderr.write(`Seed failed: ${err instanceof Error ? err.message : String(err)}\n`);
  process.exit(1);
});
