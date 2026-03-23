'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export default function GlobalMotionEffects() {
  const pathname = usePathname()

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (!('IntersectionObserver' in window)) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion) return

    const targets = Array.from(
      document.querySelectorAll<HTMLElement>(
        `
        main section h1,
        main section h2,
        main section h3,
        main section p,
        main section .btn,
        main section .collection-link,
        main section .explore-link,
        main section .material-detail-grid > *,
        main section .finishes-grid > *,
        main section .projects-preview-grid > *,
        main section .projects-masonry-grid > *,
        main section .finishes-masonry-grid > *,
        main section .collections-editorial > *,
        main section .why-red-mark-grid > *,
        main section .for-pro-mini-grid > *,
        main section .real-project-grid > *,
        main section .collection-card,
        main section .professional-card-link
        `
      )
    ).filter((node) => !node.closest('.image-modal-overlay'))

    targets.forEach((node) => node.classList.add('motion-reveal-target'))

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const element = entry.target as HTMLElement
            element.classList.add('motion-reveal-visible')
            observer.unobserve(element)
          }
        })
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.15 }
    )

    targets.forEach((node) => observer.observe(node))

    return () => {
      observer.disconnect()
    }
  }, [pathname])

  return null
}
