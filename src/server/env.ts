// import "server-only";
import { z } from "zod";

const schema = z
  .object({
    /** development | staging | production. Decides test vs live Razorpay keys. */
    APP_ENV: z.enum(["development", "staging", "production"]).default("development"),
    NEXT_PUBLIC_SITE_URL: z.string().url(),
    NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
    NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(20),
    SUPABASE_SERVICE_ROLE_KEY: z.string().min(20),
    /** Comma separated allowlist of admin emails. */
    ADMIN_EMAILS: z
      .string()
      .min(3)
      .transform((s) => s.split(",").map((e) => e.trim().toLowerCase()).filter(Boolean))
      .pipe(z.array(z.string().email()).min(1)),
    NEXT_PUBLIC_RAZORPAY_KEY_ID: z.string().regex(/^rzp_(test|live)_[A-Za-z0-9]+$/),
    RAZORPAY_KEY_SECRET: z.string().min(10),
    RAZORPAY_WEBHOOK_SECRET: z.string().min(10),
  })
  .superRefine((env, ctx) => {
    const live = env.NEXT_PUBLIC_RAZORPAY_KEY_ID.startsWith("rzp_live_");
    if (env.APP_ENV === "production" && !live) {
      ctx.addIssue({ code: "custom", path: ["NEXT_PUBLIC_RAZORPAY_KEY_ID"], message: "production needs live keys" });
    }
    if (env.APP_ENV !== "production" && live) {
      ctx.addIssue({ code: "custom", path: ["NEXT_PUBLIC_RAZORPAY_KEY_ID"], message: "only production may use live keys" });
    }
  });

export type Env = z.infer<typeof schema>;

let cached: Env | undefined;

/** Validates process.env once and fails fast with the names of bad variables. */
export function getEnv(): Env {
  if (cached) return cached;
  const parsed = schema.safeParse(process.env);
  if (!parsed.success) {
    const names = parsed.error.issues.map((i) => i.path.join(".")).join(", ");
    throw new Error(`Invalid or missing environment variables: ${names}`);
  }
  cached = parsed.data;
  return cached;
}
