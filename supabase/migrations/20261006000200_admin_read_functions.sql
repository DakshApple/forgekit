-- Read-side SQL for the admin portal. All aggregation and pagination happens
-- in the database. Functions run as the caller (service role only, see grants).

create or replace function like_escape(p text) returns text
language sql immutable as $$
  select replace(replace(replace(coalesce(p, ''), '\', '\\'), '%', '\%'), '_', '\_')
$$;

-- ------------------------------------------------------------------ orders
create or replace function admin_list_orders(
  p_q text, p_status text, p_limit int, p_offset int
) returns table (
  id text, created_at timestamptz, customer_email text, customer_name text,
  product_slug text, product_name text, plan_type plan_type, amount int,
  razorpay_id text, status order_status, license_key text, total bigint
) language sql stable as $$
  select o.id, o.created_at, c.email, c.name, p.slug, p.name, pl.type, o.amount,
         coalesce(o.razorpay_payment_id, ''), o.status, l.key, count(*) over ()
  from orders o
  join customers c on c.id = o.customer_id
  join products p on p.id = o.product_id
  join plans pl on pl.id = o.plan_id
  left join licenses l on l.order_id = o.id
  where (p_status is null or p_status = '' or o.status = p_status::order_status)
    and (coalesce(p_q, '') = '' or
         o.id ilike '%' || like_escape(p_q) || '%' or
         c.email ilike '%' || like_escape(p_q) || '%' or
         c.name ilike '%' || like_escape(p_q) || '%' or
         o.razorpay_payment_id ilike '%' || like_escape(p_q) || '%' or
         o.razorpay_order_id ilike '%' || like_escape(p_q) || '%')
  order by o.created_at desc, o.id desc
  limit least(greatest(p_limit, 1), 100) offset greatest(p_offset, 0)
$$;

create or replace function admin_order_counts()
returns table (status order_status, n bigint)
language sql stable as $$
  select status, count(*) from orders group by status
$$;

-- ---------------------------------------------------------------- licenses
create or replace function admin_list_licenses(
  p_q text, p_status text, p_limit int, p_offset int
) returns table (
  key text, product_slug text, product_name text, plan_type plan_type,
  customer_email text, customer_name text, order_id text, status license_status,
  issued_at timestamptz, ends_at timestamptz, total bigint
) language sql stable as $$
  select l.key, p.slug, p.name, pl.type, c.email, c.name, l.order_id, l.status,
         l.issued_at, l.ends_at, count(*) over ()
  from licenses l
  join orders o on o.id = l.order_id
  join plans pl on pl.id = o.plan_id
  join products p on p.id = l.product_id
  join customers c on c.id = l.customer_id
  where (p_status is null or p_status = '' or l.status = p_status::license_status)
    and (coalesce(p_q, '') = '' or
         l.key ilike '%' || like_escape(p_q) || '%' or
         c.email ilike '%' || like_escape(p_q) || '%' or
         c.name ilike '%' || like_escape(p_q) || '%' or
         l.order_id ilike '%' || like_escape(p_q) || '%')
  order by l.issued_at desc, l.key
  limit least(greatest(p_limit, 1), 100) offset greatest(p_offset, 0)
$$;

create or replace function admin_license_counts()
returns table (status license_status, n bigint)
language sql stable as $$
  select status, count(*) from licenses group by status
$$;

-- --------------------------------------------------------------- customers
create or replace function admin_list_customers(
  p_q text, p_limit int, p_offset int
) returns table (
  email text, name text, business text, phone text,
  orders bigint, spent bigint, active_keys bigint,
  last_order timestamptz, first_order timestamptz, total bigint
) language sql stable as $$
  select c.email, c.name, c.business, c.phone,
         o.n, o.spent, l.n, o.last_o, o.first_o, count(*) over ()
  from customers c
  left join lateral (
    select count(*) n,
           coalesce(sum(amount) filter (where status = 'paid'), 0) spent,
           max(created_at) last_o, min(created_at) first_o
    from orders where customer_id = c.id
  ) o on true
  left join lateral (
    select count(*) n from licenses
    where customer_id = c.id and status = 'active' and (ends_at is null or ends_at > now())
  ) l on true
  where coalesce(p_q, '') = '' or
        c.email ilike '%' || like_escape(p_q) || '%' or
        c.name ilike '%' || like_escape(p_q) || '%' or
        c.business ilike '%' || like_escape(p_q) || '%'
  order by o.last_o desc nulls last, c.email
  limit least(greatest(p_limit, 1), 100) offset greatest(p_offset, 0)
$$;

-- --------------------------------------------------------------- dashboard
create or replace function admin_dashboard() returns jsonb
language sql stable as $$
  select jsonb_build_object(
    'revenue_30d', coalesce((select sum(amount) from orders
        where status = 'paid' and paid_at >= now() - interval '30 days'), 0),
    'revenue_prev_30d', coalesce((select sum(amount) from orders
        where status = 'paid' and paid_at >= now() - interval '60 days'
          and paid_at < now() - interval '30 days'), 0),
    'orders_30d', jsonb_build_object(
        'paid',     (select count(*) from orders where status = 'paid'     and created_at >= now() - interval '30 days'),
        'pending',  (select count(*) from orders where status = 'pending'  and created_at >= now() - interval '30 days'),
        'failed',   (select count(*) from orders where status = 'failed'   and created_at >= now() - interval '30 days'),
        'refunded', (select count(*) from orders where status = 'refunded' and created_at >= now() - interval '30 days')),
    'licenses', jsonb_build_object(
        'active',  (select count(*) from licenses where status = 'active'  and (ends_at is null or ends_at > now())),
        'expired', (select count(*) from licenses where status = 'expired' or (status = 'active' and ends_at <= now())),
        'revoked', (select count(*) from licenses where status = 'revoked')),
    'expiring_7d', (select count(*) from licenses
        where status = 'active' and ends_at > now() and ends_at <= now() + interval '7 days'),
    'new_customers_30d', (select count(*) from customers where created_at >= now() - interval '30 days'),
    'weeks', (
      select jsonb_agg(jsonb_build_object('week', to_char(w, 'YYYY-MM-DD'), 'paise', coalesce(s.paise, 0)) order by w)
      from generate_series(
             date_trunc('week', now() at time zone 'Asia/Kolkata') - interval '3 weeks',
             date_trunc('week', now() at time zone 'Asia/Kolkata'),
             interval '1 week') w
      left join (
        select date_trunc('week', paid_at at time zone 'Asia/Kolkata') wk, sum(amount) paise
        from orders where status = 'paid' group by 1) s on s.wk = w
    )
  )
$$;

revoke execute on function
  like_escape(text),
  admin_list_orders(text, text, int, int),
  admin_order_counts(),
  admin_list_licenses(text, text, int, int),
  admin_license_counts(),
  admin_list_customers(text, int, int),
  admin_dashboard()
from public, anon, authenticated;
grant execute on function
  like_escape(text),
  admin_list_orders(text, text, int, int),
  admin_order_counts(),
  admin_list_licenses(text, text, int, int),
  admin_license_counts(),
  admin_list_customers(text, int, int),
  admin_dashboard()
to service_role;
