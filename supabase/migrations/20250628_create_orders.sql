-- Run this in the Supabase SQL Editor (Dashboard → SQL → New query)

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  order_id text not null unique,
  created_at timestamptz not null default now(),
  order_type text not null default 'Regular' check (order_type in ('Regular', 'Special')),
  customer_name text not null default '',
  customer_phone text not null default '',
  items text not null default '',
  quantity integer not null default 1 check (quantity > 0),
  special_instructions text not null default '',
  assigned_to text not null default '',
  factory_status text not null default 'Pending',
  current_location text not null default 'Office',
  overall_status text not null default 'New',
  expected_ready timestamptz,
  notes text not null default '',
  last_updated_by text not null default '',
  last_updated_at timestamptz not null default now()
);

create index if not exists orders_created_at_idx on public.orders (created_at desc);
create index if not exists orders_order_id_idx on public.orders (order_id);
create index if not exists orders_overall_status_idx on public.orders (overall_status);

alter table public.orders enable row level security;

create policy "orders_select_authenticated"
  on public.orders for select
  to authenticated
  using (true);

create policy "orders_insert_authenticated"
  on public.orders for insert
  to authenticated
  with check (true);

create policy "orders_update_authenticated"
  on public.orders for update
  to authenticated
  using (true)
  with check (true);

create policy "orders_delete_authenticated"
  on public.orders for delete
  to authenticated
  using (true);

-- Realtime (run separately if the publication already includes orders)
alter publication supabase_realtime add table public.orders;
