'use client';

import { motion } from 'framer-motion';
import { Gem, ShieldCheck, Truck, RotateCcw, Headphones } from 'lucide-react';

const features = [
  {
    icon: Gem,
    title: 'Premium Quality',
    description: 'Every piece is hand-finished using the finest materials sourced from Italian ateliers.',
  },
  {
    icon: ShieldCheck,
    title: 'Secure Checkout',
    description: 'Bank-level encryption keeps every transaction protected, always.',
  },
  {
    icon: Truck,
    title: 'Fast Shipping',
    description: 'Complimentary express delivery across Australia, US, UK, Canada & Europe.',
  },
  {
    icon: RotateCcw,
    title: 'Easy Returns',
    description: '30-day hassle-free returns, no questions asked.',
  },
  {
    icon: Headphones,
    title: 'Customer Support',
    description: 'Our styling concierge is on hand 7 days a week.',
  },
];

export default function WhyChooseUs() {
  return (
    <section className="bg-brand-black py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-xl text-center">
          <p className="font-body text-xs uppercase tracking-widest2 text-brand-pink">
            The Lux Pick Promise
          </p>
          <h2 className="mt-3 font-display text-3xl text-white sm:text-4xl">
            Why Choose Us
          </h2>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="flex flex-col items-center gap-4 border border-white/10 px-6 py-10 text-center transition hover:border-brand-pink/60"
            >
              <feature.icon size={28} className="text-brand-pink" strokeWidth={1.5} />
              <h3 className="font-display text-base text-white">{feature.title}</h3>
              <p className="font-body text-xs leading-relaxed text-white/60">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
