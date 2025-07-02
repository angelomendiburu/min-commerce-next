# Min Commerce Next

Este es un proyecto [Next.js](https://nextjs.org) bootstrapped con [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

Primero, ejecuta el servidor de desarrollo:

```bash
npm run dev
# o
yarn dev
# o
pnpm dev
# o
bun dev
```

Abre [http://localhost:3001](http://localhost:3001) en tu navegador para ver el resultado.

Puedes empezar a editar la página modificando `app/page.tsx`. La página se actualiza automáticamente al guardar los cambios.

Este proyecto usa [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) para optimizar y cargar [Geist](https://vercel.com/font).

---

## Roles implementados y permisos

- **admin**
  - Acceso total a todas las rutas, incluyendo la ruta de administración `/admin`.
  - Puede ver y gestionar usuarios, productos y órdenes.
- **user**
  - Acceso a rutas públicas y privadas de usuario (catálogo, carrito, checkout, órdenes, perfil).
  - No puede acceder a la ruta `/admin` ni a funciones administrativas.

### Asignación de roles
- El usuario con correo **angelomendiburu@gmail.com** es el único con rol `admin` por defecto.
- Todos los demás usuarios autenticados tienen rol `user`.

---

## Rutas protegidas y nivel de acceso

| Ruta                | Acceso        | Descripción                                 |
|---------------------|--------------|---------------------------------------------|
| `/admin`            | admin        | Panel de administración (solo admin)        |
| `/catalog`          | user, admin  | Catálogo de productos                       |
| `/cart`             | user, admin  | Carrito de compras                          |
| `/checkout`         | user, admin  | Proceso de compra                           |
| `/orders`           | user, admin  | Historial de órdenes                        |
| `/profile`          | user, admin  | Perfil de usuario                           |

---

## Instrucciones para probar como admin vs user

1. **Como admin:**
   - Inicia sesión con Google o GitHub usando el correo `angelomendiburu@gmail.com`.
   - Podrás acceder a `/admin` y ver el panel de administración.
2. **Como user:**
   - Inicia sesión con cualquier otro correo.
   - No tendrás acceso a `/admin` (serás redirigido o verás un error de acceso denegado).
   - Podrás navegar por el catálogo, carrito, checkout y órdenes.

---

## Learn More

Para aprender más sobre Next.js, revisa:

- [Next.js Documentation](https://nextjs.org/docs) - aprende sobre las características y API de Next.js.
- [Learn Next.js](https://nextjs.org/learn) - tutorial interactivo.

Puedes ver el [repositorio de Next.js en GitHub](https://github.com/vercel/next.js).

## Deploy on Vercel

La forma más fácil de desplegar tu app Next.js es usando [Vercel](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

Consulta la [documentación de despliegue](https://nextjs.org/docs/app/building-your-application/deploying) para más detalles.
