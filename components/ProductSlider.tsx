'use client'

import { useEffect, useRef } from 'react'
import { useKeenSlider } from 'keen-slider/react'
import 'keen-slider/keen-slider.min.css'

const products = [
  { id: 1, name: 'Epoxy Coating', category: 'Industrial', image: '/api/placeholder/400/500' },
  { id: 2, name: 'Protective Coating', category: 'Protection', image: '/api/placeholder/400/500' },
  { id: 3, name: 'Anti-Corrosion', category: 'Specialty', image: '/api/placeholder/400/500' },
  { id: 4, name: 'Floor Coating', category: 'Commercial', image: '/api/placeholder/400/500' },
  { id: 5, name: 'Metal Coating', category: 'Industrial', image: '/api/placeholder/400/500' },
  { id: 6, name: 'Waterproofing', category: 'Protection', image: '/api/placeholder/400/500' },
  { id: 7, name: 'Decorative Finish', category: 'Aesthetic', image: '/api/placeholder/400/500' },
  { id: 8, name: 'High-Temp Coating', category: 'Specialty', image: '/api/placeholder/400/500' },
]

export default function ProductSlider() {
  const [sliderRef, instanceRef] = useKeenSlider({
    slides: {
      perView: 4,
      spacing: 20,
    },
    breakpoints: {
      '(max-width: 1024px)': {
        slides: { perView: 3, spacing: 15 },
      },
      '(max-width: 768px)': {
        slides: { perView: 2, spacing: 10 },
      },
      '(max-width: 480px)': {
        slides: { perView: 1, spacing: 10 },
      },
    },
  })

  return (
    <section className="section" style={{
      background: 'var(--gradient-bg-section)',
    }}>
      <div className="container">
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '2rem',
        }}>
          <h2 style={{
            fontSize: '2rem',
            fontWeight: 'bold',
            color: 'var(--text-light)',
          }}>
            Our Products
          </h2>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button
              onClick={() => instanceRef.current?.prev()}
              aria-label="Previous slide"
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                border: '1px solid var(--border-color)',
                backgroundColor: 'var(--bg-card)',
                color: 'var(--text-light)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--primary-red)'
                e.currentTarget.style.borderColor = 'var(--primary-red)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--bg-card)'
                e.currentTarget.style.borderColor = 'var(--border-color)'
              }}
            >
              ←
            </button>
            <button
              onClick={() => instanceRef.current?.next()}
              aria-label="Next slide"
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                border: '1px solid var(--border-color)',
                backgroundColor: 'var(--bg-card)',
                color: 'var(--text-light)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--primary-red)'
                e.currentTarget.style.borderColor = 'var(--primary-red)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--bg-card)'
                e.currentTarget.style.borderColor = 'var(--border-color)'
              }}
            >
              →
            </button>
          </div>
        </div>

        <div ref={sliderRef} className="keen-slider">
          {products.map((product) => (
            <div key={product.id} className="keen-slider__slide">
              <div style={{
                background: 'linear-gradient(135deg, #FFFFFF 0%, #FFF5F5 100%)',
                borderRadius: '8px',
                overflow: 'hidden',
                border: '1px solid var(--border-color)',
                boxShadow: '0 2px 8px rgba(196, 30, 58, 0.08)',
                transition: 'transform 0.3s ease',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
              }}
              >
                <div style={{
                  width: '100%',
                  height: '300px',
                  background: 'linear-gradient(135deg, #E57373 0%, #EF5350 50%, #C41E3A 100%)',
                  position: 'relative',
                  overflow: 'hidden',
                }}>
                  <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    color: 'var(--text-dark)',
                    fontSize: '3rem',
                  }}>
                    {product.name.charAt(0)}
                  </div>
                </div>
                <div style={{ padding: '1.5rem' }}>
                  <p style={{
                    fontSize: '0.75rem',
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    color: 'var(--lighter-red)',
                    marginBottom: '0.5rem',
                  }}>
                    {product.category}
                  </p>
                  <h3 style={{
                    fontSize: '1.125rem',
                    fontWeight: 600,
                    color: 'var(--text-light)',
                    marginBottom: '1rem',
                  }}>
                    {product.name}
                  </h3>
                  <div style={{
                    display: 'flex',
                    gap: '0.5rem',
                    alignItems: 'center',
                  }}>
                    <button
                      className="btn btn-primary"
                      style={{
                        flex: 1,
                        padding: '0.5rem 1rem',
                        fontSize: '0.75rem',
                      }}
                    >
                      View Details
                    </button>
                    <button
                      aria-label="Add to favourites"
                      style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '4px',
                        border: '1px solid var(--border-color)',
                        backgroundColor: 'transparent',
                        color: 'var(--text-light)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'all 0.3s ease',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = 'var(--lighter-red)'
                        e.currentTarget.style.color = 'var(--lighter-red)'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = 'var(--border-color)'
                        e.currentTarget.style.color = 'var(--text-light)'
                      }}
                    >
                      ♡
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
