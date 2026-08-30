import { Metadata } from 'next';
import CategoryGrid from '@/components/product/CategoryGrid';
import { getProductsByCategory } from '@/lib/queries/products';
import { dbProductsToProducts } from '@/lib/adapters';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Accessories',
  description: 'The finishing touches — silk scarves, sunglasses and signature belts.',
};

export default async function AccessoriesPage() {
  const dbProducts = await getProductsByCategory('Accessories').catch(() => []);
  const products = dbProductsToProducts(dbProducts);
  return (
    <CategoryGrid
      title="Luxury Accessories"
      description="The finishing touches — silk scarves, sunglasses and signature belts."
      products={products}
    />
  );
}

