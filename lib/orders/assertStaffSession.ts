import { createSupabaseServerClient } from '@/lib/supabase/server'

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

  return { ok: true as const, supabase, user }
}
