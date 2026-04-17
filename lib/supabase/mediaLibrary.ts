import { createClient } from '@supabase/supabase-js'

export const MEDIA_BUCKET = 'project-images'
export const DISABLED_PREFIX = '_disabled'

export const MEDIA_FOLDERS = [
  { id: 'projects', label: 'Projects', path: 'projects' },
  { id: 'finishes', label: 'Finishes (Main)', path: 'finishes' },
  { id: 'stone', label: 'Stone Collection', path: 'finishes/stone' },
  { id: 'mineral', label: 'Mineral Collection', path: 'finishes/mineral' },
  { id: 'exterior', label: 'Exterior Collection', path: 'finishes/exterior' },
] as const

export type MediaFolderId = (typeof MEDIA_FOLDERS)[number]['id']

function getSupabaseClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key =
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!url || !key) return null
  return createClient(url, key)
}

export function folderPathFromId(folderId: MediaFolderId): string {
  return MEDIA_FOLDERS.find((f) => f.id === folderId)?.path ?? 'projects'
}

export function toDisabledPath(path: string): string {
  if (path.startsWith(`${DISABLED_PREFIX}/`)) return path
  return `${DISABLED_PREFIX}/${path}`
}

export function toEnabledPath(path: string): string {
  if (!path.startsWith(`${DISABLED_PREFIX}/`)) return path
  return path.slice(DISABLED_PREFIX.length + 1)
}

export async function fetchEnabledMediaUrls(folderPath: string): Promise<string[]> {
  const supabase = getSupabaseClient()
  if (!supabase) return []

  const { data, error } = await supabase.storage.from(MEDIA_BUCKET).list(folderPath, {
    limit: 200,
    sortBy: { column: 'created_at', order: 'desc' },
  })

  if (error || !data) return []

  return data
    .filter((file) => Boolean(file.name))
    .map((file) => `${folderPath}/${file.name}`)
    .map((path) => supabase.storage.from(MEDIA_BUCKET).getPublicUrl(path).data.publicUrl)
}
