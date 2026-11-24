import FinishSubCollectionGrid from '@/components/finish-landing/FinishSubCollectionGrid'
import { getExteriorFinishCatalog } from '@/lib/finishCatalog'

export default function ExteriorSubCollectionGrid() {
  return (
    <FinishSubCollectionGrid
      id="explore-exterior-collections"
      heading="Explore Exterior Collections"
      intro="Compare the appearance and application requirements of each exterior finish."
      collections={getExteriorFinishCatalog()}
    />
  )
}
