'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { createPortal } from 'react-dom'

type ModalImage = {
  src: string
  alt: string
}

type ImageModalProps = {
  isOpen: boolean
  images: ModalImage[]
  currentIndex: number
  onNavigate: (nextIndex: number) => void
  onClose: () => void
}

const SWIPE_THRESHOLD_PX = 48

export default function ImageModal({ isOpen, images, currentIndex, onNavigate, onClose }: ImageModalProps) {
  const [isMounted, setIsMounted] = useState(false)
  const [slideDir, setSlideDir] = useState<'next' | 'prev' | null>(null)
  const touchStartRef = useRef<{ x: number; y: number } | null>(null)
  const swipedRef = useRef(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    if (!isOpen) {
      document.body.classList.remove('image-modal-open')
      setSlideDir(null)
      return
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
      if (event.key === 'ArrowRight' && images.length > 1) {
        setSlideDir('next')
        onNavigate((currentIndex + 1) % images.length)
      }
      if (event.key === 'ArrowLeft' && images.length > 1) {
        setSlideDir('prev')
        onNavigate((currentIndex - 1 + images.length) % images.length)
      }
    }

    document.addEventListener('keydown', onKeyDown)
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    document.body.classList.add('image-modal-open')

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = previousOverflow
      document.body.classList.remove('image-modal-open')
    }
  }, [isOpen, onClose, images.length, currentIndex, onNavigate])

  if (!isOpen || !isMounted) return null

  const activeImage = images[currentIndex]
  if (!activeImage) return null

  const goPrev = () => {
    setSlideDir('prev')
    onNavigate((currentIndex - 1 + images.length) % images.length)
  }

  const goNext = () => {
    setSlideDir('next')
    onNavigate((currentIndex + 1) % images.length)
  }

  const handleTouchStart = (event: React.TouchEvent) => {
    if (images.length <= 1) return
    const touch = event.touches[0]
    touchStartRef.current = { x: touch.clientX, y: touch.clientY }
    swipedRef.current = false
  }

  const handleTouchEnd = (event: React.TouchEvent) => {
    if (!touchStartRef.current || images.length <= 1) return

    const touch = event.changedTouches[0]
    const dx = touch.clientX - touchStartRef.current.x
    const dy = touch.clientY - touchStartRef.current.y
    touchStartRef.current = null

    if (Math.abs(dx) < SWIPE_THRESHOLD_PX) return
    if (Math.abs(dx) < Math.abs(dy) * 1.15) return

    swipedRef.current = true
    if (dx < 0) goNext()
    else goPrev()
  }

  const handleOverlayClick = () => {
    if (swipedRef.current) {
      swipedRef.current = false
      return
    }
    onClose()
  }

  const slideClass =
    slideDir === 'next' ? 'image-modal-slide-next' : slideDir === 'prev' ? 'image-modal-slide-prev' : ''

  const modalContent = (
    <div
      className="image-modal-overlay"
      role="dialog"
      aria-modal="true"
      onClick={handleOverlayClick}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <button className="image-modal-close" aria-label="Close image preview" onClick={onClose}>
        ×
      </button>

      {images.length > 1 && (
        <>
          <button
            className="image-modal-nav image-modal-nav-left"
            aria-label="Previous image"
            onClick={(event) => {
              event.stopPropagation()
              goPrev()
            }}
          >
            ‹
          </button>
          <button
            className="image-modal-nav image-modal-nav-right"
            aria-label="Next image"
            onClick={(event) => {
              event.stopPropagation()
              goNext()
            }}
          >
            ›
          </button>
        </>
      )}

      <div className="image-modal-content" onClick={(event) => event.stopPropagation()}>
        <div key={currentIndex} className={`image-modal-image-wrap ${slideClass}`}>
          <Image
            src={activeImage.src}
            alt={activeImage.alt}
            fill
            sizes="90vw"
            quality={75}
            style={{ objectFit: 'contain' }}
            draggable={false}
          />
        </div>
      </div>

      <style jsx>{`
        .image-modal-overlay {
          position: fixed;
          inset: 0;
          z-index: 3000;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(0, 0, 0, 0.9);
          backdrop-filter: blur(3px);
          -webkit-backdrop-filter: blur(3px);
          animation: modalFadeIn 0.24s ease;
          padding: 2rem;
          touch-action: pan-y;
          user-select: none;
          -webkit-user-select: none;
        }

        .image-modal-content {
          width: min(90vw, 1600px);
          height: min(90vh, 1000px);
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        .image-modal-image-wrap {
          position: relative;
          width: 100%;
          height: 100%;
        }

        .image-modal-slide-next {
          animation: modalSlideFromRight 0.28s ease;
        }

        .image-modal-slide-prev {
          animation: modalSlideFromLeft 0.28s ease;
        }

        .image-modal-close {
          position: absolute;
          top: 1rem;
          right: 1rem;
          width: 2.75rem;
          height: 2.75rem;
          border: 1px solid rgba(245, 242, 237, 0.25);
          border-radius: 999px;
          color: rgba(245, 242, 237, 0.9);
          font-size: 1.1rem;
          line-height: 1;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: rgba(255, 255, 255, 0.04);
          transition: background-color 0.2s ease, border-color 0.2s ease;
          z-index: 1;
        }

        .image-modal-close:hover {
          background: rgba(255, 255, 255, 0.09);
          border-color: rgba(245, 242, 237, 0.45);
        }

        .image-modal-nav {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 2.75rem;
          height: 2.75rem;
          border: 1px solid rgba(245, 242, 237, 0.25);
          border-radius: 999px;
          color: rgba(245, 242, 237, 0.9);
          font-size: 1.6rem;
          line-height: 1;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: rgba(255, 255, 255, 0.04);
          transition: background-color 0.2s ease, border-color 0.2s ease;
          z-index: 1;
        }

        .image-modal-nav:hover {
          background: rgba(255, 255, 255, 0.09);
          border-color: rgba(245, 242, 237, 0.45);
        }

        .image-modal-nav-left {
          left: 1rem;
        }

        .image-modal-nav-right {
          right: 1rem;
        }

        @keyframes modalFadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes modalSlideFromRight {
          from {
            opacity: 0.35;
            transform: translateX(18%);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes modalSlideFromLeft {
          from {
            opacity: 0.35;
            transform: translateX(-18%);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @media (max-width: 768px) {
          .image-modal-overlay {
            padding: 1rem;
          }

          .image-modal-content {
            width: 92vw;
            height: 86vh;
          }

          .image-modal-close {
            top: 0.75rem;
            right: 0.75rem;
          }

          .image-modal-nav-left {
            left: 0.5rem;
          }

          .image-modal-nav-right {
            right: 0.5rem;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .image-modal-slide-next,
          .image-modal-slide-prev {
            animation: none;
          }
        }
      `}</style>
    </div>
  )

  return createPortal(modalContent, document.body)
}
