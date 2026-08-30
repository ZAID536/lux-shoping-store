'use client';

import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { X } from 'lucide-react';
import { useState } from 'react';
import { Product } from '@/types';
import { formatPrice } from '@/lib/utils';
import Rating from './Rating';
import Button from './Button';
import { useCart } from '@/context/CartContext';

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
}

export default function QuickViewModal({ product, onClose }: QuickViewModalProps) {
  const { addItem, openCart } = useCart();
  const [color, setColor] = useState(product?.colors[0]?.name || '');
  const [size, setSize] = useState(product?.sizes[0] || '');

  if (!product) return null;

  const handleAdd = () => {
    addItem({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      image: product.images[0],
      price: product.price,
      color,
      size,
      quantity: 1,
    });
    onClose();
    openCart();
  };

  return (
    <AnimatePresence>
      {product && (
        <motion.div
          className="fixed inset-0 z-[70] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div
            className="absolute inset-0 bg-brand-black/60 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            className="relative z-10 grid w-full max-w-3xl grid-cols-1 gap-6 bg-white p-6 shadow-luxe md:grid-cols-2 md:p-8"
            initial={{ opacity: 0, y: 30, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <button
              onClick={onClose}
              aria-label="Close quick view"
              className="absolute right-4 top-4 z-10 rounded-full bg-white p-2 shadow hover:bg-brand-gray"
            >
              <X size={18} />
            </button>
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-brand-gray">
              <Image
                src={product.images[0]}
                alt={product.name}
                fill
                sizes="(max-width: 768px) 100vw, 400px"
                className="object-cover"
              />
            </div>
            <div className="flex flex-col justify-center">
              <p className="font-body text-xs uppercase tracking-widest2 text-brand-pink">
                {product.category}
              </p>
              <h3 className="mt-2 font-display text-2xl text-brand-black">
                {product.name}
              </h3>
              <div className="mt-3">
                <Rating value={product.rating} count={product.reviewCount} showValue />
              </div>
              <div className="mt-4 flex items-baseline gap-3">
                <span className="font-display text-xl text-brand-black">
                  {formatPrice(product.price)}
                </span>
                {product.oldPrice && (
                  <span className="font-body text-sm text-brand-graySlate line-through">
                    {formatPrice(product.oldPrice)}
                  </span>
                )}
              </div>
              <p className="mt-4 font-body text-sm leading-relaxed text-brand-graySlate">
                {product.description}
              </p>

              {product.colors.length > 0 && (
                <div className="mt-5">
                  <p className="font-body text-xs uppercase tracking-widest2 text-brand-black">
                    Color: <span className="text-brand-graySlate">{color}</span>
                  </p>
                  <div className="mt-2 flex gap-2">
                    {product.colors.map((c) => (
                      <button
                        key={c.name}
                        onClick={() => setColor(c.name)}
                        aria-label={c.name}
                        className={`h-7 w-7 rounded-full border-2 transition ${
                          color === c.name ? 'border-brand-pink' : 'border-transparent'
                        }`}
                        style={{ backgroundColor: c.hex }}
                      />
                    ))}
                  </div>
                </div>
              )}

              {product.sizes.length > 0 && (
                <div className="mt-5">
                  <p className="font-body text-xs uppercase tracking-widest2 text-brand-black">
                    Size
                  </p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {product.sizes.map((s) => (
                      <button
                        key={s}
                        onClick={() => setSize(s)}
                        className={`border px-3 py-1.5 font-body text-xs transition ${
                          size === s
                            ? 'border-brand-black bg-brand-black text-white'
                            : 'border-brand-grayMid text-brand-black hover:border-brand-black'
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-6 flex gap-3">
                <Button onClick={handleAdd} className="flex-1">
                  Add to Cart
                </Button>
                <Link href={`/product/${product.slug}`} onClick={onClose}>
                  <Button variant="outline">View Full Details</Button>
                </Link>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
