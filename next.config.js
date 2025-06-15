/** @type {import('next').NextConfig}
 * 
 * DEPLOYMENT NOTES:
 * 1. Make sure to set both DATABASE_URL and DIRECT_URL in Vercel environment variables
 * 2. Environment variables should be set in Vercel dashboard under:
 *    Settings > Environment Variables
 * 3. After setting environment variables, redeploy the project
 */

const isVercel = process.env.VERCEL === '1';
const isDev = process.env.NODE_ENV === 'development';

// En desarrollo o en Vercel, no validamos variables de entorno aquí
if (!isDev && !isVercel && !process.env.DATABASE_URL) {
  console.error('❌ Variables de entorno requeridas no encontradas:');
  console.error('DATABASE_URL debe estar configurada');
  process.exit(1);
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configuración básica
  images: {
    domains: ['localhost'],
    unoptimized: true,
  },
  experimental: {
    // Deshabilitar generación estática para rutas API
    disableOptimizedLoading: true,
  },
  // Forzar modo standalone para Vercel
  output: 'standalone',
  poweredByHeader: false,
  reactStrictMode: true,
  // Optimizaciones experimentales seguras
  experimental: {
    optimizePackageImports: ['@prisma/client'],
    swcMinify: true
  }
}

module.exports = nextConfig