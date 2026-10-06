-- Throttling for admin password login. Rows are written by server code only.
create table admin_login_attempts (
  id         bigint generated always as identity primary key,
  email      text not null,
  ip         text not null,
  succeeded  boolean not null,
  created_at timestamptz not null default now()
);
create index admin_login_attempts_email_idx on admin_login_attempts (email, created_at desc);
create index admin_login_attempts_ip_idx on admin_login_attempts (ip, created_at desc);

alter table admin_login_attempts enable row level security;
revoke all on admin_login_attempts from anon, authenticated;
