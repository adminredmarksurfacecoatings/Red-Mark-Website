'use client'

import Image from 'next/image'
import { EXTERIOR_FEATURED_PROJECTS } from '@/lib/exteriorCollections'

export default function ExteriorFeaturedProjects() {
  return (
    <section className="exterior-landing-projects page-section" aria-labelledby="exterior-projects-heading">
      <div className="exterior-landing-projects__container container">
        <h2 id="exterior-projects-heading" className="exterior-landing-projects__heading">
          Exterior Applications
        </h2>

        <div className="exterior-landing-projects__grid">
          {EXTERIOR_FEATURED_PROJECTS.map((project) => (
            <figure key={project.name} className="exterior-landing-project">
              <div className="exterior-landing-project__image-wrap">
                <Image
                  src={project.image}
                  alt={project.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1100px) 50vw, 25vw"
                  quality={75}
                  className="exterior-landing-project__image"
                />
                <figcaption className="exterior-landing-project__caption">
                  <span className="exterior-landing-project__name">{project.name}</span>
                  <span className="exterior-landing-project__finish">{project.finish}</span>
                </figcaption>
              </div>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
