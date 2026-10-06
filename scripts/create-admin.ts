// Creates (or resets the password of) an admin account in Supabase Auth.
// Run: ADMIN_EMAIL=you@example.com ADMIN_PASSWORD='...' npm run admin:create
// The email must also be listed in ADMIN_EMAILS or it can never reach /admin.

import { createClient } from "@supabase/supabase-js";
import { z } from "zod";
import { passwordProblems } from "../src/lib/password-policy";

const env = z
  .object({
    NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
    SUPABASE_SERVICE_ROLE_KEY: z.string().min(20),
    ADMIN_EMAIL: z.string().email(),
    ADMIN_PASSWORD: z.string(),
    ADMIN_EMAILS: z.string().min(3),
  })
  .parse(process.env);

async function main() {
  const email = env.ADMIN_EMAIL.toLowerCase();
  const allowed = env.ADMIN_EMAILS.split(",").map((e) => e.trim().toLowerCase());
  if (!allowed.includes(email)) throw new Error("ADMIN_EMAIL is not in ADMIN_EMAILS");
  const problems = passwordProblems(env.ADMIN_PASSWORD, email);
  if (problems.length) throw new Error(`Password needs: ${problems.join(", ")}`);

  const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY, {
    auth: { persistSession: false },
  });
  const { data: list, error: listError } = await supabase.auth.admin.listUsers({ perPage: 200 });
  if (listError) throw new Error(listError.message);
  const existing = list.users.find((u) => u.email?.toLowerCase() === email);
  const result = existing
    ? await supabase.auth.admin.updateUserById(existing.id, { password: env.ADMIN_PASSWORD, email_confirm: true })
    : await supabase.auth.admin.createUser({ email, password: env.ADMIN_PASSWORD, email_confirm: true });
  if (result.error) throw new Error(result.error.message);
  process.stdout.write(`${existing ? "Updated" : "Created"} admin ${email}\n`);
}

main().catch((err: unknown) => {
  process.stderr.write(`Failed: ${err instanceof Error ? err.message : String(err)}\n`);
  process.exit(1);
});
