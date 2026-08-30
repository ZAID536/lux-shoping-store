'use client';

import { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    // Simulated submission — wire up to your email/CRM provider of choice.
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 900);
  };

  return (
    <div className="bg-brand-gray p-8 sm:p-10">
      <AnimatePresence mode="wait">
        {submitted ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex h-full flex-col items-center justify-center py-16 text-center"
          >
            <CheckCircle2 size={40} className="text-brand-pink" />
            <h3 className="mt-4 font-display text-2xl text-brand-black">
              Message sent
            </h3>
            <p className="mt-2 max-w-xs font-body text-sm text-brand-black/60">
              Thank you for reaching out. A member of our care team will reply
              within one business day.
            </p>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onSubmit={handleSubmit}
            className="space-y-5"
          >
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <label className="font-body text-xs uppercase tracking-widest2 text-brand-black/60">
                  First name
                </label>
                <input
                  required
                  type="text"
                  className="mt-2 w-full border border-brand-black/15 bg-white px-4 py-3 font-body text-sm outline-none focus:border-brand-pink"
                />
              </div>
              <div>
                <label className="font-body text-xs uppercase tracking-widest2 text-brand-black/60">
                  Last name
                </label>
                <input
                  required
                  type="text"
                  className="mt-2 w-full border border-brand-black/15 bg-white px-4 py-3 font-body text-sm outline-none focus:border-brand-pink"
                />
              </div>
            </div>
            <div>
              <label className="font-body text-xs uppercase tracking-widest2 text-brand-black/60">
                Email address
              </label>
              <input
                required
                type="email"
                className="mt-2 w-full border border-brand-black/15 bg-white px-4 py-3 font-body text-sm outline-none focus:border-brand-pink"
              />
            </div>
            <div>
              <label className="font-body text-xs uppercase tracking-widest2 text-brand-black/60">
                Order number (optional)
              </label>
              <input
                type="text"
                placeholder="LPF-000000"
                className="mt-2 w-full border border-brand-black/15 bg-white px-4 py-3 font-body text-sm outline-none placeholder:text-brand-black/30 focus:border-brand-pink"
              />
            </div>
            <div>
              <label className="font-body text-xs uppercase tracking-widest2 text-brand-black/60">
                Message
              </label>
              <textarea
                required
                rows={5}
                className="mt-2 w-full border border-brand-black/15 bg-white px-4 py-3 font-body text-sm outline-none focus:border-brand-pink"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-brand-black py-4 font-body text-xs font-semibold uppercase tracking-widest2 text-white transition hover:bg-brand-pink hover:text-brand-black disabled:opacity-60"
            >
              {loading ? 'Sending…' : 'Send Message'}
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
