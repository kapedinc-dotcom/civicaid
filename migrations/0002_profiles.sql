create table if not exists profiles (
  user_id text primary key,
  household jsonb not null,
  applications jsonb not null default '{}'::jsonb,
  saved jsonb not null default '[]'::jsonb,
  elig_step integer not null default 0,
  updated_at timestamptz not null default now()
);
