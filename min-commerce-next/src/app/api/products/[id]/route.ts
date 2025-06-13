import { prisma } from '@/lib/prisma';

type Params = { params: { id: string } };

export async function GET(_: Request, { params }: Params): Promise<Response> {
  try {
    const product = await prisma.product.findUnique({
      where: { id: params.id }
    });
    
    if (!product) {
      return new Response(
        JSON.stringify({ error: "Producto no encontrado" }), 
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify(product), 
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch {
    return new Response(
      JSON.stringify({ error: "Error al obtener el producto" }), 
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

export async function PUT(request: Request, { params }: Params): Promise<Response> {
  try {
    const body = await request.json();
    const updatedProduct = await prisma.product.update({
      where: { id: params.id },
      data: {
        name: body.name,
        description: body.description,
        price: body.price,
        image: body.image,
        stock: body.stock
      }
    });

    return new Response(
      JSON.stringify(updatedProduct), 
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch {
    return new Response(
      JSON.stringify({ error: "Error al actualizar el producto" }), 
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

export async function DELETE(_: Request, { params }: Params): Promise<Response> {
  try {
    await prisma.product.delete({
      where: { id: params.id }
    });

    return new Response(null, { status: 204 });
  } catch {
    return new Response(
      JSON.stringify({ error: "Error al eliminar el producto" }), 
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
