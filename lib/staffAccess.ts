import type { SupabaseClient, User } from '@supabase/supabase-js'
import { createSupabaseServerClient } from '@/lib/supabase/server'

export type StaffCheckResult =
  | { ok: true }
  | { ok: false; reason: string }

/**
 * Client-side staff check via Supabase RPC `is_staff()`.
 * After 20260807_staff_is_authenticated.sql, staff = any authenticated user.
 * Keep public signup disabled in Supabase Auth; create users in the Dashboard only.
 */
export async function checkIsStaff(supabase: SupabaseClient): Promise<StaffCheckResult> {
  const { data, error } = await supabase.rpc('is_staff')

  if (error) {
    if (error.message.includes('Could not find the function')) {
      return {
        ok: false,
        reason:
          'Staff access is not set up yet. Run the Supabase migrations under supabase/migrations/ (through 20260807_staff_is_authenticated.sql) in the SQL Editor.',
      }
    }
    return { ok: false, reason: 'Could not verify staff access.' }
  }

  if (!data) {
    return {
      ok: false,
      reason: 'This account is not authorized for staff access.',
    }
  }

  return { ok: true }
}

/** Server-side staff gate for API routes (e.g. media revalidation). */
export async function assertStaffSession() {
  const supabase = await createSupabaseServerClient()
  if (!supabase) {
    return { ok: false as const, status: 500, error: 'Service unavailable.' }
  }

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { ok: false as const, status: 401, error: 'Unauthorized.' }
  }

  const { data: isStaff, error: staffError } = await supabase.rpc('is_staff')

  if (staffError) {
    return { ok: false as const, status: 503, error: 'Access check failed.' }
  }

  if (!isStaff) {
    return { ok: false as const, status: 403, error: 'Forbidden.' }
  }

  return { ok: true as const, supabase, user: user as User }
}
