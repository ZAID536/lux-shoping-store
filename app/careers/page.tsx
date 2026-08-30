import { Metadata } from 'next';
import StaticPage from '@/components/ui/StaticPage';

export const metadata: Metadata = {
  title: 'Careers',
  description: 'Join the Lux Pick Florence team across design, atelier operations and customer care.',
};

const roles = [
  {
    title: 'Assistant Buyer, Accessories',
    location: 'Florence, Italy (Hybrid)',
    type: 'Full-time',
  },
  {
    title: 'Customer Care Specialist',
    location: 'Remote — UK/EU hours',
    type: 'Full-time',
  },
  {
    title: 'Ecommerce & CRM Manager',
    location: 'Remote — AU/US hours',
    type: 'Full-time',
  },
];

export default function CareersPage() {
  return (
    <StaticPage
      eyebrow="Careers"
      title="Build the house of Lux Pick Florence"
      intro="We're a small, ambitious team obsessed with quality — in our product and in how we work. If that sounds like you, we'd love to hear from you."
    >
      <div className="divide-y divide-brand-black/10 border-y border-brand-black/10">
        {roles.map((role) => (
          <div
            key={role.title}
            className="flex flex-col justify-between gap-2 py-6 sm:flex-row sm:items-center"
          >
            <div>
              <h3 className="font-display text-lg text-brand-black">{role.title}</h3>
              <p className="mt-1 font-body text-sm text-brand-black/60">
                {role.location} · {role.type}
              </p>
            </div>
            <a
              href="mailto:careers@luxpickflorence.com"
              className="font-body text-xs font-semibold uppercase tracking-widest2 text-brand-pink hover:text-brand-black"
            >
              Apply →
            </a>
          </div>
        ))}
      </div>
      <p className="font-body text-sm text-brand-black/60">
        Don&apos;t see the right role? Send your CV to{' '}
        <a href="mailto:careers@luxpickflorence.com" className="text-brand-pink">
          careers@luxpickflorence.com
        </a>{' '}
        — we&apos;re always keen to meet people who care about craft.
      </p>
    </StaticPage>
  );
}
