'use client';

import { useState } from 'react';
import Button from '@/components/ui/Button';
import { cn } from '@/lib/utils';

export default function AccountPage() {
  const [tab, setTab] = useState<'signin' | 'register'>('signin');

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md flex-col items-center px-4 py-20 sm:px-6">
      <p className="font-body text-xs font-semibold uppercase tracking-widest2 text-brand-pink">
        My Account
      </p>
      <h1 className="mt-2 font-display text-3xl text-brand-black">
        {tab === 'signin' ? 'Welcome back' : 'Create your account'}
      </h1>
      <div className="mt-3 h-px w-12 bg-brand-pink" />

      <div className="mt-8 flex w-full border-b border-brand-grayMid">
        {(['signin', 'register'] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={cn(
              'flex-1 pb-3 font-body text-xs font-semibold uppercase tracking-widest2 transition',
              tab === t
                ? 'border-b-2 border-brand-pink text-brand-black'
                : 'text-brand-black/40 hover:text-brand-black'
            )}
          >
            {t === 'signin' ? 'Sign In' : 'Register'}
          </button>
        ))}
      </div>

      <form className="mt-8 w-full space-y-5">
        {tab === 'register' && (
          <div>
            <label className="font-body text-xs uppercase tracking-widest2 text-brand-black/60">
              Full name
            </label>
            <input
              type="text"
              required
              className="mt-2 w-full border border-brand-black/15 bg-white px-4 py-3 font-body text-sm outline-none focus:border-brand-pink"
            />
          </div>
        )}
        <div>
          <label className="font-body text-xs uppercase tracking-widest2 text-brand-black/60">
            Email address
          </label>
          <input
            type="email"
            required
            className="mt-2 w-full border border-brand-black/15 bg-white px-4 py-3 font-body text-sm outline-none focus:border-brand-pink"
          />
        </div>
        <div>
          <label className="font-body text-xs uppercase tracking-widest2 text-brand-black/60">
            Password
          </label>
          <input
            type="password"
            required
            className="mt-2 w-full border border-brand-black/15 bg-white px-4 py-3 font-body text-sm outline-none focus:border-brand-pink"
          />
        </div>
        {tab === 'signin' && (
          <div className="text-right">
            <a href="#" className="font-body text-xs text-brand-black/60 hover:text-brand-pink">
              Forgot password?
            </a>
          </div>
        )}
        <Button className="w-full" type="submit">
          {tab === 'signin' ? 'Sign In' : 'Create Account'}
        </Button>
      </form>

      <p className="mt-8 max-w-xs text-center font-body text-xs leading-relaxed text-brand-black/50">
        This is a demo account form — connect it to your authentication
        provider of choice (Auth.js, Clerk, Supabase, etc.) before going live.
      </p>
    </div>
  );
}
