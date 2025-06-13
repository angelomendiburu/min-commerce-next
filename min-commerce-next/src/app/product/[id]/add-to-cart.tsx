'use client';

import { useState } from 'react';
import { useCart } from '@/hooks/use-cart';
import type { Product } from '@/types/product';

interface AddToCartProps {
  product: Product;
}

export default function AddToCart({ product }: AddToCartProps) {
  const [quantity, setQuantity] = useState(1);
  const { addToCart, isInCart, getItemQuantity, updateQuantity } = useCart();
  const currentQuantity = getItemQuantity(product.id);
  const alreadyInCart = isInCart(product.id);

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity > 0 && newQuantity <= product.stock) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    if (alreadyInCart) {
      updateQuantity(product.id, currentQuantity + quantity);
    } else {
      addToCart(product, quantity);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <button
          onClick={() => handleQuantityChange(quantity - 1)}
          disabled={quantity <= 1}
          className="px-3 py-1 border rounded-lg disabled:opacity-50"
        >
          -
        </button>
        <span className="w-12 text-center">{quantity}</span>
        <button
          onClick={() => handleQuantityChange(quantity + 1)}
          disabled={quantity >= product.stock}
          className="px-3 py-1 border rounded-lg disabled:opacity-50"
        >
          +
        </button>
      </div>
      
      <button
        onClick={handleAddToCart}
        disabled={product.stock === 0}
        className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {alreadyInCart ? 'Actualizar cantidad' : 'Agregar al carrito'}
      </button>
      
      {product.stock === 0 && (
        <p className="text-red-500 text-sm">Producto agotado</p>
      )}
    </div>
  );
}