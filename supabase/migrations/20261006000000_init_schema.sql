-- Forgekit initial schema.
-- Money is stored as INTEGER PAISE (1 INR = 100 paise), matching Razorpay.
-- All tables have row level security enabled with no policies: the anon and
-- authenticated roles are denied everything. Data is reached only from server
-- code using the service role key, which bypasses RLS.

create type product_status as enum ('live', 'draft');
create type plan_type as enum ('monthly', 'one_time');
create type order_status as enum ('pending', 'paid', 'failed', 'refunded');
create type license_status as enum ('active', 'expired', 'revoked');

create or replace function set_updated_at() returns trigger
language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- ---------------------------------------------------------------- products
create table products (
  id          uuid primary key default gen_random_uuid(),
  slug        text not null unique check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  name        text not null,
  tagline     text not null,
  description text not null,
  features    text[] not null default '{}',
  icon        text not null check (icon in ('invoice','calendar','star','box','quote','user-plus')),
  preview     jsonb not null default '{"title":"","rows":[]}'::jsonb,
  status      product_status not null default 'draft',
  access_url  text,
  key_prefix  text not null check (key_prefix ~ '^[A-Z]{2,6}$'),
  thumbnail_path text,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);
create index products_status_idx on products (status);
create trigger products_updated_at before update on products
  for each row execute function set_updated_at();

-- ------------------------------------------------------------------- plans
create table plans (
  id               uuid primary key default gen_random_uuid(),
  product_id       uuid not null references products (id) on delete cascade,
  type             plan_type not null,
  price            integer not null check (price > 0), -- paise
  razorpay_plan_id text,
  active           boolean not null default true,
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now(),
  unique (product_id, type)
);
create trigger plans_updated_at before update on plans
  for each row execute function set_updated_at();

-- --------------------------------------------------------------- customers
create table customers (
  id         uuid primary key default gen_random_uuid(),
  email      text not null unique check (email = lower(email)),
  name       text not null,
  phone      text,
  business   text,
  gstin      text,
  created_at timestamptz not null default now()
);

-- ------------------------------------------------------------------ orders
-- Human friendly public ids: FK-10483, FK-10484, ...
create sequence order_number_seq start 10483;

create table orders (
  id                   text primary key
                         default ('FK-' || nextval('order_number_seq')::text),
  public_token         text not null unique,   -- unguessable, used in /order/<token>
  customer_id          uuid not null references customers (id),
  product_id           uuid not null references products (id),
  plan_id              uuid not null references plans (id),
  amount               integer not null check (amount > 0), -- paise
  currency             text not null default 'INR' check (currency = 'INR'),
  status               order_status not null default 'pending',
  razorpay_order_id    text not null unique,
  razorpay_payment_id  text unique,
  razorpay_signature   text,
  created_at           timestamptz not null default now(),
  paid_at              timestamptz
);
create index orders_status_created_idx on orders (status, created_at desc);
create index orders_created_idx on orders (created_at desc);
create index orders_customer_idx on orders (customer_id);
create index orders_product_idx on orders (product_id);

-- ---------------------------------------------------------------- licenses
create table licenses (
  id          uuid primary key default gen_random_uuid(),
  key         text not null unique,
  order_id    text not null unique references orders (id),
  product_id  uuid not null references products (id),
  customer_id uuid not null references customers (id),
  status      license_status not null default 'active',
  issued_at   timestamptz not null default now(),
  ends_at     timestamptz, -- null for one-time licenses
  created_at  timestamptz not null default now()
);
create index licenses_status_ends_idx on licenses (status, ends_at);
create index licenses_customer_idx on licenses (customer_id);
create index licenses_product_idx on licenses (product_id);

-- ---------------------------------------------------------- license_events
create table license_events (
  id         uuid primary key default gen_random_uuid(),
  license_id uuid not null references licenses (id),
  actor      text not null check (actor = 'system' or actor like 'admin:%'),
  type       text not null,
  detail     text not null default '',
  created_at timestamptz not null default now()
);
create index license_events_license_idx on license_events (license_id, created_at);

-- Append-only: block UPDATE and DELETE, even for the service role.
create or replace function license_events_append_only() returns trigger
language plpgsql as $$
begin
  raise exception 'license_events is append-only';
end;
$$;
create trigger license_events_no_update before update or delete on license_events
  for each row execute function license_events_append_only();

-- ---------------------------------------------------------- webhook_events
create table webhook_events (
  id           uuid primary key default gen_random_uuid(),
  provider     text not null,
  event_id     text not null unique,
  payload      jsonb not null,
  processed_at timestamptz,
  created_at   timestamptz not null default now()
);

-- ---------------------------------------------------------------------- RLS
alter table products        enable row level security;
alter table plans           enable row level security;
alter table customers       enable row level security;
alter table orders          enable row level security;
alter table licenses        enable row level security;
alter table license_events  enable row level security;
alter table webhook_events  enable row level security;

revoke all on all tables in schema public from anon, authenticated;
revoke all on all sequences in schema public from anon, authenticated;
revoke execute on all functions in schema public from anon, authenticated, public;
