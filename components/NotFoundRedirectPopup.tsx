'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

export default function NotFoundRedirectPopup() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [show, setShow] = useState(false)

  useEffect(() => {
    const flag = searchParams.get('notFound')
    if (flag !== '1') return

    setShow(true)

    const hideTimer = setTimeout(() => setShow(false), 4500)
    const cleanupTimer = setTimeout(() => router.replace('/'), 5200)

    return () => {
      clearTimeout(hideTimer)
      clearTimeout(cleanupTimer)
    }
  }, [router, searchParams])

  if (!show) return null

  return (
    <div
      role="status"
      aria-live="polite"
      style={{
        position: 'fixed',
        top: '18px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 9999,
        padding: '0.9rem 1.1rem',
        borderRadius: '10px',
        background: 'rgba(245, 242, 238, 0.92)',
        border: '1px solid rgba(43, 43, 43, 0.12)',
        boxShadow: '0 18px 40px rgba(0,0,0,0.12)',
        backdropFilter: 'blur(10px)',
        color: '#2B2B2B',
        fontFamily: "'Inter', sans-serif",
        fontSize: '0.95rem',
        fontWeight: 400,
        letterSpacing: '0.01em',
      }}
    >
      Page not found. You’ve been redirected to the home page.
    </div>
  )
}

