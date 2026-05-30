import Link from 'next/link'
import { EXTERIOR_LANDING_HREF } from '@/lib/exteriorCollections'

export default function StoneFinishBreadcrumbs() {
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
        <li aria-hidden="true">›</li>
        <li>
          <Link href={EXTERIOR_LANDING_HREF}>Exterior Collection</Link>
        </li>
        <li aria-hidden="true">›</li>
        <li aria-current="page">Stone Finish</li>
      </ol>
    </nav>
  )
}
