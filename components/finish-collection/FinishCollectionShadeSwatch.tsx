'use client'

import Image from 'next/image'
import Link from 'next/link'
import styles from './ShadeActions.module.css'
import { useState } from 'react'

type FinishCollectionShadeSwatchProps = {
  collectionName: string
  code: string
  name: string
  image: string
  fallbackImage: string
  requestSampleHref: string
  onPreview: (src: string) => void
}

export default function FinishCollectionShadeSwatch({
  collectionName,
  code,
  name,
  image,
  fallbackImage,
  requestSampleHref,
  onPreview,
}: FinishCollectionShadeSwatchProps) {
  const [src, setSrc] = useState(image)

  return (
    <article className="stone-finish-shade">
      <button
        type="button"
        className={`stone-finish-shade__swatch ${styles.preview}`}
        onClick={() => onPreview(src)}
        aria-label={`Preview ${code} — ${name}`}
      >
        <Image
          src={src}
          alt={`${collectionName}: ${name} (${code}) shade sample`}
          fill
          sizes="(max-width: 640px) 45vw, (max-width: 1024px) 25vw, 16vw"
          quality={75}
          className="stone-finish-shade__image"
          onError={() => {
            const jpgPath = src.replace(/\.webp$/i, '.jpg')
            if (src !== jpgPath && src === image) {
              setSrc(jpgPath)
              return
            }
            if (src !== fallbackImage) {
              setSrc(fallbackImage)
            }
          }}
        />
      </button>
      <p className="stone-finish-shade__label">
        <span className="stone-finish-shade__code">{code}</span>
        <span className="stone-finish-shade__name">{name}</span>
      </p>
      <Link
        href={`${requestSampleHref}?shade=${encodeURIComponent(code)}`}
        className={styles.sample}
        aria-label={`Request sample of ${code} — ${name}`}
      >
        Request sample →
      </Link>
    </article>
  )
}
