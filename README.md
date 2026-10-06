# Forgekit

Next.js 15 (App Router) + TypeScript + Tailwind 3. Poppins is self-hosted through `@fontsource/poppins`.
Brand is strictly #0A0A0A and #FFFFFF. Greys are black at lower opacity.

**Full Stack Production Implementation:**
This project integrates a robust Supabase PostgreSQL backend, secure admin authentication, and a Razorpay webhook integration for handling digital goods (licenses).

## Features Implemented

1. **Supabase Database:** Products, Plans, Customers, Orders, Licenses, and Webhook events.
2. **Admin Authentication:** Secure admin login using `@supabase/ssr` cookies and an admin email allowlist.
3. **Razorpay Payments:** Orders, Subscriptions, and signature-verified webhook endpoints.
4. **License Key Generation:** Cryptographically secure, unique license keys generated on payment capture.
5. **Admin Dashboard:** Server-side paginated dashboard for viewing orders, revoking licenses, and editing products.

## Run Locally

```bash
npm install

# Apply database migrations found in supabase/migrations/ to your Supabase project.

# Configure environment variables
cp .env.example .env.local
# Add your Supabase, Razorpay, and Admin Emails to .env.local

npm run db:seed    # Seed test products
npm run dev        # http://localhost:3000
npm run build      # production build
```

## Admin Setup

To create an admin account, ensure your email is listed in `ADMIN_EMAILS` within `.env.local` and run:

```bash
ADMIN_EMAIL=you@example.com ADMIN_PASSWORD='StrongPassword123!' npx tsx --env-file=.env.local scripts/create-admin.ts
```

## Environment Variables

| Variable | Description |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Base URL (e.g. `http://localhost:3000`) |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase Project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase Anon Key (for client/auth) |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase Service Role Key (bypasses RLS) |
| `ADMIN_EMAILS` | Comma-separated allowlist of admin emails |
| `NEXT_PUBLIC_RAZORPAY_KEY_ID` | Razorpay Key ID |
| `RAZORPAY_KEY_SECRET` | Razorpay Key Secret |
| `RAZORPAY_WEBHOOK_SECRET` | Secret used to verify webhook signature |

## Architecture Notes

* **Data Layer:** `src/lib/data.ts` and `src/server/admin-queries.ts` interface with Supabase using direct SQL/RPC endpoints.
* **Idempotent Webhooks:** Razorpay webhooks (`payment.captured`) trigger an atomic `apply_charge` PostgreSQL function to generate keys securely.
* **Server Components:** Admin and Storefront UI rely heavily on React Server Components and `unstable_cache`.
* **Database Schema:** Located in `supabase/migrations/` for reproducibility.
