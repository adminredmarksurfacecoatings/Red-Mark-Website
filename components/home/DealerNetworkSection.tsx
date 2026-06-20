'use client'

import Link from 'next/link'

const benefits = [
  {
    title: 'Local support',
    text: 'Authorized dealers help with shade selection, availability, and on-site coordination.',
  },
  {
    title: 'Faster service',
    text: 'Regional stock and familiar teams keep residential projects moving without delays.',
  },
  {
    title: 'Technical guidance',
    text: 'Dealers work with Red Mark technical support for application and finish questions.',
  },
  {
    title: 'Growing network',
    text: 'Starting in Ludhiana — expanding across India to bring finishes closer to every project.',
  },
]

export default function DealerNetworkSection() {
  return (
    <section className="dealer-network-section page-section" aria-labelledby="dealer-network-heading">
      <div className="dealer-network-section__container container">
        <div className="dealer-network-section__header">
          <p className="dealer-network-section__eyebrow">Authorized Dealer Network</p>
          <h2 id="dealer-network-heading" className="dealer-network-section__heading">
            Available Through Authorized Dealers
          </h2>
          <p className="dealer-network-section__intro">
            Red Mark finishes are manufactured by us and supplied through trusted local partners — so
            homeowners and contractors receive responsive support without compromising on product quality.
          </p>
        </div>

        <div className="dealer-network-section__grid">
          {benefits.map((item) => (
            <article key={item.title} className="dealer-network-section__card">
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>

        <div className="dealer-network-section__actions">
          <Link href="/find-a-dealer" className="btn">
            Get Connected
          </Link>
          <Link href="/for-professionals" className="dealer-network-section__secondary">
            For Professionals →
          </Link>
        </div>
      </div>
    </section>
  )
}
