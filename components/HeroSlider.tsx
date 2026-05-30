'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'
import { getCollection, type CollectionSlug } from '@/lib/collections'

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

  const activeSlide = HERO_SLIDES[activeIndex]
  const activeCollection = useMemo(
    () => getCollection(activeSlide.collection)!,
    [activeSlide.collection]
  )

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
              priority={index <= 2}
              unoptimized
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

      <div key={activeIndex} className="home-hero__content home-hero__content--fade">
        <h1 className="home-hero__heading">{activeCollection.title}</h1>

        <p className="home-hero__description">{activeCollection.description}</p>

        <div className="home-hero__accent" />

        <Link href={activeCollection.href} className="home-hero__cta">
          Explore {activeCollection.title} →
        </Link>
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
