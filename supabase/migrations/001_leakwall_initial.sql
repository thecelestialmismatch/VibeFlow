-- LeakWall Schema
-- Migration: 001_leakwall_initial
-- All user data is protected by Row Level Security (RLS).

-- ============================================================
-- EXTENSIONS
-- ============================================================
create extension if not exists "uuid-ossp";

-- ============================================================
-- USERS (managed by Supabase Auth — this is the profile table)
-- ============================================================
create table if not exists public.user_profiles (
  id            uuid primary key references auth.users(id) on delete cascade,
  email         text,
  display_name  text,
  plan          text not null default 'free' check (plan in ('free', 'pro', 'team', 'business', 'enterprise')),
  team_id       uuid,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

alter table public.user_profiles enable row level security;

create policy "Users can view own profile"
  on public.user_profiles for select
  using (auth.uid() = id);

create policy "Users can update own profile"
  on public.user_profiles for update
  using (auth.uid() = id);

-- ============================================================
-- TEAMS
-- ============================================================
create table if not exists public.teams (
  id          uuid primary key default uuid_generate_v4(),
  name        text not null,
  owner_id    uuid not null references auth.users(id) on delete cascade,
  plan        text not null default 'team' check (plan in ('team', 'business', 'enterprise')),
  seat_limit  int not null default 5,
  created_at  timestamptz not null default now()
);

alter table public.teams enable row level security;

create policy "Team members can view their team"
  on public.teams for select
  using (
    id in (
      select team_id from public.user_profiles where id = auth.uid()
    )
    or owner_id = auth.uid()
  );

-- ============================================================
-- USER EXTENSION SETTINGS
-- ============================================================
create table if not exists public.user_settings (
  id                  uuid primary key default uuid_generate_v4(),
  user_id             uuid not null references auth.users(id) on delete cascade,
  enabled             boolean not null default true,
  sensitivity         text not null default 'medium' check (sensitivity in ('low', 'medium', 'high')),
  show_notifications  boolean not null default true,
  monitored_tools     text[] not null default array[
    'ChatGPT','Claude','Gemini','Copilot','DeepSeek',
    'Perplexity','Poe','Mistral','Jasper','Copy.ai'
  ],
  custom_patterns     jsonb default '[]'::jsonb,
  whitelist           text[] default array[]::text[],
  updated_at          timestamptz not null default now(),
  unique(user_id)
);

alter table public.user_settings enable row level security;

create policy "Users can manage own settings"
  on public.user_settings for all
  using (auth.uid() = user_id);

-- ============================================================
-- LEAK EVENTS
-- ============================================================
create table if not exists public.leak_events (
  id                uuid primary key default uuid_generate_v4(),
  user_id           uuid references auth.users(id) on delete set null,
  team_id           uuid references public.teams(id) on delete set null,
  tool_name         text not null,
  leak_types        text[] not null,
  severity          text not null check (severity in ('critical', 'high', 'medium', 'low')),
  action            text not null check (action in ('blocked', 'warned', 'allowed')),
  extension_version text,
  created_at        timestamptz not null default now()
);

alter table public.leak_events enable row level security;

create policy "Users can view own leak events"
  on public.leak_events for select
  using (auth.uid() = user_id);

create policy "Service role can insert leak events"
  on public.leak_events for insert
  with check (true);

create policy "Team admins can view team events"
  on public.leak_events for select
  using (
    team_id in (
      select id from public.teams where owner_id = auth.uid()
    )
  );

-- Indexes for common query patterns
create index if not exists idx_leak_events_user_id on public.leak_events(user_id);
create index if not exists idx_leak_events_team_id on public.leak_events(team_id);
create index if not exists idx_leak_events_created_at on public.leak_events(created_at desc);
create index if not exists idx_leak_events_severity on public.leak_events(severity);

-- ============================================================
-- ANONYMOUS INSTALL TRACKING (no PII, just counts)
-- ============================================================
create table if not exists public.extension_installs (
  id                uuid primary key default uuid_generate_v4(),
  install_id        text not null unique,
  extension_version text,
  created_at        timestamptz not null default now()
);

-- No RLS needed — insert-only from service role, no user data

-- ============================================================
-- FUNCTION: auto-update updated_at
-- ============================================================
create or replace function public.handle_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger on_user_profiles_updated
  before update on public.user_profiles
  for each row execute procedure public.handle_updated_at();

create trigger on_user_settings_updated
  before update on public.user_settings
  for each row execute procedure public.handle_updated_at();

-- ============================================================
-- FUNCTION: auto-create user_profile + user_settings on signup
-- ============================================================
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer as $$
begin
  insert into public.user_profiles (id, email)
  values (new.id, new.email)
  on conflict (id) do nothing;

  insert into public.user_settings (user_id)
  values (new.id)
  on conflict (user_id) do nothing;

  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
