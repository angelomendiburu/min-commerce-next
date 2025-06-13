'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/hooks/use-cart';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Info, AlertTriangle } from 'lucide-react'; // Icons

export default function CheckoutPage() {
  const { items, total } = useCart();

  // Placeholder for form state - in a real app, use react-hook-form or similar
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // In a real app, you would handle form submission, validation, and payment processing here.
    // For now, we can just log to console or show an alert.
    alert("Order placement functionality is not implemented yet.");
  };

  return (
    <div className="px-4 sm:px-10 md:px-20 lg:px-40 flex flex-1 justify-center py-5 mb-10">
      <div className="flex flex-col max-w-[960px] flex-1">
        <h1 className="text-[#141414] tracking-light text-[32px] font-bold leading-tight py-4 mb-6">
          Checkout
        </h1>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Order Summary Section - Simplified for checkout context */}
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {items.length > 0 ? (
                items.map(item => (
                  <div key={item.product.id} className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div className="relative w-12 h-12 rounded-md overflow-hidden">
                        <Image
                          src={item.product.image}
                          alt={item.product.name}
                          layout="fill"
                          objectFit="cover"
                        />
                      </div>
                      <div>
                        <p className="font-medium">{item.product.name} (x{item.quantity})</p>
                        <p className="text-sm text-muted-foreground">${item.product.price.toFixed(2)} each</p>
                      </div>
                    </div>
                    <p className="font-semibold">${(item.product.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))
              ) : (
                <p className="text-muted-foreground">Your cart is empty. Add items from the catalog to proceed.</p>
              )}
              {items.length > 0 && <Separator />}
              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </CardContent>
          </Card>

          {/* Shipping Information Form */}
          <Card>
            <CardHeader>
              <CardTitle>Shipping Information</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="fullName">Full Name</Label>
                <Input id="fullName" placeholder="John Doe" required />
              </div>
              <div className="space-y-1.5"> {/* Changed from md:col-span-2 to make it single column */}
                <Label htmlFor="address">Address</Label>
                <Input id="address" placeholder="123 Main St, Apt 4B" required />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="city">City</Label>
                <Input id="city" placeholder="Anytown" required />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="state">State / Province</Label>
                <Input id="state" placeholder="CA" required />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="zip">ZIP / Postal Code</Label>
                <Input id="zip" placeholder="90210" required />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="country">Country</Label>
                <Input id="country" placeholder="United States" required />
              </div>
            </CardContent>
          </Card>

          {/* Payment Information Form */}
          <Card>
            <CardHeader>
              <CardTitle>Payment Information</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2 space-y-1.5">
                <Label htmlFor="cardNumber">Card Number</Label>
                <Input id="cardNumber" placeholder="•••• •••• •••• ••••" required />
              </div>
              <div className="space-y-1.5"> {/* Corrected from md:col-span-2 to allow side-by-side with expiry/cvv block */}
                <Label htmlFor="cardHolderName">Cardholder Name</Label>
                <Input id="cardHolderName" placeholder="John Doe" required />
              </div>
              <div className="grid grid-cols-2 gap-4"> {/* This will be a subgrid for Expiry and CVV */}
                <div className="space-y-1.5">
                  <Label htmlFor="expiryDate">Expiry Date (MM/YY)</Label>
                  <Input id="expiryDate" placeholder="MM/YY" required />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="cvv">CVV</Label>
                  <Input id="cvv" placeholder="•••" required />
                </div>
              </div>
               <div className="md:col-span-2 mt-4 p-3 bg-blue-50 border border-blue-200 rounded-md flex items-start gap-2 text-sm text-blue-700">
                <Info className="h-5 w-5 mt-0.5 flex-shrink-0" />
                <span>This is a demo store. Do not enter real payment information.</span>
              </div>
            </CardContent>
          </Card>

          <div className="flex flex-col items-center mt-8">
             <div className="w-full max-w-2xl p-3 mb-4 bg-yellow-50 border border-yellow-300 rounded-md flex items-start gap-2 text-sm text-yellow-700">
                <AlertTriangle className="h-5 w-5 mt-0.5 flex-shrink-0" />
                <span>Order placement is not functional in this demo. Clicking the button below will not process an actual order.</span>
              </div>
            <Button type="submit" size="lg" className="w-full max-w-md text-lg py-6" disabled={items.length === 0}>
              Place Order
            </Button>
            {items.length === 0 && (
                <p className="text-red-600 text-sm mt-2">Please add items to your cart before placing an order.</p>
            )}
            <Link href="/cart" className="mt-4">
              <Button variant="link">Return to Cart</Button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
