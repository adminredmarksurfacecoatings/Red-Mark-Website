import { cookies } from 'next/headers'
import { createServerClient } from '@supabase/ssr'
import { getSupabaseClientEnv } from '@/lib/supabase/config'

export async function createSupabaseServerClient() {
  const env = getSupabaseClientEnv()
  if (!env) return null

  const cookieStore = await cookies()

  return createServerClient(env.url, env.key, {
    cookies: {
      getAll() {
        return cookieStore.getAll()
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value, options }) => {
          cookieStore.set(name, value, options)
        })
      },
    },
  })
}
