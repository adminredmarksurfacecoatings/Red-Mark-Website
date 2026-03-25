'use client'

import { useState } from 'react'

export default function AlertBanner() {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  return (
    <div style={{
      backgroundColor: 'var(--dark-red)',
      padding: '0.75rem 0',
      textAlign: 'center',
      borderBottom: '1px solid var(--border-color)',
      position: 'relative',
    }}>
      <p style={{
        fontSize: '0.875rem',
        color: 'var(--text-gray)',
        margin: 0,
      }}>
        Have questions? Contact us at{' '}
        <a href="mailto:info@redmarksurfacecoatings.com" style={{ color: 'var(--lighter-red)' }}>
          info@redmarksurfacecoatings.com
        </a>
      </p>
      <button
        onClick={() => setIsVisible(false)}
        style={{
          position: 'absolute',
          right: '2rem',
          top: '50%',
          transform: 'translateY(-50%)',
          background: 'none',
          border: 'none',
          color: 'var(--text-gray)',
          cursor: 'pointer',
          fontSize: '1.25rem',
          padding: '0.25rem 0.5rem',
        }}
        aria-label="Close banner"
      >
        ×
      </button>
    </div>
  )
}
