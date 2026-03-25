'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function NotFound() {
  const router = useRouter()

  useEffect(() => {
    const t = setTimeout(() => {
      router.replace('/?notFound=1')
    }, 700)

    return () => clearTimeout(t)
  }, [router])

  return (
    <div
      style={{
        minHeight: '70vh',
        display: 'grid',
        placeItems: 'center',
        padding: '6rem 1.5rem',
        backgroundColor: 'var(--bg-primary)',
      }}
    >
      <div style={{ textAlign: 'center', maxWidth: 720 }}>
        <div
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(2.5rem, 6vw, 4rem)',
            fontWeight: 500,
            letterSpacing: '-0.02em',
            color: '#2B2B2B',
            marginBottom: '1rem',
          }}
        >
          Page not found
        </div>
        <div
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '1rem',
            fontWeight: 300,
            lineHeight: 1.8,
            color: '#4A4A4A',
          }}
        >
          Redirecting you to the home page…
        </div>
      </div>
    </div>
  )
}

