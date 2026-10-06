// import "server-only";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { getEnv } from "./env";

let client: SupabaseClient | undefined;

/** Service-role client. Server only. Bypasses RLS, so never import in client code. */
export function db(): SupabaseClient {
  if (!client) {
    const env = getEnv();
    client = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
  }
  return client;
}
