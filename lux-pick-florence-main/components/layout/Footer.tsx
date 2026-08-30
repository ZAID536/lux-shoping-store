import Link from 'next/link';
import { Instagram, Facebook, Twitter, Youtube } from 'lucide-react';

const columns = [
  {
    title: 'Company',
    links: [
      { label: 'About Us', href: '/about' },
      { label: 'Contact', href: '/contact' },
      { label: 'Careers', href: '/careers' },
    ],
  },
  {
    title: 'Support',
    links: [
      { label: 'FAQ', href: '/faq' },
      { label: 'Shipping Policy', href: '/shipping-policy' },
      { label: 'Return Policy', href: '/return-policy' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy Policy', href: '/privacy-policy' },
      { label: 'Terms & Conditions', href: '/terms' },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-brand-black text-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-5">
          <div className="md:col-span-2">
            <span className="font-display text-xl tracking-[0.15em]">
              LUX PICK <span className="text-brand-pink">FLORENCE</span>
            </span>
            <p className="mt-4 max-w-xs font-body text-sm leading-relaxed text-white/60">
              Elevated essentials for the modern woman. Designed in Florence,
              worn worldwide.
            </p>
            <div className="mt-6 flex gap-4">
              {[Instagram, Facebook, Twitter, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label="Social media"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 transition hover:border-brand-pink hover:text-brand-pink"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="font-body text-xs uppercase tracking-widest2 text-white/50">
                {col.title}
              </h4>
              <ul className="mt-4 space-y-3">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="font-body text-sm text-white/80 transition hover:text-brand-pink"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h4 className="font-body text-xs uppercase tracking-widest2 text-white/50">
              Newsletter
            </h4>
            <p className="mt-4 font-body text-sm text-white/70">
              Subscribe for early access to new arrivals and private sales.
            </p>
            <form className="mt-4 flex flex-col gap-2">
              <input
                type="email"
                required
                placeholder="Email address"
                className="border border-white/20 bg-transparent px-3 py-2.5 font-body text-sm text-white outline-none placeholder:text-white/40 focus:border-brand-pink"
              />
              <button
                type="submit"
                className="bg-brand-pink py-2.5 font-body text-xs font-semibold uppercase tracking-widest2 text-brand-black transition hover:bg-white"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-center font-body text-xs text-white/50 md:flex-row md:text-left">
          <p>© {new Date().getFullYear()} Lux Pick Florence. All rights reserved.</p>
          <p>Shipping to Australia, USA, UK, Canada &amp; Europe</p>
        </div>
      </div>
    </footer>
  );
}
