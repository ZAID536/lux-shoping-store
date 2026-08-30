'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Button from '@/components/ui/Button';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
  };

  return (
    <section className="bg-brand-pink">
      <div className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-display text-3xl text-brand-black sm:text-4xl">
            Join the Inner Circle
          </h2>
          <p className="mt-4 font-body text-sm text-brand-black/70">
            Subscribe for early access to new collections, private sales, and
            15% off your first order.
          </p>

          {submitted ? (
            <p className="mt-8 font-body text-sm font-semibold text-brand-black">
              Thank you for subscribing — check your inbox for your welcome gift.
            </p>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row"
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="flex-1 border border-brand-black/20 bg-white px-4 py-3 font-body text-sm outline-none placeholder:text-brand-graySlate focus:border-brand-black"
              />
              <Button type="submit" variant="primary">
                Subscribe
              </Button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
