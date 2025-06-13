import Image from 'next/image';
import AddToCart from './add-to-cart';

async function getProduct(id: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_URL || ''}/api/products/${id}`, {
    // This ensures we're getting fresh data
    cache: 'no-store'
  });
  
  if (!res.ok) {
    // Throw a more descriptive error based on the status
    if (res.status === 404) {
      throw new Error('Product not found');
    }
    throw new Error('Failed to fetch product');
  }
  
  return res.json();
}

export default async function ProductPage({ params }: { params: { id: string } }) {
  const product = await getProduct(params.id);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="relative aspect-square">
          <Image
            src={product.image}
            alt={product.name}
            className="object-cover rounded-lg"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
        </div>
        <div>
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-gray-600 mb-4">{product.description}</p>
          <div className="flex items-center justify-between mb-6">
            <span className="text-2xl font-bold">${product.price.toFixed(2)}</span>
            <span className="text-gray-600">Stock: {product.stock}</span>
          </div>
          <AddToCart product={product} />
        </div>
      </div>
    </div>
  );
}
