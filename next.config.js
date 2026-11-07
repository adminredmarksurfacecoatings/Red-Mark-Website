/** @type {import('next').NextConfig} */

function getSupabaseImageRemotePattern() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  if (!url) {
    return {
      protocol: 'https',
      hostname: '**.supabase.co',
      pathname: '/storage/v1/object/public/**',
    }
  }

  try {
    const { hostname } = new URL(url)
    return {
      protocol: 'https',
      hostname,
      pathname: '/storage/v1/object/public/**',
    }
  } catch {
    return {
      protocol: 'https',
      hostname: '**.supabase.co',
      pathname: '/storage/v1/object/public/**',
    }
  }
}

const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      { source: '/collections/stone', destination: '/finishes/exterior/stone-finish', permanent: true },
      { source: '/collections/mineral', destination: '/finishes/all', permanent: true },
      { source: '/collections/all', destination: '/finishes/all', permanent: true },
      { source: '/collections/interior', destination: '/finishes/interior', permanent: true },
      { source: '/collections/exterior', destination: '/finishes/exterior', permanent: true },
    ]
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [getSupabaseImageRemotePattern()],
  },
}

module.exports = nextConfig
