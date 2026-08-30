import { Metadata } from 'next';
import CategoryGrid from '@/components/product/CategoryGrid';
import { getProductsByCategory } from '@/lib/queries/products';
import { dbProductsToProducts } from '@/lib/adapters';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Watches',
  description: 'Precision Swiss movements housed in refined, wearable cases.',
};

export default async function WatchesPage() {
  const dbProducts = await getProductsByCategory('Watches').catch(() => []);
  const products = dbProductsToProducts(dbProducts);
  return (
    <CategoryGrid
      title="Luxury Watches"
      description="Precision Swiss movements housed in refined, wearable cases."
      products={products}
    />
  );
}

