-- Run in Supabase SQL Editor after 20250628_create_orders.sql

create table if not exists public.order_notifications (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  order_uuid uuid not null references public.orders (id) on delete cascade,
  order_ref text not null,
  event_type text not null check (event_type in ('new_order', 'attention')),
  title text not null,
  body text not null,
  read_at timestamptz
);

create index if not exists order_notifications_created_at_idx
  on public.order_notifications (created_at desc);

create index if not exists order_notifications_unread_idx
  on public.order_notifications (read_at)
  where read_at is null;

alter table public.order_notifications enable row level security;

create policy "order_notifications_select_authenticated"
  on public.order_notifications for select
  to authenticated
  using (true);

create policy "order_notifications_update_authenticated"
  on public.order_notifications for update
  to authenticated
  using (true)
  with check (true);

create or replace function public.create_order_notification(
  p_order_uuid uuid,
  p_order_ref text,
  p_event_type text,
  p_title text,
  p_body text
) returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.order_notifications (order_uuid, order_ref, event_type, title, body)
  values (p_order_uuid, p_order_ref, p_event_type, p_title, p_body);
end;
$$;

create or replace function public.notify_order_events()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if tg_op = 'INSERT' then
    perform public.create_order_notification(
      new.id,
      new.order_id,
      'new_order',
      'New ' || new.order_type || ' order',
      new.order_id || ' — ' || nullif(trim(new.customer_name), '') || coalesce(' · ' || nullif(trim(new.items), ''), '')
    );
    return new;
  end if;

  if tg_op = 'UPDATE'
    and new.overall_status = 'Attention'
    and old.overall_status is distinct from new.overall_status then
    perform public.create_order_notification(
      new.id,
      new.order_id,
      'attention',
      'Needs attention',
      new.order_id || ' — ' || coalesce(nullif(trim(new.customer_name), ''), 'Customer') || ' requires follow-up'
    );
  end if;

  return new;
end;
$$;

drop trigger if exists orders_notify_events on public.orders;

create trigger orders_notify_events
  after insert or update on public.orders
  for each row
  execute function public.notify_order_events();

-- Realtime (skip if already added — safe to ignore duplicate errors)
-- alter publication supabase_realtime add table public.order_notifications;

-- NOTE: Supabase may warn about "destructive" because of DROP TRIGGER above.
-- That only replaces the trigger hook; it does NOT delete orders or notifications.
