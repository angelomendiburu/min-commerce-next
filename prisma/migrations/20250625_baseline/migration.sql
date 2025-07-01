-- Estructura de tablas
CREATE TABLE "User" (
  "id" TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
  "name" TEXT,
  "email" TEXT UNIQUE,
  "emailVerified" TIMESTAMP,
  "image" TEXT,
  "role" TEXT NOT NULL DEFAULT 'user'
);

CREATE TABLE "Product" (
  "id" TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
  "name" TEXT NOT NULL,
  "description" TEXT NOT NULL,
  "price" DOUBLE PRECISION NOT NULL,
  "image" TEXT NOT NULL,
  "stock" INTEGER NOT NULL,
  "createdAt" TIMESTAMP DEFAULT NOW(),
  "updatedAt" TIMESTAMP DEFAULT NOW()
);

-- Usuario admin
INSERT INTO "User" ("name", "email", "image", "role") VALUES (
  'Angelo Mendiburu',
  'angelomendiburu@gmail.com',
  '',
  'admin'
) ON CONFLICT ("email") DO UPDATE SET "role" = 'admin';

-- Productos
INSERT INTO "Product" ("name", "description", "price", "image", "stock") VALUES
('Joma Sport Elite Runner', 'Zapatillas profesionales de alta competición con tecnología de amortiguación avanzada', 159.99, 'https://www.joma-sport.com/dw/image/v2/BFRV_PRD/on/demandware.static/-/Sites-joma-masterCatalog/default/dwb6befb94/images/medium/JSPEEW2417V_4.jpg?sw=900&sh=900&sm=fit', 15),
('Reebok Nano X3', 'Zapatillas deportivas Reebok Nano X3, perfectas para CrossFit y entrenamiento', 129.99, 'https://home.ripley.com.pe/Attachment/WOP_5/2084313820355/2084313820355_2.jpg', 20),
('Urban Street Pro', 'Zapatillas urbanas con estilo moderno y máxima comodidad', 94.99, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHO46oYeDf8VB9nAxkJyzbfEoWawkq18d-wAqyLvB25oDClKySpd9Jh606rEKEQF0IxOI&usqp=CAU', 12),
('Brooks Ghost 15', 'Zapatillas de running Brooks Ghost 15 con tecnología de amortiguación superior', 189.99, 'https://www.gearwest.com/cdn/shop/products/brooks-men-s-ghost-15-gear-west-1-30974529503470.jpg?v=1719172626', 8),
('Classic Sport Edition', 'Edición especial de zapatillas clásicas deportivas', 129.99, 'https://m.media-amazon.com/images/I/6170egP-gdL.jpg', 25),
('Pro Performance Series', 'Serie profesional para máximo rendimiento deportivo', 199.99, 'https://muzikercdn.com/uploads/products/12625/1262517/thumb_d_gallery_base_d3a4488b.jpg', 10),
('Blue Denim Limited Edition', 'Edición limitada en denim azul, diseño exclusivo', 149.99, 'https://image.slidesdocs.com/responsive-images/background/brandless-blue-denim-sneakers-with-blank-tag-impeccably-visualized-on-a-white-3d-render-powerpoint-background_0553bc4d17__960_540.jpg', 5),
('Urban Explorer Comfort', 'Zapatillas urbanas con tecnología de confort superior', 119.99, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcLZMN_5iGI7Jyal60bX70f2c38ABcFUbNpQ&s', 18),
('Sport Lite Dynamic', 'Zapatillas deportivas ultraligeras con diseño dinámico', 139.99, 'https://img.joomcdn.net/2f3ac04abf72f541c69353e9e1f2d582870098ea_original.jpeg', 22),
('Sneakers Classic White', 'Zapatillas clásicas en blanco puro', 64.99, 'https://static.vecteezy.com/system/resources/previews/002/259/778/non_2x/sneakers-on-white-background-free-photo.jpg', 20),
('Urban Style Pro', 'Zapatillas urbanas para el día a día', 79.99, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHO46oYeDf8VB9nAxkJyzbfEoWawkq18d-wAqyLvB25oDClKySpd9Jh606rEKEQF0IxOI&usqp=CAU', 12),
('Sport Running Pro', 'Zapatillas profesionales para running y competición', 129.99, 'https://m.media-amazon.com/images/I/61FzkutZuhL._AC_UY900_DpWeblab_.jpg', 8),
('Classic Comfort Plus', 'Zapatillas clásicas con máximo confort', 94.99, 'https://m.media-amazon.com/images/I/6170egP-gdL.jpg', 25),
('Street Style Elite', 'Zapatillas premium para estilo urbano', 109.99, 'https://muzikercdn.com/uploads/products/12625/1262517/thumb_d_gallery_base_d3a4488b.jpg', 10),
('Blue Denim Limited', 'Edición limitada de zapatillas en denim', 149.99, 'https://image.slidesdocs.com/responsive-images/background/brandless-blue-denim-sneakers-with-blank-tag-impeccably-visualized-on-a-white-3d-render-powerpoint-background_0553bc4d17__960_540.jpg', 5),
('Sport Casual Flex', 'Zapatillas versátiles para deporte y casual', 84.99, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcLZMN_5iGI7Jyal60bX70f2c38ABcFUbNpQ&s', 18),
('Urban Light Runner', 'Zapatillas ligeras para running urbano', 74.99, 'https://img.joomcdn.net/2f3ac04abf72f541c69353e9e1f2d582870098ea_original.jpeg', 22);
