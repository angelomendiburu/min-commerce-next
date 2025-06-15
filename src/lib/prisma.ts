import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

function createPrismaClient() {
  if (!process.env.DATABASE_URL) {
    if (process.env.NODE_ENV === 'production') {
      console.error('❌ DATABASE_URL no está definida en producción')
      console.error('Por favor, configura DATABASE_URL en las variables de entorno de Vercel')
      // En producción, lanzamos un error que puede ser manejado por la aplicación
      throw new Error('DATABASE_URL no está configurada en producción')
    } else {
      throw new Error(
        'DATABASE_URL no está definida en desarrollo.\n' +
        'Por favor, crea un archivo .env.local con la variable DATABASE_URL'
      )
    }
  }

  return new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  })
}

const prismaClient = globalForPrisma.prisma ?? createPrismaClient()
globalForPrisma.prisma = prismaClient

export { prismaClient as prisma }
