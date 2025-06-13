import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Datos de ejemplo para los productos
const productsData = [
  {
    name: 'Joma Sport Elite Runner',
    description: 'Zapatillas profesionales de alta competición con tecnología de amortiguación avanzada',
    price: 159.99,
    image: 'https://www.joma-sport.com/dw/image/v2/BFRV_PRD/on/demandware.static/-/Sites-joma-masterCatalog/default/dwb6befb94/images/medium/JSPEEW2417V_4.jpg?sw=900&sh=900&sm=fit',
    stock: 15
  },  {    name: 'Reebok Nano X3',
    description: 'Zapatillas deportivas Reebok Nano X3, perfectas para CrossFit y entrenamiento',
    price: 129.99,
    image: 'https://home.ripley.com.pe/Attachment/WOP_5/2084313820355/2084313820355_2.jpg',
    stock: 20
  },
  {
    name: 'Urban Street Pro',
    description: 'Zapatillas urbanas con estilo moderno y máxima comodidad',
    price: 94.99,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHO46oYeDf8VB9nAxkJyzbfEoWawkq18d-wAqyLvB25oDClKySpd9Jh606rEKEQF0IxOI&usqp=CAU',
    stock: 12
  },  {
    name: 'Brooks Ghost 15',
    description: 'Zapatillas de running Brooks Ghost 15 con tecnología de amortiguación superior',
    price: 189.99,
    image: 'https://www.gearwest.com/cdn/shop/products/brooks-men-s-ghost-15-gear-west-1-30974529503470.jpg?v=1719172626',
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
  },
  {
    name: 'Sneakers Classic White',
    description: 'Zapatillas clásicas en blanco puro',
    price: 64.99,
    image: 'https://static.vecteezy.com/system/resources/previews/002/259/778/non_2x/sneakers-on-white-background-free-photo.jpg',
    stock: 20
  },
  {
    name: 'Urban Style Pro',
    description: 'Zapatillas urbanas para el día a día',
    price: 79.99,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHO46oYeDf8VB9nAxkJyzbfEoWawkq18d-wAqyLvB25oDClKySpd9Jh606rEKEQF0IxOI&usqp=CAU',
    stock: 12
  },
  {
    name: 'Sport Running Pro',
    description: 'Zapatillas profesionales para running y competición',
    price: 129.99,
    image: 'https://m.media-amazon.com/images/I/61FzkutZuhL._AC_UY900_DpWeblab_.jpg',
    stock: 8
  },
  {
    name: 'Classic Comfort Plus',
    description: 'Zapatillas clásicas con máximo confort',
    price: 94.99,
    image: 'https://m.media-amazon.com/images/I/6170egP-gdL.jpg',
    stock: 25
  },
  {
    name: 'Street Style Elite',
    description: 'Zapatillas premium para estilo urbano',
    price: 109.99,
    image: 'https://muzikercdn.com/uploads/products/12625/1262517/thumb_d_gallery_base_d3a4488b.jpg',
    stock: 10
  },
  {
    name: 'Blue Denim Limited',
    description: 'Edición limitada de zapatillas en denim',
    price: 149.99,
    image: 'https://image.slidesdocs.com/responsive-images/background/brandless-blue-denim-sneakers-with-blank-tag-impeccably-visualized-on-a-white-3d-render-powerpoint-background_0553bc4d17__960_540.jpg',
    stock: 5
  },
  {
    name: 'Sport Casual Flex',
    description: 'Zapatillas versátiles para deporte y casual',
    price: 84.99,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcLZMN_5iGI7Jyal60bX70f2c38ABcFUbNpQ&s',
    stock: 18
  },
  {
    name: 'Urban Light Runner',
    description: 'Zapatillas ligeras para running urbano',
    price: 74.99,
    image: 'https://img.joomcdn.net/2f3ac04abf72f541c69353e9e1f2d582870098ea_original.jpeg',
    stock: 22
  }
];

async function main() {
  console.log('🚀 Iniciando proceso de seed...');

  try {
    // Limpiar la base de datos primero
    console.log('🧹 Limpiando la base de datos...');
    await prisma.orderItem.deleteMany();
    await prisma.order.deleteMany();
    await prisma.product.deleteMany();
    console.log('✅ Base de datos limpia');

    // Crear los productos
    console.log('📦 Creando productos...');
    for (const product of productsData) {
      const createdProduct = await prisma.product.create({
        data: product
      });
      console.log(`✓ Producto creado: ${createdProduct.name}`);
    }

    // Verificar que los productos se crearon
    const count = await prisma.product.count();
    console.log(`\n🎉 Seed completado exitosamente! ${count} productos creados.`);
  } catch (error) {
    console.error('\n❌ Error durante el seed:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

main()
  .catch((e) => {
    console.error('\n❌ Error fatal durante el seed:', e);
    process.exit(1);
  });
