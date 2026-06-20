import type { FinishCollectionConfig, FinishRequestSampleConfig, FinishShade } from '@/lib/finishCollection/types'
import { shadeCardPdfPath, shadeImagePath } from '@/lib/finishCollection/types'
import { shadecardCoverPath } from '@/lib/shadecards'

const COLLECTION_SLUG = 'create-art'
const SHADE_CARD_FILE = 'Create art SC.pdf'

const fallbackTextures = [
  '/home_grid_1.png',
  '/home_hero_interior_1.png',
  '/home_hero_interior_2.png',
  '/Finishes/ChatGPT-Image-Feb-17-2026-04_17_23-PM.png',
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
  collectionTitle: 'Create Art Collection',
  eyebrow: 'Interior Collection',
  breadcrumbLabel: 'Create Art',
  collectionHubHref: '/finishes/interior',
  collectionHubLabel: 'Interior Collection',
  pageHref: '/finishes/interior/create-art',
  requestSampleHref: '/finishes/interior/create-art/request-sample',
  heroLead:
    'Expressive decorative textures for interior walls and feature surfaces — crafted for designers who want material depth, artisan character, and a refined architectural finish.',
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
      label: 'Ideal For',
      value: 'Interior Feature Walls, Lobbies, Retail, Hospitality Spaces',
      icon: 'ideal',
    },
    {
      label: 'Finish Character',
      value: 'Artisan Textures with Layered Depth and Visual Movement',
      icon: 'character',
    },
    {
      label: 'Performance',
      value: 'Durable Interior Coating with Professional Application',
      icon: 'performance',
    },
    {
      label: 'Application',
      value: 'Professional Application for Best Results',
      icon: 'application',
    },
  ],
  heroFeatures: [
    { label: 'Designer-Led Finishes', icon: 'weather' },
    { label: 'Rich Tactile Depth', icon: 'uv' },
    { label: 'Interior Feature Ready', icon: 'durable' },
  ],
  shadesSection: {
    eyebrow: 'Create Art Shades',
    heading: 'Three families. Twelve expressions.',
    intro:
      'Slate, Dropway, and Subaru — curated decorative textures for interiors that call for character and craft.',
  },
  ctaSection: {
    eyebrow: 'Explore the Complete Range',
    heading: 'Create Art Shade Card',
    description: 'Download the printable shade card for specifications, references, and offline sharing.',
  },
  specAriaLabel: 'Create Art specifications',
}

export const CREATE_ART_REQUEST_SAMPLE: FinishRequestSampleConfig = {
  slug: 'create-art',
  title: 'Create Art',
  eyebrow: 'Interior Collection',
  backHref: '/finishes/interior/create-art',
  breadcrumbLabel: 'Create Art',
  collectionHubHref: '/finishes/interior',
  collectionHubLabel: 'Interior Collection',
  requestSampleHref: '/finishes/interior/create-art/request-sample',
  formSubject: 'Create Art sample request — Red Mark website',
  shadeCodePattern: /(SL|DR|SU)-\d{2}/i,
  shades,
}
