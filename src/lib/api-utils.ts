import { NextResponse } from 'next/server';
import { prisma } from './prisma';

export type ApiResponse<T = any> = {
  data?: T;
  error?: string;
};

export async function withErrorHandler<T>(
  handler: () => Promise<T>
): Promise<NextResponse> {
  try {
    // Verificar conexión a la base de datos durante el tiempo de ejecución
    if (!process.env.DATABASE_URL) {
      console.error('❌ DATABASE_URL no está definida');
      return NextResponse.json(
        { error: 'Error de configuración del servidor' },
        { status: 500 }
      );
    }

    const result = await handler();
    return NextResponse.json({ data: result });
  } catch (error: any) {
    console.error('❌ Error en API route:', error);
    
    // Si es un error de Prisma, podemos dar una respuesta más específica
    if (error?.name === 'PrismaClientInitializationError') {
      return NextResponse.json(
        { error: 'Error de conexión con la base de datos' },
        { status: 503 }
      );
    }

    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
