import type { Dealer } from '@/lib/dealers'

type DealerCardProps = {
  dealer: Dealer
}

export default function DealerCard({ dealer }: DealerCardProps) {
  const telHref = `tel:${dealer.phone.replace(/\s/g, '')}`

  return (
    <article className="dealer-card">
      <p className="dealer-card__eyebrow">{dealer.city}, {dealer.state}</p>
      <h3 className="dealer-card__title">{dealer.businessName}</h3>
      <p className="dealer-card__contact">{dealer.name}</p>

      <a href={telHref} className="dealer-card__phone">
        {dealer.phone}
      </a>

      <div className="dealer-card__meta">
        <div>
          <span className="dealer-card__meta-label">Service areas</span>
          <p>{dealer.serviceAreas.join(' · ')}</p>
        </div>
        <div>
          <span className="dealer-card__meta-label">Products</span>
          <p>{dealer.products.join(' · ')}</p>
        </div>
      </div>
    </article>
  )
}
