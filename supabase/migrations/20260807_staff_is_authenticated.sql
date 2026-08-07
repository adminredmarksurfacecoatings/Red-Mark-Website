-- Remove staff_allowlist gating from is_staff().
-- Staff access = any authenticated Supabase Auth user.
-- Keep public.staff_allowlist table (unused) to avoid a destructive drop.
--
-- Run this in the Supabase SQL Editor after 20250630_harden_orders_security.sql.
-- Pair with Auth → Providers → Email: "Allow new users to sign up" OFF.

create or replace function public.is_staff()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select auth.uid() is not null;
$$;

revoke all on function public.is_staff() from public, anon;
grant execute on function public.is_staff() to authenticated;
