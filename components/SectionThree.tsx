'use client'

import Image from 'next/image'
import Link from 'next/link'
import { getCollectionsForNav } from '@/lib/collections'
import {
  formatFinishApplications,
  getPrimaryFeaturedFinish,
  getSecondaryFeaturedFinishes,
} from '@/lib/finishCatalog'

const sectionHeadingStyle = {
  fontSize: 'clamp(2.5rem, 5vw, 4rem)',
  fontFamily: "'Cormorant Garamond', serif",
  fontWeight: 500,
  color: '#2B2B2B',
  lineHeight: 1.2,
  letterSpacing: '-0.02em',
  marginBottom: '3rem',
  marginLeft: '10vw',
} as const

const eyebrowStyle = {
  fontSize: '0.6875rem',
  fontFamily: "'Inter', sans-serif",
  fontWeight: 400,
  color: '#6A6A6A',
  textTransform: 'uppercase' as const,
  letterSpacing: '0.15em',
  marginBottom: '0.5rem',
}

const cardTitleStyle = {
  fontFamily: "'Cormorant Garamond', serif",
  fontWeight: 500,
  color: '#2B2B2B',
  letterSpacing: '-0.015em',
}

const cardBodyStyle = {
  fontSize: '0.98rem',
  fontFamily: "'Inter', sans-serif",
  fontWeight: 300,
  color: '#4A4A4A',
  lineHeight: 1.7,
  letterSpacing: '0.01em',
}

function ApplicationBadge({ label }: { label: string }) {
  return (
    <span
      style={{
        display: 'inline-block',
        fontSize: '0.625rem',
        fontFamily: "'Inter', sans-serif",
        fontWeight: 400,
        color: '#8B4513',
        textTransform: 'uppercase',
        letterSpacing: '0.12em',
        marginBottom: '0.65rem',
      }}
    >
      {label}
    </span>
  )
}

