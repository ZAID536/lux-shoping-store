'use client';

import { useState } from 'react';
import ProductCard from '@/components/product/ProductCard';
import QuickViewModal from '@/components/ui/QuickViewModal';
import { Product } from '@/types';

interface BestSellersProps {
  products: Product[];
}

export default function BestSellers({ products }: BestSellersProps) {
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const bestSellers = products.slice(0, 12);

  return (
    <section className="bg-brand-gray py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-3 text-center">
          <p className="font-body text-xs uppercase tracking-widest2 text-brand-pink">
            Most Loved
          </p>
          <h2 className="font-display text-3xl text-brand-black sm:text-4xl">
            Best Sellers
          </h2>
          <p className="max-w-xl font-body text-sm text-brand-graySlate">
            The pieces our clients return for, season after season.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-3 lg:grid-cols-4">
          {bestSellers.map((product, i) => (
            <ProductCard
              key={product.id}
              product={product}
              index={i}
              onQuickView={setQuickViewProduct}
            />
          ))}
        </div>
      </div>

      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </section>
  );
}

