-- -------------------------------------------------------- license_activations
create table license_activations (
  id               uuid primary key default gen_random_uuid(),
  license_id       uuid not null references licenses (id) on delete cascade,
  machine_id       text not null,
  created_at       timestamptz not null default now(),
  last_verified_at timestamptz not null default now(),
  unique (license_id, machine_id)
);
create index license_activations_license_idx on license_activations (license_id);

alter table license_activations enable row level security;
revoke all on license_activations from anon, authenticated;