export default function SectionThree() {
  const primaryFeatured = getPrimaryFeaturedFinish()
  const secondaryFeatured = getSecondaryFeaturedFinishes()
  const collections = getCollectionsForNav()

  return (
    <section className="page-section home-finishes-section" style={{ backgroundColor: '#F8F4EE' }}>
      <div className="container" style={{ margin: '0 auto', padding: '0 4rem' }}>
        {primaryFeatured ? (
          <div className="home-finishes-block">
            <h2 style={sectionHeadingStyle}>Featured Collections</h2>

            <div className="featured-finishes-editorial">
              <Link
                href={primaryFeatured.href}
                className="collection-card collection-card-featured"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.35s ease',
                  cursor: 'pointer',
                  color: 'inherit',
                  textDecoration: 'none',
                }}
              >
                <div
                  style={{
                    width: '100%',
                    aspectRatio: '1.18/1',
                    position: 'relative',
                    overflow: 'hidden',
                    borderRadius: '4px',
                    marginBottom: '28px',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.06)',
                  }}
                >
                  <Image
                    src={primaryFeatured.image}
                    alt={primaryFeatured.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 58vw"
                    quality={75}
                    style={{ objectFit: 'cover' }}
                  />
                </div>

                <ApplicationBadge label={formatFinishApplications(primaryFeatured.applications)} />
                <div style={eyebrowStyle}>{primaryFeatured.eyebrow}</div>

                <h3
                  style={{
                    ...cardTitleStyle,
                    fontSize: 'clamp(1.9rem, 2.6vw, 2.4rem)',
                    lineHeight: 1.2,
                    marginBottom: '0.8rem',
                  }}
                >
                  {primaryFeatured.title}
                </h3>
                <p style={cardBodyStyle}>{primaryFeatured.description}</p>
              </Link>

              {secondaryFeatured.length > 0 ? (
                <div style={{ display: 'grid', gap: '2.6rem' }}>
                  {secondaryFeatured.map((finish) => (
                    <Link
                      key={finish.slug}
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
                      <div
                        style={{
                          width: '100%',
                          aspectRatio: '16/11',
                          position: 'relative',
                          overflow: 'hidden',
                          borderRadius: '4px',
                          marginBottom: '20px',
                          boxShadow: '0 10px 30px rgba(0,0,0,0.06)',
                        }}
                      >
                        <Image
                          src={finish.image}
                          alt={finish.title}
                          fill
                          sizes="(max-width: 1024px) 100vw, 35vw"
                          quality={75}
                          style={{ objectFit: 'cover' }}
                        />
                      </div>

                      <ApplicationBadge label={formatFinishApplications(finish.applications)} />
                      <div style={eyebrowStyle}>{finish.eyebrow}</div>

                      <h3
                        style={{
                          ...cardTitleStyle,
                          fontSize: 'clamp(1.4rem, 1.9vw, 1.7rem)',
                          lineHeight: 1.3,
                          marginBottom: '0.6rem',
                        }}
                      >
                        {finish.title}
                      </h3>
                      <p
                        style={{
                          ...cardBodyStyle,
                          fontSize: '0.9375rem',
                          lineHeight: 1.6,
                          marginTop: 0,
                        }}
                      >
                        {finish.description}
                      </p>
                    </Link>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
        ) : null}

        <div className="home-finishes-block home-finishes-block--collections">
          <h2
            style={{
              ...sectionHeadingStyle,
              marginBottom: '3.5rem',
            }}
          >
            Explore Our Collections
          </h2>

          <p
            className="home-finishes-subheading"
            style={{
              fontSize: '0.6875rem',
              fontFamily: "'Inter', sans-serif",
              fontWeight: 400,
              color: '#6A6A6A',
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
              marginBottom: '2.5rem',
              marginLeft: '10vw',
            }}
          >
            Browse by application
          </p>

          <div className="application-collections-grid">
            {collections.map((collection) => (
              <Link
                key={collection.slug}
                href={collection.href}
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
                <div
                  style={{
                    width: '100%',
                    aspectRatio: '4/3',
                    position: 'relative',
                    overflow: 'hidden',
                    borderRadius: '4px',
                    marginBottom: '1.5rem',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.06)',
                  }}
                >
                  <Image
                    src={collection.image}
                    alt={collection.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    quality={75}
                    style={{ objectFit: 'cover' }}
                  />
                </div>

                <div style={eyebrowStyle}>Collection</div>

                <h3
                  style={{
                    ...cardTitleStyle,
                    fontSize: 'clamp(1.4rem, 1.9vw, 1.75rem)',
                    lineHeight: 1.3,
                    marginBottom: '0.75rem',
                  }}
                >
                  {collection.title}
                </h3>
                <p
                  style={{
                    ...cardBodyStyle,
                    fontSize: '0.9375rem',
                    lineHeight: 1.6,
                    marginTop: 0,
                  }}
                >
                  {collection.description}
                </p>
              </Link>
            ))}
          </div>

          <div className="home-finishes-view-all">
            <Link
              href="/finishes"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '0.875rem',
                fontWeight: 400,
                color: '#2B2B2B',
                letterSpacing: '0.06em',
                textDecoration: 'none',
                borderBottom: '1px solid rgba(43, 43, 43, 0.35)',
                paddingBottom: '2px',
              }}
            >
              View all finishes →
            </Link>
          </div>
        </div>
      </div>

      <style jsx>{`
        .home-finishes-block--collections {
          margin-top: 5.5rem;
        }

        .featured-finishes-editorial {
          display: grid;
          grid-template-columns: 1.65fr 1fr;
          gap: 3.25rem;
          margin-left: 10vw;
          margin-right: 10vw;
          align-items: start;
        }

        .application-collections-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 3rem;
          margin-left: 10vw;
          margin-right: 10vw;
        }

        .home-finishes-view-all {
          margin-top: 3.5rem;
          margin-left: 10vw;
        }

        .collection-card:hover,
        .collection-card-featured:hover {
          transform: translateY(-4px);
        }

        @media (max-width: 1024px) {
          .featured-finishes-editorial {
            grid-template-columns: 1fr;
            gap: 2.5rem;
          }

          .application-collections-grid {
            grid-template-columns: 1fr;
            gap: 2.5rem;
          }
        }

        @media (max-width: 768px) {
          .featured-finishes-editorial,
          .application-collections-grid {
            margin-left: 0;
            margin-right: 0;
          }

          .home-finishes-view-all,
          .home-finishes-subheading,
          h2 {
            margin-left: 0 !important;
          }

          .home-finishes-block--collections {
            margin-top: 4rem;
          }
        }
      `}</style>
    </section>
  )
}
