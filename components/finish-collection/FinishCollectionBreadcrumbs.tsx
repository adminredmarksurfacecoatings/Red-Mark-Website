import Link from 'next/link'
import { SITE_URL } from '@/lib/seo'
import type { FinishCollectionConfig } from '@/lib/finishCollection/types'

type FinishCollectionBreadcrumbsProps = {
  config: FinishCollectionConfig
}

export default function FinishCollectionBreadcrumbs({ config }: FinishCollectionBreadcrumbsProps) {
  const trail = [
    { name: 'Home', path: '/' },
    { name: 'Finishes', path: '/finishes' },
    ...(config.collectionHubHref && config.collectionHubLabel
      ? [{ name: config.collectionHubLabel, path: config.collectionHubHref }]
      : []),
    { name: config.breadcrumbLabel, path: config.pageHref },
  ]
  const breadcrumbData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: new URL(item.path, SITE_URL).href,
    })),
  }

  return (
    <nav className="stone-finish-breadcrumbs" aria-label="Breadcrumb">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData).replace(/</g, '\\u003c') }}
      />
      <ol className="stone-finish-breadcrumbs__list">
        <li>
          <Link href="/">Home</Link>
        </li>
        <li aria-hidden="true">›</li>
        <li>
          <Link href="/finishes">Finishes</Link>
        </li>
        {config.collectionHubHref && config.collectionHubLabel ? (
          <>
            <li aria-hidden="true">›</li>
            <li>
              <Link href={config.collectionHubHref}>{config.collectionHubLabel}</Link>
            </li>
          </>
        ) : null}
        <li aria-hidden="true">›</li>
        <li aria-current="page">{config.breadcrumbLabel}</li>
      </ol>
    </nav>
  )
}
