'use client'

import { useEffect, useState } from 'react'
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

export default function ImageModal({ isOpen, images, currentIndex, onNavigate, onClose }: ImageModalProps) {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    if (!isOpen) {
      document.body.classList.remove('image-modal-open')
      return
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
      if (event.key === 'ArrowRight' && images.length > 1) {
        onNavigate((currentIndex + 1) % images.length)
      }
      if (event.key === 'ArrowLeft' && images.length > 1) {
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

  const goPrev = () => onNavigate((currentIndex - 1 + images.length) % images.length)
  const goNext = () => onNavigate((currentIndex + 1) % images.length)

  const modalContent = (
    <div className="image-modal-overlay" role="dialog" aria-modal="true" onClick={onClose}>
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
        <div className="image-modal-image-wrap">
          <Image
            src={activeImage.src}
            alt={activeImage.alt}
            fill
            sizes="90vw"
            quality={75}
            style={{ objectFit: 'contain' }}
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
        }

        .image-modal-content {
          width: min(90vw, 1600px);
          height: min(90vh, 1000px);
          display: flex;
          align-items: center;
          justify-content: center;
          animation: modalZoomIn 0.24s ease;
        }

        .image-modal-image-wrap {
          position: relative;
          width: 100%;
          height: 100%;
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

        @keyframes modalZoomIn {
          from {
            opacity: 0;
            transform: scale(0.97);
          }
          to {
            opacity: 1;
            transform: scale(1);
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
      `}</style>
    </div>
  )

  return createPortal(modalContent, document.body)
}
