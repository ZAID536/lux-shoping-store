'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, Heart, User, ShoppingBag, Menu, X } from 'lucide-react';
import AnnouncementBar from './AnnouncementBar';
import MobileMenu from './MobileMenu';
import { navLinks } from './navLinks';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { cn } from '@/lib/utils';

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { itemCount, openCart } = useCart();
  const { wishlist } = useWishlist();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur">
      <AnnouncementBar />
      <div
        className={cn(
          'mx-auto flex max-w-7xl items-center justify-between px-4 transition-all duration-300 sm:px-6 lg:px-8',
          scrolled ? 'py-3' : 'py-5'
        )}
      >
        <button
          className="flex items-center md:hidden"
          onClick={() => setMobileOpen(true)}
          aria-label="Open menu"
        >
          <Menu size={24} />
        </button>

        <Link href="/" className="mx-auto md:mx-0">
          <span className="font-display text-xl tracking-[0.15em] text-brand-black sm:text-2xl">
            LUX PICK <span className="text-brand-pink">FLORENCE</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-body text-[13px] font-medium uppercase tracking-widest2 text-brand-black transition hover:text-brand-pink"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4 sm:gap-5">
          <button
            aria-label="Search"
            onClick={() => setSearchOpen((v) => !v)}
            className="text-brand-black transition hover:text-brand-pink"
          >
            <Search size={20} />
          </button>
          <Link
            href="/account"
            aria-label="Account"
            className="hidden text-brand-black transition hover:text-brand-pink sm:block"
          >
            <User size={20} />
          </Link>
          <Link
            href="/wishlist"
            aria-label="Wishlist"
            className="relative hidden text-brand-black transition hover:text-brand-pink sm:block"
          >
            <Heart size={20} />
            {wishlist.length > 0 && (
              <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-brand-pink text-[9px] font-bold text-brand-black">
                {wishlist.length}
              </span>
            )}
          </Link>
          <button
            aria-label="Cart"
            onClick={openCart}
            className="relative text-brand-black transition hover:text-brand-pink"
          >
            <ShoppingBag size={20} />
            {itemCount > 0 && (
              <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-brand-pink text-[9px] font-bold text-brand-black">
                {itemCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {searchOpen && (
        <div className="border-t border-brand-grayMid bg-white px-4 py-4 sm:px-6 lg:px-8">
          <div className="mx-auto flex max-w-2xl items-center gap-3 border-b border-brand-black pb-2">
            <Search size={18} className="text-brand-graySlate" />
            <input
              autoFocus
              type="text"
              placeholder="Search for bags, watches, jewelry..."
              className="w-full bg-transparent font-body text-sm outline-none placeholder:text-brand-graySlate"
            />
            <button onClick={() => setSearchOpen(false)} aria-label="Close search">
              <X size={18} />
            </button>
          </div>
        </div>
      )}

      <MobileMenu isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
    </header>
  );
}
