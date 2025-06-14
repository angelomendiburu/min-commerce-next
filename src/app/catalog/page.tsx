import CatalogClient from './catalog-client';
import { prisma } from '@/lib/prisma';
import { PrismaClientInitializationError } from '@prisma/client/runtime/library';

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

export const metadata = {
  title: 'Catálogo - MinCommerce',
  description: 'Explora nuestro catálogo de productos'
};

export default async function CatalogPage() {
  try {
    console.log('🔍 Intentando obtener productos...');
    const products = await prisma.product.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });

    console.log('✅ Productos encontrados:', products?.length || 0);

    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Catálogo de Productos</h1>
        <CatalogClient initialProducts={products} />
      </div>
    );
  } catch (error) {
    console.error('❌ Error obteniendo productos:', error);
    
    let errorMessage = 'Lo sentimos, ha ocurrido un error al cargar los productos.';
    
    if (error instanceof PrismaClientInitializationError) {
      errorMessage = 'Error de conexión con la base de datos. Por favor, inténtalo más tarde.';
      console.error('🔴 Error de inicialización de Prisma:', error.message);
    }

    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-red-600">Error</h1>
        <div className="bg-red-50 border-l-4 border-red-500 p-4">
          <p className="text-red-700">{errorMessage}</p>
        </div>
      </div>
    );
  }
}