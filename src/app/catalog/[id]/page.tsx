import { prisma } from "@/lib/prisma";
import Image from "next/image";
import { notFound } from "next/navigation";

interface Props {
  params: {
    id: string;
  };
}

async function getProduct(id: string) {
  const product = await prisma.product.findUnique({
    where: {
      id: id,
    },
  });

  if (!product) {
    notFound();
  }

  return product;
}

export default async function ProductPage({ params }: Props) {
  const product = await getProduct(params.id);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="relative h-[400px] md:h-[500px]">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover rounded-lg"
            priority
          />
        </div>
        <div className="space-y-4">
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="text-xl font-semibold text-primary">
            ${product.price.toFixed(2)}
          </p>
          <div className="prose max-w-none">
            <p>{product.description}</p>
          </div>
          <div className="space-y-2">
            <p className="font-semibold">ID: {product.id}</p>
            <p className="font-semibold">
              Stock: {product.stock > 0 ? "Disponible" : "Agotado"}
            </p>
          </div>
          <button
            className="w-full md:w-auto px-6 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
            disabled={product.stock === 0}
          >
            {product.stock > 0 ? "Agregar al carrito" : "Agotado"}
          </button>
        </div>
      </div>
    </div>
  );
}