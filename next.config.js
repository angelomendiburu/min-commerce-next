/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost'],
    unoptimized: true,
  },
  output: 'standalone',
  poweredByHeader: false,
  reactStrictMode: true,
  experimental: {
    disableOptimizedLoading: true, // From the first experimental block
    // optimizePackageImports: ['@prisma/client'], // Commented out
    swcMinify: true
  }
};
module.exports = nextConfig;