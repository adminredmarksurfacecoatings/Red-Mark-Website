import Image from 'next/image'
import Link from 'next/link'

type FinishLandingHeroProps = {
  eyebrow: string
  heading: string
  lead: string
  support?: string
  image: string
  imageAlt: string
  browseHref: string
  browseLabel?: string
}

export default function FinishLandingHero({
  eyebrow,
  heading,
  lead,
  support,
  image,
  imageAlt,
  browseHref,
  browseLabel = 'Browse Collections →',
}: FinishLandingHeroProps) {
  return (
    <section className="exterior-landing-hero page-section page-section--first">
      <div className="exterior-landing-hero__container container">
        <div className="exterior-landing-hero__grid">
          <div className="exterior-landing-hero__content">
            <p className="exterior-landing-hero__eyebrow">{eyebrow}</p>
            <h1 className="exterior-landing-hero__heading">{heading}</h1>
            <p className="exterior-landing-hero__lead">{lead}</p>
            {support ? <p className="exterior-landing-hero__support">{support}</p> : null}
            <div className="exterior-landing-hero__actions">
              <a href={browseHref} className="btn exterior-landing-hero__primary">
                {browseLabel}
              </a>
            </div>
          </div>

          <div className="exterior-landing-hero__visual">
            <div className="exterior-landing-hero__image-wrap">
              <Image
                src={image}
                alt={imageAlt}
                fill
                sizes="(max-width: 900px) 100vw, 50vw"
                quality={75}
                priority
                className="exterior-landing-hero__image"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
