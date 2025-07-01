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
    addToCart: async (product: Product, quantity: number = 1) => {
      // Registrar acción en logs
      try {
        await fetch('/api/user-action', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            action: 'add_to_cart',
            details: `Producto: ${product.name} (ID: ${product.id}), cantidad: ${quantity}`
          })
        });
      } catch {}
      store.addItem(product, quantity);
    },
    removeFromCart: async (productId: string) => {
      const item = store.cart.items.find(i => i.product.id === productId);
      if (item) {
        try {
          await fetch('/api/user-action', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              action: 'remove_from_cart',
              details: `Producto: ${item.product.name} (ID: ${item.product.id}), cantidad: ${item.quantity}`
            })
          });
        } catch {}
      }
      store.removeItem(productId);
    },
    updateQuantity: (productId: string, quantity: number) => store.updateQuantity(productId, quantity),
    clearCart: async () => {
      if (store.cart.items.length > 0) {
        try {
          await fetch('/api/user-action', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              action: 'clear_cart',
              details: `Carrito limpiado. Productos: ${store.cart.items.map(i => `${i.product.name} (ID: ${i.product.id}), cantidad: ${i.quantity}`).join('; ')}`
            })
          });
        } catch {}
      }
      store.clearCart();
    },
    isInCart: (productId: string) => store.isInCart(productId),
    getItemQuantity: (productId: string) => store.getItemQuantity(productId)
  };
}