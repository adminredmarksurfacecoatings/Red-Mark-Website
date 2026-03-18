import { NextResponse } from 'next/server'
import sharp from 'sharp'
import path from 'path'
import fs from 'fs'

export async function GET() {
  try {
    const logoPath = path.join(process.cwd(), 'public', 'Logo.PNG')
    
    if (!fs.existsSync(logoPath)) {
      return NextResponse.json({ error: 'Logo not found' }, { status: 404 })
    }

    // Read and resize image for faster processing
    const image = sharp(logoPath)
    const metadata = await image.metadata()
    
    // Resize to smaller size for faster color extraction
    const resized = await image
      .resize(100, 100, { fit: 'inside' })
      .raw()
      .toBuffer({ resolveWithObject: true })

    const { data, info } = resized
    const pixels: number[][] = []
    
    // Extract RGB values from pixels
    for (let i = 0; i < data.length; i += info.channels) {
      const r = data[i]
      const g = data[i + 1]
      const b = data[i + 2]
      pixels.push([r, g, b])
    }

    // Simple color extraction - find most common colors
    const colorMap = new Map<string, number>()
    
    pixels.forEach(([r, g, b]) => {
      // Round to reduce color variations
      const roundedR = Math.round(r / 10) * 10
      const roundedG = Math.round(g / 10) * 10
      const roundedB = Math.round(b / 10) * 10
      const key = `${roundedR},${roundedG},${roundedB}`
      colorMap.set(key, (colorMap.get(key) || 0) + 1)
    })

    // Get top colors
    const sortedColors = Array.from(colorMap.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 6)
      .map(([rgb]) => {
        const [r, g, b] = rgb.split(',').map(Number)
        return { rgb: [r, g, b], hex: rgbToHex(r, g, b) }
      })

    // Calculate average for dominant color
    const avgR = Math.round(pixels.reduce((sum, [r]) => sum + r, 0) / pixels.length)
    const avgG = Math.round(pixels.reduce((sum, [, g]) => sum + g, 0) / pixels.length)
    const avgB = Math.round(pixels.reduce((sum, [, , b]) => sum + b, 0) / pixels.length)
    
    const dominant = {
      rgb: [avgR, avgG, avgB],
      hex: rgbToHex(avgR, avgG, avgB)
    }

    return NextResponse.json({
      dominant,
      palette: sortedColors,
      suggested: {
        primary: sortedColors[0]?.hex || dominant.hex,
        secondary: sortedColors[1]?.hex || sortedColors[0]?.hex || dominant.hex,
        accent: sortedColors[2]?.hex || sortedColors[1]?.hex || dominant.hex,
      }
    })
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
  }
}

function rgbToHex(r: number, g: number, b: number): string {
  return '#' + [r, g, b].map(x => {
    const hex = x.toString(16)
    return hex.length === 1 ? '0' + hex : hex
  }).join('')
}
