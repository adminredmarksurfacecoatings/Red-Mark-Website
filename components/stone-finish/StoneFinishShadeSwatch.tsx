'use client'

import Image from 'next/image'
import { useState } from 'react'

type StoneFinishShadeSwatchProps = {
  code: string
  name: string
  image: string
  fallbackImage: string
}

export default function StoneFinishShadeSwatch({
  code,
  name,
  image,
  fallbackImage,
}: StoneFinishShadeSwatchProps) {
  const [src, setSrc] = useState(image)

  return (
    <article className="stone-finish-shade">
      <div className="stone-finish-shade__swatch">
        <Image
          src={src}
          alt={`${name} stone finish texture`}
          fill
          sizes="(max-width: 640px) 33vw, (max-width: 1024px) 20vw, 12vw"
          quality={75}
          className="stone-finish-shade__image"
          onError={() => {
            if (src !== fallbackImage) {
              setSrc(fallbackImage)
              return
            }

            const jpgPath = image.replace(/\.webp$/i, '.jpg')
            if (src !== jpgPath && jpgPath !== image) {
              setSrc(jpgPath)
            }
          }}
        />
      </div>
      <p className="stone-finish-shade__code">{code}</p>
      <p className="stone-finish-shade__name">{name}</p>
    </article>
  )
}
