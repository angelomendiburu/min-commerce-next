import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ProductCard, ProductCardProps } from "@/components/product-card";
import Image from 'next/image'; // For Hero Section

export const metadata: Metadata = {
  title: 'min-commerce-next',
  description: 'Welcome to Min-Commerce, your destination for the latest and greatest in footwear.', // Added a description
};

// Placeholder data for featured products - can be the same as page.tsx or curated
const featuredProducts: ProductCardProps[] = [
  {
    id: "1",
    name: "Joma Sport Elite Runner",
    price: "$159.99",
    imageUrl: "/images/products/JSPEEW2417V_4.jpg",
  },
  {
    id: "2",
    name: "Brooks Running Pro",
    price: "$189.99",
    imageUrl: "/images/products/brooks running.png",
  },
  {
    id: "3",
    name: "Reebok Nano X3",
    price: "$129.99",
    imageUrl: "/images/products/reebook nano.jpg",
  },
  {
    id: "4",
    name: "Saucony Endorphin Pro 3",
    price: "$199.99",
    imageUrl: "/images/products/Saucony-zapatilla-Running-endorphin-pro-3-hombre-negro.jpg",
  },
];

// Placeholder data for categories
const categories = [
  { 
    name: "Running", 
    href: "/catalog?category=running", 
    imageUrl: "/images/products/brooks running.png"
  },
  { 
    name: "Training", 
    href: "/catalog?category=training", 
    imageUrl: "/images/products/reebook nano.jpg"
  },
  { 
    name: "Competition", 
    href: "/catalog?category=competition", 
    imageUrl: "/images/products/Saucony-zapatilla-Running-endorphin-pro-3-hombre-negro.jpg"
  },
  { 
    name: "Sport", 
    href: "/catalog?category=sport", 
    imageUrl: "/images/products/JSPEEW2417V_4.jpg"
  },
];

export default function HomePage() {
  return (
    <div className="flex flex-col flex-1"> {/* Main container for the page */}
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-gray-800 to-gray-900 text-white py-20 md:py-32">
        <Image
            src="https://images.unsplash.com/photo-1514989940723-e8e216382565?q=80&w=1920&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Hero background shoes"
            layout="fill"
            objectFit="cover"
            className="absolute inset-0 opacity-40 z-0"
        />
        <div className="container mx-auto px-6 text-center relative z-10 max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight mb-6">
            Step Into Your Style
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-8">
            Discover the latest trends in footwear. Premium quality, unbeatable prices.
          </p>
          <Button size="lg" asChild className="text-lg py-3 px-8 bg-white text-gray-900 hover:bg-gray-200">
            <Link href="/catalog">Shop New Arrivals</Link>
          </Button>
        </div>
      </section>

      {/* Main content area with centered max-width */}
      <main className="px-4 sm:px-10 md:px-20 lg:px-40 flex flex-1 justify-center py-10">
        <div className="flex flex-col max-w-[960px] flex-1 space-y-16">

          {/* Featured Products Section */}
          <section>
            <h2 className="text-[#141414] tracking-light text-[28px] font-bold leading-tight mb-6">
              Top Picks For You
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-3 gap-y-6">
              {featuredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  price={product.price}
                  imageUrl={product.imageUrl}
                />
              ))}
            </div>
            <div className="mt-8 text-center">
              <Button variant="outline" asChild>
                <Link href="/catalog">View All Products</Link>
              </Button>
            </div>
          </section>

          {/* Categories Section */}
          <section>
            <h2 className="text-[#141414] tracking-light text-[28px] font-bold leading-tight mb-6">
              Shop by Category
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {categories.map((category) => (
                <Link key={category.name} href={category.href} className="group block">
                  <div className="relative aspect-square rounded-lg overflow-hidden shadow-md group-hover:shadow-xl transition-shadow">
                    <Image
                      src={category.imageUrl}
                      alt={category.name}
                      layout="fill"
                      objectFit="cover"
                      className="group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                      <h3 className="text-white text-xl font-semibold">{category.name}</h3>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* Promotional Content Section */}
          <section>
            <div className="bg-gray-100 p-8 rounded-lg text-center shadow-lg">
              <h2 className="text-2xl font-bold text-gray-800 mb-3">
                Limited Time Offer!
              </h2>
              <p className="text-gray-600 mb-6">
                Get 20% off on select summer styles. Don't miss out!
              </p>
              <Button size="lg" asChild className="bg-gray-800 hover:bg-gray-700">
                <Link href="/sale">Shop Sale</Link>
              </Button>
            </div>
          </section>

        </div>
      </main>
    </div>
  );
}
