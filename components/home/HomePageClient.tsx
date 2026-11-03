import { Suspense } from 'react'
import HeroSlider from '@/components/HeroSlider'
import SectionThree from '@/components/SectionThree'
import WhyRedMarkSection from '@/components/WhyRedMarkSection'
import ForProfessionalsMiniSection from '@/components/ForProfessionalsMiniSection'
import FinalCtaSection from '@/components/FinalCtaSection'
import BrochureDownloadSection from '@/components/BrochureDownloadSection'
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
      <SectionThree />
      <HomeFinishesGrid images={finishesImages} />
      <BrochureDownloadSection showCataloguesLink />
      <WhyRedMarkSection />
      <ForProfessionalsMiniSection />
      <FinalCtaSection />
    </div>
  )
}
