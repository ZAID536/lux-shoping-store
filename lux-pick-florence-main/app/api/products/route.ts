import { NextRequest, NextResponse } from 'next/server';
import { getAllProducts, createProduct } from '@/lib/queries/products';

export async function GET() {
  try {
    const products = await getAllProducts();
    return NextResponse.json(products);
  } catch (err) {
    console.error('GET /api/products error:', err);
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (!body.slug || !body.name || !body.category || !body.price) {
      return NextResponse.json(
        { error: 'Missing required fields: slug, name, category, price' },
        { status: 400 }
      );
    }

    const id = await createProduct(body);
    return NextResponse.json({ id, message: 'Product created successfully' }, { status: 201 });
  } catch (err: unknown) {
    console.error('POST /api/products error:', err);
    const isDuplicate = err instanceof Error && err.message.includes('Duplicate entry');
    return NextResponse.json(
      { error: isDuplicate ? 'A product with that slug already exists' : 'Failed to create product' },
      { status: isDuplicate ? 409 : 500 }
    );
  }
}
