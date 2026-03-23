'use client'

import Image from 'next/image'
import Link from 'next/link'

const collections = [
  {
    id: 'featured',
    image: '/home_grid_2.png',
    title: 'Exterior Collection',
    descriptor: 'Refined surfaces engineered for enduring exteriors.',
    href: '/collections/exterior',
  },
  {
    id: 'stone',
    image: '/home_grid_1.png',
    title: 'Stone Collection',
    descriptor: 'Layered mineral surfaces with architectural depth.',
    href: '/collections/stone',
  },
  {
    id: 'mineral',
    image: '/home_grid_3.png',
    title: 'Mineral Collection',
    descriptor: 'Soft tonal movement with breathable matte character.',
    href: '/collections/mineral',
  },
]

export default function SectionThree() {
  const featured = collections[0]
  const secondary = collections.slice(1)

  return (
    <section className="page-section" style={{ backgroundColor: '#F8F4EE' }}>
      <div className="container" style={{ margin: '0 auto', padding: '0 4rem' }}>
        <h2 style={{
          fontSize: 'clamp(2.5rem, 5vw, 4rem)',
          fontFamily: "'Cormorant Garamond', serif",
          fontWeight: 500,
          color: '#2B2B2B',
          lineHeight: 1.2,
          letterSpacing: '-0.02em',
          marginBottom: '4.5rem',
          marginLeft: '10vw',
        }}>
          Explore Our Collections
        </h2>

        <div
          className="collections-editorial"
          style={{
            display: 'grid',
            gridTemplateColumns: '1.65fr 1fr',
            gap: '3.25rem',
            marginLeft: '10vw',
            marginRight: '10vw',
            alignItems: 'start',
          }}
        >
          <Link
            href={featured.href}
            style={{
              display: 'flex',
              flexDirection: 'column',
              transition: 'transform 0.35s ease',
              cursor: 'pointer',
              color: 'inherit',
              textDecoration: 'none',
            }}
            className="collection-card collection-card-featured"
          >
            <div style={{
              width: '100%',
              aspectRatio: '1.18/1',
              position: 'relative',
              overflow: 'hidden',
              borderRadius: '4px',
              marginBottom: '28px',
              boxShadow: '0 10px 30px rgba(0,0,0,0.06)',
            }}>
              <Image
                src={featured.image}
                alt={featured.title}
                fill
                sizes="(max-width: 1024px) 100vw, 58vw"
                style={{ objectFit: 'cover' }}
              />
            </div>

            <div style={{
              fontSize: '0.6875rem',
              fontFamily: "'Inter', sans-serif",
              fontWeight: 400,
              color: '#6A6A6A',
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
              marginBottom: '0.5rem',
            }}>
              FEATURED COLLECTION
            </div>

            <h3 style={{
              fontSize: 'clamp(1.9rem, 2.6vw, 2.4rem)',
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 500,
              color: '#2B2B2B',
              lineHeight: 1.2,
              letterSpacing: '-0.015em',
              marginBottom: '0.8rem',
            }}>
              {featured.title}
            </h3>
            <p style={{
              fontSize: '0.98rem',
              fontFamily: "'Inter', sans-serif",
              fontWeight: 300,
              color: '#4A4A4A',
              lineHeight: 1.7,
              letterSpacing: '0.01em',
            }}>
              {featured.descriptor}
            </p>
          </Link>

          <div style={{ display: 'grid', gap: '2.6rem' }}>
          {secondary.map((finish) => (
            <Link
              key={finish.id}
              href={finish.href}
              className="collection-card"
              style={{
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.35s ease',
                cursor: 'pointer',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              <div style={{
                width: '100%',
                aspectRatio: '16/11',
                position: 'relative',
                overflow: 'hidden',
                borderRadius: '4px',
                marginBottom: '20px',
                boxShadow: '0 10px 30px rgba(0,0,0,0.06)',
              }}>
                <Image
                  src={finish.image}
                  alt={finish.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 35vw"
                  style={{ objectFit: 'cover' }}
                />
              </div>

              <div style={{
                fontSize: '0.6875rem',
                fontFamily: "'Inter', sans-serif",
                fontWeight: 400,
                color: '#6A6A6A',
                textTransform: 'uppercase',
                letterSpacing: '0.15em',
                marginBottom: '0.5rem',
              }}>
                COLLECTION
              </div>

              <h3 style={{
                fontSize: 'clamp(1.4rem, 1.9vw, 1.7rem)',
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 500,
                color: '#2B2B2B',
                lineHeight: 1.3,
                letterSpacing: '-0.01em',
                marginBottom: '0.6rem',
              }}>
                {finish.title}
              </h3>

              <p style={{
                fontSize: '0.9375rem',
                fontFamily: "'Inter', sans-serif",
                fontWeight: 300,
                color: '#4A4A4A',
                lineHeight: 1.6,
                letterSpacing: '0.01em',
                marginTop: 0, /* Ensure consistent spacing */
              }}>
                {finish.descriptor}
              </p>
            </Link>
          ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .collection-card:hover {
          transform: translateY(-4px);
        }

        .collection-card-featured:hover {
          transform: translateY(-4px);
        }

        @media (max-width: 1024px) {
          .collections-editorial {
            grid-template-columns: 1fr !important;
            gap: 2.5rem !important;
          }
        }
        
        @media (max-width: 768px) {
          .collections-editorial {
            gap: 2rem !important;
            margin-left: 0 !important;
            margin-right: 0 !important;
          }
          
          h2 {
            margin-left: 0 !important;
          }
        }
      `}</style>
    </section>
  )
}
