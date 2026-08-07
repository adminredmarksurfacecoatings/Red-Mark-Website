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
3. `20250630_harden_orders_security.sql` — staff RLS via `is_staff()` (originally used `staff_allowlist`)
4. `20260807_staff_is_authenticated.sql` — **`is_staff()` = any authenticated user** (allowlist no longer required)

After step 4, any user who can sign in with Supabase Auth can access orders/media admin and pass RLS. Control access by who you create in Authentication → Users (and by keeping public sign-up off).

The `staff_allowlist` table may still exist from step 3; it is unused after step 4 and can be left in place.

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
- Any Auth user you create can open media or orders admin

## Vercel env (optional)

```
ORDERS_ALERT_EMAIL=info@redmarksurfacecoatings.com
```

## What is protected

| Layer | Protection |
|-------|------------|
| `/admin` (media) | Login required (`is_staff()` = authenticated) |
| `/admin/orders` | Login required; not indexed by search engines |
| `/api/revalidate-media` | Authenticated staff session required |
| `/api/orders/notify` | Staff session + order must exist + input sanitized |
| Database RLS | Authenticated users only (`is_staff()`) |
| Notifications | Inserts only via DB trigger; staff can mark read |
| Email alerts | Server-side only; never exposed to public |
| Public forms | FormSubmit honeypot field; CAPTCHA left off (by product choice) |

## DDoS / abuse

- Public visitors **cannot** read or write orders (RLS + auth).
- Email API **cannot** be called without a valid staff session.
- Email API **cannot** spam arbitrary order IDs (order must exist in DB).
- Vercel edge still sees normal HTTP traffic; use Vercel **Firewall / rate limits** on `/api/*` if you see abuse (unrelated to the Cleveland spike on static pages).

## Add a new staff member

1. Supabase Dashboard → Authentication → Users → **Add user**
2. Use that email/password on `/admin` or `/admin/orders`

No allowlist SQL insert is needed after `20260807_staff_is_authenticated.sql`.
