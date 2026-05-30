export {
  STONE_FINISH_COLLECTION,
  STONE_FINISH_REQUEST_SAMPLE,
} from '@/lib/finishCollection/stone'

export type { FinishShade as StoneFinishShade } from '@/lib/finishCollection/types'

import { STONE_FINISH_COLLECTION } from '@/lib/finishCollection/stone'

export const STONE_FINISH_ASSET_BASE = '/Finishes/exterior/stone-finish'
export const STONE_FINISH_HERO_IMAGE = STONE_FINISH_COLLECTION.heroImage
export const STONE_FINISH_HERO_FALLBACK = STONE_FINISH_COLLECTION.heroImageFallback
export const STONE_FINISH_SHADE_CARD = STONE_FINISH_COLLECTION.shadeCard
export const STONE_FINISH_SHADES = STONE_FINISH_COLLECTION.shades
export const STONE_FINISH_SPECS = STONE_FINISH_COLLECTION.specs
export const STONE_FINISH_HERO_FEATURES = STONE_FINISH_COLLECTION.heroFeatures

export function stoneFinishShadeImagePath(code: string) {
  return `${STONE_FINISH_ASSET_BASE}/shades/${code}/swatch.webp`
}
