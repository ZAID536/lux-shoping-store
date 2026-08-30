'use client';

import { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ProductCard from '@/components/product/ProductCard';
import QuickViewModal from '@/components/ui/QuickViewModal';
import { Product } from '@/types';

interface NewArrivalsCarouselProps {
  products: Product[];
}

export default function NewArrivalsCarousel({ products }: NewArrivalsCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const items = products;

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const amount = scrollRef.current.clientWidth * 0.8;
    scrollRef.current.scrollBy({
      left: direction === 'left' ? -amount : amount,
      behavior: 'smooth',
    });
  };

  return (
    <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
      <div className="flex items-end justify-between">
        <div>
          <p className="font-body text-xs uppercase tracking-widest2 text-brand-pink">
            Just Landed
          </p>
          <h2 className="mt-3 font-display text-3xl text-brand-black sm:text-4xl">
            New Arrivals
          </h2>
        </div>
        <div className="hidden gap-2 sm:flex">
          <button
            onClick={() => scroll('left')}
            aria-label="Scroll left"
            className="flex h-10 w-10 items-center justify-center border border-brand-grayMid transition hover:border-brand-black"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={() => scroll('right')}
            aria-label="Scroll right"
            className="flex h-10 w-10 items-center justify-center border border-brand-grayMid transition hover:border-brand-black"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {items.map((product, i) => (
          <div
            key={product.id}
            className="w-[70%] flex-shrink-0 snap-start sm:w-[45%] md:w-[30%] lg:w-[23%]"
          >
            <ProductCard product={product} index={i} onQuickView={setQuickViewProduct} />
          </div>
        ))}
      </div>

      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </section>
  );
}

