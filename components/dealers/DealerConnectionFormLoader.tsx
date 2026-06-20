'use client'

import { useSearchParams } from 'next/navigation'
import DealerConnectionForm from '@/components/dealers/DealerConnectionForm'
import { normalizeFinishInterest } from '@/lib/dealerConnection'

export default function DealerConnectionFormLoader() {
  const searchParams = useSearchParams()
  const initialCity = searchParams.get('city') ?? ''
  const initialFinish = normalizeFinishInterest(searchParams.get('finish'))

  return <DealerConnectionForm initialCity={initialCity} initialFinish={initialFinish} />
}
