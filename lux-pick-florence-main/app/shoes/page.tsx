import { Metadata } from 'next';
import CategoryGrid from '@/components/product/CategoryGrid';
import { getProductsByCategory } from '@/lib/queries/products';
import { dbProductsToProducts } from '@/lib/adapters';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Shoes',
  description: 'Point-toe heels, crystal sandals and leather boots built to last.',
};

export default async function ShoesPage() {
  const dbProducts = await getProductsByCategory('Shoes').catch(() => []);
  const products = dbProductsToProducts(dbProducts);
  return (
    <CategoryGrid
      title="Luxury Shoes"
      description="Point-toe heels, crystal sandals and leather boots built to last."
      products={products}
    />
  );
}

