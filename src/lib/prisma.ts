import { PrismaClient, Prisma } from '@prisma/client'

const logOptions: Prisma.LogLevel[] = process.env.NODE_ENV === 'development' 
  ? ['query', 'info', 'warn', 'error']
  : ['error'];

const prismaClientSingleton = () => {
  if (!process.env.DATABASE_URL) {
    console.error('❌ DATABASE_URL no está definida');
    throw new Error('DATABASE_URL no está definida');
  }

  console.log('🔄 Inicializando nueva instancia de PrismaClient...');
  console.log('📡 Conectando a la base de datos...');
  
  return new PrismaClient({
    log: logOptions,
    datasources: {
      db: {
        url: process.env.DATABASE_URL
      }
    }
  })
}

type GlobalWithPrisma = typeof globalThis & {
  prisma?: ReturnType<typeof prismaClientSingleton>
}

const globalWithPrisma = global as GlobalWithPrisma

let prisma: ReturnType<typeof prismaClientSingleton>

try {
  prisma = globalWithPrisma.prisma ?? prismaClientSingleton()
  console.log('✅ Cliente Prisma inicializado correctamente');
} catch (error) {
  console.error('❌ Error inicializando Prisma:', error);
  throw error;
}

if (process.env.NODE_ENV !== 'production') {
  globalWithPrisma.prisma = prisma;
  console.log('💾 Cliente Prisma guardado en variable global para desarrollo');
}

export { prisma }
