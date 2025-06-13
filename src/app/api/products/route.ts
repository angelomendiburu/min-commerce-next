import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// Datos de los productos
const initialProducts = [
  {
    name: 'Joma Sport Elite Runner',
    description: 'Zapatillas profesionales de alta competición con tecnología de amortiguación avanzada',
    price: 159.99,
    image: 'https://www.joma-sport.com/dw/image/v2/BFRV_PRD/on/demandware.static/-/Sites-joma-masterCatalog/default/dwb6befb94/images/medium/JSPEEW2417V_4.jpg?sw=900&sh=900&sm=fit',
    stock: 15
  },
  {
    name: 'Classic Pure White Sneakers',
    description: 'Zapatillas clásicas en blanco puro, perfectas para cualquier ocasión',
    price: 79.99,
    image: 'https://static.vecteezy.com/system/resources/previews/002/259/778/non_2x/sneakers-on-white-background-free-photo.jpg',
    stock: 20
  },
  {
    name: 'Urban Street Pro',
    description: 'Zapatillas urbanas con estilo moderno y máxima comodidad',
    price: 94.99,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHO46oYeDf8VB9nAxkJyzbfEoWawkq18d-wAqyLvB25oDClKySpd9Jh606rEKEQF0IxOI&usqp=CAU',
    stock: 12
  },
  {
    name: 'Premium Running Experience',
    description: 'Zapatillas de running premium con tecnología de respuesta energética',
    price: 189.99,
    image: 'https://m.media-amazon.com/images/I/61FzkutZuhL._AC_UY900_DpWeblab_.jpg',
    stock: 8
  },
  {
    name: 'Classic Sport Edition',
    description: 'Edición especial de zapatillas clásicas deportivas',
    price: 129.99,
    image: 'https://m.media-amazon.com/images/I/6170egP-gdL.jpg',
    stock: 25
  },
  {
    name: 'Pro Performance Series',
    description: 'Serie profesional para máximo rendimiento deportivo',
    price: 199.99,
    image: 'https://muzikercdn.com/uploads/products/12625/1262517/thumb_d_gallery_base_d3a4488b.jpg',
    stock: 10
  },
  {
    name: 'Blue Denim Limited Edition',
    description: 'Edición limitada en denim azul, diseño exclusivo',
    price: 149.99,
    image: 'https://image.slidesdocs.com/responsive-images/background/brandless-blue-denim-sneakers-with-blank-tag-impeccably-visualized-on-a-white-3d-render-powerpoint-background_0553bc4d17__960_540.jpg',
    stock: 5
  },
  {
    name: 'Urban Explorer Comfort',
    description: 'Zapatillas urbanas con tecnología de confort superior',
    price: 119.99,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcLZMN_5iGI7Jyal60bX70f2c38ABcFUbNpQ&s',
    stock: 18
  },
  {
    name: 'Sport Lite Dynamic',
    description: 'Zapatillas deportivas ultraligeras con diseño dinámico',
    price: 139.99,
    image: 'https://img.joomcdn.net/2f3ac04abf72f541c69353e9e1f2d582870098ea_original.jpeg',
    stock: 22
  }
];

export async function GET() {
  try {
    // Primero, verificamos si ya hay productos
    const existingProducts = await prisma.product.findMany();
    
    // Si no hay productos, creamos los iniciales
    if (existingProducts.length === 0) {
      await prisma.product.createMany({
        data: initialProducts
      });
      return NextResponse.json(await prisma.product.findMany());
    }
    
    // Si ya hay productos, los retornamos
    return NextResponse.json(existingProducts);
  } catch (error) {
    console.error('Error with products:', error);
    return NextResponse.json(
      { error: "Error al manejar los productos" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const newProduct = await prisma.product.create({
      data: {
        name: body.name,
        description: body.description,
        price: body.price,
        image: body.image,
        stock: body.stock
      }
    });
    
    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json(
      { error: "Error al crear el producto" },
      { status: 400 }
    );
  }
}
