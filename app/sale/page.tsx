import { Metadata } from 'next';
import CategoryGrid from '@/components/product/CategoryGrid';
import { getSaleProducts } from '@/lib/queries/products';
import { dbProductsToProducts } from '@/lib/adapters';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Sale',
  description: 'Shop limited-time savings on luxury bags, watches, jewelry, shoes and accessories.',
};

export default async function SalePage() {
  const dbProducts = await getSaleProducts().catch(() => []);
  const products = dbProductsToProducts(dbProducts);

  return (
    <CategoryGrid
      title="Sale"
      description="Considered edits at considered prices — for a limited time only."
      products={products}
    />
  );
}
