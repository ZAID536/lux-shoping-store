import { Metadata } from 'next';
import CategoryGrid from '@/components/product/CategoryGrid';
import { getProductsByCategory } from '@/lib/queries/products';
import { dbProductsToProducts } from '@/lib/adapters';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Jewelry',
  description: 'Delicate, considered pieces designed to be layered and loved daily.',
};

export default async function JewelryPage() {
  const dbProducts = await getProductsByCategory('Jewelry').catch(() => []);
  const products = dbProductsToProducts(dbProducts);
  return (
    <CategoryGrid
      title="Luxury Jewelry"
      description="Delicate, considered pieces designed to be layered and loved daily."
      products={products}
    />
  );
}

