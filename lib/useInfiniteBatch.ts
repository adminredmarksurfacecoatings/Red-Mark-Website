'use client'

import { useEffect, useRef, useState } from 'react'

export const GALLERY_INITIAL_BATCH = 20
export const GALLERY_LOAD_BATCH = 20

/**
 * Renders items in batches as the user scrolls near the bottom sentinel.
 * Keeps initial DOM/image load light so large galleries don't crash mobile browsers.
 */
export function useInfiniteBatch<T>(
  items: T[],
  initialCount = GALLERY_INITIAL_BATCH,
  batchSize = GALLERY_LOAD_BATCH
) {
  const [visibleCount, setVisibleCount] = useState(() => Math.min(initialCount, items.length))
  const sentinelRef = useRef<HTMLDivElement | null>(null)
  const itemsLengthRef = useRef(items.length)
  const loadingRef = useRef(false)
  const hasMore = visibleCount < items.length

  itemsLengthRef.current = items.length

  useEffect(() => {
    setVisibleCount(Math.min(initialCount, items.length))
  }, [items, initialCount])

  useEffect(() => {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      setVisibleCount(itemsLengthRef.current)
      return
    }

    const node = sentinelRef.current
    if (!node) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return
        if (loadingRef.current) return

        loadingRef.current = true
        setVisibleCount((current) => {
          if (current >= itemsLengthRef.current) return current
          return Math.min(current + batchSize, itemsLengthRef.current)
        })

        window.setTimeout(() => {
          loadingRef.current = false
        }, 450)
      },
      { rootMargin: '400px 0px', threshold: 0 }
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [batchSize, items])

  return {
    visibleItems: items.slice(0, visibleCount),
    visibleCount,
    sentinelRef,
    hasMore,
  }
}
