'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import RequestSampleForm from '@/components/request-sample/RequestSampleForm'
import { PEBBLE_FINISH_REQUEST_SAMPLE } from '@/lib/finishCollection/pebble'
import { CREATE_ART_REQUEST_SAMPLE } from '@/lib/finishCollection/create-art'
import { FARRY_REQUEST_SAMPLE } from '@/lib/finishCollection/farry'
import { STONE_FINISH_REQUEST_SAMPLE } from '@/lib/finishCollection/stone'
import type { FinishRequestSampleConfig } from '@/lib/finishCollection/types'

const REQUEST_SAMPLE_CONFIGS = {
  'stone-finish': STONE_FINISH_REQUEST_SAMPLE,
  'pebble-finish': PEBBLE_FINISH_REQUEST_SAMPLE,
  'create-art': CREATE_ART_REQUEST_SAMPLE,
  farry: FARRY_REQUEST_SAMPLE,
} as const satisfies Record<string, FinishRequestSampleConfig>

export type RequestSampleCollectionSlug = keyof typeof REQUEST_SAMPLE_CONFIGS

type RequestSampleFormLoaderProps = {
  collectionSlug?: RequestSampleCollectionSlug
}

export default function RequestSampleFormLoader({ collectionSlug }: RequestSampleFormLoaderProps) {
  const searchParams = useSearchParams()
  const requestedCollection = collectionSlug ?? searchParams.get('collection') ?? 'stone-finish'
  const initialCollection = Object.prototype.hasOwnProperty.call(REQUEST_SAMPLE_CONFIGS, requestedCollection)
    ? requestedCollection as RequestSampleCollectionSlug
    : 'stone-finish'
  const [selectedCollection, setSelectedCollection] = useState(initialCollection)
  useEffect(() => setSelectedCollection(initialCollection), [initialCollection])
  const initialShadeCode = selectedCollection === initialCollection ? searchParams.get('shade') ?? undefined : undefined
  const config = REQUEST_SAMPLE_CONFIGS[selectedCollection]

  return (
    <RequestSampleForm
      config={config}
      initialShadeCode={initialShadeCode}
      collectionSelect={
        <div>
          <label htmlFor="sample-collection" className="contact-form-label">Shade card</label>
          <select
            id="sample-collection"
            className="contact-form-select"
            value={selectedCollection}
            onChange={(event) => setSelectedCollection(event.target.value as RequestSampleCollectionSlug)}
          >
            {Object.entries(REQUEST_SAMPLE_CONFIGS).map(([slug, item]) => (
              <option key={slug} value={slug}>{item.title}</option>
            ))}
          </select>
        </div>
      }
    />
  )
}
