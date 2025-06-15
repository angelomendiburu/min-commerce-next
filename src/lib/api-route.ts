import { NextResponse } from 'next/server';

/**
 * Wrapper para rutas API que asegura que sean dinámicas y no se ejecuten durante la construcción
 */
export function createDynamicRoute<T>(
  handler: () => Promise<T | NextResponse>
): () => Promise<NextResponse> {
  return async () => {
    try {
      if (!process.env.DATABASE_URL) {
        console.error('❌ No se encontró DATABASE_URL');
        return NextResponse.json(
          { error: 'Error de configuración del servidor' },
          { status: 500 }
        );
      }

      const result = await handler();
      
      if (result instanceof NextResponse) {
        return result;
      }
      
      return NextResponse.json(result);
    } catch (error: any) {
      console.error('❌ Error en ruta API:', error);
      return NextResponse.json(
        { error: error?.message || 'Error interno del servidor' },
        { status: 500 }
      );
    }
  };
}
