 'use client'

import { Suspense, useState } from 'react'
import HeroSlider from '@/components/HeroSlider'
import SectionTwo from '@/components/SectionTwo'
import SectionThree from '@/components/SectionThree'
import BreakSection from '@/components/BreakSection'
import WhyRedMarkSection from '@/components/WhyRedMarkSection'
import MidPageCtaSection from '@/components/MidPageCtaSection'
import FeatureHighlightSection from '@/components/FeatureHighlightSection'
import ForProfessionalsMiniSection from '@/components/ForProfessionalsMiniSection'
import ProjectsPreview from '@/components/ProjectsPreview'
import RealProjectBlockSection from '@/components/RealProjectBlockSection'
import MicroTestimonialSection from '@/components/MicroTestimonialSection'
import FinalCtaSection from '@/components/FinalCtaSection'
import ImageModal from '@/components/ImageModal'
import NotFoundRedirectPopup from '@/components/NotFoundRedirectPopup'

type ActiveImage = {
  gallery: { src: string; alt: string }[]
  index: number
} | null

export default function Home() {
  const [activeImage, setActiveImage] = useState<ActiveImage>(null)

  const openImageModal = (gallery: { src: string; alt: string }[], index: number) => {
    setActiveImage({ gallery, index })
  }

  const closeImageModal = () => {
    setActiveImage(null)
  }

  return (
    <div className="home-page">
      <Suspense fallback={null}>
        <NotFoundRedirectPopup />
      </Suspense>
      <HeroSlider />
      <SectionTwo />
      <SectionThree />
      <BreakSection />
      <WhyRedMarkSection />
      <MidPageCtaSection />
      <FeatureHighlightSection />
      <ForProfessionalsMiniSection />
      <ProjectsPreview onImageClick={openImageModal} />
      <RealProjectBlockSection />
      <MicroTestimonialSection />
      <FinalCtaSection />
      <ImageModal
        isOpen={Boolean(activeImage)}
        images={activeImage?.gallery || []}
        currentIndex={activeImage?.index || 0}
        onNavigate={(nextIndex) => {
          if (!activeImage) return
          setActiveImage({ ...activeImage, index: nextIndex })
        }}
        onClose={closeImageModal}
      />
    </div>
  )
}
