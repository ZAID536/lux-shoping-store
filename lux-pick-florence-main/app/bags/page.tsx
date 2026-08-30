import { Metadata } from 'next';
import CategoryGrid from '@/components/product/CategoryGrid';
import { getProductsByCategory } from '@/lib/queries/products';
import { dbProductsToProducts } from '@/lib/adapters';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Bags',
  description: 'Structured totes, quilted crossbodies and sculptural top-handles, hand-finished in Italian leather.',
};

export default async function BagsPage() {
  const dbProducts = await getProductsByCategory('Bags').catch(() => []);
  const products = dbProductsToProducts(dbProducts);
  return (
    <CategoryGrid
      title="Luxury Bags"
      description="Structured totes, quilted crossbodies and sculptural top-handles, hand-finished in Italian leather."
      products={products}
    />
  );
}

