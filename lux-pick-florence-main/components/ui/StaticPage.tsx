import { ReactNode } from 'react';

export default function StaticPage({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  children: ReactNode;
}) {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6 lg:px-8">
        <p className="font-body text-xs font-semibold uppercase tracking-widest2 text-brand-pink">
          {eyebrow}
        </p>
        <h1 className="mt-3 font-display text-4xl text-brand-black sm:text-5xl">
          {title}
        </h1>
        <div className="mt-4 h-px w-16 bg-brand-pink" />
        {intro && (
          <p className="mt-6 font-body text-base leading-relaxed text-brand-black/70">
            {intro}
          </p>
        )}
        <div className="prose-lpf mt-10 space-y-8">{children}</div>
      </div>
    </div>
  );
}
