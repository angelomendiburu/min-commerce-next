import { prisma } from '@/lib/prisma';
import { Product } from '@prisma/client';

export async function getProducts(): Promise<Product[]> {
  return prisma.product.findMany();
}

export async function getProduct(id: string): Promise<Product | null> {
  return prisma.product.findUnique({
    where: { id }
  });
}

export async function updateProduct(id: string, data: Partial<Product>): Promise<Product> {
  return prisma.product.update({
    where: { id },
    data
  });
}

export async function deleteProduct(id: string): Promise<Product> {
  return prisma.product.delete({
    where: { id }
  });
}
