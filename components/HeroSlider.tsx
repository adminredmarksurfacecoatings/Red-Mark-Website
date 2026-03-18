'use client'

export default function HeroSlider() {
  const scrollToNext = () => {
    const heroHeight = window.innerHeight
    window.scrollTo({
      top: heroHeight,
      behavior: 'smooth'
    })
  }

  return (
    <section style={{
      position: 'relative',
      height: '100vh',
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-start',
    }}>
      {/* Background Image - Stone Texture (slow zoom) */}
      <div
        className="hero-bg-image"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: 'url(/Stone_hero.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center right',
          zIndex: 0,
        }}
      />
      
      {/* Left-to-right gradient overlay for text readability */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'linear-gradient(90deg, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.25) 35%, rgba(0,0,0,0) 70%)',
        zIndex: 1,
        pointerEvents: 'none',
      }}></div>

      {/* Content - Left Aligned, Vertically Centered */}
      <div style={{
        position: 'relative',
        zIndex: 2,
        maxWidth: '650px',
        paddingLeft: '9vw', /* 8-10vw generous left padding */
        paddingRight: '4rem',
        width: '100%',
      }}>
        <h1 style={{
          fontSize: 'clamp(3rem, 6vw, 5rem)',
          fontFamily: "'Cormorant Garamond', serif",
          fontWeight: 500,
          marginBottom: '2rem', /* Comfortable spacing */
          color: '#F5F2ED', /* Warm off-white */
          lineHeight: 1.1,
          letterSpacing: '-0.02em',
        }}>
          Stone Collection
        </h1>
        
        <p style={{
          fontSize: 'clamp(1rem, 1.5vw, 1.25rem)',
          fontFamily: "'Inter', sans-serif",
          fontWeight: 300,
          color: 'rgba(245, 242, 237, 0.85)', /* 85% opacity of heading */
          letterSpacing: '0.02em',
          lineHeight: 1.6,
          marginBottom: '2rem', /* Comfortable spacing below subtext */
        }}>
          Layered mineral surfaces with architectural depth.
        </p>
        
        {/* Thin Oxide Red Accent Line (50-70px) */}
        <div style={{
          width: '60px',
          height: '1px',
          backgroundColor: 'var(--oxide-red)',
        }}></div>
      </div>

      {/* Scroll Indicator - Refined Down Arrow */}
      <button
        onClick={scrollToNext}
        aria-label="Scroll to next section"
        style={{
          position: 'absolute',
          bottom: '3rem',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 10,
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          color: 'rgba(245, 242, 237, 0.75)', /* Warm off-white, 75% opacity */
          padding: '1rem',
        }}
        className="scroll-indicator"
      >
        <svg 
          width="20" 
          height="20" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      <style jsx>{`
        .hero-bg-image {
          animation: heroZoom 15s linear forwards;
        }
        
        @keyframes heroZoom {
          0% {
            transform: scale(1);
          }
          100% {
            transform: scale(1.03);
          }
        }
        
        .scroll-indicator {
          animation: refinedBounce 3s ease-in-out infinite;
        }
        
        @keyframes refinedBounce {
          0%, 100% {
            transform: translateX(-50%) translateY(0);
          }
          50% {
            transform: translateX(-50%) translateY(6px);
          }
        }
      `}</style>
    </section>
  )
}
