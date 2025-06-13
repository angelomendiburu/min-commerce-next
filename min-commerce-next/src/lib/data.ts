import type { Product } from '@/types/product';

// Mock data - Reemplazar con tu base de datos real
export const products: Product[] = [
  {
    id: "1",
    name: "Producto 1",
    description: "Descripción del producto 1",
    price: 99.99,
    image: "/products/product1.jpg",
    stock: 10,
    createdAt: new Date(),
    updatedAt: new Date()
  }
];
