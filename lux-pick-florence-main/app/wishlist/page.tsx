'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useWishlist } from '@/context/WishlistContext';
import { products } from '@/data/products';
import ProductCard from '@/components/product/ProductCard';
import QuickViewModal from '@/components/ui/QuickViewModal';
import Button from '@/components/ui/Button';
import { Product } from '@/types';

export default function WishlistPage() {
  const { wishlist } = useWishlist();
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const saved = products.filter((p) => wishlist.includes(p.id));

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <p className="font-body text-xs font-semibold uppercase tracking-widest2 text-brand-pink">
        Saved For You
      </p>
      <h1 className="mt-2 font-display text-4xl text-brand-black">Your Wishlist</h1>
      <div className="mt-3 h-px w-16 bg-brand-pink" />

      {saved.length === 0 ? (
        <div className="mt-16 flex flex-col items-center text-center">
          <p className="max-w-sm font-body text-sm text-brand-black/60">
            Nothing saved yet. Tap the heart on any product to keep track of the
            pieces you love.
          </p>
          <Link href="/new-arrivals" className="mt-8">
            <Button>Shop New Arrivals</Button>
          </Link>
        </div>
      ) : (
        <div className="mt-12 grid grid-cols-2 gap-x-5 gap-y-10 sm:grid-cols-3 lg:grid-cols-4">
          {saved.map((product, i) => (
            <ProductCard
              key={product.id}
              product={product}
              index={i}
              onQuickView={setQuickViewProduct}
            />
          ))}
        </div>
      )}

      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </div>
  );
}
