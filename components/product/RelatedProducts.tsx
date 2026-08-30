'use client';

import { useState } from 'react';
import { Product } from '@/types';
import ProductCard from './ProductCard';
import QuickViewModal from '@/components/ui/QuickViewModal';

export default function RelatedProducts({ products }: { products: Product[] }) {
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  if (products.length === 0) return null;

  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <h2 className="font-display text-2xl text-brand-black sm:text-3xl">
        You May Also Like
      </h2>
      <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-4">
        {products.map((product, i) => (
          <ProductCard
            key={product.id}
            product={product}
            index={i}
            onQuickView={setQuickViewProduct}
          />
        ))}
      </div>
      <QuickViewModal product={quickViewProduct} onClose={() => setQuickViewProduct(null)} />
    </section>
  );
}
