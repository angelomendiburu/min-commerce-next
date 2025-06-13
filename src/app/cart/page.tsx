'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/hooks/use-cart';

export default function CartPage() {
  const { items, total, updateQuantity, removeFromCart } = useCart();

  if (items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto p-4 text-center">
        <h1 className="text-2xl font-bold mb-4">Tu carrito está vacío</h1>
        <Link
          href="/catalog"
          className="inline-block bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Ver productos
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Carrito de Compras</h1>
      
      <div className="space-y-4">
        {items.map((item) => (
          <div
            key={item.product.id}
            className="flex gap-4 items-center p-4 bg-white rounded-lg shadow"
          >
            <div className="relative w-24 h-24">
              <Image
                src={item.product.image}
                alt={item.product.name}
                fill
                className="object-cover rounded"
                sizes="96px"
              />
            </div>
            
            <div className="flex-grow">
              <h3 className="text-black font-semibold">{item.product.name}</h3>
              <p className="text-sm text-black">${item.product.price.toFixed(2)}</p>
            </div>
            
            <div className="flex items-center gap-2">              <button
                onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                className="px-2 py-1 border border-gray-600 rounded text-black hover:bg-gray-100"
              >
                -
              </button>
              <span className="w-8 text-center text-black">{item.quantity}</span>
              <button
                onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                className="px-2 py-1 border border-gray-600 rounded text-black hover:bg-gray-100 disabled:opacity-50 disabled:hover:bg-white"
                disabled={item.quantity >= item.product.stock}
              >
                +
              </button>
            </div>
            
            <div className="text-right min-w-[80px] text-black font-medium">
              ${(item.product.price * item.quantity).toFixed(2)}
            </div>
            
            <button
              onClick={() => removeFromCart(item.product.id)}
              className="p-2 text-red-600 hover:text-red-800"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        ))}
      </div>
      
      <div className="mt-8 p-4 bg-white rounded-lg shadow">
        <div className="flex justify-between items-center mb-4">
          <span className="text-lg font-semibold text-black">Total:</span>
          <span className="text-2xl font-bold text-black">${total.toFixed(2)}</span>
        </div>
        
        <Link
          href="/checkout"
          className="block w-full bg-blue-600 text-white text-center py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Proceder al pago
        </Link>
      </div>
    </div>
  );
}