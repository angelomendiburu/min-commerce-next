'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/hooks/use-cart';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input'; // Though not explicitly for quantity, could be used or mimicked
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Plus, Minus, Trash2, ShoppingBag } from 'lucide-react'; // Icons

export default function CartPage() {
  const { items, total, updateQuantity, removeFromCart, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <div className="px-4 sm:px-10 md:px-20 lg:px-40 flex flex-1 justify-center py-10">
        <Card className="w-full max-w-md text-center">
          <CardHeader>
            <CardTitle className="text-2xl">Your cart is empty</CardTitle>
          </CardHeader>
          <CardContent>
            <ShoppingBag className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
            <p className="text-muted-foreground mb-6">
              Looks like you haven't added anything to your cart yet.
            </p>
          </CardContent>
          <CardFooter className="flex flex-col sm:flex-row gap-2">
            <Button asChild className="w-full">
              <Link href="/catalog">Continue Shopping</Link>
            </Button>
            <Button variant="outline" onClick={clearCart} className="w-full sm:w-auto">
                Just kidding, clear cart
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  // Calculate subtotal (assuming total from useCart might include other things like shipping in future)
  const subtotal = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  return (
    <div className="px-4 sm:px-10 md:px-20 lg:px-40 flex flex-1 justify-center py-5">
      <div className="flex flex-col max-w-[960px] flex-1">
        <h1 className="text-[#141414] tracking-light text-[32px] font-bold leading-tight py-4 mb-6">
          Shopping Cart
        </h1>

        {/* Cart Items Section */}
        <div className="space-y-6 mb-8">
          {items.map((item) => (
            <div
              key={item.product.id}
              className="flex flex-col sm:flex-row gap-4 items-start sm:items-center p-4 border rounded-lg shadow-sm bg-card"
            >
              <div className="relative w-full sm:w-24 h-32 sm:h-24 rounded-md overflow-hidden">
                <Image
                  src={item.product.image}
                  alt={item.product.name}
                  layout="fill"
                  objectFit="cover"
                  sizes="(max-width: 640px) 100vw, 96px"
                />
              </div>

              <div className="flex-grow">
                <h3 className="text-lg font-semibold text-card-foreground">{item.product.name}</h3>
                <p className="text-sm text-muted-foreground">${item.product.price.toFixed(2)}</p>
              </div>

              <div className="flex items-center gap-2 my-2 sm:my-0">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                  disabled={item.quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-10 text-center text-card-foreground font-medium">{item.quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                  disabled={item.quantity >= (item.product.stock || 10)} // Assume stock 10 if not defined
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              <div className="text-right min-w-[100px] text-lg font-semibold text-card-foreground">
                ${(item.product.price * item.quantity).toFixed(2)}
              </div>

              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeFromCart(item.product.id)}
                className="text-red-500 hover:text-red-600"
              >
                <Trash2 className="h-5 w-5" />
                <span className="sr-only">Remove item</span>
              </Button>
            </div>
          ))}
        </div>

        {/* Order Summary Section */}
        <Card className="w-full sticky bottom-0 sm:bottom-5 mt-auto p-0 sm:p-2 shadow-lg">
          <CardHeader className="pb-2 sm:pb-4">
            <CardTitle className="text-xl">Order Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="font-semibold">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Shipping</span>
              <span className="font-semibold">Calculated at next step</span>
            </div>
            <Separator />
            <div className="flex justify-between text-lg font-bold">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </CardContent>
          <CardFooter>
            <Button asChild size="lg" className="w-full text-lg py-6">
              <Link href="/checkout">Proceed to Checkout</Link>
            </Button>
          </CardFooter>
        </Card>
        <Button variant="outline" onClick={clearCart} className="mt-4 w-full sm:w-auto self-center">
            Clear Cart
        </Button>
      </div>
    </div>
  );
}