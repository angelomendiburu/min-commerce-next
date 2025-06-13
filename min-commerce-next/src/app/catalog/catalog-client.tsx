'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/hooks/use-cart';
import type { Product } from '@/types/product';

interface CatalogClientProps {
  initialProducts: Product[];
}

export default function CatalogClient({ initialProducts }: CatalogClientProps) {
  const [products] = useState(initialProducts);
  const { addToCart, isInCart } = useCart();
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6">
      {products.map((product) => (
        <div
          key={product.id}
          className="bg-white rounded-xl shadow hover:shadow-2xl overflow-hidden transition-all duration-300 transform hover:-translate-y-1"
        >
          <Link href={`/product/${product.id}`}>
            <div className="relative aspect-square group">              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-contain transform group-hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority
              />
            </div>
          </Link>          <div className="p-6">            <Link href={`/product/${product.id}`}>
              <h2 className="text-xl font-bold mb-2 text-gray-800 hover:text-blue-600 transition-colors line-clamp-1">
                {product.name}
              </h2>
            </Link>
            
            <p className="text-gray-600 text-sm mb-4 line-clamp-2 h-10">
              {product.description}
            </p>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold text-blue-600">
                  ${product.price.toFixed(2)}
                </span>
                <span className={`text-sm font-medium px-2 py-1 rounded-full ${
                  product.stock > 10 
                    ? 'bg-green-100 text-green-800'
                    : product.stock > 0
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-red-100 text-red-800'
                }`}>
                  {product.stock > 10 
                    ? 'En Stock'
                    : product.stock > 0
                    ? 'Stock Limitado'
                    : 'Sin Stock'}
                </span>
              </div>
              
              <button
                onClick={() => addToCart(product)}
                disabled={!product.stock || isInCart(product.id)}
                className={`w-full py-3 px-4 rounded-lg text-sm font-bold transition-all transform hover:scale-105 ${
                  !product.stock
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : isInCart(product.id)
                    ? 'bg-green-50 text-green-600 border-2 border-green-600'
                    : 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg'
                }`}
              >
                {!product.stock
                  ? 'Sin stock'
                  : isInCart(product.id)
                  ? '✓ En el carrito'
                  : 'Agregar al carrito'}
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}