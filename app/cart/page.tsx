'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Minus, Plus, Trash2, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/lib/utils';
import Button from '@/components/ui/Button';

export default function CartPage() {
  const {
    items,
    removeItem,
    updateQuantity,
    subtotal,
    couponCode,
    discount,
    applyCoupon,
    removeCoupon,
  } = useCart();
  const [code, setCode] = useState('');
  const [message, setMessage] = useState<{ text: string; ok: boolean } | null>(null);

  const shippingEstimate = subtotal >= 250 || subtotal === 0 ? 0 : 18;
  const total = Math.max(subtotal - discount + shippingEstimate, 0);

  const handleApply = () => {
    if (!code.trim()) return;
    const result = applyCoupon(code);
    setMessage({ text: result.message, ok: result.success });
  };

  if (items.length === 0) {
    return (
      <div className="mx-auto flex max-w-3xl flex-col items-center px-4 py-32 text-center">
        <p className="font-body text-xs font-semibold uppercase tracking-widest2 text-brand-pink">
          Your Bag
        </p>
        <h1 className="mt-3 font-display text-3xl text-brand-black">
          Your bag is empty
        </h1>
        <p className="mt-3 max-w-sm font-body text-sm text-brand-black/60">
          Discover the pieces our customers keep coming back to.
        </p>
        <Link href="/new-arrivals" className="mt-8">
          <Button>Shop New Arrivals</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <p className="font-body text-xs font-semibold uppercase tracking-widest2 text-brand-pink">
        Step 1 of 2
      </p>
      <h1 className="mt-2 font-display text-4xl text-brand-black">Your Bag</h1>
      <div className="mt-3 h-px w-16 bg-brand-pink" />

      <div className="mt-10 grid grid-cols-1 gap-12 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <ul className="divide-y divide-brand-grayMid border-y border-brand-grayMid">
            {items.map((item) => (
              <li
                key={`${item.productId}-${item.color}-${item.size}`}
                className="flex gap-5 py-6"
              >
                <Link
                  href={`/product/${item.slug}`}
                  className="relative h-32 w-24 flex-shrink-0 overflow-hidden bg-brand-gray"
                >
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="96px"
                    className="object-cover"
                  />
                </Link>
                <div className="flex flex-1 flex-col justify-between">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <Link
                        href={`/product/${item.slug}`}
                        className="font-display text-base text-brand-black hover:text-brand-pink"
                      >
                        {item.name}
                      </Link>
                      <p className="mt-1 font-body text-xs text-brand-graySlate">
                        {item.color} / {item.size}
                      </p>
                    </div>
                    <button
                      onClick={() => removeItem(item.productId, item.color, item.size)}
                      aria-label="Remove item"
                      className="text-brand-graySlate transition hover:text-brand-pink"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center border border-brand-grayMid">
                      <button
                        className="px-3 py-2"
                        onClick={() =>
                          updateQuantity(item.productId, item.color, item.size, item.quantity - 1)
                        }
                        aria-label="Decrease quantity"
                      >
                        <Minus size={13} />
                      </button>
                      <span className="px-4 font-body text-sm">{item.quantity}</span>
                      <button
                        className="px-3 py-2"
                        onClick={() =>
                          updateQuantity(item.productId, item.color, item.size, item.quantity + 1)
                        }
                        aria-label="Increase quantity"
                      >
                        <Plus size={13} />
                      </button>
                    </div>
                    <span className="font-body text-base font-semibold text-brand-black">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="h-fit bg-brand-gray p-6 sm:p-8">
          <h2 className="font-display text-xl text-brand-black">Order Summary</h2>

          <div className="mt-5 flex gap-2">
            <input
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Coupon code"
              className="flex-1 border border-brand-grayMid bg-white px-3 py-2.5 font-body text-xs outline-none focus:border-brand-black"
            />
            <Button size="sm" variant="outline" onClick={handleApply}>
              Apply
            </Button>
          </div>
          {message && (
            <p className={`mt-2 font-body text-xs ${message.ok ? 'text-emerald-600' : 'text-red-500'}`}>
              {message.text}
            </p>
          )}
          {couponCode && (
            <div className="mt-2 flex items-center justify-between font-body text-xs text-brand-black">
              <span>Code applied: {couponCode}</span>
              <button className="underline" onClick={removeCoupon}>
                Remove
              </button>
            </div>
          )}

          <div className="mt-6 space-y-3 border-t border-brand-grayMid pt-6 font-body text-sm">
            <div className="flex justify-between text-brand-graySlate">
              <span>Subtotal</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-brand-pink">
                <span>Discount</span>
                <span>-{formatPrice(discount)}</span>
              </div>
            )}
            <div className="flex justify-between text-brand-graySlate">
              <span>Estimated shipping</span>
              <span>{shippingEstimate === 0 ? 'Free' : formatPrice(shippingEstimate)}</span>
            </div>
            <div className="flex justify-between border-t border-brand-grayMid pt-3 text-base font-semibold text-brand-black">
              <span>Total</span>
              <span>{formatPrice(total)}</span>
            </div>
          </div>

          <Link href="/checkout">
            <Button className="mt-6 flex w-full items-center justify-center gap-2">
              Proceed to Checkout <ArrowRight size={16} />
            </Button>
          </Link>
          <Link
            href="/new-arrivals"
            className="mt-4 block text-center font-body text-xs uppercase tracking-widest2 text-brand-black/60 hover:text-brand-pink"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
