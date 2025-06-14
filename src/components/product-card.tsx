import Image from 'next/image'; // Using next/image for optimized image handling
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"; // Assuming Card subcomponents are useful
import { cn } from "@/lib/utils";

export interface ProductCardProps {
  id: string; // Added id for potential link/key usage
  name: string;
  price: string;
  imageUrl: string;
  className?: string; // Allow passing additional classes
}

export function ProductCard({ id, name, price, imageUrl, className }: ProductCardProps) {
  return (
    <Card className={cn("w-full max-w-sm border-none shadow-none rounded-xl overflow-hidden group transition-all duration-300 ease-in-out hover:shadow-md", className)}>
      <CardHeader className="p-0 relative aspect-square w-full overflow-hidden rounded-xl">
        {/* Using next/image for better performance and optimization */}        <Image
          src={imageUrl}
          alt={name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
        />
        {/* You can add overlays or quick action buttons here if needed */}
      </CardHeader>
      <CardContent className="pt-4 px-1">
        <h3 className="text-[#141414] text-base font-medium truncate group-hover:underline group-hover:text-primary" title={name}>
          {name}
        </h3>
        <p className="text-[#757575] text-sm font-normal">
          {price}
        </p>
      </CardContent>
      {/* CardFooter can be used for action buttons like 'Add to cart' if needed later */}
      {/* <CardFooter className="px-1 pb-2">
        <Button variant="outline" className="w-full">Add to Cart</Button>
      </CardFooter> */}
    </Card>
  );
}
