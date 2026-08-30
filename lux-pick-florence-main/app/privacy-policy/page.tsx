import { Metadata } from 'next';
import StaticPage from '@/components/ui/StaticPage';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'How Lux Pick Florence collects, uses and protects your personal information.',
};

export default function PrivacyPolicyPage() {
  return (
    <StaticPage
      eyebrow="Legal"
      title="Privacy policy"
      intro="Last updated 1 January 2026. This policy explains what information we collect, how we use it, and the choices you have."
    >
      <section>
        <h2 className="font-display text-2xl text-brand-black">Information we collect</h2>
        <p className="mt-3 font-body leading-relaxed text-brand-black/70">
          We collect information you provide directly — such as your name, email,
          shipping address and payment details — as well as information about how
          you browse our site, including pages viewed and items saved to your
          wishlist.
        </p>
      </section>
      <section>
        <h2 className="font-display text-2xl text-brand-black">How we use it</h2>
        <p className="mt-3 font-body leading-relaxed text-brand-black/70">
          We use this information to process orders, provide customer support,
          personalise your shopping experience, and — with your consent — send
          marketing communications about new arrivals and offers.
        </p>
      </section>
      <section>
        <h2 className="font-display text-2xl text-brand-black">Sharing your information</h2>
        <p className="mt-3 font-body leading-relaxed text-brand-black/70">
          We share information only with trusted partners who help us operate our
          business, such as payment processors and shipping carriers. We never
          sell your personal information to third parties.
        </p>
      </section>
      <section>
        <h2 className="font-display text-2xl text-brand-black">Your rights</h2>
        <p className="mt-3 font-body leading-relaxed text-brand-black/70">
          Depending on your location, you may have the right to access, correct,
          delete or export your personal data. To exercise these rights, contact
          us at privacy@luxpickflorence.com.
        </p>
      </section>
    </StaticPage>
  );
}
