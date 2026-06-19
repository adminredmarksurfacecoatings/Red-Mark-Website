import type { FinishCollectionConfig, FinishRequestSampleConfig } from '@/lib/finishCollection/types'
import { shadeCardPdfPath, shadeImagePath } from '@/lib/finishCollection/types'

const ASSET_BASE = '/Finishes/exterior/stone-finish'
const SHADE_CARD_FILE = 'Stone finish SC.pdf'

const fallbackTextures = [
  '/Stone_hero.png',
  '/home_grid_2.png',
  '/section_2.png',
]

const shadeDefinitions = [
  { code: 'ST-001', name: 'Charcoal Speckle' },
  { code: 'ST-002', name: 'Silver Granite' },
  { code: 'ST-003', name: 'Frosted Quartz' },
  { code: 'ST-004', name: 'Dusty Rose' },
  { code: 'ST-005', name: 'Desert Rose' },
  { code: 'ST-006', name: 'Mauve Mist' },
  { code: 'ST-007', name: 'Stormy Slate' },
  { code: 'ST-008', name: 'Midnight Slate' },
  { code: 'ST-009', name: 'Pewter Pebble' },
  { code: 'ST-010', name: 'Coastal Granite' },
  { code: 'ST-011', name: 'Granite Mist' },
  { code: 'ST-012', name: 'Arctic Mist' },
  { code: 'ST-013', name: 'Smoky Taupe' },
  { code: 'ST-014', name: 'Mist Beige' },
  { code: 'ST-015', name: 'Sandy Pebble' },
  { code: 'ST-016', name: 'Twilight Granite' },
  { code: 'ST-017', name: 'Coastal Sage' },
  { code: 'ST-018', name: 'Cream Granite' },
  { code: 'ST-019', name: 'Rosy Sandstone' },
  { code: 'ST-020', name: 'Sandy Speckle' },
  { code: 'ST-021', name: 'Warm Shore' },
  { code: 'ST-022', name: 'Earthy Mocha' },
  { code: 'ST-023', name: 'Toasted Sandstone' },
  { code: 'ST-024', name: 'Warm Taupe' },
  { code: 'ST-025', name: 'Charcoal Mist' },
  { code: 'ST-026', name: 'Mossy Sandstone' },
  { code: 'ST-027', name: 'Snowy Amber' },
  { code: 'ST-028', name: 'Dusty Plum' },
  { code: 'ST-029', name: 'Desert Sandstone' },
  { code: 'ST-030', name: 'Arctic Speckle' },
  { code: 'ST-031', name: 'Charcoal Granite' },
  { code: 'ST-032', name: 'Speckled Cream' },
  { code: 'ST-033', name: 'Desert Mist' },
  { code: 'ST-034', name: 'Glacier Pebble' },
  { code: 'ST-035', name: 'Arctic Slate' },
  { code: 'ST-036', name: 'Seafoam Speckle' },
  { code: 'ST-037', name: 'Misty Earth' },
  { code: 'ST-038', name: 'Natural Sandstone' },
  { code: 'ST-039', name: 'Sandy Granite' },
  { code: 'ST-040', name: 'Heather Taupe' },
  { code: 'ST-041', name: 'Silver Ash' },
  { code: 'ST-042', name: 'Warm Sahara' },
  { code: 'ST-043', name: 'Desert Garnet' },
  { code: 'ST-044', name: 'Ash Ember' },
  { code: 'ST-045', name: 'Urban Greige' },
  { code: 'ST-046', name: 'Gilded Granite' },
  { code: 'ST-047', name: 'Speckled Ash' },
  { code: 'ST-048', name: 'Silver Sandstone' },
]

const shades = shadeDefinitions.map((shade, index) => ({
  ...shade,
  image: shadeImagePath(ASSET_BASE, shade.code),
  fallbackImage: fallbackTextures[index % fallbackTextures.length],
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
    intro: 'Forty-eight curated stone-inspired textures — each with a distinct character for modern exteriors.',
  },
  ctaSection: {
    eyebrow: 'Explore the Complete Range',
    heading: 'Stone Finish Shade Card',
    description: 'Download the printable shade card for specifications, references, and offline sharing.',
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
