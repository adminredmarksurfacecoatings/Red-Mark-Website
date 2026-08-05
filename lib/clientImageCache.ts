/**
 * On-device image cache (Cache API) with a 24-hour TTL.
 * No special browser permission required — uses the origin's normal storage quota.
 */

export const IMAGE_CACHE_NAME = 'redmark-image-cache-v1'
export const IMAGE_CACHE_TTL_MS = 24 * 60 * 60 * 1000

const CACHED_AT_HEADER = 'X-Cached-At'

function canUseCache() {
  return typeof window !== 'undefined' && 'caches' in window && typeof fetch === 'function'
}

function isCacheableSrc(src: string) {
  if (!src || src.startsWith('blob:') || src.startsWith('data:')) return false
  return src.startsWith('/') || src.startsWith('http://') || src.startsWith('https://')
}

async function readCachedAt(response: Response): Promise<number | null> {
  const header = response.headers.get(CACHED_AT_HEADER)
  if (!header) return null
  const value = Number(header)
  return Number.isFinite(value) ? value : null
}

/**
 * Returns a displayable URL — either a fresh blob: object URL from cache/network,
 * or the original src if caching is unavailable.
 * Callers must revoke blob: URLs when done.
 */
export async function getOrCacheImageUrl(src: string): Promise<string> {
  if (!canUseCache() || !isCacheableSrc(src)) return src

  try {
    const cache = await caches.open(IMAGE_CACHE_NAME)
    const absolute = new URL(src, window.location.origin).href
    const cached = await cache.match(absolute)

    if (cached) {
      const cachedAt = await readCachedAt(cached)
      if (cachedAt && Date.now() - cachedAt <= IMAGE_CACHE_TTL_MS) {
        const blob = await cached.blob()
        return URL.createObjectURL(blob)
      }
      await cache.delete(absolute)
    }

    const response = await fetch(absolute, {
      mode: 'cors',
      credentials: 'omit',
      cache: 'force-cache',
    })

    if (!response.ok) return src

    const blob = await response.blob()
    if (!blob.type.startsWith('image/') && blob.size === 0) return src

    const headers = new Headers({
      'Content-Type': blob.type || 'image/jpeg',
      [CACHED_AT_HEADER]: String(Date.now()),
    })

    await cache.put(absolute, new Response(blob.slice(), { status: 200, statusText: 'OK', headers }))
    return URL.createObjectURL(blob)
  } catch {
    return src
  }
}

/** Delete entries older than 24 hours. Safe to call on every page load. */
export async function purgeExpiredImageCache(): Promise<void> {
  if (!canUseCache()) return

  try {
    const cache = await caches.open(IMAGE_CACHE_NAME)
    const requests = await cache.keys()
    const now = Date.now()

    await Promise.all(
      requests.map(async (request) => {
        const response = await cache.match(request)
        if (!response) {
          await cache.delete(request)
          return
        }
        const cachedAt = await readCachedAt(response)
        if (!cachedAt || now - cachedAt > IMAGE_CACHE_TTL_MS) {
          await cache.delete(request)
        }
      })
    )
  } catch {
    // Ignore storage errors (private mode, quota, etc.)
  }
}
