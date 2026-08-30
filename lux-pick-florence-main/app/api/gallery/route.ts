import { NextRequest, NextResponse } from 'next/server';
import { getAllGallery, createGalleryItem } from '@/lib/queries/gallery';

export async function GET() {
  try {
    const items = await getAllGallery();
    return NextResponse.json(items);
  } catch (err) {
    console.error('GET /api/gallery error:', err);
    return NextResponse.json({ error: 'Failed to fetch gallery' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    if (!body.image_url) {
      return NextResponse.json({ error: 'image_url is required' }, { status: 400 });
    }
    const id = await createGalleryItem(body);
    return NextResponse.json({ id, message: 'Gallery item created' }, { status: 201 });
  } catch (err) {
    console.error('POST /api/gallery error:', err);
    return NextResponse.json({ error: 'Failed to create gallery item' }, { status: 500 });
  }
}
