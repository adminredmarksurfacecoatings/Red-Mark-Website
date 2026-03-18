const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

function rgbToHex(r, g, b) {
  return '#' + [r, g, b].map(x => {
    const hex = x.toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  }).join('').toUpperCase();
}

async function analyzeLogo() {
  try {
    const logoPath = path.join(__dirname, '..', 'public', 'Logo.PNG');
    
    if (!fs.existsSync(logoPath)) {
      console.error('Logo file not found at:', logoPath);
      process.exit(1);
    }

    console.log('🎨 Analyzing logo colors...\n');

    // Read and resize image for faster processing
    const image = sharp(logoPath);
    const resized = await image
      .resize(100, 100, { fit: 'inside' })
      .raw()
      .toBuffer({ resolveWithObject: true });

    const { data, info } = resized;
    const pixels = [];
    
    // Extract RGB values from pixels
    for (let i = 0; i < data.length; i += info.channels) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      pixels.push([r, g, b]);
    }

    // Calculate average for dominant color
    const avgR = Math.round(pixels.reduce((sum, [r]) => sum + r, 0) / pixels.length);
    const avgG = Math.round(pixels.reduce((sum, [, g]) => sum + g, 0) / pixels.length);
    const avgB = Math.round(pixels.reduce((sum, [, , b]) => sum + b, 0) / pixels.length);
    
    const dominant = {
      rgb: [avgR, avgG, avgB],
      hex: rgbToHex(avgR, avgG, avgB)
    };

    // Find most common colors (simplified)
    const colorMap = new Map();
    
    pixels.forEach(([r, g, b]) => {
      // Round to reduce color variations
      const roundedR = Math.round(r / 15) * 15;
      const roundedG = Math.round(g / 15) * 15;
      const roundedB = Math.round(b / 15) * 15;
      const key = `${roundedR},${roundedG},${roundedB}`;
      colorMap.set(key, (colorMap.get(key) || 0) + 1);
    });

    // Get top colors
    const sortedColors = Array.from(colorMap.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 6)
      .map(([rgb]) => {
        const [r, g, b] = rgb.split(',').map(Number);
        return { rgb: [r, g, b], hex: rgbToHex(r, g, b) };
      });

    console.log('Dominant Color:');
    console.log(`  RGB: rgb(${dominant.rgb.join(', ')})`);
    console.log(`  HEX: ${dominant.hex}\n`);

    console.log('Color Palette (top 6 colors):');
    sortedColors.forEach((color, index) => {
      console.log(`  ${index + 1}. RGB(${color.rgb.join(', ')}) → ${color.hex}`);
    });

    const primary = sortedColors[0]?.hex || dominant.hex;
    const secondary = sortedColors[1]?.hex || sortedColors[0]?.hex || dominant.hex;
    const accent = sortedColors[2]?.hex || sortedColors[1]?.hex || dominant.hex;

    console.log('\n💡 Suggested Color Scheme:');
    console.log(`  Primary:   ${primary}`);
    console.log(`  Secondary: ${secondary}`);
    console.log(`  Accent:    ${accent}`);

    // Save colors to JSON
    const colorData = {
      dominant,
      palette: sortedColors,
      suggested: { primary, secondary, accent }
    };

    fs.writeFileSync(
      path.join(__dirname, '..', 'logo-colors.json'),
      JSON.stringify(colorData, null, 2)
    );

    console.log('\n✅ Analysis complete! Colors saved to logo-colors.json');
    
    return colorData;
  } catch (err) {
    console.error('Error analyzing logo:', err.message);
    process.exit(1);
  }
}

analyzeLogo();
