import { NextResponse } from 'next/server';
import { products as staticProducts } from '@/data/products';
import { createProduct } from '@/lib/queries/products';
import { execute } from '@/lib/db';

export async function GET() {
  try {
    // Check if products already exist
    const [{ count }] = await (await import('@/lib/db')).query<{ count: number }>(
      'SELECT COUNT(*) as count FROM products'
    );

    if (count > 0) {
      return NextResponse.json({
        message: `Database already has ${count} products. Skipping seed.`,
        seeded: 0,
      });
    }

    let seeded = 0;

    for (const p of staticProducts) {
      await createProduct({
        slug: p.slug,
        name: p.name,
        category: p.category,
        price: p.price,
        old_price: p.oldPrice ?? null,
        description: p.description,
        sku: p.sku,
        is_new: p.isNew ?? false,
        is_best_seller: p.isBestSeller ?? false,
        is_sale: p.isSale ?? false,
        images: p.images,
        colors: p.colors,
        sizes: p.sizes,
        specifications: p.specifications,
      });

      // Seed reviews separately
      const [inserted] = await (await import('@/lib/db')).query<{ id: number }>(
        'SELECT id FROM products WHERE slug = ?',
        [p.slug]
      );

      if (inserted && p.reviews?.length) {
        for (const r of p.reviews) {
          await execute(
            'INSERT INTO product_reviews (product_id, author, rating, date, title, body, verified) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [inserted.id, r.author, r.rating, r.date, r.title, r.body, r.verified ? 1 : 0]
          );
        }
      }

      // Update rating & review count
      if (inserted) {
        await execute(
          'UPDATE products SET rating = ?, review_count = ? WHERE id = ?',
          [p.rating, p.reviewCount, inserted.id]
        );
      }

      seeded++;
    }

    return NextResponse.json({
      message: `Successfully seeded ${seeded} products into MySQL!`,
      seeded,
    });
  } catch (err) {
    console.error('Seed error:', err);
    return NextResponse.json(
      { error: 'Seed failed', details: String(err) },
      { status: 500 }
    );
  }
}
