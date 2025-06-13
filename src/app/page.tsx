import { ProductCard, ProductCardProps } from "@/components/product-card";

const placeholderProducts: ProductCardProps[] = [
  {
    id: "1",
    name: "Minimalist Sneaker 1",
    price: "$120",
    imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2hvZXN8ZW58MHx8MHx8fDA%3D", // Replace with actual or better placeholder
  },
  {
    id: "2",
    name: "Sporty Runner X2",
    price: "$150",
    imageUrl: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8c2hvZXN8ZW58MHx8MHx8fDA%3D", // Replace with actual or better placeholder
  },
  {
    id: "3",
    name: "Classic Leather Loafer",
    price: "$180",
    imageUrl: "https://images.unsplash.com/photo-1560343090-f0409e92791a?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8c2hvZXN8ZW58MHx8MHx8fDA%3D", // Replace with actual or better placeholder
  },
  {
    id: "4",
    name: "Urban Canvas High-Top",
    price: "$95",
    imageUrl: "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHNob2VzfGVufDB8fDB8fHww", // Replace with actual or better placeholder
  },
];

export default function HomePage() {
  return (
    <div className="px-4 sm:px-10 md:px-20 lg:px-40 flex flex-1 justify-center py-5">
      <div className="flex flex-col max-w-[960px] flex-1">
        <h1 className="text-[#141414] tracking-light text-[32px] font-bold leading-tight min-w-72 py-4 mb-4">
          Featured
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-3 gap-y-6 p-0 sm:p-4">
          {placeholderProducts.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              price={product.price}
              imageUrl={product.imageUrl}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
