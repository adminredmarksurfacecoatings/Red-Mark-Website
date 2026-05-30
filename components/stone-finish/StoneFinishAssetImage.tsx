'use client'

import Image from 'next/image'
import { useState } from 'react'

type AssetImageProps = {
  primarySrc: string
  fallbackSrc: string
  alt: string
  className?: string
  fill?: boolean
  sizes?: string
  priority?: boolean
  width?: number
  height?: number
}

export default function StoneFinishAssetImage({
  primarySrc,
  fallbackSrc,
  alt,
  className,
  fill,
  sizes,
  priority,
  width,
  height,
}: AssetImageProps) {
  const [src, setSrc] = useState(primarySrc)

  const handleError = () => {
    if (src !== fallbackSrc) {
      setSrc(fallbackSrc)
      return
    }

    const jpgPath = primarySrc.replace(/\.webp$/i, '.jpg')
    if (src !== jpgPath && jpgPath !== primarySrc) {
      setSrc(jpgPath)
    }
  }

  if (fill) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        quality={75}
        priority={priority}
        className={className}
        onError={handleError}
      />
    )
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      quality={75}
      priority={priority}
      className={className}
      onError={handleError}
    />
  )
}
