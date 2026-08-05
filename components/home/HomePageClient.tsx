'use client'

import { Suspense } from 'react'
import HeroSlider from '@/components/HeroSlider'
import SectionTwo from '@/components/SectionTwo'
import SectionThree from '@/components/SectionThree'
import BreakSection from '@/components/BreakSection'
import WhyRedMarkSection from '@/components/WhyRedMarkSection'
import MidPageCtaSection from '@/components/MidPageCtaSection'
import FeatureHighlightSection from '@/components/FeatureHighlightSection'
import ForProfessionalsMiniSection from '@/components/ForProfessionalsMiniSection'
import FinalCtaSection from '@/components/FinalCtaSection'
import BrochureDownloadSection from '@/components/BrochureDownloadSection'
import DealerNetworkSection from '@/components/home/DealerNetworkSection'
import HomeFinishesGrid from '@/components/home/HomeFinishesGrid'
import NotFoundRedirectPopup from '@/components/NotFoundRedirectPopup'

type HomePageClientProps = {
  finishesImages?: string[]
}

export default function HomePageClient({ finishesImages }: HomePageClientProps) {
  return (
    <div className="home-page">
      <Suspense fallback={null}>
        <NotFoundRedirectPopup />
      </Suspense>
      <HeroSlider />
      <HomeFinishesGrid images={finishesImages} />
      <SectionThree />
      <SectionTwo />
      <BrochureDownloadSection showCataloguesLink />
      <BreakSection />
      <WhyRedMarkSection />
      <MidPageCtaSection />
      <FeatureHighlightSection />
      <ForProfessionalsMiniSection />
      <DealerNetworkSection />
      <FinalCtaSection />
    </div>
  )
}
