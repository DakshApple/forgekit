create table api_keys (
  id uuid primary key default gen_random_uuid(),
  key text not null unique,
  name text not null,
  created_at timestamptz not null default now(),
  last_used_at timestamptz
);

create index api_keys_key_idx on api_keys (key);

alter table api_keys enable row level security;
revoke all on api_keys from anon, authenticated;
