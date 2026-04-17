import { createBrowserClient } from '@supabase/ssr'
import { getSupabaseClientEnv } from '@/lib/supabase/config'

export function createSupabaseBrowserClient() {
  const env = getSupabaseClientEnv()
  if (!env) return null
  const { url, key } = env
  return createBrowserClient(url, key)
}
