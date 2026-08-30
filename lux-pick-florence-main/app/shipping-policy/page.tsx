import { Metadata } from 'next';
import StaticPage from '@/components/ui/StaticPage';

export const metadata: Metadata = {
  title: 'Shipping Policy',
  description: 'Shipping rates, timeframes and duties for Australia, the US, UK, Canada and Europe.',
};

const rows = [
  { region: 'Australia', standard: '2–4 business days', express: '1–2 business days', freeOver: 'AU$200' },
  { region: 'United States', standard: '3–6 business days', express: '2–3 business days', freeOver: 'US$150' },
  { region: 'United Kingdom', standard: '3–5 business days', express: '1–2 business days', freeOver: '£120' },
  { region: 'Canada', standard: '4–7 business days', express: '2–4 business days', freeOver: 'CA$180' },
  { region: 'Europe', standard: '4–8 business days', express: '2–4 business days', freeOver: '€130' },
];

export default function ShippingPolicyPage() {
  return (
    <StaticPage
      eyebrow="Support"
      title="Shipping policy"
      intro="Every order is packed by hand and shipped with tracking as standard. Rates below are estimates and are confirmed at checkout based on your address."
    >
      <div className="overflow-x-auto">
        <table className="w-full min-w-[560px] border-collapse text-left font-body text-sm">
          <thead>
            <tr className="border-b border-brand-black/10 text-xs uppercase tracking-widest2 text-brand-black/50">
              <th className="py-3 pr-4">Region</th>
              <th className="py-3 pr-4">Standard</th>
              <th className="py-3 pr-4">Express</th>
              <th className="py-3">Free shipping over</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.region} className="border-b border-brand-black/5">
                <td className="py-4 pr-4 font-medium text-brand-black">{row.region}</td>
                <td className="py-4 pr-4 text-brand-black/70">{row.standard}</td>
                <td className="py-4 pr-4 text-brand-black/70">{row.express}</td>
                <td className="py-4 text-brand-black/70">{row.freeOver}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <section>
        <h2 className="font-display text-2xl text-brand-black">Duties &amp; taxes</h2>
        <p className="mt-3 font-body leading-relaxed text-brand-black/70">
          All applicable duties and taxes are calculated and displayed at checkout,
          so the price you see is the price you pay — no surprise fees on delivery.
        </p>
      </section>
      <section>
        <h2 className="font-display text-2xl text-brand-black">Tracking your order</h2>
        <p className="mt-3 font-body leading-relaxed text-brand-black/70">
          You&apos;ll receive a confirmation email with tracking as soon as your order
          ships, along with an estimated delivery window for your region.
        </p>
      </section>
    </StaticPage>
  );
}
