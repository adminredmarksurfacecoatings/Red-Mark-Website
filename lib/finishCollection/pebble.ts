import type { FinishCollectionConfig, FinishRequestSampleConfig } from '@/lib/finishCollection/types'
import { shadeCardPdfPath, shadeImagePath } from '@/lib/finishCollection/types'

const ASSET_BASE = '/Finishes/exterior/pebble-finish'
const SHADE_CARD_FILE = 'Pebble SC.pdf'

const fallbackTextures = [
  '/Finishes/ChatGPT-Image-Feb-17-2026-04_15_19-PM.png',
  '/Finishes/ChatGPT-Image-Feb-17-2026-04_17_23-PM.png',
  '/Finishes/ChatGPT-Image-Feb-17-2026-04_09_48-PM.png',
  '/Finishes/ChatGPT-Image-Feb-17-2026-04_08_02-PM.png',
  '/Finishes/ChatGPT-Image-Feb-17-2026-04_05_15-PM.png',
  '/Finishes/ChatGPT-Image-Feb-17-2026-03_57_20-PM.png',
  '/Finishes/ChatGPT-Image-Feb-17-2026-03_55_38-PM.png',
  '/Finishes/ChatGPT-Image-Feb-17-2026-03_52_52-PM.png',
  '/home_grid_2.png',
  '/Stone_hero.png',
  '/section_2.png',
  '/home_grid_1.png',
]

/** Update names and `image` paths when final pebble swatch photos are ready. */
const shadeDefinitions = [
  { code: 'PB-001', name: 'Granite Pebble' },
  { code: 'PB-002', name: 'Coastal Grey' },
  { code: 'PB-003', name: 'River Stone' },
  { code: 'PB-004', name: 'Mist Grey' },
  { code: 'PB-005', name: 'Sandstone Mix' },
  { code: 'PB-006', name: 'Ivory Pebble' },
  { code: 'PB-007', name: 'Warm Beige' },
  { code: 'PB-008', name: 'Desert Stone' },
  { code: 'PB-009', name: 'Terra Mix' },
  { code: 'PB-010', name: 'Ash Pebble' },
  { code: 'PB-011', name: 'Cloud Mix' },
  { code: 'PB-012', name: 'Rose Stone' },
]

const shades = shadeDefinitions.map((shade, index) => ({
  ...shade,
  image: shadeImagePath(ASSET_BASE, shade.code),
  fallbackImage: fallbackTextures[index],
}))

export const PEBBLE_FINISH_COLLECTION: FinishCollectionConfig = {
  slug: 'pebble-finish',
  title: 'Pebble Finish',
  collectionTitle: 'Pebble Finish Collection',
  eyebrow: 'Interior & Exterior Collection',
  breadcrumbLabel: 'Pebble Finish',
  pageHref: '/finishes/exterior/pebble-finish',
  requestSampleHref: '/finishes/exterior/pebble-finish/request-sample',
  heroLead:
    'Granular mineral textures crafted for interior and exterior walls, facades, and architectural surfaces — offering visual richness, durability, and enduring appeal.',
  heroImage: `${ASSET_BASE}/hero/hero.webp`,
  heroImageFallback: '/Finishes/ChatGPT-Image-Feb-17-2026-04_15_19-PM.png',
  heroImageAlt: 'Pebble finish on interior and exterior architectural surfaces',
  shadeCardSectionId: 'pebble-finish-shade-card',
  shadeCard: {
    pdf: shadeCardPdfPath(ASSET_BASE, SHADE_CARD_FILE),
    downloadName: 'Pebble-Finish-Shade-Card.pdf',
    cover: `${ASSET_BASE}/shade-card/cover.webp`,
    coverFallback: `${ASSET_BASE}/shade-card/cover.jpg`,
    coverWidth: 4142,
    coverHeight: 4937,
  },
  shades,
  specs: [
    {
      label: 'Ideal For',
      value: 'Interior Walls, Exterior Facades, Feature Walls, Commercial Spaces',
      icon: 'ideal',
    },
    {
      label: 'Finish Character',
      value: 'Granular Pebble Texture with Natural Mineral Depth',
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
    eyebrow: 'Pebble Finish Shades',
    heading: 'Granular tones. Rich texture.',
    intro: 'A curated palette of pebble-inspired textures designed for interior and exterior applications.',
  },
  ctaSection: {
    eyebrow: 'Explore the Complete Range',
    heading: 'Pebble Finish Shade Card',
    description: 'View all shades in detail and find the perfect tone for your project.',
  },
  specAriaLabel: 'Pebble finish specifications',
}

export const PEBBLE_FINISH_REQUEST_SAMPLE: FinishRequestSampleConfig = {
  slug: 'pebble-finish',
  title: 'Pebble Finish',
  eyebrow: 'Interior & Exterior Collection',
  backHref: '/finishes/exterior/pebble-finish',
  breadcrumbLabel: 'Pebble Finish',
  requestSampleHref: '/finishes/exterior/pebble-finish/request-sample',
  formSubject: 'Pebble Finish sample request — Red Mark website',
  shadeCodePattern: /PB-\d{3}/i,
  shades,
}
