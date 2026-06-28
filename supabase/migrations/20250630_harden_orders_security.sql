-- Security hardening for orders + notifications (run AFTER 20250628 + 20250629)
--
-- WHY SUPABASE SHOWS "destructive": earlier scripts use DROP TRIGGER IF EXISTS.
-- That only replaces the trigger definition — it does NOT delete order rows or tables.
--
-- STEP AFTER THIS FILE: Add your staff emails (required — only these accounts can access orders)
-- Replace with real employee login emails from Supabase Auth:
--
--   insert into public.staff_allowlist (email)
--   values ('you@redmarksurfacecoatings.com')
--   on conflict (email) do nothing;

-- ---------------------------------------------------------------------------
-- Staff allowlist (no public access — managed via SQL Editor / service role)
-- ---------------------------------------------------------------------------

create table if not exists public.staff_allowlist (
  email text primary key,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

alter table public.staff_allowlist enable row level security;

-- No policies on staff_allowlist = only service role can read/write the list.

create or replace function public.is_staff()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.staff_allowlist s
    where s.active = true
      and lower(s.email) = lower(coalesce(auth.jwt() ->> 'email', ''))
  );
$$;

revoke all on function public.is_staff() from public, anon;
grant execute on function public.is_staff() to authenticated;

-- Lock down notification helper — only triggers (definer) may call internally
revoke all on function public.create_order_notification(uuid, text, text, text, text) from public, anon, authenticated;

-- ---------------------------------------------------------------------------
-- Replace permissive RLS with staff-only policies
-- ---------------------------------------------------------------------------

drop policy if exists "orders_select_authenticated" on public.orders;
drop policy if exists "orders_insert_authenticated" on public.orders;
drop policy if exists "orders_update_authenticated" on public.orders;
drop policy if exists "orders_delete_authenticated" on public.orders;

create policy "orders_select_staff"
  on public.orders for select
  to authenticated
  using (public.is_staff());

create policy "orders_insert_staff"
  on public.orders for insert
  to authenticated
  with check (public.is_staff());

create policy "orders_update_staff"
  on public.orders for update
  to authenticated
  using (public.is_staff())
  with check (public.is_staff());

create policy "orders_delete_staff"
  on public.orders for delete
  to authenticated
  using (public.is_staff());

drop policy if exists "order_notifications_select_authenticated" on public.order_notifications;
drop policy if exists "order_notifications_update_authenticated" on public.order_notifications;

create policy "order_notifications_select_staff"
  on public.order_notifications for select
  to authenticated
  using (public.is_staff());

-- Staff may only mark notifications read (read_at). Inserts come from DB trigger only.
create policy "order_notifications_update_staff"
  on public.order_notifications for update
  to authenticated
  using (public.is_staff())
  with check (public.is_staff());

-- No INSERT/DELETE policies on order_notifications for authenticated users.
