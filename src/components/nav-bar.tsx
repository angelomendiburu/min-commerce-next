import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Heart, ShoppingBag, Menu } from "lucide-react"; // Assuming Menu for mobile
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"; // For mobile nav

// Placeholder for Logo SVG - replace with actual SVG if available
const Logo = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M16 0L32 16L16 32L0 16L16 0Z" fill="#141414"/>
  </svg>
);

const navLinks = [
  { href: "/catalog", label: "Catalog" },
  { href: "/", label: "Featured" }, // Link to the page with featured products (original page.tsx)
  { href: "#", label: "Men" }, // Placeholder
  { href: "#", label: "Women" }, // Placeholder
  { href: "#", label: "Kids" }, // Placeholder
  { href: "#", label: "Accessories" }, // Placeholder
  { href: "/sale", label: "Sale" }, // Placeholder - assuming a sale page might exist or be created
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-solid border-b-[#f2f2f2] bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-10 py-3">
      <div className="container mx-auto flex h-14 items-center">
        {/* Logo Section */}
        <Link href="/home" className="mr-6 flex items-center space-x-2"> {/* Updated href to /home */}
          <Logo />
          <span className="font-bold text-xl text-[#141414]">SoleMate</span>
        </Link>

        {/* Desktop Navigation Links Section */}
        <nav className="hidden md:flex flex-1 items-center space-x-1">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-primary"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Search and Icons Section - Desktop */}
        <div className="hidden md:flex items-center space-x-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search products..."
              className="h-9 pl-10 w-60"
            />
          </div>
          <Button variant="ghost" size="icon">
            <Heart className="h-5 w-5" />
            <span className="sr-only">Wishlist</span>
          </Button>
          <Link href="/cart" passHref>
            <Button variant="ghost" size="icon">
              <ShoppingBag className="h-5 w-5" />
              <span className="sr-only">Shopping Bag</span>
            </Button>
          </Link>
        </div>

        {/* Mobile Navigation - Hamburger Menu */}
        <div className="md:hidden flex flex-1 justify-end">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-full sm:w-[300px]">
              <nav className="flex flex-col space-y-4 mt-6">
                {navLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="px-3 py-2 text-lg font-medium text-muted-foreground hover:text-primary"
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="pt-4 border-t">
                  <Button variant="ghost" className="w-full justify-start space-x-2">
                    <Heart className="h-5 w-5" />
                    <span>Wishlist</span>
                  </Button>
                  <Link href="/cart" passHref>
                    <Button variant="ghost" className="w-full justify-start space-x-2">
                      <ShoppingBag className="h-5 w-5" />
                      <span>Shopping Bag</span>
                    </Button>
                  </Link>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
