import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { assertStaffSession } from '@/lib/orders/assertStaffSession'

const PUBLIC_MEDIA_PATHS = [
  '/',
  '/projects',
  '/finishes',
  '/finishes/exterior',
  '/finishes/exterior/stone-finish',
  '/finishes/exterior/pebble-finish',
  '/finishes/interior',
  '/finishes/interior/create-art',
  '/finishes/all',
  '/collections/interior',
  '/collections/exterior',
  '/collections/all',
  '/collections/stone',
  '/collections/mineral',
]

export async function POST() {
  const session = await assertStaffSession()
  if (!session.ok) {
    return NextResponse.json({ error: session.error }, { status: session.status })
  }

  for (const path of PUBLIC_MEDIA_PATHS) {
    revalidatePath(path)
  }

  return NextResponse.json({ revalidated: true })
}
