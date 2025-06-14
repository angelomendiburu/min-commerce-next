import { PrismaClient, Prisma } from '@prisma/client'

const logOptions: Prisma.LogLevel[] = process.env.NODE_ENV === 'development' 
  ? ['query', 'info', 'warn', 'error']
  : ['error'];

function getDatabaseUrl() {
  const url = process.env.DATABASE_URL;
  if (!url) {
    console.error('❌ DATABASE_URL no está definida');
    console.error('Environment:', process.env.NODE_ENV);
    console.error('Available env vars:', Object.keys(process.env).join(', '));
    throw new Error('DATABASE_URL no está definida');
  }
  return url;
}

const prismaClientSingleton = () => {
  const url = getDatabaseUrl();
  
  console.log('🔄 Inicializando nueva instancia de PrismaClient...');
  console.log('📡 Conectando a la base de datos...');
  console.log('🌍 Ambiente:', process.env.NODE_ENV);
  
  return new PrismaClient({
    log: logOptions,
    datasources: {
      db: {
        url
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
