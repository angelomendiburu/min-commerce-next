'use client';

import { useEffect, useState } from 'react';
import { useStore } from '@/store/store';
import type { Product } from '@/types/product';

export function useCart() {
  const [isHydrated, setIsHydrated] = useState(false);
  const store = useStore();
  
  // Esperar a que el componente se monte para evitar errores de hidratación
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  // Devolver un estado vacío durante el SSR
  if (!isHydrated) {
    return {
      items: [],
      total: 0,
      itemCount: 0,
      addToCart: () => {},
      removeFromCart: () => {},
      updateQuantity: () => {},
      clearCart: () => {},
      isInCart: () => false,
      getItemQuantity: () => 0
    };
  }

  return {
    items: store.cart.items,
    total: store.cart.total,
    itemCount: store.cart.items.reduce((sum, item) => sum + item.quantity, 0),
    addToCart: (product: Product, quantity: number = 1) => store.addItem(product, quantity),
    removeFromCart: (productId: string) => store.removeItem(productId),
    updateQuantity: (productId: string, quantity: number) => store.updateQuantity(productId, quantity),
    clearCart: () => store.clearCart(),
    isInCart: (productId: string) => store.isInCart(productId),
    getItemQuantity: (productId: string) => store.getItemQuantity(productId)
  };
}