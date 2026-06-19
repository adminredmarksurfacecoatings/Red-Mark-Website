'use client'

import Image from 'next/image'
import { useState } from 'react'

type FinishCollectionShadeSwatchProps = {
  code: string
  name: string
  image: string
  fallbackImage: string
}

export default function FinishCollectionShadeSwatch({
  code,
  name,
  image,
  fallbackImage,
}: FinishCollectionShadeSwatchProps) {
  const [src, setSrc] = useState(image)

  return (
    <article className="stone-finish-shade">
      <div className="stone-finish-shade__swatch">
        <Image
          src={src}
          alt={`${name} finish texture`}
          fill
          sizes="(max-width: 640px) 33vw, (max-width: 1024px) 20vw, 12vw"
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
      </div>
      <p className="stone-finish-shade__label">
        <span className="stone-finish-shade__code">{code}</span>
        <span className="stone-finish-shade__name">{name}</span>
      </p>
    </article>
  )
}
