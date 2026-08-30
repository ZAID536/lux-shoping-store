import { Metadata } from 'next';
import CategoryGrid from '@/components/product/CategoryGrid';
import { getNewArrivals } from '@/lib/queries/products';
import { dbProductsToProducts } from '@/lib/adapters';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'New Arrivals',
  description: 'Discover the latest luxury bags, watches, jewelry, shoes and accessories from Lux Pick Florence.',
};

export default async function NewArrivalsPage() {
  const dbProducts = await getNewArrivals().catch(() => []);
  const products = dbProductsToProducts(dbProducts);

  return (
    <CategoryGrid
      title="New Arrivals"
      description="The latest additions to the Lux Pick Florence edit — fresh silhouettes, considered detail."
      products={products}
    />
  );
}
