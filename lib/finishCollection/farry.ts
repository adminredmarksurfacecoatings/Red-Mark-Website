import type { FinishCollectionConfig, FinishRequestSampleConfig, FinishShade } from '@/lib/finishCollection/types'
import { shadeCardPdfPath, shadeImagePath } from '@/lib/finishCollection/types'
import { shadecardCoverPath } from '@/lib/shadecards'

const COLLECTION_SLUG = 'farry'
const SHADE_CARD_FILE = 'Farry SC.pdf'

const fallbackTextures = [
  '/home_hero_interior_1.png',
  '/home_hero_interior_2.png',
  '/home_grid_1.png',
  '/Finishes/cream-stucco-outdoor-living-wicker-patio.png',
  '/Finishes/blue-limewash-wall-modern-bedroom.png',
  '/Finishes/sage-green-mineral-wall-living-room.png',
]

/** Approved display order (FA-101–FA-116). Codes renumbered to match sequence. */
const shadeDefinitions = [
  { code: 'FA-101', name: 'Pearl Grey' },
  { code: 'FA-102', name: 'Grey Dawn' },
  { code: 'FA-103', name: 'Ice Grey' },
  { code: 'FA-104', name: 'Honey Dew' },
  { code: 'FA-105', name: 'Ivory' },
  { code: 'FA-106', name: 'Natural Linen' },
  { code: 'FA-107', name: 'Barley' },
  { code: 'FA-108', name: 'Sands of Time' },
  { code: 'FA-109', name: 'Rose Meadows' },
  { code: 'FA-110', name: 'First Ray' },
  { code: 'FA-111', name: 'Rich Rose' },
  { code: 'FA-112', name: 'Scarlet' },
  { code: 'FA-113', name: 'Wisteria' },
  { code: 'FA-114', name: 'Snow Blue' },
  { code: 'FA-115', name: 'Sky City' },
  { code: 'FA-116', name: 'Misty Green' },
]

const shades: FinishShade[] = shadeDefinitions.map((shade, index) => ({
  ...shade,
  image: shadeImagePath(COLLECTION_SLUG, shade.code),
  fallbackImage: fallbackTextures[index % fallbackTextures.length],
}))

export const FARRY_COLLECTION: FinishCollectionConfig = {
  slug: 'farry',
  title: 'Farry',
  collectionTitle: "Farry High-Sheen Interior Finish",
  eyebrow: 'Interior Collection',
  breadcrumbLabel: 'Farry',
  collectionHubHref: '/finishes/interior',
  collectionHubLabel: 'Interior Collection',
  pageHref: '/finishes/interior/farry',
  requestSampleHref: '/finishes/interior/farry/request-sample',
  heroLead:
    "A decorative finish for interior walls with a pronounced sheen rather than a glitter or sparkle effect. Explore sixteen shades and choose a physical sample to assess the finish in your own light.",
  heroImage: shadecardCoverPath(COLLECTION_SLUG),
  heroImageFallback: '/home_hero_interior_1.png',
  heroImageAlt: 'Farry high-sheen wall texture finish by Red Mark',
  shadeCardSectionId: 'farry-shade-card',
  shadeCard: {
    pdf: shadeCardPdfPath(COLLECTION_SLUG, SHADE_CARD_FILE),
    downloadName: 'Farry-Shade-Card.pdf',
    cover: shadecardCoverPath(COLLECTION_SLUG),
    coverFallback: shadecardCoverPath(COLLECTION_SLUG, 'jpg'),
    coverWidth: 1194,
    coverHeight: 1687,
  },
  shades,
  specs: [
  {
    "label": "Suitable for",
    "value": "Interior only",
    "icon": "ideal"
  },
  {
    "label": "Pack sizes",
    "value": "1 L & 4 L",
    "icon": "character"
  },
  {
    "label": "Approx. coverage",
    "value": "50–60 sq ft per litre",
    "icon": "performance"
  },
  {
    "label": "Finish character",
    "value": "High sheen, without a sparkle effect",
    "icon": "application"
  }
],
  heroFeatures: [
  {
    "label": "Interior Only",
    "icon": "weather"
  },
  {
    "label": "High-Sheen Finish",
    "icon": "uv"
  },
  {
    "label": "Sixteen Shades",
    "icon": "durable"
  }
],
  shadesSection: {
    eyebrow: 'Farry Shades',
    heading: 'Sixteen luminous expressions.',
    intro:
      'A curated range of high-sheen Farry textures — from cool silvers and pearls to soft rose and lilac lustres.',
    note: 'Warning: Due to the high-sheen finish, the shades shown in these photographs are not accurate. Request a physical sample for true colour reference.',
  },
  ctaSection: {
    eyebrow: 'Explore the Complete Range',
    heading: 'Farry Shade Card',
    description: 'Download the Farry front page for shade references and offline sharing.',
  },
  specAriaLabel: 'Farry specifications',
}

export const FARRY_REQUEST_SAMPLE: FinishRequestSampleConfig = {
  slug: 'farry',
  title: 'Farry',
  eyebrow: 'Interior Collection',
  backHref: '/finishes/interior/farry',
  breadcrumbLabel: 'Farry',
  collectionHubHref: '/finishes/interior',
  collectionHubLabel: 'Interior Collection',
  requestSampleHref: '/finishes/interior/farry/request-sample',
  shadeCodePattern: /FA-\d{3}/i,
  shades,
}
