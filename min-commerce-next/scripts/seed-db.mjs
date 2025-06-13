import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const products = [
  {
    name: 'Nike Air Max 270',
    description: 'Zapatillas deportivas con la unidad Air más grande hasta la fecha',
    price: 149.99,
    image: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/baf2e271-ce41-4432-8129-ea2806297d01/air-max-270-shoes-V4DfZQ.png',
    stock: 15
  },
  {
    name: 'Adidas Ultraboost 23',
    description: 'Máxima amortiguación y retorno de energía para tus carreras',
    price: 179.99,
    image: 'https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/a8650313914e44b9b75c14c6cb4d0f0e_9366/Ultraboost_Light_Shoes_White_IE1768_01_standard.jpg',    stock: 20
  },
  {
    name: 'Puma RS-X³',
    description: 'Diseño retro-futurista con tecnología Running System',
    price: 129.99,
    image: 'https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa/global/374293/01/sv01/fnd/IND/w/1000/h/1000/fmt/png',
    stock: 12
  },
  {
    name: 'New Balance 990v5',
    description: 'El clásico made in USA con máximo confort y estabilidad',
    price: 184.99,
    image: 'https://nb.scene7.com/is/image/NB/m990gl5_nb_02_i?$pdpflexf2$&fmt=webp&wid=944&hei=944',
    stock: 8
  },
  {
    name: 'ASICS Gel-Nimbus 25',
    description: 'La última tecnología en amortiguación para largas distancias',
    price: 159.99,
    image: 'https://images.asics.com/is/image/asics/1011B544_001_SR_RT_GLB',
    stock: 18
  },
  {
    name: 'Under Armour HOVR Phantom 3',
    description: 'Conectividad y rendimiento para running urbano',
    price: 139.99,
    image: 'https://underarmour.scene7.com/is/image/Underarmour/3024952-002_PAIR?rp=standard-0pad|pdpMainDesktop&scl=1&fmt=jpg&qlt=85&resMode=sharp2&cache=on,on&bgc=f0f0f0&wid=566&hei=708&size=566,708',
    stock: 14
  },
  {
    name: 'Reebok Nano X3',
    description: 'El mejor calzado para entrenamiento funcional',
    price: 134.99,
    image: 'https://phantom-expansion.uecdn.es/22b954492a623fb2e96b56ead2b85f24/crop/0x65/1163x720/resize/828/f/jpg/assets/multimedia/imagenes/2023/05/09/16836260807196.png',
    stock: 16
  },
  {
    name: 'Saucony Endorphin Pro 3',
    description: 'Zapatillas de competición con placa de carbono',
    price: 199.99,
    image: 'https://www.saucony.com/dw/image/v2/BGJR_PRD/on/demandware.static/-/Sites-saucony_us-Library/default/dw91ac3581/content/seasonal-content/category-landing/2022/05-may/endorphin-collection/endorphin-pro-3.jpg',
    stock: 10
  },
  {
    name: 'Brooks Ghost 15',
    description: 'Amortiguación suave y equilibrada para todo tipo de runners',
    price: 129.99,
    image: 'https://www.brooksrunning.com/dw/image/v2/BGPF_PRD/on/demandware.static/-/Sites-brooks-master-catalog/default/dw7c7efa03/original/110376/110376-050-l-ghost-15-mens-cushion-running-shoe.jpg',
    stock: 22
  },
  {
    name: 'Hoka Bondi 8',
    description: 'Máxima amortiguación para largas distancias en asfalto',
    price: 164.99,
    image: 'https://www.hoka.com/dw/image/v2/BDJD_PRD/on/demandware.static/-/Sites-HOKA-US-master/default/dwc565e23d/images/transparent/1123202-BWHT_1.jpg',
    stock: 13
  },
  {
    name: 'Urban Street Pro',
    description: 'Zapatillas urbanas con estilo moderno y máxima comodidad',
    price: 94.99,
    image: 'https://img.joomcdn.net/ba051c738aee8e581b5d4f5cd5251697fd13305c_original.jpeg',
    stock: 12
  },
  {
    name: 'Premium Running Experience',
    description: 'Zapatillas de running premium con tecnología de respuesta energética',
    price: 189.99,
    image: 'https://m.media-amazon.com/images/I/61c3d08jPdL._AC_SL1500_.jpg',
    stock: 8
  },
  {
    name: 'Classic Sport Edition',
    description: 'Edición especial de zapatillas clásicas deportivas',
    price: 129.99,
    image: 'https://ae-pic-a1.aliexpress-media.com/kf/S8c7a6e86e27444f0830cd1f3419cc19eK.jpg',
    stock: 25
  },
  {
    name: 'Pro Performance Series',
    description: 'Serie profesional para máximo rendimiento deportivo',
    price: 199.99,
    image: 'https://i5.walmartimages.com/asr/25315394-9289-4a8a-8c5d-db10a55ff0be.8f1a249d8bcd3ff9456ff736904b1d40.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF',
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
    image: 'https://ae01.alicdn.com/kf/S0c11c1f2d4e44026a5bd76755d84f16ex.jpg',
    stock: 22
  }
];

async function main() {
  console.log('🚀 Starting to seed database...');

  try {
    // Limpiar base de datos
    await prisma.product.deleteMany();
    console.log('🧹 Database cleaned');

    // Crear productos
    const createdProducts = await Promise.all(
      products.map(product => 
        prisma.product.create({
          data: product
        })
      )
    );

    console.log(`✅ Successfully seeded ${createdProducts.length} products`);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
