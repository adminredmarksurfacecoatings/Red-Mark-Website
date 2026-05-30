import type { FinishCollectionConfig, FinishRequestSampleConfig } from '@/lib/finishCollection/types'
import { shadeCardPdfPath, shadeImagePath } from '@/lib/finishCollection/types'

const ASSET_BASE = '/Finishes/exterior/stone-finish'
const SHADE_CARD_FILE = 'Stone finish SC.pdf'

const fallbackTextures = [
  '/Finishes/ChatGPT-Image-Feb-17-2026-03_52_52-PM.png',
  '/Finishes/ChatGPT-Image-Feb-17-2026-03_55_38-PM.png',
  '/Finishes/ChatGPT-Image-Feb-17-2026-03_57_20-PM.png',
  '/Finishes/ChatGPT-Image-Feb-17-2026-04_05_15-PM.png',
  '/Finishes/ChatGPT-Image-Feb-17-2026-04_08_02-PM.png',
  '/Finishes/ChatGPT-Image-Feb-17-2026-04_09_48-PM.png',
  '/Finishes/ChatGPT-Image-Feb-17-2026-04_15_19-PM.png',
  '/Finishes/ChatGPT-Image-Feb-17-2026-04_17_23-PM.png',
  '/Stone_hero.png',
  '/home_grid_2.png',
  '/section_2.png',
  '/home_grid_1.png',
]

const shadeDefinitions = [
  { code: 'ST-001', name: 'Granite Grey' },
  { code: 'ST-002', name: 'Charcoal Stone' },
  { code: 'ST-003', name: 'Basalt Grey' },
  { code: 'ST-004', name: 'Slate Mist' },
  { code: 'ST-005', name: 'Sandstone Beige' },
  { code: 'ST-006', name: 'Ivory White' },
  { code: 'ST-007', name: 'Warm Sand' },
  { code: 'ST-008', name: 'Desert Tan' },
  { code: 'ST-009', name: 'Terra Brown' },
  { code: 'ST-010', name: 'Ash Grey' },
  { code: 'ST-011', name: 'Cloud White' },
  { code: 'ST-012', name: 'Rose Mist' },
]

const shades = shadeDefinitions.map((shade, index) => ({
  ...shade,
  image: shadeImagePath(ASSET_BASE, shade.code),
  fallbackImage: fallbackTextures[index],
}))

export const STONE_FINISH_COLLECTION: FinishCollectionConfig = {
  slug: 'stone-finish',
  title: 'Stone Finish',
  collectionTitle: 'Stone Finish Collection',
  eyebrow: 'Exterior Collection',
  breadcrumbLabel: 'Stone Finish',
  collectionHubHref: '/finishes/exterior',
  collectionHubLabel: 'Exterior Collection',
  pageHref: '/finishes/exterior/stone-finish',
  requestSampleHref: '/finishes/exterior/stone-finish/request-sample',
  heroLead:
    'Timeless stone textures crafted for exterior walls, facades, and architectural surfaces — offering natural depth, weather resistance, and enduring appeal.',
  heroImage: `${ASSET_BASE}/hero/hero.webp`,
  heroImageFallback: '/Finishes/ChatGPT-Image-Feb-17-2026-04_15_19-PM.png',
  heroImageAlt: 'Stone finish exterior on a contemporary facade',
  shadeCardSectionId: 'stone-finish-shade-card',
  shadeCard: {
    pdf: shadeCardPdfPath(ASSET_BASE, SHADE_CARD_FILE),
    downloadName: 'Stone-Finish-Shade-Card.pdf',
    cover: `${ASSET_BASE}/shade-card/cover.webp`,
    coverFallback: `${ASSET_BASE}/shade-card/cover.jpg`,
    coverWidth: 4385,
    coverHeight: 5260,
  },
  shades,
  specs: [
    {
      label: 'Ideal For',
      value: 'Exterior Walls, Facades, Boundary Walls, Columns',
      icon: 'ideal',
    },
    {
      label: 'Finish Character',
      value: 'Natural Stone Look with Subtle Texture & Depth',
      icon: 'character',
    },
    {
      label: 'Performance',
      value: 'Weather Resistant, UV Stable, Efflorescence Resistant',
      icon: 'performance',
    },
    {
      label: 'Application',
      value: 'Professional Application for Best Results',
      icon: 'application',
    },
  ],
  heroFeatures: [
    { label: 'Weather Resistant', icon: 'weather' },
    { label: 'UV Stable & Fade Resistant', icon: 'uv' },
    { label: 'Durable & Long Lasting', icon: 'durable' },
  ],
  shadesSection: {
    eyebrow: 'Stone Finish Shades',
    heading: 'Natural tones. Timeless appeal.',
    intro: 'A curated palette of stone-inspired textures designed for modern exteriors.',
  },
  ctaSection: {
    eyebrow: 'Explore the Complete Range',
    heading: 'Stone Finish Shade Card',
    description: 'View all shades in detail and find the perfect tone for your project.',
  },
  specAriaLabel: 'Stone finish specifications',
}

export const STONE_FINISH_REQUEST_SAMPLE: FinishRequestSampleConfig = {
  slug: 'stone-finish',
  title: 'Stone Finish',
  eyebrow: 'Exterior Collection',
  backHref: '/finishes/exterior/stone-finish',
  breadcrumbLabel: 'Stone Finish',
  collectionHubHref: '/finishes/exterior',
  collectionHubLabel: 'Exterior Collection',
  requestSampleHref: '/finishes/exterior/stone-finish/request-sample',
  formSubject: 'Stone Finish sample request — Red Mark website',
  shadeCodePattern: /ST-\d{3}/i,
  shades,
}
