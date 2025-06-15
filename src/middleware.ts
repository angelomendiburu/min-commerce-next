import { NextRequest, NextResponse } from 'next/server';

// Middleware que evita que las rutas API se ejecuten durante el tiempo de construcción
export function middleware(request: NextRequest) {
  // Durante el tiempo de construcción, devolver una respuesta mock
  if (process.env.NEXT_PHASE === 'build') {
    return NextResponse.json({ message: 'API no disponible durante la construcción' });
  }

  // En tiempo de ejecución, continuar normalmente
  return NextResponse.next();
}

export const config = {
  matcher: '/api/:path*'
};
