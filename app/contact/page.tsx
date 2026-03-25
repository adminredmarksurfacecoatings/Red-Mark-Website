import type { Metadata } from 'next'
import Image from 'next/image'
import ContactForm from '@/components/ContactForm'

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Start a project conversation with Red Mark for material guidance, finish selection, and technical support.',
}

export default function ContactPage() {
  const whatsappHref =
    'https://wa.me/918968310500?text=Hello%2C%20I%E2%80%99m%20interested%20in%20your%20surface%20finishes.%20I%E2%80%99d%20like%20to%20discuss%20a%20project.'

  return (
    <>
      {/* Section 1 — Hero */}
      <section className="page-section page-section--first" style={{ backgroundColor: 'var(--bg-primary)', textAlign: 'center' }}>
        <div className="container" style={{ margin: '0 auto', padding: '0 4rem' }}>
          <h1 style={{
            fontSize: 'clamp(3rem, 6vw, 5rem)',
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 500,
            color: '#2B2B2B',
            lineHeight: 1.2,
            letterSpacing: '-0.02em',
            marginBottom: '3rem', /* Generous spacing between heading and subtext */
          }}>
            Contact
          </h1>
          
          <p style={{
            fontSize: 'clamp(1rem, 1.5vw, 1.25rem)',
            fontFamily: "'Inter', sans-serif",
            fontWeight: 300,
            color: '#4A4A4A',
            lineHeight: 1.7,
            letterSpacing: '0.01em',
            maxWidth: '650px',
            margin: '0 auto',
          }}>
            For project inquiries, collaborations, or product information, feel free to reach out.
          </p>
        </div>
      </section>

      {/* Section 2 — Feature Image */}
      <section className="page-section" style={{ backgroundColor: 'var(--bg-primary)' }}>
        <div className="container" style={{ margin: '0 auto', padding: '0 4rem' }}>
          <div style={{
            width: '100%',
            height: '400px',
            position: 'relative',
            overflow: 'hidden',
            borderRadius: '4px',
          }}>
            <Image
              src="/Finishes/ChatGPT-Image-Feb-17-2026-04_15_19-PM.png"
              alt="Red Mark Surface Coatings"
              fill
              sizes="100vw"
              quality={75}
              style={{
                objectFit: 'cover',
                filter: 'brightness(0.96) saturate(0.95)',
              }}
            />
            {/* Gradient Overlay */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'linear-gradient(to bottom, rgba(245,242,238,0.05), rgba(245,242,238,0.25))',
              pointerEvents: 'none',
            }}></div>
          </div>
        </div>
      </section>

      {/* Section 3 — Contact Section */}
      <section className="page-section" style={{ backgroundColor: 'var(--bg-primary)' }}>
        <div className="container" style={{ margin: '0 auto', padding: '0 4rem' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '80px',
            alignItems: 'flex-start',
            marginLeft: '10vw',
            marginRight: '10vw',
          }}
          className="material-detail-grid"
          >
            {/* Left Column: Contact Information */}
            <div>
              <h2 style={{
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 500,
                color: '#2B2B2B',
                lineHeight: 1.2,
                letterSpacing: '-0.02em',
                marginBottom: '2rem',
              }}>
                Get in Touch
              </h2>
              
              <p style={{
                fontSize: 'clamp(1rem, 1.25vw, 1.125rem)',
                fontFamily: "'Inter', sans-serif",
                fontWeight: 300,
                color: '#4A4A4A',
                lineHeight: 1.8,
                letterSpacing: '0.01em',
                marginBottom: '3rem',
              }}>
                Whether you're an architect, builder, designer, or homeowner, our team is happy to assist with project inquiries, surface finishes, and product information.
              </p>

              {/* Contact Details */}
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '24px',
              }}>
                {/* Email */}
                <div>
                  <div style={{
                    fontSize: '0.875rem',
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 500,
                    color: '#2B2B2B',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    marginBottom: '0.5rem',
                  }}>
                    Email
                  </div>
                  <a
                    href="mailto:info@redmarksurfacecoatings.com"
                    style={{
                      fontSize: 'clamp(1rem, 1.25vw, 1.125rem)',
                      fontFamily: "'Inter', sans-serif",
                      fontWeight: 300,
                      color: '#4A4A4A',
                      textDecoration: 'none',
                      display: 'inline-block',
                      position: 'relative',
                      paddingBottom: '0.25rem',
                    }}
                    className="collection-link"
                  >
                    info@redmarksurfacecoatings.com
                  </a>
                  <div style={{
                    fontSize: '0.8125rem',
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 300,
                    color: '#6A6A6A',
                    marginTop: '0.5rem',
                  }}>
                    Preferred contact method: Email
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <div style={{
                    fontSize: '0.875rem',
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 500,
                    color: '#2B2B2B',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    marginBottom: '0.5rem',
                  }}>
                    Phone
                  </div>
                  <a
                    href="tel:+918968310500"
                    style={{
                      fontSize: 'clamp(1rem, 1.25vw, 1.125rem)',
                      fontFamily: "'Inter', sans-serif",
                      fontWeight: 300,
                      color: '#4A4A4A',
                      textDecoration: 'none',
                      display: 'inline-block',
                      position: 'relative',
                      paddingBottom: '0.25rem',
                    }}
                    className="collection-link"
                  >
                    +91 89683 10500
                  </a>

                  <div
                    style={{
                      marginTop: '1.1rem',
                      fontSize: '0.8125rem',
                      fontFamily: "'Inter', sans-serif",
                      fontWeight: 300,
                      color: '#6A6A6A',
                      lineHeight: 1.6,
                    }}
                  >
                    For faster response
                  </div>

                  <a
                    href={whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="whatsapp-inquiry-btn"
                    aria-label="WhatsApp Inquiry: chat now"
                  >
                    WhatsApp Inquiry &rarr;
                  </a>

                  <div
                    style={{
                      marginTop: '0.55rem',
                      fontSize: '0.8125rem',
                      fontFamily: "'Inter', sans-serif",
                      fontWeight: 300,
                      color: '#6A6A6A',
                      lineHeight: 1.6,
                    }}
                  >
                    Direct WhatsApp responses are usually faster.
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Contact Form */}
            <div>
              <h3 style={{
                fontSize: 'clamp(1.5rem, 2.5vw, 2rem)',
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 500,
                color: '#2B2B2B',
                lineHeight: 1.2,
                letterSpacing: '-0.02em',
                marginBottom: '0.75rem',
              }}>
                Project Inquiry
              </h3>
              
              <p style={{
                fontSize: 'clamp(0.9375rem, 1.125vw, 1rem)',
                fontFamily: "'Inter', sans-serif",
                fontWeight: 300,
                color: '#4A4A4A',
                lineHeight: 1.6,
                letterSpacing: '0.01em',
                marginBottom: '2rem',
              }}>
                Submit the form below and our team will review your project requirements.
              </p>

              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
