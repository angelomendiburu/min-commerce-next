import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET() {
  try {
    const products = await prisma.product.findMany();
    return NextResponse.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    // Add validation for the body if necessary
    const product = await prisma.product.create({
      data: body,
    });
    return NextResponse.json(product, { status: 201 }); // 201 Created
  } catch (error) {
    console.error('Error creating product:', error);
    // Consider more specific error handling, e.g., for validation errors
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export {}; // Explicit empty export
