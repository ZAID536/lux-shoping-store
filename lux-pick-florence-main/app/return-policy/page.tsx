import { Metadata } from 'next';
import StaticPage from '@/components/ui/StaticPage';

export const metadata: Metadata = {
  title: 'Return Policy',
  description: 'How to return or exchange your Lux Pick Florence order within 30 days.',
};

const steps = [
  {
    title: 'Start your return',
    body: 'Email returns@luxpickflorence.com with your order number within 30 days of delivery.',
  },
  {
    title: 'Pack your item',
    body: 'Place the item back in its original packaging and dust bag, unworn and with tags attached.',
  },
  {
    title: 'Ship it back',
    body: 'Use the prepaid return label we send you, or your preferred trackable courier.',
  },
  {
    title: 'Receive your refund',
    body: 'Once received and inspected, refunds are issued to your original payment method within 5–7 business days.',
  },
];

export default function ReturnPolicyPage() {
  return (
    <StaticPage
      eyebrow="Support"
      title="Return policy"
      intro="We want you to love every piece. If something isn't right, unworn items in original packaging can be returned within 30 days of delivery for a full refund."
    >
      <ol className="space-y-6">
        {steps.map((step, i) => (
          <li key={step.title} className="flex gap-5">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-brand-pink font-display text-sm text-brand-pink">
              {i + 1}
            </span>
            <div>
              <h3 className="font-display text-lg text-brand-black">{step.title}</h3>
              <p className="mt-1 font-body text-sm leading-relaxed text-brand-black/70">
                {step.body}
              </p>
            </div>
          </li>
        ))}
      </ol>
      <section>
        <h2 className="font-display text-2xl text-brand-black">Sale &amp; final sale items</h2>
        <p className="mt-3 font-body leading-relaxed text-brand-black/70">
          Items marked &quot;Final Sale&quot; cannot be returned or exchanged unless
          received faulty or damaged. All other sale items follow our standard
          30-day return window.
        </p>
      </section>
      <section>
        <h2 className="font-display text-2xl text-brand-black">Faulty items</h2>
        <p className="mt-3 font-body leading-relaxed text-brand-black/70">
          If an item arrives faulty, contact us within 14 days of delivery and
          we&apos;ll arrange a free replacement, repair or refund.
        </p>
      </section>
    </StaticPage>
  );
}
