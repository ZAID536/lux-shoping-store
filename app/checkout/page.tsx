'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Lock, CreditCard, Truck } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/lib/utils';
import Button from '@/components/ui/Button';

const steps = ['Shipping', 'Payment', 'Review'] as const;
type Step = (typeof steps)[number];

export default function CheckoutPage() {
  const { items, subtotal, discount, couponCode } = useCart();
  const [stepIndex, setStepIndex] = useState(0);
  const [placed, setPlaced] = useState(false);
  const step: Step = steps[stepIndex];

  const shippingEstimate = subtotal >= 250 || subtotal === 0 ? 0 : 18;
  const total = Math.max(subtotal - discount + shippingEstimate, 0);

  const goNext = () => setStepIndex((i) => Math.min(i + 1, steps.length - 1));
  const goBack = () => setStepIndex((i) => Math.max(i - 1, 0));

  if (items.length === 0 && !placed) {
    return (
      <div className="mx-auto max-w-xl px-4 py-32 text-center">
        <h1 className="font-display text-2xl text-brand-black">Your bag is empty</h1>
        <p className="mt-3 font-body text-sm text-brand-graySlate">
          Add something beautiful before checking out.
        </p>
        <Link href="/new-arrivals">
          <Button className="mt-6">Shop New Arrivals</Button>
        </Link>
      </div>
    );
  }

  if (placed) {
    return (
      <div className="mx-auto max-w-xl px-4 py-32 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-brand-pink">
          <Check size={28} className="text-brand-black" />
        </div>
        <h1 className="mt-6 font-display text-3xl text-brand-black">
          Order Confirmed
        </h1>
        <p className="mt-3 font-body text-sm text-brand-graySlate">
          Thank you for shopping with Lux Pick Florence. A confirmation has
          been sent to your email with tracking details to follow shortly.
        </p>
        <Link href="/">
          <Button className="mt-8">Continue Shopping</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
      <h1 className="font-display text-3xl text-brand-black">Checkout</h1>

      <div className="mt-8 flex items-center gap-4">
        {steps.map((s, i) => (
          <div key={s} className="flex flex-1 items-center gap-3">
            <div
              className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full font-body text-xs font-semibold ${
                i <= stepIndex ? 'bg-brand-black text-white' : 'bg-brand-gray text-brand-graySlate'
              }`}
            >
              {i < stepIndex ? <Check size={14} /> : i + 1}
            </div>
            <span
              className={`font-body text-xs uppercase tracking-widest2 ${
                i <= stepIndex ? 'text-brand-black' : 'text-brand-graySlate'
              }`}
            >
              {s}
            </span>
            {i < steps.length - 1 && <div className="h-px flex-1 bg-brand-gray" />}
          </div>
        ))}
      </div>

      <div className="mt-10 grid grid-cols-1 gap-12 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -16 }}
              transition={{ duration: 0.3 }}
            >
              {step === 'Shipping' && <ShippingForm />}
              {step === 'Payment' && <PaymentForm />}
              {step === 'Review' && <ReviewStep />}
            </motion.div>
          </AnimatePresence>

          <div className="mt-8 flex justify-between">
            {stepIndex > 0 ? (
              <Button variant="outline" onClick={goBack}>Back</Button>
            ) : (
              <span />
            )}
            {stepIndex < steps.length - 1 ? (
              <Button onClick={goNext}>Continue</Button>
            ) : (
              <Button onClick={() => setPlaced(true)}>Place Order</Button>
            )}
          </div>
        </div>

        <div className="h-fit border border-brand-gray p-6">
          <h2 className="font-display text-lg text-brand-black">Order Summary</h2>
          <ul className="mt-5 space-y-4">
            {items.map((item) => (
              <li key={`${item.productId}-${item.color}-${item.size}`} className="flex gap-3">
                <div className="relative h-16 w-14 flex-shrink-0 overflow-hidden bg-brand-gray">
                  <Image src={item.image} alt={item.name} fill sizes="56px" className="object-cover" />
                  <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-brand-black text-[10px] text-white">
                    {item.quantity}
                  </span>
                </div>
                <div className="flex-1">
                  <p className="font-body text-xs font-medium text-brand-black">{item.name}</p>
                  <p className="font-body text-[11px] text-brand-graySlate">
                    {item.color} / {item.size}
                  </p>
                </div>
                <span className="font-body text-xs font-semibold text-brand-black">
                  {formatPrice(item.price * item.quantity)}
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-6 space-y-2 border-t border-brand-gray pt-4 font-body text-sm">
            <div className="flex justify-between text-brand-graySlate">
              <span>Subtotal</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-brand-pink">
                <span>Discount {couponCode ? `(${couponCode})` : ''}</span>
                <span>-{formatPrice(discount)}</span>
              </div>
            )}
            <div className="flex justify-between text-brand-graySlate">
              <span className="flex items-center gap-1"><Truck size={13} /> Shipping</span>
              <span>{shippingEstimate === 0 ? 'Free' : formatPrice(shippingEstimate)}</span>
            </div>
            <div className="flex justify-between border-t border-brand-gray pt-2 font-semibold text-brand-black">
              <span>Total</span>
              <span>{formatPrice(total)}</span>
            </div>
          </div>

          <div className="mt-5 flex items-center gap-2 font-body text-[11px] text-brand-graySlate">
            <Lock size={13} /> Secured with 256-bit SSL encryption
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({ label, placeholder, type = 'text', full }: { label: string; placeholder?: string; type?: string; full?: boolean }) {
  return (
    <div className={full ? 'col-span-2' : ''}>
      <label className="font-body text-xs uppercase tracking-widest2 text-brand-graySlate">
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        className="mt-2 w-full border border-brand-grayMid px-3 py-2.5 font-body text-sm outline-none focus:border-brand-black"
      />
    </div>
  );
}

function ShippingForm() {
  return (
    <div className="border border-brand-gray p-6">
      <h2 className="font-display text-lg text-brand-black">Shipping Address</h2>
      <div className="mt-6 grid grid-cols-2 gap-4">
        <Field label="First Name" full={false} />
        <Field label="Last Name" full={false} />
        <Field label="Email" type="email" full />
        <Field label="Address" full />
        <Field label="City" />
        <Field label="Postal Code" />
        <div>
          <label className="font-body text-xs uppercase tracking-widest2 text-brand-graySlate">
            Country
          </label>
          <select className="mt-2 w-full border border-brand-grayMid px-3 py-2.5 font-body text-sm outline-none focus:border-brand-black">
            <option>Australia</option>
            <option>United States</option>
            <option>United Kingdom</option>
            <option>Canada</option>
            <option>Germany</option>
            <option>France</option>
          </select>
        </div>
        <Field label="Phone Number" />
      </div>
    </div>
  );
}

function PaymentForm() {
  return (
    <div className="border border-brand-gray p-6">
      <h2 className="flex items-center gap-2 font-display text-lg text-brand-black">
        <CreditCard size={18} /> Payment Details
      </h2>
      <div className="mt-6 grid grid-cols-2 gap-4">
        <Field label="Cardholder Name" full />
        <Field label="Card Number" placeholder="•••• •••• •••• ••••" full />
        <Field label="Expiry Date" placeholder="MM / YY" />
        <Field label="CVC" placeholder="•••" />
      </div>
      <p className="mt-4 font-body text-xs text-brand-graySlate">
        This is a demo storefront — no real payment will be processed.
      </p>
    </div>
  );
}

function ReviewStep() {
  return (
    <div className="border border-brand-gray p-6">
      <h2 className="font-display text-lg text-brand-black">Review Your Order</h2>
      <p className="mt-4 font-body text-sm text-brand-graySlate">
        Please confirm your shipping and payment details are correct before
        placing your order. You&apos;ll receive an email confirmation immediately
        after checkout.
      </p>
    </div>
  );
}
