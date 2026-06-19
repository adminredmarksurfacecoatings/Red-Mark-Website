'use client'

import { useMemo, useState } from 'react'
import DealerCard from '@/components/dealers/DealerCard'
import { DEALERS, searchDealers } from '@/lib/dealers'

export default function DealerLocator() {
  const [query, setQuery] = useState('Ludhiana')

  const results = useMemo(() => searchDealers(query), [query])

  return (
    <div className="dealer-locator">
      <div className="dealer-locator__search">
        <label htmlFor="dealer-search" className="dealer-locator__label">
          Search by city or area
        </label>
        <input
          id="dealer-search"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="e.g. Ludhiana, Model Town, Punjab"
          className="dealer-locator__input"
        />
        <p className="dealer-locator__note">
          Showing authorized dealers in Ludhiana. Additional cities will be added as the network expands.
        </p>
      </div>

      {results.length > 0 ? (
        <div className="dealer-locator__grid">
          {results.map((dealer) => (
            <DealerCard key={dealer.id} dealer={dealer} />
          ))}
        </div>
      ) : (
        <div className="dealer-locator__empty">
          <p>No dealers matched your search yet.</p>
          <p>
            Try &ldquo;Ludhiana&rdquo; or contact Red Mark and we&apos;ll connect you with the nearest
            authorized partner.
          </p>
        </div>
      )}

      {query.trim().toLowerCase() !== 'ludhiana' && results.length < DEALERS.length ? (
        <p className="dealer-locator__fallback">
          Nationwide expansion is underway. For cities outside Ludhiana,{' '}
          <a href="/contact?audience=homeowner">submit an enquiry</a> and we&apos;ll route you appropriately.
        </p>
      ) : null}
    </div>
  )
}
