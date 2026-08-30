'use client';

import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { X } from 'lucide-react';
import { navLinks } from './navLinks';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[80] md:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div
            className="absolute inset-0 bg-brand-black/50"
            onClick={onClose}
          />
          <motion.div
            className="absolute right-0 top-0 flex h-full w-[82%] max-w-sm flex-col bg-white shadow-luxe"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center justify-between border-b border-brand-grayMid px-6 py-5">
              <span className="font-display text-lg tracking-wide text-brand-black">
                Menu
              </span>
              <button onClick={onClose} aria-label="Close menu">
                <X size={22} />
              </button>
            </div>
            <nav className="flex flex-1 flex-col gap-1 overflow-y-auto px-6 py-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={onClose}
                  className="border-b border-brand-gray py-4 font-body text-sm uppercase tracking-widest2 text-brand-black transition hover:text-brand-pink"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <div className="border-t border-brand-grayMid px-6 py-6">
              <p className="font-body text-xs uppercase tracking-widest2 text-brand-graySlate">
                Lux Pick Florence
              </p>
              <p className="mt-1 font-body text-xs text-brand-graySlate">
                Elegance, delivered worldwide.
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
