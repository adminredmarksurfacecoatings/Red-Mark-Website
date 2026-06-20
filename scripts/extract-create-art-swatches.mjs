/**
 * Crops individual swatches from Create Art shade card PDF pages 2–4.
 * Run: npm run extract:create-art-swatches
 */
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import sharp from 'sharp'
import { pdf } from 'pdf-to-img'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.join(__dirname, '..')
const PDF_PATH = path.join(ROOT, 'public/Shadecards/create-art/shade-card/Create art SC.pdf')
const OUT_ROOT = path.join(ROOT, 'public/Shadecards/create-art/single-shades')

/** Relative crop boxes per shade card page (Slate, Dropway, Subaru). */
const PAGE_CROPS = [
  {
    codes: ['SL-01', 'SL-02', 'SL-03', 'SL-04'],
    regions: [
      { left: 0.07, top: 0.17, width: 0.43, height: 0.66 },
      { left: 0.54, top: 0.17, width: 0.39, height: 0.19 },
      { left: 0.54, top: 0.38, width: 0.39, height: 0.19 },
      { left: 0.54, top: 0.59, width: 0.39, height: 0.19 },
    ],
  },
  {
    codes: ['DR-01', 'DR-02', 'DR-03', 'DR-04'],
    regions: [
      { left: 0.07, top: 0.17, width: 0.43, height: 0.66 },
      { left: 0.54, top: 0.17, width: 0.39, height: 0.19 },
      { left: 0.54, top: 0.38, width: 0.39, height: 0.19 },
      { left: 0.54, top: 0.59, width: 0.39, height: 0.19 },
    ],
  },
  {
    codes: ['SU-01', 'SU-02', 'SU-03', 'SU-04'],
    regions: [
      { left: 0.07, top: 0.17, width: 0.43, height: 0.66 },
      { left: 0.54, top: 0.17, width: 0.39, height: 0.19 },
      { left: 0.54, top: 0.38, width: 0.39, height: 0.19 },
      { left: 0.54, top: 0.59, width: 0.39, height: 0.19 },
    ],
  },
]

async function cropRegion(pageBuffer, region) {
  const meta = await sharp(pageBuffer).metadata()
  const width = meta.width ?? 0
  const height = meta.height ?? 0

  return sharp(pageBuffer)
    .extract({
      left: Math.round(width * region.left),
      top: Math.round(height * region.top),
      width: Math.round(width * region.width),
      height: Math.round(height * region.height),
    })
    .toBuffer()
}

async function writeSwatch(code, imageBuffer) {
  const dir = path.join(OUT_ROOT, code)
  fs.mkdirSync(dir, { recursive: true })

  const jpgPath = path.join(dir, 'swatch.jpg')
  const webpPath = path.join(dir, 'swatch.webp')

  await sharp(imageBuffer).jpeg({ quality: 90 }).toFile(jpgPath)
  await sharp(imageBuffer).webp({ quality: 88 }).toFile(webpPath)

  console.log(`  ${code}`)
}

async function main() {
  if (!fs.existsSync(PDF_PATH)) {
    throw new Error(`PDF not found: ${PDF_PATH}`)
  }

  const document = await pdf(PDF_PATH, { scale: 3 })
  let pageIndex = 0

  for await (const pageBuffer of document) {
    pageIndex += 1
    const cropConfig = PAGE_CROPS[pageIndex - 2]
    if (!cropConfig) continue

    console.log(`Page ${pageIndex} (${cropConfig.codes[0].slice(0, 2)} family):`)
    for (let i = 0; i < cropConfig.codes.length; i += 1) {
      const cropped = await cropRegion(pageBuffer, cropConfig.regions[i])
      await writeSwatch(cropConfig.codes[i], cropped)
    }
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
