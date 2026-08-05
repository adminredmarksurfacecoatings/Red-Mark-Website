'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { isRemoteStorageImage } from '@/lib/imageUtils'
import { useCachedImageSrc } from '@/lib/useCachedImageSrc'

type GalleryImageTileProps = {
  src: string
  alt: string
  aspectRatio: string
  sizes?: string
  onClick?: () => void
}

function aspectRatioPadding(ratio: string): string {
  const [w, h] = ratio.split('/').map(Number)
  if (!w || !h) return '75%'
  return `${(h / w) * 100}%`
}

function aspectRatioDimensions(ratio: string): { width: number; height: number } {
  const [w, h] = ratio.split('/').map(Number)
  const width = 1200
  const height = w && h ? Math.round((width * h) / w) : 900
  return { width, height }
}

export default function GalleryImageTile({
  src,
  alt,
  aspectRatio,
  sizes = '(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw',
  onClick,
}: GalleryImageTileProps) {
  const displaySrc = useCachedImageSrc(src)
  const [loaded, setLoaded] = useState(false)
  const tileRef = useRef<HTMLDivElement>(null)
  const { width, height } = aspectRatioDimensions(aspectRatio)
  const isBlob = displaySrc.startsWith('blob:')

  useEffect(() => {
    setLoaded(false)
    const img = tileRef.current?.querySelector('img')
    if (img?.complete && img.naturalWidth > 0) {
      setLoaded(true)
    }
  }, [displaySrc])

  return (
    <div
      ref={tileRef}
      className="gallery-image-tile"
      style={{ paddingBottom: aspectRatioPadding(aspectRatio) }}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={
        onClick
          ? (e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                onClick()
              }
            }
          : undefined
      }
    >
      <div className="gallery-image-tile__frame">
        <div className={`gallery-image-tile__loader ${loaded ? 'is-hidden' : ''}`} aria-hidden="true">
          <span className="gallery-image-tile__loader-shimmer" />
          <span className="gallery-image-tile__loader-mark" aria-hidden="true">
            RM
          </span>
        </div>
        {isBlob ? (
          // Cached blob URLs bypass next/image optimizer
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={displaySrc}
            alt={alt}
            width={width}
            height={height}
            loading="lazy"
            decoding="async"
            className={`gallery-image-tile__img${loaded ? ' is-loaded' : ''}`}
            onLoad={() => setLoaded(true)}
          />
        ) : (
          <Image
            src={displaySrc}
            alt={alt}
            width={width}
            height={height}
            loading="lazy"
            unoptimized={isRemoteStorageImage(displaySrc)}
            sizes={sizes}
            quality={70}
            className={`gallery-image-tile__img${loaded ? ' is-loaded' : ''}`}
            onLoad={() => setLoaded(true)}
          />
        )}
      </div>
    </div>
  )
}
