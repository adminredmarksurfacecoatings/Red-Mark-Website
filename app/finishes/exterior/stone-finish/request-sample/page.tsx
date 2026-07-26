import type { Metadata } from 'next'
import { Suspense } from 'react'
import RequestSampleFormLoader from '@/components/request-sample/RequestSampleFormLoader'
import { createPageMetadata } from '@/lib/seo'

export const metadata: Metadata = createPageMetadata({
  title: 'Request a Stone Finish Sample',
  description:
    'Request a physical sample of Red Mark Stone Finish shades. Select your shade code, preview the swatch, and submit for delivery through our dealer network.',
  path: '/finishes/exterior/stone-finish/request-sample',
  image: '/Stone_hero.png',
  imageAlt: 'Request a Red Mark Stone Finish sample',
})

function RequestSampleFallback() {
  return (
    <div className="request-sample request-sample--loading" aria-hidden>
      <div className="request-sample__header">
        <p className="request-sample__eyebrow">Exterior Collection</p>
        <h1 className="request-sample__heading">Request a Sample</h1>
      </div>
    </div>
  )
}

export default function StoneFinishRequestSamplePage() {
  return (
    <section className="request-sample-page page-section page-section--first">
      <div className="request-sample-page__container container">
        <Suspense fallback={<RequestSampleFallback />}>
          <RequestSampleFormLoader collectionSlug="stone-finish" />
        </Suspense>
      </div>
    </section>
  )
}
