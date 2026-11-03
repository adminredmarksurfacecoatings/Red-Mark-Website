'use client'

import Image from 'next/image'
import Link from 'next/link'
import { CONTACT_WHATSAPP_HREF } from '@/lib/contact'
import { useEffect, useState } from 'react'
import type { CollectionSlug } from '@/lib/collections'

type HeroSlide = {
  src: string
  objectPosition: string
  collection: Exclude<CollectionSlug, 'all'>
}

const HERO_SLIDES: HeroSlide[] = [
  {
    src: '/Stone_hero.png',
    objectPosition: 'right center',
    collection: 'exterior',
  },
  {
    src: '/home_hero_2.png',
    objectPosition: 'center center',
    collection: 'exterior',
  },
  {
    src: '/home_hero_interior_1.png',
    objectPosition: 'center center',
    collection: 'interior',
  },
  {
    src: '/home_hero_interior_2.png',
    objectPosition: 'center center',
    collection: 'interior',
  },
]

const SLIDE_INTERVAL_MS = 9000

export default function HeroSlider() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [zoomKeys, setZoomKeys] = useState(() => HERO_SLIDES.map(() => 0))


  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion) return

    const intervalId = window.setInterval(() => {
      setActiveIndex((current) => {
        const next = (current + 1) % HERO_SLIDES.length
        setZoomKeys((keys) => {
          const updated = [...keys]
          updated[next] += 1
          return updated
        })
        return next
      })
    }, SLIDE_INTERVAL_MS)

    return () => window.clearInterval(intervalId)
  }, [])

  const scrollToNext = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth',
    })
  }

  return (
    <section className="home-hero">
      <div className="home-hero__backgrounds" aria-hidden="true">
        {HERO_SLIDES.map((slide, index) => (
          <div
            key={`${slide.src}-${zoomKeys[index]}`}
            className={`hero-bg-image${index === activeIndex ? ' is-active' : ''}`}
          >
            <Image
              src={slide.src}
              alt=""
              fill
              priority={index === 0}
              quality={85}
              className="home-hero__bg-img"
              sizes="100vw"
              style={{
                objectFit: 'cover',
                objectPosition: slide.objectPosition,
              }}
            />
          </div>
        ))}
      </div>

      <div className="home-hero__overlay" />

      <div className="home-hero__content home-hero__content--fade">
        <p className="home-hero__eyebrow">Red Mark Surface Coatings</p>
        <h1 className="home-hero__heading">Character in every surface.</h1>

        <p className="home-hero__description">Architectural wall textures and mineral finishes for interiors and exteriors. Explore the range or speak with us about your space.</p>

        <div className="home-hero__accent" />

        <div className="home-hero__actions">
          <a href={CONTACT_WHATSAPP_HREF} className="home-hero__cta home-hero__cta--whatsapp" target="_blank" rel="noopener noreferrer">
            Talk to us on WhatsApp →
          </a>
          <Link href="/finishes" className="home-hero__cta home-hero__cta--secondary">
            Explore all finishes →
          </Link>
        </div>
      </div>

      <button
        type="button"
        onClick={scrollToNext}
        aria-label="Scroll to next section"
        className="home-hero__scroll scroll-indicator"
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
    </section>
  )
}
