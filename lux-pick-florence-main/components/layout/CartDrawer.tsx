'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { X, Minus, Plus, Trash2, Truck } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/lib/utils';
import Button from '@/components/ui/Button';

export default function CartDrawer() {
  const {
    items,
    isOpen,
    closeCart,
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

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[90]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-brand-black/50" onClick={closeCart} />
          <motion.div
            className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-white shadow-luxe"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center justify-between border-b border-brand-grayMid px-6 py-5">
              <h2 className="font-display text-lg text-brand-black">
                Your Bag ({items.length})
              </h2>
              <button onClick={closeCart} aria-label="Close cart">
                <X size={22} />
              </button>
            </div>

            {items.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
                <p className="font-body text-sm text-brand-graySlate">
                  Your bag is currently empty.
                </p>
                <Button onClick={closeCart} variant="outline">
                  Continue Shopping
                </Button>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto px-6 py-4">
                  <ul className="divide-y divide-brand-gray">
                    {items.map((item) => (
                      <li
                        key={`${item.productId}-${item.color}-${item.size}`}
                        className="flex gap-4 py-5"
                      >
                        <div className="relative h-24 w-20 flex-shrink-0 overflow-hidden bg-brand-gray">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            sizes="80px"
                            className="object-cover"
                          />
                        </div>
                        <div className="flex flex-1 flex-col justify-between">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <p className="font-display text-sm text-brand-black">
                                {item.name}
                              </p>
                              <p className="mt-1 font-body text-xs text-brand-graySlate">
                                {item.color} / {item.size}
                              </p>
                            </div>
                            <button
                              onClick={() => removeItem(item.productId, item.color, item.size)}
                              aria-label="Remove item"
                              className="text-brand-graySlate transition hover:text-brand-pink"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center border border-brand-grayMid">
                              <button
                                className="px-2 py-1"
                                onClick={() =>
                                  updateQuantity(
                                    item.productId,
                                    item.color,
                                    item.size,
                                    item.quantity - 1
                                  )
                                }
                                aria-label="Decrease quantity"
                              >
                                <Minus size={12} />
                              </button>
                              <span className="px-3 font-body text-xs">{item.quantity}</span>
                              <button
                                className="px-2 py-1"
                                onClick={() =>
                                  updateQuantity(
                                    item.productId,
                                    item.color,
                                    item.size,
                                    item.quantity + 1
                                  )
                                }
                                aria-label="Increase quantity"
                              >
                                <Plus size={12} />
                              </button>
                            </div>
                            <span className="font-body text-sm font-semibold text-brand-black">
                              {formatPrice(item.price * item.quantity)}
                            </span>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="border-t border-brand-grayMid px-6 py-5">
                  <div className="mb-4 flex items-center gap-2 font-body text-xs text-brand-graySlate">
                    <Truck size={14} />
                    {shippingEstimate === 0
                      ? 'You’ve unlocked complimentary shipping.'
                      : `Add ${formatPrice(250 - subtotal)} more for free shipping.`}
                  </div>

                  <div className="mb-4 flex gap-2">
                    <input
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                      placeholder="Coupon code"
                      className="flex-1 border border-brand-grayMid px-3 py-2 font-body text-xs outline-none focus:border-brand-black"
                    />
                    <Button size="sm" variant="outline" onClick={handleApply}>
                      Apply
                    </Button>
                  </div>
                  {message && (
                    <p
                      className={`mb-3 font-body text-xs ${
                        message.ok ? 'text-emerald-600' : 'text-red-500'
                      }`}
                    >
                      {message.text}
                    </p>
                  )}
                  {couponCode && (
                    <div className="mb-3 flex items-center justify-between font-body text-xs text-brand-black">
                      <span>Code applied: {couponCode}</span>
                      <button className="underline" onClick={removeCoupon}>
                        Remove
                      </button>
                    </div>
                  )}

                  <div className="space-y-2 font-body text-sm">
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
                      <span>Shipping</span>
                      <span>{shippingEstimate === 0 ? 'Free' : formatPrice(shippingEstimate)}</span>
                    </div>
                    <div className="flex justify-between border-t border-brand-gray pt-2 font-semibold text-brand-black">
                      <span>Total</span>
                      <span>{formatPrice(total)}</span>
                    </div>
                  </div>

                  <Link href="/checkout" onClick={closeCart}>
                    <Button className="mt-5 w-full">Proceed to Checkout</Button>
                  </Link>
                </div>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
