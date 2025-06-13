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
  const [searchTerm, setSearchTerm] = useState('');
  const [products] = useState(initialProducts);
  const { addToCart, isInCart } = useCart();

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col space-y-6">
      <div className="relative max-w-md mx-auto w-full px-4">
        <input
          type="text"
          placeholder="Buscar productos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <div className="absolute inset-y-0 right-0 flex items-center pr-7">
          <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-xl shadow hover:shadow-2xl overflow-hidden transition-all duration-300 transform hover:-translate-y-1"
          >
            <Link href={`/product/${product.id}`}>
              <div className="relative aspect-square group">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-contain transform group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority
                />
              </div>
            </Link>
            <div className="p-6">
              <Link href={`/product/${product.id}`}>
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
                      ? 'Pocas unidades'
                      : 'Agotado'}
                  </span>
                </div>

                <button
                  onClick={() => addToCart(product)}
                  disabled={isInCart(product.id) || product.stock === 0}
                  className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
                    isInCart(product.id)
                      ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                      : product.stock === 0
                      ? 'bg-red-100 text-red-500 cursor-not-allowed'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  {isInCart(product.id)
                    ? 'En el carrito'
                    : product.stock === 0
                    ? 'Agotado'
                    : 'Agregar al carrito'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}