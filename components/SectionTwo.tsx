export default function SectionTwo() {
  return (
    <section
      className="page-section page-section--first"
      style={{
        position: 'relative',
        minHeight: '100vh',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
      }}
    >
      {/* Background Image */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundImage: 'url(/section_2.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        zIndex: 0,
      }}></div>
      
      {/* Extremely Subtle Warm Overlay (5-8% opacity) */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.06)',
        zIndex: 1,
      }}></div>

      {/* Content Container - Left Aligned */}
      <div style={{
        position: 'relative',
        zIndex: 2,
        maxWidth: '650px',
        marginLeft: '10vw',
        width: '100%',
      }}>
        {/* Overlay Panel */}
        <div style={{
          backgroundColor: 'rgba(245, 242, 237, 0.89)', /* Soft mineral off-white, 89% opacity - more integrated */
          padding: '80px', /* 70-90px range, using 80px */
          borderRadius: '2px', /* Very subtle or sharp edges */
        }}>
          <h2 style={{
            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 500,
            marginBottom: '3rem', /* More breathing room between heading and body */
            color: '#2B2B2B', /* Deep charcoal */
            lineHeight: 1.2,
            letterSpacing: '-0.02em',
          }}>
            Surfaces That Breathe With Light
          </h2>
          
          <div style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 'clamp(1rem, 1.25vw, 1.125rem)',
            lineHeight: 2.05, /* Increased by ~8% (from 1.9 to 2.05) for luxury spacing */
            color: '#2B2B2B',
            fontWeight: 300,
            letterSpacing: '0.01em',
          }}>
            <p style={{
              marginBottom: '2rem', /* Comfortable paragraph spacing */
            }}>
              Natural mineral finishes shaped by hand. Subtle movement, tonal depth, and texture that evolves with time.
            </p>
            
            <p>
              Crafted in India with a reverence for European material tradition — designed for spaces that feel grounded, warm, and enduring.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
