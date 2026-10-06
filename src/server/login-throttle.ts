import "server-only";
import { db } from "./db";

const WINDOW_MS = 15 * 60 * 1000;
export const MAX_FAILS_PER_EMAIL = 5;
export const MAX_FAILS_PER_IP = 20;

/** True when this email or IP has too many recent failed logins. */
export async function isLockedOut(email: string, ip: string): Promise<boolean> {
  const since = new Date(Date.now() - WINDOW_MS).toISOString();
  const [byEmail, byIp] = await Promise.all([
    db().from("admin_login_attempts").select("id", { count: "exact", head: true })
      .eq("email", email).eq("succeeded", false).gte("created_at", since),
    db().from("admin_login_attempts").select("id", { count: "exact", head: true })
      .eq("ip", ip).eq("succeeded", false).gte("created_at", since),
  ]);
  if (byEmail.error || byIp.error) throw new Error("Login throttle lookup failed");
  return (byEmail.count ?? 0) >= MAX_FAILS_PER_EMAIL || (byIp.count ?? 0) >= MAX_FAILS_PER_IP;
}

export async function recordAttempt(email: string, ip: string, succeeded: boolean) {
  const { error } = await db().from("admin_login_attempts").insert({ email, ip, succeeded });
  if (error) throw new Error("Could not record login attempt");
  if (succeeded) {
    // A good login resets the failure count for that email.
    await db().from("admin_login_attempts").delete().eq("email", email).eq("succeeded", false);
  }
}
