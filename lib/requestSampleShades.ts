export { STONE_FINISH_REQUEST_SAMPLE } from '@/lib/finishCollection/stone'

export type { FinishShade as RequestSampleShade } from '@/lib/finishCollection/types'

import { STONE_FINISH_REQUEST_SAMPLE } from '@/lib/finishCollection/stone'
import { matchFinishShade } from '@/lib/finishCollection/types'

export const STONE_FINISH_REQUEST_SAMPLE_SHADES = STONE_FINISH_REQUEST_SAMPLE.shades

export function findRequestSampleShade(code: string) {
  return STONE_FINISH_REQUEST_SAMPLE.shades.find(
    (shade) => shade.code.toLowerCase() === code.toLowerCase()
  )
}

export function matchRequestSampleShade(query: string) {
  return matchFinishShade(
    STONE_FINISH_REQUEST_SAMPLE.shades,
    query,
    STONE_FINISH_REQUEST_SAMPLE.shadeCodePattern
  )
}
