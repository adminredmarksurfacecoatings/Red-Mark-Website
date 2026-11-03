'use client'

import { useEffect, useState } from 'react'
import { getOrCacheImageUrl } from '@/lib/clientImageCache'
import { isRemoteStorageImage } from '@/lib/imageUtils'

/**
 * Resolves remote images through the 24h on-device image cache.
 * Falls back to the original URL immediately, then swaps to a cached blob when ready.
 */
export function useCachedImageSrc(src: string) {
  const [displaySrc, setDisplaySrc] = useState(src)

  useEffect(() => {
    let cancelled = false
    let objectUrl: string | null = null

    setDisplaySrc(src)

    // Local images already use Next's responsive optimizer and browser cache.
    // Fetching the original here downloads it again and bypasses lazy loading.
    if (!isRemoteStorageImage(src)) return

    void (async () => {
      const next = await getOrCacheImageUrl(src)
      if (cancelled) {
        if (next.startsWith('blob:')) URL.revokeObjectURL(next)
        return
      }
      if (next.startsWith('blob:')) objectUrl = next
      setDisplaySrc(next)
    })()

    return () => {
      cancelled = true
      if (objectUrl) URL.revokeObjectURL(objectUrl)
    }
  }, [src])

  return displaySrc
}
