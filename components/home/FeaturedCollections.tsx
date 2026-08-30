'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { categories } from '@/data/products';

export default function FeaturedCollections() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-xl text-center">
        <p className="font-body text-xs uppercase tracking-widest2 text-brand-pink">
          Curated For You
        </p>
        <h2 className="mt-3 font-display text-3xl text-brand-black sm:text-4xl">
          Featured Collections
        </h2>
        <p className="mt-4 font-body text-sm text-brand-graySlate">
          Explore the categories that define the Lux Pick Florence woman —
          considered, refined, unmistakably elegant.
        </p>
      </div>

      <div className="mt-14 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-5">
        {categories.map((cat, i) => (
          <motion.div
            key={cat.slug}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className={i === 0 ? 'col-span-2 lg:col-span-1' : ''}
          >
            <Link href={`/${cat.slug}`} className="group block">
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-brand-gray">
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  sizes="(max-width: 640px) 50vw, 20vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-black/70 via-transparent to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-4">
                  <p className="font-display text-lg text-white">{cat.name}</p>
                  <span className="mt-1 inline-block font-body text-[11px] uppercase tracking-widest2 text-brand-pink opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    Shop Now →
                  </span>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
