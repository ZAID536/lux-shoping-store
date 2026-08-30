import { query, queryOne, execute } from '@/lib/db';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface DBProduct {
  id: number;
  slug: string;
  name: string;
  category: string;
  price: number;
  old_price: number | null;
  rating: number;
  review_count: number;
  description: string;
  sku: string;
  is_new: number;
  is_best_seller: number;
  is_sale: number;
  created_at: string;
  // Joined arrays
  images?: string[];
  colors?: { name: string; hex: string }[];
  sizes?: string[];
  specifications?: { label: string; value: string }[];
  reviews?: DBReview[];
}

export interface DBReview {
  id: number;
  product_id: number;
  author: string;
  rating: number;
  date: string;
  title: string;
  body: string;
  verified: number;
}

export interface CreateProductInput {
  slug: string;
  name: string;
  category: string;
  price: number;
  old_price?: number | null;
  description: string;
  sku: string;
  is_new?: boolean;
  is_best_seller?: boolean;
  is_sale?: boolean;
  images?: string[];
  colors?: { name: string; hex: string }[];
  sizes?: string[];
  specifications?: { label: string; value: string }[];
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

async function attachRelations(products: DBProduct[]): Promise<DBProduct[]> {
  if (products.length === 0) return [];

  const ids = products.map((p) => p.id);
  const placeholders = ids.map(() => '?').join(',');

  const [images, colors, sizes, specs] = await Promise.all([
    query<{ product_id: number; url: string }>(
      `SELECT product_id, url FROM product_images WHERE product_id IN (${placeholders}) ORDER BY sort_order`,
      ids
    ),
    query<{ product_id: number; name: string; hex: string }>(
      `SELECT product_id, name, hex FROM product_colors WHERE product_id IN (${placeholders})`,
      ids
    ),
    query<{ product_id: number; size: string }>(
      `SELECT product_id, size FROM product_sizes WHERE product_id IN (${placeholders})`,
      ids
    ),
    query<{ product_id: number; label: string; value: string }>(
      `SELECT product_id, label, value FROM product_specs WHERE product_id IN (${placeholders}) ORDER BY sort_order`,
      ids
    ),
  ]);

  return products.map((p) => ({
    ...p,
    images: images.filter((i) => i.product_id === p.id).map((i) => i.url),
    colors: colors.filter((c) => c.product_id === p.id).map(({ name, hex }) => ({ name, hex })),
    sizes: sizes.filter((s) => s.product_id === p.id).map((s) => s.size),
    specifications: specs.filter((s) => s.product_id === p.id).map(({ label, value }) => ({ label, value })),
  }));
}

// ─── Queries ──────────────────────────────────────────────────────────────────

export async function getAllProducts(): Promise<DBProduct[]> {
  const rows = await query<DBProduct>('SELECT * FROM products ORDER BY created_at DESC');
  return attachRelations(rows);
}

export async function getProductById(id: number): Promise<DBProduct | null> {
  const row = await queryOne<DBProduct>('SELECT * FROM products WHERE id = ?', [id]);
  if (!row) return null;
  const [enriched] = await attachRelations([row]);
  return enriched;
}

export async function getProductBySlug(slug: string): Promise<DBProduct | null> {
  const row = await queryOne<DBProduct>('SELECT * FROM products WHERE slug = ?', [slug]);
  if (!row) return null;

  const [reviews, enrichedProducts] = await Promise.all([
    query<DBReview>('SELECT * FROM product_reviews WHERE product_id = ?', [row.id]),
    attachRelations([row]),
  ]);

  const enriched = enrichedProducts[0];
  if (!enriched) return null;
  return { ...enriched, reviews };

}

export async function getProductsByCategory(category: string): Promise<DBProduct[]> {
  const rows = await query<DBProduct>(
    'SELECT * FROM products WHERE LOWER(category) = LOWER(?) ORDER BY created_at DESC',
    [category]
  );
  return attachRelations(rows);
}

export async function getBestSellers(): Promise<DBProduct[]> {
  const rows = await query<DBProduct>(
    'SELECT * FROM products WHERE is_best_seller = 1 ORDER BY created_at DESC'
  );
  return attachRelations(rows);
}

export async function getNewArrivals(): Promise<DBProduct[]> {
  const rows = await query<DBProduct>(
    'SELECT * FROM products WHERE is_new = 1 ORDER BY created_at DESC'
  );
  return attachRelations(rows);
}

export async function getSaleProducts(): Promise<DBProduct[]> {
  const rows = await query<DBProduct>(
    'SELECT * FROM products WHERE is_sale = 1 ORDER BY created_at DESC'
  );
  return attachRelations(rows);
}

export async function getRelatedProducts(productId: number, category: string, limit = 4): Promise<DBProduct[]> {
  const rows = await query<DBProduct>(
    'SELECT * FROM products WHERE category = ? AND id != ? LIMIT ?',
    [category, productId, limit]
  );
  return attachRelations(rows);
}

export async function createProduct(input: CreateProductInput): Promise<number> {
  const result = await execute(
    `INSERT INTO products (slug, name, category, price, old_price, description, sku, is_new, is_best_seller, is_sale)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      input.slug,
      input.name,
      input.category,
      input.price,
      input.old_price ?? null,
      input.description,
      input.sku,
      input.is_new ? 1 : 0,
      input.is_best_seller ? 1 : 0,
      input.is_sale ? 1 : 0,
    ]
  );

  const productId = result.insertId;
  await saveProductRelations(productId, input);
  return productId;
}

export async function updateProduct(id: number, input: Partial<CreateProductInput>): Promise<void> {
  await execute(
    `UPDATE products SET
       slug = COALESCE(?, slug),
       name = COALESCE(?, name),
       category = COALESCE(?, category),
       price = COALESCE(?, price),
       old_price = ?,
       description = COALESCE(?, description),
       sku = COALESCE(?, sku),
       is_new = COALESCE(?, is_new),
       is_best_seller = COALESCE(?, is_best_seller),
       is_sale = COALESCE(?, is_sale)
     WHERE id = ?`,
    [
      input.slug ?? null,
      input.name ?? null,
      input.category ?? null,
      input.price ?? null,
      input.old_price ?? null,
      input.description ?? null,
      input.sku ?? null,
      input.is_new !== undefined ? (input.is_new ? 1 : 0) : null,
      input.is_best_seller !== undefined ? (input.is_best_seller ? 1 : 0) : null,
      input.is_sale !== undefined ? (input.is_sale ? 1 : 0) : null,
      id,
    ]
  );

  // Re-insert relations if provided
  if (input.images || input.colors || input.sizes || input.specifications) {
    // Delete old relations
    await Promise.all([
      input.images !== undefined && execute('DELETE FROM product_images WHERE product_id = ?', [id]),
      input.colors !== undefined && execute('DELETE FROM product_colors WHERE product_id = ?', [id]),
      input.sizes !== undefined && execute('DELETE FROM product_sizes WHERE product_id = ?', [id]),
      input.specifications !== undefined && execute('DELETE FROM product_specs WHERE product_id = ?', [id]),
    ]);
    await saveProductRelations(id, input);
  }
}

export async function deleteProduct(id: number): Promise<void> {
  await execute('DELETE FROM products WHERE id = ?', [id]);
}

async function saveProductRelations(productId: number, input: Partial<CreateProductInput>): Promise<void> {
  const promises: Promise<unknown>[] = [];

  if (input.images?.length) {
    for (let i = 0; i < input.images.length; i++) {
      promises.push(
        execute('INSERT INTO product_images (product_id, url, sort_order) VALUES (?, ?, ?)', [
          productId, input.images[i], i,
        ])
      );
    }
  }

  if (input.colors?.length) {
    for (const c of input.colors) {
      promises.push(
        execute('INSERT INTO product_colors (product_id, name, hex) VALUES (?, ?, ?)', [
          productId, c.name, c.hex,
        ])
      );
    }
  }

  if (input.sizes?.length) {
    for (const s of input.sizes) {
      promises.push(
        execute('INSERT INTO product_sizes (product_id, size) VALUES (?, ?)', [productId, s])
      );
    }
  }

  if (input.specifications?.length) {
    for (let i = 0; i < input.specifications.length; i++) {
      const spec = input.specifications[i];
      promises.push(
        execute('INSERT INTO product_specs (product_id, label, value, sort_order) VALUES (?, ?, ?, ?)', [
          productId, spec.label, spec.value, i,
        ])
      );
    }
  }

  await Promise.all(promises);
}
