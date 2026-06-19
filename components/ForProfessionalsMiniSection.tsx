'use client'

import Link from 'next/link'

const professionalCards = [
  {
    title: 'Architects & Designers',
    description: 'Samples, catalogues, and specification support for distinctive surface systems.',
    href: '/for-professionals/architects',
  },
  {
    title: 'Builders & Developers',
    description: 'Reliable coating systems and application guidance for project delivery.',
    href: '/for-professionals/builders',
  },
  {
    title: 'Contractors',
    description: 'Technical coordination and finish selection for on-site execution.',
    href: '/contact?audience=contractor',
  },
  {
    title: 'Dealers',
    description: 'Distribution partnerships to bring Red Mark finishes to new regions.',
    href: '/for-professionals/dealers',
  },
]

export default function ForProfessionalsMiniSection() {
  return (
    <section className="page-section for-pro-mini-section">
      <div className="container for-pro-mini-section__container">
        <h2 className="for-pro-mini-section__heading">Designed for Professionals</h2>
        <p className="for-pro-mini-section__intro">
          Architects, builders, contractors, and dealers work with Red Mark for material depth,
          technical guidance, and specification-ready finishes.
        </p>

        <div className="for-pro-mini-grid">
          {professionalCards.map((card) => (
            <Link key={card.href} href={card.href} className="for-pro-mini-card">
              <h3>{card.title}</h3>
              <p>{card.description}</p>
            </Link>
          ))}
        </div>

        <div className="for-pro-mini-section__footer">
          <Link href="/for-professionals" className="for-pro-mini-section__link">
            Explore For Professionals →
          </Link>
        </div>
      </div>
    </section>
  )
}
