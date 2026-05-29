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
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [getSupabaseImageRemotePattern()],
  },
}

module.exports = nextConfig
