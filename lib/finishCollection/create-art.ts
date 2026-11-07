import type { FinishCollectionConfig, FinishRequestSampleConfig, FinishShade } from '@/lib/finishCollection/types'
import { shadeCardPdfPath, shadeImagePath } from '@/lib/finishCollection/types'
import { shadecardCoverPath } from '@/lib/shadecards'

const COLLECTION_SLUG = 'create-art'
const SHADE_CARD_FILE = 'Create art SC.pdf'

const fallbackTextures = [
  '/home_grid_1.png',
  '/home_hero_interior_1.png',
  '/home_hero_interior_2.png',
  '/Finishes/cream-stucco-outdoor-living-wicker-patio.png',
]

function buildShades(definitions: Array<{ code: string; name: string }>, offset: number): FinishShade[] {
  return definitions.map((shade, index) => ({
    ...shade,
    image: shadeImagePath(COLLECTION_SLUG, shade.code),
    fallbackImage: fallbackTextures[(offset + index) % fallbackTextures.length],
  }))
}

const slateShades = buildShades(
  [
    { code: 'SL-01', name: 'Sienna Ridge' },
    { code: 'SL-02', name: 'Arctic Slate' },
    { code: 'SL-03', name: 'Weathered Mist' },
    { code: 'SL-04', name: 'Shadowed Slate' },
  ],
  0
)

const dropwayShades = buildShades(
  [
    { code: 'DR-01', name: 'Copper Dune' },
    { code: 'DR-02', name: 'Storm Slate' },
    { code: 'DR-03', name: 'Desert Taupe' },
    { code: 'DR-04', name: 'Slate Mist' },
  ],
  1
)

const subaruShades = buildShades(
  [
    { code: 'SU-01', name: 'Silver Grain' },
    { code: 'SU-02', name: 'Pearl Ash' },
    { code: 'SU-03', name: 'Golden Sand' },
    { code: 'SU-04', name: 'Rose Clay' },
  ],
  2
)

const shades = [...slateShades, ...dropwayShades, ...subaruShades]

export const CREATE_ART_COLLECTION: FinishCollectionConfig = {
  slug: 'create-art',
  title: 'Create Art',
  collectionTitle: "Create Art Decorative Wall Texture",
  eyebrow: 'Interior & Exterior Collection',
  breadcrumbLabel: 'Create Art',
  collectionHubHref: '/finishes/interior',
  collectionHubLabel: 'Interior Collection',
  pageHref: '/finishes/interior/create-art',
  requestSampleHref: '/finishes/interior/create-art/request-sample',
  heroLead:
    "Create textured designs indoors or outdoors with a three-product system: white design material, TC 200 sealer and Oxido colour coat. Start with a smooth, white base.",
  heroImage: shadecardCoverPath(COLLECTION_SLUG),
  heroImageFallback: '/home_hero_interior_1.png',
  heroImageAlt: 'Create Art textured finish in a contemporary interior',
  shadeCardSectionId: 'create-art-shade-card',
  shadeCard: {
    pdf: shadeCardPdfPath(COLLECTION_SLUG, SHADE_CARD_FILE),
    downloadName: 'Create-Art-Shade-Card.pdf',
    cover: shadecardCoverPath(COLLECTION_SLUG),
    coverFallback: shadecardCoverPath(COLLECTION_SLUG, 'jpg'),
    coverWidth: 4025,
    coverHeight: 5017,
  },
  shades,
  shadeGroups: [
    { id: 'slate', heading: 'Slate', shades: slateShades },
    { id: 'dropway', heading: 'Dropway', shades: dropwayShades },
    { id: 'subaru', heading: 'Subaru', shades: subaruShades },
  ],
  specs: [
  {
    "label": "Suitable for",
    "value": "Interior & exterior",
    "icon": "ideal"
  },
  {
    "label": "Design material",
    "value": "25 kg bucket",
    "icon": "character"
  },
  {
    "label": "Approx. coverage",
    "value": "150–200 sq ft per 25 kg, design dependent",
    "icon": "performance"
  },
  {
    "label": "System",
    "value": "Design material → TC 200 → Oxido",
    "icon": "application"
  }
],
  heroFeatures: [
  {
    "label": "Interior & Exterior",
    "icon": "weather"
  },
  {
    "label": "Three-Product System",
    "icon": "uv"
  },
  {
    "label": "Design-Led Texture",
    "icon": "durable"
  }
],
  shadesSection: {
    eyebrow: 'Create Art Shades',
    heading: 'Three families. Twelve expressions.',
    intro:
      'Slate, Dropway, and Subaru — decorative textures for interior and exterior walls.',
  },
  ctaSection: {
    eyebrow: 'Explore the Complete Range',
    heading: 'Create Art Shade Card',
    description: 'Download the printable shade card for shade references and offline sharing.',
  },
  specAriaLabel: 'Create Art specifications',
}

export const CREATE_ART_REQUEST_SAMPLE: FinishRequestSampleConfig = {
  slug: 'create-art',
  title: 'Create Art',
  eyebrow: 'Interior & Exterior Collection',
  backHref: '/finishes/interior/create-art',
  breadcrumbLabel: 'Create Art',
  collectionHubHref: '/finishes/interior',
  collectionHubLabel: 'Interior Collection',
  requestSampleHref: '/finishes/interior/create-art/request-sample',
  shadeCodePattern: /(SL|DR|SU)-\d{2}/i,
  shades,
}
