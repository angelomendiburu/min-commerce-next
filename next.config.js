/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      }
    ],
    unoptimized: process.env.NODE_ENV === 'development'
  },
  env: {
    DATABASE_URL: process.env.DATABASE_URL,
    DIRECT_URL: process.env.DIRECT_URL,
  },
  experimental: {
    serverActions: true,
  },
  typescript: {
    // Solo para desarrollo, no usar en producción
    ignoreBuildErrors: process.env.NODE_ENV === 'development'
  },
  eslint: {
    // Solo para desarrollo, no usar en producción
    ignoreDuringBuilds: process.env.NODE_ENV === 'development'
  },
  output: 'standalone',
  poweredByHeader: false,
  reactStrictMode: true,
}

module.exports = nextConfig