'use client';

import { useMemo, useState } from 'react';
import { Product } from '@/types';
import ProductCard from './ProductCard';
import QuickViewModal from '@/components/ui/QuickViewModal';

type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'rating';

interface CategoryGridProps {
  title: string;
  description: string;
  products: Product[];
}

export default function CategoryGrid({ title, description, products }: CategoryGridProps) {
  const [sort, setSort] = useState<SortOption>('featured');
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  const sorted = useMemo(() => {
    const list = [...products];
    switch (sort) {
      case 'price-asc':
        return list.sort((a, b) => a.price - b.price);
      case 'price-desc':
        return list.sort((a, b) => b.price - a.price);
      case 'rating':
        return list.sort((a, b) => b.rating - a.rating);
      default:
        return list;
    }
  }, [products, sort]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="font-display text-3xl text-brand-black sm:text-4xl">{title}</h1>
        <p className="mt-4 font-body text-sm text-brand-graySlate">{description}</p>
      </div>

      <div className="mt-10 flex items-center justify-between border-b border-brand-gray pb-4">
        <p className="font-body text-xs uppercase tracking-widest2 text-brand-graySlate">
          {sorted.length} {sorted.length === 1 ? 'Product' : 'Products'}
        </p>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as SortOption)}
          className="border border-brand-grayMid bg-white px-3 py-2 font-body text-xs uppercase tracking-widest2 text-brand-black outline-none"
        >
          <option value="featured">Featured</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="rating">Top Rated</option>
        </select>
      </div>

      {sorted.length === 0 ? (
        <p className="py-20 text-center font-body text-sm text-brand-graySlate">
          No products found in this collection yet — check back soon.
        </p>
      ) : (
        <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-3 lg:grid-cols-4">
          {sorted.map((product, i) => (
            <ProductCard
              key={product.id}
              product={product}
              index={i}
              onQuickView={setQuickViewProduct}
            />
          ))}
        </div>
      )}

      <QuickViewModal product={quickViewProduct} onClose={() => setQuickViewProduct(null)} />
    </div>
  );
}
