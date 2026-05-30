import Link from 'next/link'
import { EXTERIOR_LANDING_HREF } from '@/lib/exteriorCollections'

type ExteriorSubCollectionPlaceholderProps = {
  eyebrow: string
  title: string
  description: string
}

export default function ExteriorSubCollectionPlaceholder({
  eyebrow,
  title,
  description,
}: ExteriorSubCollectionPlaceholderProps) {
  return (
    <>
      <section className="page-section page-section--first exterior-sub-back-section">
        <div className="container" style={{ margin: '0 auto', padding: '0 4rem' }}>
          <Link href={EXTERIOR_LANDING_HREF} className="exterior-sub-back-link">
            ← Exterior Collection
          </Link>
        </div>
      </section>

      <section className="page-section" style={{ backgroundColor: 'var(--bg-primary)', textAlign: 'center' }}>
        <div className="container" style={{ margin: '0 auto', padding: '0 4rem', maxWidth: '720px' }}>
          <p className="exterior-landing-hero__eyebrow">{eyebrow}</p>

          <h1
            style={{
              fontSize: 'clamp(2.75rem, 5vw, 4rem)',
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 500,
              color: '#2B2B2B',
              lineHeight: 1.15,
              letterSpacing: '-0.02em',
              marginBottom: '1.75rem',
            }}
          >
            {title}
          </h1>

          <p
            style={{
              fontSize: 'clamp(1rem, 1.25vw, 1.125rem)',
              fontFamily: "'Inter', sans-serif",
              fontWeight: 300,
              color: '#4A4A4A',
              lineHeight: 1.85,
              letterSpacing: '0.01em',
              marginBottom: '2.5rem',
            }}
          >
            {description}
          </p>

          <p
            style={{
              fontSize: '0.8125rem',
              fontFamily: "'Inter', sans-serif",
              fontWeight: 400,
              color: '#6A6A6A',
              textTransform: 'uppercase',
              letterSpacing: '0.14em',
              marginBottom: '2rem',
            }}
          >
            Collection coming soon
          </p>

          <Link href="/contact" className="btn">
            Discuss Your Project →
          </Link>
        </div>
      </section>
    </>
  )
}
