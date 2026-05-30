import FinishSubCollectionGrid from '@/components/finish-landing/FinishSubCollectionGrid'
import { getExteriorFinishCatalog } from '@/lib/finishCatalog'

export default function ExteriorSubCollectionGrid() {
  return (
    <FinishSubCollectionGrid
      id="explore-exterior-collections"
      heading="Explore Exterior Collections"
      intro="Each finish collection offers a unique material expression while maintaining the durability required for exterior applications."
      collections={getExteriorFinishCatalog()}
    />
  )
}
