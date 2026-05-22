import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'
import { NextResponse } from 'next/server'
import { getSupabaseClientEnv } from '@/lib/supabase/config'

const PUBLIC_MEDIA_PATHS = [
  '/projects',
  '/finishes',
  '/collections/stone',
  '/collections/mineral',
  '/collections/exterior',
]

export async function POST() {
  const env = getSupabaseClientEnv()
  if (!env) {
    return NextResponse.json({ error: 'Supabase is not configured.' }, { status: 500 })
  }

  const cookieStore = await cookies()
  const supabase = createServerClient(env.url, env.key, {
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

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  for (const path of PUBLIC_MEDIA_PATHS) {
    revalidatePath(path)
  }

  return NextResponse.json({ revalidated: true })
}
