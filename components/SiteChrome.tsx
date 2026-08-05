'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { purgeExpiredImageCache } from '@/lib/clientImageCache'

export default function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isAdmin = pathname?.startsWith('/admin')

  useEffect(() => {
    if (isAdmin) return
    void purgeExpiredImageCache()
  }, [isAdmin])

  if (isAdmin) {
    return <main style={{ position: 'relative', zIndex: 1 }}>{children}</main>
  }

  return (
    <>
      <Navbar />
      <main style={{ position: 'relative', zIndex: 1 }}>{children}</main>
      <Footer />
    </>
  )
}
