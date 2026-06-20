'use client'

import { useSearchParams } from 'next/navigation'
import RequestSampleForm from '@/components/request-sample/RequestSampleForm'
import { PEBBLE_FINISH_REQUEST_SAMPLE } from '@/lib/finishCollection/pebble'
import { CREATE_ART_REQUEST_SAMPLE } from '@/lib/finishCollection/create-art'
import { STONE_FINISH_REQUEST_SAMPLE } from '@/lib/finishCollection/stone'
import type { FinishRequestSampleConfig } from '@/lib/finishCollection/types'

const REQUEST_SAMPLE_CONFIGS = {
  'stone-finish': STONE_FINISH_REQUEST_SAMPLE,
  'pebble-finish': PEBBLE_FINISH_REQUEST_SAMPLE,
  'create-art': CREATE_ART_REQUEST_SAMPLE,
} as const satisfies Record<string, FinishRequestSampleConfig>

export type RequestSampleCollectionSlug = keyof typeof REQUEST_SAMPLE_CONFIGS

type RequestSampleFormLoaderProps = {
  collectionSlug: RequestSampleCollectionSlug
}

export default function RequestSampleFormLoader({ collectionSlug }: RequestSampleFormLoaderProps) {
  const searchParams = useSearchParams()
  const initialShadeCode = searchParams.get('shade') ?? undefined
  const config = REQUEST_SAMPLE_CONFIGS[collectionSlug]

  return <RequestSampleForm config={config} initialShadeCode={initialShadeCode} />
}
