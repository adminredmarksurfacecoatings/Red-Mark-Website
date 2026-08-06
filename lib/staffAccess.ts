import type { SupabaseClient } from '@supabase/supabase-js'

export type StaffCheckResult =
  | { ok: true }
  | { ok: false; reason: string }

/**
 * Client-side staff check via Supabase RPC `is_staff()`.
 * Requires staff_allowlist + 20250630_harden_orders_security.sql.
 */
export async function checkIsStaff(supabase: SupabaseClient): Promise<StaffCheckResult> {
  const { data, error } = await supabase.rpc('is_staff')

  if (error) {
    if (error.message.includes('Could not find the function')) {
      return {
        ok: false,
        reason:
          'Staff allowlist is not set up yet. Run supabase/migrations/20250630_harden_orders_security.sql in the Supabase SQL Editor, then add your login email to staff_allowlist.',
      }
    }
    return { ok: false, reason: 'Could not verify staff access.' }
  }

  if (!data) {
    return {
      ok: false,
      reason:
        'This account is not authorized. Ask an admin to add your email to staff_allowlist in Supabase.',
    }
  }

  return { ok: true }
}
