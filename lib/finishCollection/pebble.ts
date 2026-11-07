import type { FinishCollectionConfig, FinishRequestSampleConfig } from '@/lib/finishCollection/types'
import { shadeCardPdfPath } from '@/lib/finishCollection/types'
import { shadecardCoverPath } from '@/lib/shadecards'

const COLLECTION_SLUG = 'pebble-finish'
const SHADE_CARD_FILE = 'Pebble SC.pdf'

const fallbackTextures = [
  '/Finishes/mediterranean-textured-wall-arched-loggia.png',
  '/Finishes/cream-stucco-outdoor-living-wicker-patio.png',
  '/Finishes/sand-plaster-wall-kitchen-island.png',
  '/Finishes/blue-limewash-wall-modern-bedroom.png',
  '/Finishes/sage-green-mineral-wall-living-room.png',
  '/Finishes/ochre-stucco-exterior-patio-finish.png',
  '/Finishes/mustard-limewash-wall-dining-room.png',
  '/Finishes/ochre-mineral-wall-texture-living-room.png',
  '/home_grid_2.png',
  '/Finishes/exterior/stone-finish/hero/stone-finish-exterior-facade-beige-grooved-wall.webp',
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
  // Use the existing display image until final pebble swatch assets are supplied.
  image: fallbackTextures[index],
  fallbackImage: fallbackTextures[index],
}))

export const PEBBLE_FINISH_COLLECTION: FinishCollectionConfig = {
  slug: 'pebble-finish',
  title: 'Pebble Finish',
  collectionTitle: "Pebble Finish Marble Wall Texture",
  eyebrow: 'Interior & Exterior Collection',
  breadcrumbLabel: 'Pebble Finish',
  pageHref: '/finishes/exterior/pebble-finish',
  requestSampleHref: '/finishes/exterior/pebble-finish/request-sample',
  heroLead:
    "A marble texture with a smoother surface than Stone Finish, for interior and exterior cemented walls. Pebble Finish is applied in two trowel coats over a white primed base.",
  heroImage: '/Finishes/mediterranean-textured-wall-arched-loggia.png',
  heroImageFallback: '/Finishes/mediterranean-textured-wall-arched-loggia.png',
  heroImageAlt: 'Pebble finish on interior and exterior architectural surfaces',
  shadeCardSectionId: 'pebble-finish-shade-card',
  shadeCard: {
    pdf: shadeCardPdfPath(COLLECTION_SLUG, SHADE_CARD_FILE),
    downloadName: 'Pebble-Finish-Shade-Card.pdf',
    cover: shadecardCoverPath(COLLECTION_SLUG),
    coverFallback: shadecardCoverPath(COLLECTION_SLUG, 'jpg'),
    coverWidth: 4142,
    coverHeight: 4937,
  },
  shades,
  specs: [
  {
    "label": "Suitable for",
    "value": "Interior & exterior",
    "icon": "ideal"
  },
  {
    "label": "Pack size",
    "value": "25 kg + 5 kg pack",
    "icon": "character"
  },
  {
    "label": "Approx. coverage",
    "value": "140 sq ft per pack",
    "icon": "performance"
  },
  {
    "label": "Application",
    "value": "2 coats with a trowel",
    "icon": "application"
  }
],
  heroFeatures: [
  {
    "label": "Interior & Exterior",
    "icon": "weather"
  },
  {
    "label": "Smoother Texture",
    "icon": "uv"
  },
  {
    "label": "Trowel Applied",
    "icon": "durable"
  }
],
  shadesSection: {
    eyebrow: 'Pebble Finish Shades',
    heading: 'Granular tones. Rich texture.',
    intro: 'A curated palette of pebble-inspired textures designed for interior and exterior applications.',
  },
  ctaSection: {
    eyebrow: 'Explore the Complete Range',
    heading: 'Pebble Finish Shade Card',
    description: 'Download the printable shade card for shade references and offline sharing.',
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
  shadeCodePattern: /PB-\d{3}/i,
  shades,
}
