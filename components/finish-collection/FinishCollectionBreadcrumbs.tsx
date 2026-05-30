import Link from 'next/link'
import type { FinishCollectionConfig } from '@/lib/finishCollection/types'

type FinishCollectionBreadcrumbsProps = {
  config: FinishCollectionConfig
}

export default function FinishCollectionBreadcrumbs({ config }: FinishCollectionBreadcrumbsProps) {
  return (
    <nav className="stone-finish-breadcrumbs" aria-label="Breadcrumb">
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
