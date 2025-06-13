import { PrismaClient } from '@prisma/client'

const prismaClientSingleton = () => {
  console.log('🔄 Inicializando nueva instancia de PrismaClient...');
  return new PrismaClient({
    log: ['query', 'info', 'warn', 'error'],
  })
}

type GlobalWithPrisma = typeof globalThis & {
  prisma?: ReturnType<typeof prismaClientSingleton>
}

const globalWithPrisma = global as GlobalWithPrisma
const prisma = globalWithPrisma.prisma ?? prismaClientSingleton()

console.log('✅ Cliente Prisma inicializado');

if (process.env.NODE_ENV !== 'production') {
  globalWithPrisma.prisma = prisma;
  console.log('💾 Cliente Prisma guardado en variable global para desarrollo');
}

export { prisma }
