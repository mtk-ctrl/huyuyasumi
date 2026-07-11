-- ライフクエスト：家族1アカウント分の状態をJSONで保存するテーブル
create table if not exists public.lifequest_state (
  user_id uuid primary key references auth.users(id) on delete cascade,
  state jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.lifequest_state enable row level security;

drop policy if exists "own lifequest state select" on public.lifequest_state;
create policy "own lifequest state select"
on public.lifequest_state
for select
to authenticated
using ((select auth.uid()) = user_id);

drop policy if exists "own lifequest state insert" on public.lifequest_state;
create policy "own lifequest state insert"
on public.lifequest_state
for insert
to authenticated
with check ((select auth.uid()) = user_id);

drop policy if exists "own lifequest state update" on public.lifequest_state;
create policy "own lifequest state update"
on public.lifequest_state
for update
to authenticated
using ((select auth.uid()) = user_id)
with check ((select auth.uid()) = user_id);

drop policy if exists "own lifequest state delete" on public.lifequest_state;
create policy "own lifequest state delete"
on public.lifequest_state
for delete
to authenticated
using ((select auth.uid()) = user_id);

grant select, insert, update, delete on public.lifequest_state to authenticated;
