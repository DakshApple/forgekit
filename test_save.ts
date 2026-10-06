import { createClient } from "@supabase/supabase-js";
import { getEnv } from "./src/server/env";

const env = getEnv();
const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY, {
  auth: { persistSession: false, autoRefreshToken: false },
});

async function run() {
  const productData = {
    slug: "test-product-" + Date.now(),
    name: "Test Product",
    tagline: "Test",
    description: "Test",
    features: ["test"],
    trial_days: 0,
    icon: "box",
    status: "draft",
    access_url: "https://example.com",
    key_prefix: "TS",
  };

  console.log("Inserting product...");
  const { data, error } = await supabase.from("products").insert(productData).select("id").single();
  
  if (error) {
    console.error("Failed to insert:", JSON.stringify(error, null, 2));
  } else {
    console.log("Success:", data);
  }
}

run();
