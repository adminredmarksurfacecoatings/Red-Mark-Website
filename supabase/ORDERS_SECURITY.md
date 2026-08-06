# Orders admin — security setup

## Supabase "destructive query" warning

If Supabase warns about **destructive operations**, it is usually because the script contains:

```sql
DROP TRIGGER IF EXISTS ...
```

That **only replaces a trigger definition**. It does **not** delete your `orders` table, order rows, or customer data. It is safe when you are setting up notifications for the first time (or re-running the trigger section).

## Run migrations in order

1. `20250628_create_orders.sql` — orders table
2. `20250629_order_notifications.sql` — notifications + trigger
3. `20250630_harden_orders_security.sql` — **staff allowlist + locked-down RLS**

After step 3, **only emails in `staff_allowlist` can access orders**. Edit the `INSERT` at the top of step 3 with your real Supabase Auth login emails.

## Enable Realtime (Dashboard)

Database → **Replication** → enable:

- `orders`
- `order_notifications`

## Supabase Auth (Dashboard)

Authentication → **Providers** → Email:

- Turn **OFF** “Allow new users to sign up” / public sign-up (required)
- The website has **sign-in only** — no register / create-account UI
- Create staff users in Dashboard → Authentication → Users → **Add user**, or invite them
- Use strong passwords for staff accounts
- Only emails listed in `staff_allowlist` can open media or orders admin

## Vercel env (optional)

```
ORDERS_ALERT_EMAIL=info@redmarksurfacecoatings.com
```

## What is protected

| Layer | Protection |
|-------|------------|
| `/admin` (media) | Login + staff allowlist (`is_staff()`) |
| `/admin/orders` | Login + staff allowlist; not indexed by search engines |
| `/api/revalidate-media` | Staff session required |
| `/api/orders/notify` | Staff session + order must exist + input sanitized |
| Database RLS | Staff allowlist only (`is_staff()`) |
| Notifications | Inserts only via DB trigger; staff can mark read |
| Email alerts | Server-side only; never exposed to public |
| Public forms | FormSubmit honeypot field; CAPTCHA left off (by product choice) |

## DDoS / abuse

- Public visitors **cannot** read or write orders (RLS + auth).
- Email API **cannot** be called without a valid staff session.
- Email API **cannot** spam arbitrary order IDs (order must exist in DB).
- Vercel edge still sees normal HTTP traffic; use Vercel **Firewall / rate limits** on `/api/*` if you see abuse (unrelated to the Cleveland spike on static pages).

## Add a new staff member

```sql
insert into public.staff_allowlist (email)
values ('newperson@yourcompany.com')
on conflict (email) do nothing;
```

Use the **same email** they use to sign in on `/admin/orders`.
