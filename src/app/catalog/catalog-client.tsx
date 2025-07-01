'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/hooks/use-cart';
import { useSession } from "next-auth/react";
import AuthModal from '@/components/ui/auth-modal2';
import { useSearchParams } from "next/navigation";
import type { Product } from '@/types/product';

interface CatalogClientProps {
  initialProducts: Product[];
}

export default function CatalogClient({ initialProducts }: CatalogClientProps) {
  const [products] = useState(initialProducts);
  const { addToCart, isInCart } = useCart();
  const { data: session } = useSession();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [pendingProduct, setPendingProduct] = useState<Product | null>(null);
  const searchParams = useSearchParams();
  const initialSearch = searchParams?.get("search") || "";
  const [searchTerm, setSearchTerm] = useState(initialSearch);

  // Sincronizar searchTerm con query param si cambia
  useEffect(() => {
    if (initialSearch !== searchTerm) {
      setSearchTerm(initialSearch);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialSearch]);

  // Si el usuario inicia sesión y hay producto pendiente, lo agrega automáticamente
  if (session?.user && pendingProduct) {
    addToCart(pendingProduct);
    setPendingProduct(null);
    setShowAuthModal(false);
  }

  const handleAddToCart = (product: Product) => {
    if (!session?.user) {
      setPendingProduct(product);
      setShowAuthModal(true);
      // Guarda en localStorage para persistencia tras login
      if (typeof window !== 'undefined') {
        localStorage.setItem('pendingProductId', product.id);
      }
      return;
    }
    addToCart(product);
  };

  // Al cargar, si hay producto pendiente en localStorage y el usuario está logueado, lo agrega
  useEffect(() => {
    if (session?.user && typeof window !== 'undefined') {
      const pendingId = localStorage.getItem('pendingProductId');
      if (pendingId && !isInCart(pendingId)) {
        const prod = products.find(p => p.id === pendingId);
        if (prod) {
          addToCart(prod);
        }
        localStorage.removeItem('pendingProductId');
        setShowAuthModal(false);
      }
    }
  }, [session, products, addToCart, isInCart]);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Recibe el término de búsqueda desde window (Navbar global)
  useEffect(() => {
    const handler = (e: CustomEvent) => setSearchTerm(e.detail || "");
    window.addEventListener("catalog-search", handler as EventListener);
    return () => window.removeEventListener("catalog-search", handler as EventListener);
  }, []);

  return (
    <div className="flex flex-col space-y-6">
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
                  onClick={() => handleAddToCart(product)}
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
      <AuthModal open={showAuthModal} onClose={() => setShowAuthModal(false)} />
    </div>
  );
}