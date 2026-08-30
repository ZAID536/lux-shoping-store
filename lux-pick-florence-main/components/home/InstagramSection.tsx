import Image from 'next/image';
import { Instagram } from 'lucide-react';

const posts = [
  'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=500&q=80',
  'https://images.unsplash.com/photo-1445205170230-053b83016050?w=500&q=80',
  'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=500&q=80',
  'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=500&q=80',
  'https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?w=500&q=80',
  'https://images.unsplash.com/photo-1520006403909-838d6b92c22e?w=500&q=80',
];

export default function InstagramSection() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        <Instagram className="mx-auto mb-3 text-brand-pink" size={28} />
        <h2 className="font-display text-3xl text-brand-black sm:text-4xl">
          Follow Us on Instagram
        </h2>
        <p className="mt-3 font-body text-sm text-brand-graySlate">
          @luxpickflorence
        </p>
      </div>

      <div className="mt-10 grid grid-cols-3 gap-1 sm:gap-2 md:grid-cols-6">
        {posts.map((src, i) => (
          <a
            href="#"
            key={i}
            className="group relative aspect-square overflow-hidden"
          >
            <Image
              src={src}
              alt="Lux Pick Florence Instagram post"
              fill
              sizes="(max-width: 768px) 33vw, 16vw"
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-brand-black/0 transition group-hover:bg-brand-black/40">
              <Instagram
                size={20}
                className="text-white opacity-0 transition group-hover:opacity-100"
              />
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
