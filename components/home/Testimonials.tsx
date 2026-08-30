'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import Rating from '@/components/ui/Rating';

const testimonials = [
  {
    name: 'Amelia Hart',
    location: 'Sydney, Australia',
    rating: 5,
    quote:
      'The quality is unmatched. My Florence Tote gets compliments every single time I carry it — worth every dollar.',
  },
  {
    name: 'Grace Bennett',
    location: 'London, United Kingdom',
    rating: 5,
    quote:
      'Fast shipping to the UK and packaging that felt like a luxury boutique experience. I am officially obsessed.',
  },
  {
    name: 'Olivia Turner',
    location: 'Toronto, Canada',
    rating: 5,
    quote:
      'I ordered the Aurelia watch as a gift to myself and it has become the piece I reach for daily. Stunning craftsmanship.',
  },
  {
    name: 'Chloe Martin',
    location: 'New York, USA',
    rating: 4,
    quote:
      'Elegant, minimal, and exactly as pictured. Lux Pick Florence has become my go-to for special occasion pieces.',
  },
];

export default function Testimonials() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="mx-auto max-w-4xl px-4 py-24 text-center sm:px-6 lg:px-8">
      <p className="font-body text-xs uppercase tracking-widest2 text-brand-pink">
        Loved Worldwide
      </p>
      <h2 className="mt-3 font-display text-3xl text-brand-black sm:text-4xl">
        Customer Reviews
      </h2>

      <div className="relative mt-12 min-h-[220px]">
        <Quote className="mx-auto mb-4 text-brand-pink" size={32} />
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.5 }}
          >
            <p className="mx-auto max-w-2xl font-display text-xl leading-relaxed text-brand-black sm:text-2xl">
              “{testimonials[index].quote}”
            </p>
            <div className="mt-6 flex flex-col items-center gap-2">
              <Rating value={testimonials[index].rating} />
              <p className="font-body text-sm font-semibold text-brand-black">
                {testimonials[index].name}
              </p>
              <p className="font-body text-xs text-brand-graySlate">
                {testimonials[index].location}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-8 flex justify-center gap-2">
        {testimonials.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            aria-label={`Show testimonial ${i + 1}`}
            className={`h-1.5 rounded-full transition-all ${
              i === index ? 'w-8 bg-brand-pink' : 'w-1.5 bg-brand-grayMid'
            }`}
          />
        ))}
      </div>
    </section>
  );
}
