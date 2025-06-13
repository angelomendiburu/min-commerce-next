'use client';

import { create } from 'zustand';
import type { Product } from '@/types/product';
import type { Cart, CartStore } from '@/types/cart';

const initialState: Cart = {
  items: [],
  total: 0
};

const calculateTotal = (items: Cart['items']) => {
  return items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
};

export const useStore = create<CartStore>((set, get) => ({
  cart: initialState,
  
  addItem: (product: Product, quantity: number = 1) => {
    set((state) => {
      const existingItem = state.cart.items.find(
        item => item.product.id === product.id
      );

      if (existingItem) {
        const newQuantity = Math.min(
          existingItem.quantity + quantity,
          product.stock
        );
        
        const updatedItems = state.cart.items.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: newQuantity }
            : item
        );

        return {
          cart: {
            items: updatedItems,
            total: calculateTotal(updatedItems)
          }
        };
      }

      const newItems = [
        ...state.cart.items,
        { product, quantity: Math.min(quantity, product.stock) }
      ];

      return {
        cart: {
          items: newItems,
          total: calculateTotal(newItems)
        }
      };
    });
  },

  removeItem: (productId: string) => {
    set((state) => {
      const newItems = state.cart.items.filter(
        item => item.product.id !== productId
      );

      return {
        cart: {
          items: newItems,
          total: calculateTotal(newItems)
        }
      };
    });
  },

  updateQuantity: (productId: string, quantity: number) => {
    if (quantity <= 0) {
      get().removeItem(productId);
      return;
    }

    set((state) => {
      const newItems = state.cart.items.map(item => {
        if (item.product.id === productId) {
          return {
            ...item,
            quantity: Math.min(quantity, item.product.stock)
          };
        }
        return item;
      });

      return {
        cart: {
          items: newItems,
          total: calculateTotal(newItems)
        }
      };
    });
  },

  clearCart: () => set({ cart: initialState }),

  isInCart: (productId: string) => {
    return get().cart.items.some(item => item.product.id === productId);
  },

  getItemQuantity: (productId: string) => {
    return get().cart.items.find(item => item.product.id === productId)?.quantity || 0;
  }
}));