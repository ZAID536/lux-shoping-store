'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Minus, Plus, Heart, ShieldCheck, Truck, RotateCcw } from 'lucide-react';
import { Product } from '@/types';
import { formatPrice, discountPercent } from '@/lib/utils';
import Rating from '@/components/ui/Rating';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { cn } from '@/lib/utils';

export default function ProductInfo({ product }: { product: Product }) {
  const router = useRouter();
  const { addItem, openCart } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();
  const [color, setColor] = useState(product.colors[0]?.name || '');
  const [size, setSize] = useState(product.sizes[0] || '');
  const [quantity, setQuantity] = useState(1);
  const [tab, setTab] = useState<'description' | 'specifications' | 'reviews'>('description');

  const discount = discountPercent(product.price, product.oldPrice);
  const wishlisted = isWishlisted(product.id);

  const buildCartItem = () => ({
    productId: product.id,
    slug: product.slug,
    name: product.name,
    image: product.images[0],
    price: product.price,
    color,
    size,
    quantity,
  });

  const handleAddToCart = () => {
    addItem(buildCartItem());
    openCart();
  };

  const handleBuyNow = () => {
    addItem(buildCartItem());
    router.push('/checkout');
  };

  return (
    <div>
      <p className="font-body text-xs uppercase tracking-widest2 text-brand-pink">
        {product.category}
      </p>
      <h1 className="mt-2 font-display text-3xl text-brand-black sm:text-4xl">
        {product.name}
      </h1>

      <div className="mt-3 flex items-center gap-3">
        <Rating value={product.rating} count={product.reviewCount} showValue />
        <span className="font-body text-xs text-brand-graySlate">SKU: {product.sku}</span>
      </div>

      <div className="mt-5 flex items-center gap-3">
        <span className="font-display text-2xl text-brand-black">
          {formatPrice(product.price)}
        </span>
        {product.oldPrice && (
          <>
            <span className="font-body text-base text-brand-graySlate line-through">
              {formatPrice(product.oldPrice)}
            </span>
            <Badge variant="pink">-{discount}%</Badge>
          </>
        )}
      </div>

      <p className="mt-6 max-w-lg font-body text-sm leading-relaxed text-brand-graySlate">
        {product.description}
      </p>

      {product.colors.length > 0 && (
        <div className="mt-7">
          <p className="font-body text-xs uppercase tracking-widest2 text-brand-black">
            Color: <span className="text-brand-graySlate">{color}</span>
          </p>
          <div className="mt-3 flex gap-2">
            {product.colors.map((c) => (
              <button
                key={c.name}
                onClick={() => setColor(c.name)}
                aria-label={c.name}
                className={cn(
                  'h-8 w-8 rounded-full border-2 transition',
                  color === c.name ? 'border-brand-pink' : 'border-transparent'
                )}
                style={{ backgroundColor: c.hex }}
              />
            ))}
          </div>
        </div>
      )}

      {product.sizes.length > 0 && (
        <div className="mt-6">
          <div className="flex items-center justify-between">
            <p className="font-body text-xs uppercase tracking-widest2 text-brand-black">Size</p>
            <button className="font-body text-xs text-brand-graySlate underline">
              Size Guide
            </button>
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {product.sizes.map((s) => (
              <button
                key={s}
                onClick={() => setSize(s)}
                className={cn(
                  'min-w-[3rem] border px-3 py-2 font-body text-xs transition',
                  size === s
                    ? 'border-brand-black bg-brand-black text-white'
                    : 'border-brand-grayMid text-brand-black hover:border-brand-black'
                )}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="mt-7 flex items-center gap-4">
        <div className="flex items-center border border-brand-grayMid">
          <button
            className="px-3 py-2.5"
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            aria-label="Decrease quantity"
          >
            <Minus size={14} />
          </button>
          <span className="w-8 text-center font-body text-sm">{quantity}</span>
          <button
            className="px-3 py-2.5"
            onClick={() => setQuantity((q) => q + 1)}
            aria-label="Increase quantity"
          >
            <Plus size={14} />
          </button>
        </div>
        <button
          onClick={() => toggleWishlist(product.id)}
          aria-label="Toggle wishlist"
          className="flex h-11 w-11 items-center justify-center border border-brand-grayMid transition hover:border-brand-pink"
        >
          <Heart size={18} className={wishlisted ? 'fill-brand-pink text-brand-pink' : ''} />
        </button>
      </div>

      <div className="mt-5 flex flex-col gap-3 sm:flex-row">
        <Button onClick={handleAddToCart} className="flex-1" size="lg">
          Add to Cart
        </Button>
        <Button onClick={handleBuyNow} variant="secondary" className="flex-1" size="lg">
          Buy Now
        </Button>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-3 border-t border-brand-gray pt-6 sm:grid-cols-3">
        <div className="flex items-center gap-2 font-body text-xs text-brand-graySlate">
          <Truck size={16} className="text-brand-pink" /> Free global shipping
        </div>
        <div className="flex items-center gap-2 font-body text-xs text-brand-graySlate">
          <RotateCcw size={16} className="text-brand-pink" /> 30-day returns
        </div>
        <div className="flex items-center gap-2 font-body text-xs text-brand-graySlate">
          <ShieldCheck size={16} className="text-brand-pink" /> Secure checkout
        </div>
      </div>

      <div className="mt-12">
        <div className="flex gap-6 border-b border-brand-gray">
          {(['description', 'specifications', 'reviews'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={cn(
                'pb-3 font-body text-xs uppercase tracking-widest2 transition',
                tab === t
                  ? 'border-b-2 border-brand-pink text-brand-black'
                  : 'text-brand-graySlate hover:text-brand-black'
              )}
            >
              {t === 'reviews' ? `Reviews (${product.reviewCount})` : t}
            </button>
          ))}
        </div>

        <div className="py-6">
          {tab === 'description' && (
            <p className="font-body text-sm leading-relaxed text-brand-graySlate">
              {product.description}
            </p>
          )}

          {tab === 'specifications' && (
            <dl className="divide-y divide-brand-gray">
              {product.specifications.map((spec) => (
                <div key={spec.label} className="flex justify-between py-3 font-body text-sm">
                  <dt className="text-brand-graySlate">{spec.label}</dt>
                  <dd className="text-brand-black">{spec.value}</dd>
                </div>
              ))}
            </dl>
          )}

          {tab === 'reviews' && (
            <div className="space-y-6">
              {product.reviews.map((review) => (
                <div key={review.id} className="border-b border-brand-gray pb-6">
                  <div className="flex items-center justify-between">
                    <p className="font-body text-sm font-semibold text-brand-black">
                      {review.author}
                    </p>
                    <span className="font-body text-xs text-brand-graySlate">{review.date}</span>
                  </div>
                  <div className="mt-1 flex items-center gap-2">
                    <Rating value={review.rating} size={12} />
                    {review.verified && (
                      <span className="font-body text-[10px] uppercase tracking-widest2 text-emerald-600">
                        Verified Purchase
                      </span>
                    )}
                  </div>
                  <p className="mt-2 font-body text-sm font-medium text-brand-black">
                    {review.title}
                  </p>
                  <p className="mt-1 font-body text-sm leading-relaxed text-brand-graySlate">
                    {review.body}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
