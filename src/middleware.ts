import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from 'next/server';

const ADMIN_EMAIL = "angelomendiburu@gmail.com";

// Middleware que evita que las rutas API se ejecuten durante el tiempo de construcción
export async function middleware(request: NextRequest) {
  // Proteger la ruta /admin y subrutas
  if (request.nextUrl.pathname.startsWith("/admin")) {
    const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
    // Log para depuración
    console.log("TOKEN EN MIDDLEWARE:", token);
    if (!token || (token.role !== "admin" && token.email !== ADMIN_EMAIL)) {
      return NextResponse.redirect(new URL("/catalog", request.url));
    }
  }

  // Durante el tiempo de construcción, devolver una respuesta mock
  if (process.env.NEXT_PHASE === 'build') {
    return NextResponse.json({ message: 'API no disponible durante la construcción' });
  }

  // En tiempo de ejecución, continuar normalmente
  return NextResponse.next();
}

export const config = {
  matcher: ["/api/:path*", "/admin/:path*", "/admin"],
};
