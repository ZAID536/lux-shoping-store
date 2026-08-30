'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Heart, Eye, ShoppingBag } from 'lucide-react';
import { Product } from '@/types';
import { formatPrice, discountPercent, cn } from '@/lib/utils';
import Rating from '@/components/ui/Rating';
import Badge from '@/components/ui/Badge';
import { useWishlist } from '@/context/WishlistContext';
import { useCart } from '@/context/CartContext';

interface ProductCardProps {
  product: Product;
  onQuickView?: (product: Product) => void;
  index?: number;
}

export default function ProductCard({ product, onQuickView, index = 0 }: ProductCardProps) {
  const { isWishlisted, toggleWishlist } = useWishlist();
  const { addItem, openCart } = useCart();
  const wishlisted = isWishlisted(product.id);
  const discount = discountPercent(product.price, product.oldPrice);

  const quickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      image: product.images[0],
      price: product.price,
      color: product.colors[0]?.name || 'Default',
      size: product.sizes[0] || 'One Size',
      quantity: 1,
    });
    openCart();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: Math.min(index * 0.05, 0.4) }}
      className="group relative"
    >
      <Link href={`/product/${product.slug}`} className="block">
        <div className="relative aspect-[4/5] w-full overflow-hidden bg-brand-gray">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
          {product.images[1] && (
            <Image
              src={product.images[1]}
              alt={`${product.name} alternate view`}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-cover opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100"
            />
          )}

          <div className="absolute left-3 top-3 flex flex-col gap-2">
            {product.isNew && <Badge variant="black">New</Badge>}
            {discount > 0 && <Badge variant="pink">-{discount}%</Badge>}
          </div>

          <button
            onClick={(e) => {
              e.preventDefault();
              toggleWishlist(product.id);
            }}
            aria-label="Toggle wishlist"
            className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 shadow-sm transition hover:bg-white"
          >
            <Heart
              size={16}
              className={wishlisted ? 'fill-brand-pink text-brand-pink' : 'text-brand-black'}
            />
          </button>

          <div className="absolute inset-x-3 bottom-3 flex translate-y-3 gap-2 opacity-0 transition-all duration-300 ease-out group-hover:translate-y-0 group-hover:opacity-100">
            <button
              onClick={quickAdd}
              className="flex flex-1 items-center justify-center gap-2 bg-brand-black py-2.5 text-[11px] uppercase tracking-widest2 text-white transition hover:bg-brand-pink hover:text-brand-black"
            >
              <ShoppingBag size={14} /> Add
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                onQuickView?.(product);
              }}
              aria-label="Quick view"
              className="flex h-10 w-10 items-center justify-center bg-white text-brand-black transition hover:bg-brand-gray"
            >
              <Eye size={16} />
            </button>
          </div>
        </div>

        <div className="mt-4 space-y-1.5">
          <p className="font-body text-[11px] uppercase tracking-widest2 text-brand-pink">
            {product.category}
          </p>
          <h3 className="font-display text-base text-brand-black">{product.name}</h3>
          <Rating value={product.rating} count={product.reviewCount} />
          <div className="flex items-baseline gap-2 pt-0.5">
            <span className="font-body text-sm font-semibold text-brand-black">
              {formatPrice(product.price)}
            </span>
            {product.oldPrice && (
              <span className="font-body text-xs text-brand-graySlate line-through">
                {formatPrice(product.oldPrice)}
              </span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
