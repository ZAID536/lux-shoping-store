'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const messages = [
  'Complimentary worldwide shipping on all orders over $250',
  'New Season Arrivals — Shop the edit now',
  'Sign up for 15% off your first order',
];

export default function AnnouncementBar() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % messages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative flex h-10 items-center justify-center overflow-hidden bg-brand-black px-4 text-center">
      <AnimatePresence mode="wait">
        <motion.p
          key={index}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.4 }}
          className="font-body text-[11px] uppercase tracking-widest2 text-white"
        >
          {messages[index]}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}
