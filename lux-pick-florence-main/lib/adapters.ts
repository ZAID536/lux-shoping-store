/**
 * Adapter to convert DB product rows to the frontend Product type.
 * Keeps the rest of the app unchanged while data comes from MySQL.
 */
import { DBProduct } from '@/lib/queries/products';
import { Product, Review } from '@/types';

export function dbProductToProduct(p: DBProduct): Product {
  return {
    id: String(p.id),
    slug: p.slug,
    name: p.name,
    category: p.category as Product['category'],
    price: Number(p.price),
    oldPrice: p.old_price ? Number(p.old_price) : undefined,
    rating: Number(p.rating),
    reviewCount: p.review_count,
    images: p.images ?? [],
    colors: p.colors ?? [],
    sizes: p.sizes ?? [],
    description: p.description,
    specifications: p.specifications ?? [],
    reviews: (p.reviews ?? []).map((r): Review => ({
      id: String(r.id),
      author: r.author,
      rating: r.rating,
      date: r.date,
      title: r.title,
      body: r.body,
      verified: Boolean(r.verified),
    })),
    isNew: Boolean(p.is_new),
    isBestSeller: Boolean(p.is_best_seller),
    isSale: Boolean(p.is_sale),
    sku: p.sku,
  };
}

export function dbProductsToProducts(products: DBProduct[]): Product[] {
  return products.map(dbProductToProduct);
}
