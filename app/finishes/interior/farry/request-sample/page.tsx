import type { Metadata } from 'next'
import { Suspense } from 'react'
import RequestSampleFormLoader from '@/components/request-sample/RequestSampleFormLoader'
import { createPageMetadata } from '@/lib/seo'

export const metadata: Metadata = createPageMetadata({
  title: 'Request a Farry Sample',
  description:
    'Request a physical sample of Red Mark Farry high-shine interior shades. Select your shade, preview the swatch, and submit for delivery through our dealer network.',
  path: '/finishes/interior/farry/request-sample',
  image: '/Shadecards/farry/shade-card/cover.jpg',
  imageAlt: 'Request a Red Mark Farry sample',
})

function RequestSampleFallback() {
  return (
    <div className="request-sample request-sample--loading" aria-hidden>
      <div className="request-sample__header">
        <p className="request-sample__eyebrow">Interior Collection</p>
        <h1 className="request-sample__heading">Request a Sample</h1>
      </div>
    </div>
  )
}

export default function FarryRequestSamplePage() {
  return (
    <section className="request-sample-page page-section page-section--first">
      <div className="request-sample-page__container container">
        <Suspense fallback={<RequestSampleFallback />}>
          <RequestSampleFormLoader collectionSlug="farry" />
        </Suspense>
      </div>
    </section>
  )
}
