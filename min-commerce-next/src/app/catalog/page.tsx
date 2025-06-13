import CatalogClient from './catalog-client';
import { prisma } from '@/lib/prisma';

export const metadata = {
  title: 'Catálogo - MinCommerce',
  description: 'Explora nuestro catálogo de productos'
};

export default async function CatalogPage() {
  try {
    // Obtener productos de la base de datos
    console.log('Intentando obtener productos...');
    const products = await prisma.product.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });

    console.log('Productos encontrados:', products?.length || 0);

    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Catálogo de Productos</h1>
        <CatalogClient initialProducts={products} />
      </div>
    );
  } catch (error) {
    console.error('Error fetching products:', error);
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Error</h1>
        <p>Lo sentimos, ha ocurrido un error al cargar los productos.</p>
      </div>
    );
  }
}