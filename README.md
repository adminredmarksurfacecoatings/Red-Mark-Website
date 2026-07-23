# Red Mark Surface Coatings Website

A modern Next.js website for Red Mark Surface Coatings with a professional red color scheme, suitable for industrial surface coating solutions.

## Features

- 🎨 Professional red color scheme
- 📱 Fully responsive design
- 🎭 Hero slider with auto-rotation
- 🛍️ Product/Project slider with Keen Slider
- 🖼️ Gallery section
- 📰 Newsletter signup
- 🔗 Social media integration
- ♿ Accessible components

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
red-mark-website/
├── app/
│   ├── layout.tsx      # Root layout with metadata
│   ├── page.tsx        # Homepage
│   └── globals.css     # Global styles with red color theme
├── components/
│   ├── AlertBanner.tsx # Top alert banner
│   ├── Navbar.tsx      # Navigation bar
│   ├── HeroSlider.tsx  # Hero section slider
│   ├── KeyFeatures.tsx # Features section
│   ├── ProductSlider.tsx # Featured projects slider
│   ├── FeaturedIn.tsx  # Featured brands section
│   ├── GallerySection.tsx # Gallery grid
│   └── Footer.tsx      # Footer component
├── public/             # Static assets (add your logo here)
└── package.json
```

## Adding Your Logo

1. Place your logo file in the `public/` folder
2. Update the logo in `components/Navbar.tsx` to use your logo image:
   ```tsx
   <Image src="/your-logo.png" alt="Red Mark Surface Coatings" width={150} height={50} />
   ```

## Customization

### Colors

The color scheme is defined in `app/globals.css` under `:root` variables:
- `--primary-red`: Main red color
- `--dark-red`: Darker red shades
- `--lighter-red`: Accent red

### Content

Update the content in each component file to match your brand and services.

## Build for Production

```bash
npm run build
npm start
```

## Technologies Used

- Next.js 14
- React 18
- TypeScript
- Keen Slider
- CSS Variables for theming

## License

© 2024 Red Mark Surface Coatings
