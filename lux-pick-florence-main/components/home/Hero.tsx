'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import Button from '@/components/ui/Button';

export default function Hero() {
  return (
    <section className="relative flex min-h-[92vh] w-full items-center overflow-hidden bg-brand-black">
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1800&q=80"
          alt="Woman wearing a Lux Pick Florence luxury outfit"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-black/90 via-brand-black/50 to-transparent" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="font-body text-xs uppercase tracking-widest2 text-brand-pink"
        >
          Spring / Summer Collection
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="mt-5 max-w-xl font-display text-4xl leading-[1.1] text-white sm:text-5xl lg:text-6xl"
        >
          Timeless Luxury, Made for the Modern Woman
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-6 max-w-md font-body text-base leading-relaxed text-white/80"
        >
          Discover the Lux Pick Florence edit — hand-finished bags, watches
          and jewelry crafted for women who wear their confidence quietly.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="mt-10 flex flex-wrap gap-4"
        >
          <Link href="/new-arrivals">
            <Button variant="secondary" size="lg">
              Shop Now
            </Button>
          </Link>
          <Link href="/bags">
            <Button
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-brand-black"
            >
              Explore Collection
            </Button>
          </Link>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-white/60 sm:flex"
      >
        <span className="font-body text-[10px] uppercase tracking-widest2">Scroll</span>
        <span className="h-10 w-px animate-pulse bg-white/40" />
      </motion.div>
    </section>
  );
}
