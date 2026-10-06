-- Phase 3: payments, subscriptions and the transactional fulfilment functions.

-- Monthly orders are Razorpay Subscriptions, so an order may have a
-- subscription id instead of a Razorpay order id.
alter table orders alter column razorpay_order_id drop not null;
alter table orders add column razorpay_subscription_id text unique;
alter table orders add constraint orders_has_razorpay_ref
  check (razorpay_order_id is not null or razorpay_subscription_id is not null);

-- Every captured payment (first charge and renewals). Unique payment id makes
-- fulfilment idempotent and gives reconciliation something to compare.
create table payments (
  id                  uuid primary key default gen_random_uuid(),
  order_id            text not null references orders (id),
  razorpay_payment_id text not null unique,
  amount              integer not null check (amount > 0), -- paise
  kind                text not null check (kind in ('initial', 'renewal')),
  paid_at             timestamptz not null,
  created_at          timestamptz not null default now()
);
create index payments_order_idx on payments (order_id);
alter table payments enable row level security;
revoke all on payments from anon, authenticated;

create or replace function next_order_id() returns text
language sql as $$ select 'FK-' || nextval('order_number_seq')::text $$;

-- One transaction: mark the order paid, create the license, write the event.
-- For an already paid monthly order it extends the license instead.
-- Safe to call any number of times for the same payment.
create or replace function apply_charge(
  p_order_id   text,
  p_payment_id text,
  p_amount     integer,
  p_paid_at    timestamptz,
  p_key        text
) returns jsonb
language plpgsql as $$
declare
  o     orders%rowtype;
  pl    plans%rowtype;
  lic   licenses%rowtype;
  new_end timestamptz;
begin
  select * into o from orders where id = p_order_id for update;
  if not found then
    raise exception 'order_not_found';
  end if;

  if exists (select 1 from payments where razorpay_payment_id = p_payment_id) then
    return jsonb_build_object('outcome', 'duplicate');
  end if;
  if o.status = 'refunded' then
    return jsonb_build_object('outcome', 'ignored_refunded');
  end if;

  select * into pl from plans where id = o.plan_id;

  if o.status in ('pending', 'failed') then
    if p_amount <> o.amount then
      return jsonb_build_object('outcome', 'amount_mismatch');
    end if;
    update orders
       set status = 'paid', razorpay_payment_id = p_payment_id, paid_at = p_paid_at
     where id = o.id;
    insert into payments (order_id, razorpay_payment_id, amount, kind, paid_at)
      values (o.id, p_payment_id, p_amount, 'initial', p_paid_at);
    insert into licenses (key, order_id, product_id, customer_id, status, issued_at, ends_at)
      values (p_key, o.id, o.product_id, o.customer_id, 'active', p_paid_at,
              case when pl.type = 'monthly' then p_paid_at + interval '1 month' end)
      returning * into lic;
    insert into license_events (license_id, actor, type, detail)
      values (lic.id, 'system', 'issued', 'Key issued after payment ' || p_payment_id);
    return jsonb_build_object('outcome', 'issued', 'license_id', lic.id, 'key', lic.key);
  end if;

  -- Order already paid. Only monthly plans take further charges.
  if pl.type <> 'monthly' then
    return jsonb_build_object('outcome', 'ignored_extra_payment');
  end if;

  select * into lic from licenses where order_id = o.id for update;
  if not found then
    raise exception 'license_missing_for_paid_order';
  end if;

  insert into payments (order_id, razorpay_payment_id, amount, kind, paid_at)
    values (o.id, p_payment_id, p_amount, 'renewal', p_paid_at);

  new_end := greatest(coalesce(lic.ends_at, p_paid_at), p_paid_at) + interval '1 month';
  update licenses
     set ends_at = new_end,
         status = case when status = 'expired' then 'active'::license_status else status end
   where id = lic.id;
  insert into license_events (license_id, actor, type, detail)
    values (lic.id, 'system', 'renewed',
            'Renewed by payment ' || p_payment_id || ' until '
            || to_char(new_end at time zone 'Asia/Kolkata', 'DD Mon YYYY')
            || case when lic.status = 'revoked' then ' (license is revoked, status unchanged)' else '' end);
  return jsonb_build_object('outcome', 'renewed', 'license_id', lic.id, 'ends_at', new_end);
end;
$$;

-- Refund of a payment. Full refund of the first payment refunds the order and
-- revokes the license. Anything else is only logged for a human to review.
create or replace function apply_refund(
  p_payment_id text,
  p_full       boolean,
  p_refund_id  text
) returns jsonb
language plpgsql as $$
declare
  pay payments%rowtype;
  o   orders%rowtype;
  lic licenses%rowtype;
begin
  select * into pay from payments where razorpay_payment_id = p_payment_id;
  if not found then
    return jsonb_build_object('outcome', 'unknown_payment');
  end if;
  select * into o from orders where id = pay.order_id for update;
  select * into lic from licenses where order_id = o.id for update;

  if pay.kind = 'initial' and p_full then
    if o.status = 'refunded' then
      return jsonb_build_object('outcome', 'duplicate');
    end if;
    update orders set status = 'refunded' where id = o.id;
    if lic.id is not null and lic.status <> 'revoked' then
      update licenses set status = 'revoked' where id = lic.id;
    end if;
    if lic.id is not null then
      insert into license_events (license_id, actor, type, detail)
        values (lic.id, 'system', 'revoked', 'Payment ' || p_payment_id || ' refunded (' || p_refund_id || ')');
    end if;
    return jsonb_build_object('outcome', 'refunded');
  end if;

  if lic.id is not null and not exists (
       select 1 from license_events
       where license_id = lic.id and type = 'refund_review' and detail like '%' || p_refund_id || '%') then
    insert into license_events (license_id, actor, type, detail)
      values (lic.id, 'system', 'refund_review',
              case when pay.kind = 'renewal' then 'Renewal payment ' else 'Partial refund on payment ' end
              || p_payment_id || ' refunded (' || p_refund_id || '). Review manually.');
  end if;
  return jsonb_build_object('outcome', 'logged_for_review');
end;
$$;

revoke execute on function next_order_id(), apply_charge(text, text, integer, timestamptz, text),
  apply_refund(text, boolean, text) from public, anon, authenticated;
grant execute on function next_order_id(), apply_charge(text, text, integer, timestamptz, text),
  apply_refund(text, boolean, text) to service_role;
