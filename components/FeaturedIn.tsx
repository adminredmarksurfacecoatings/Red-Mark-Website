'use client'

import { useKeenSlider } from 'keen-slider/react'
import 'keen-slider/keen-slider.min.css'

const brands = [
  { id: 1, name: 'Design Week', logo: 'DW' },
  { id: 2, name: 'Creative Review', logo: 'CR' },
  { id: 3, name: 'Behance', logo: 'BE' },
  { id: 4, name: 'Dribbble', logo: 'DR' },
  { id: 5, name: 'Awwwards', logo: 'AW' },
  { id: 6, name: 'Design Milk', logo: 'DM' },
  { id: 7, name: 'Creative Bloq', logo: 'CB' },
]

export default function FeaturedIn() {
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 5,
      spacing: 30,
    },
    breakpoints: {
      '(max-width: 1024px)': {
        slides: { perView: 4, spacing: 20 },
      },
      '(max-width: 768px)': {
        slides: { perView: 3, spacing: 15 },
      },
      '(max-width: 480px)': {
        slides: { perView: 2, spacing: 10 },
      },
    },
    loop: true,
  })

  return (
    <section className="section" style={{
      background: 'linear-gradient(135deg, #FFFFFF 0%, #FFEBEE 100%)',
      borderTop: '1px solid var(--border-color)',
      borderBottom: '1px solid var(--border-color)',
    }}>
      <div className="container">
        <h3 style={{
          textAlign: 'center',
          fontSize: '0.875rem',
          textTransform: 'uppercase',
          letterSpacing: '2px',
          color: 'var(--text-gray)',
          marginBottom: '2rem',
        }}>
          Featured In
        </h3>
        <div ref={sliderRef} className="keen-slider">
          {brands.map((brand) => (
            <div key={brand.id} className="keen-slider__slide">
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '80px',
                color: 'var(--text-dark)',
                fontSize: '1.5rem',
                fontWeight: 'bold',
                opacity: 0.6,
                transition: 'opacity 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.opacity = '1'
                e.currentTarget.style.color = 'var(--lighter-red)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.opacity = '0.6'
                e.currentTarget.style.color = 'var(--text-dark)'
              }}
              >
                {brand.logo}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
