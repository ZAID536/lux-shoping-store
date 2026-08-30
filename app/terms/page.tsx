import { Metadata } from 'next';
import StaticPage from '@/components/ui/StaticPage';

export const metadata: Metadata = {
  title: 'Terms & Conditions',
  description: 'The terms and conditions governing your use of the Lux Pick Florence website and orders.',
};

export default function TermsPage() {
  return (
    <StaticPage
      eyebrow="Legal"
      title="Terms & conditions"
      intro="Last updated 1 January 2026. By using this website and placing an order, you agree to the following terms."
    >
      <section>
        <h2 className="font-display text-2xl text-brand-black">Orders &amp; pricing</h2>
        <p className="mt-3 font-body leading-relaxed text-brand-black/70">
          All prices are listed in your local currency where available and are
          subject to change without notice. We reserve the right to refuse or
          cancel any order, including in cases of suspected fraud or pricing
          errors.
        </p>
      </section>
      <section>
        <h2 className="font-display text-2xl text-brand-black">Product descriptions</h2>
        <p className="mt-3 font-body leading-relaxed text-brand-black/70">
          We strive to display products, colours and materials as accurately as
          possible. Minor variations may occur due to the handmade nature of our
          goods and differences between screens.
        </p>
      </section>
      <section>
        <h2 className="font-display text-2xl text-brand-black">Intellectual property</h2>
        <p className="mt-3 font-body leading-relaxed text-brand-black/70">
          All content on this site, including images, text and logos, is the
          property of Lux Pick Florence and may not be reproduced without
          written permission.
        </p>
      </section>
      <section>
        <h2 className="font-display text-2xl text-brand-black">Limitation of liability</h2>
        <p className="mt-3 font-body leading-relaxed text-brand-black/70">
          Lux Pick Florence is not liable for indirect or consequential losses
          arising from the use of this website or our products, to the fullest
          extent permitted by law.
        </p>
      </section>
      <section>
        <h2 className="font-display text-2xl text-brand-black">Governing law</h2>
        <p className="mt-3 font-body leading-relaxed text-brand-black/70">
          These terms are governed by the laws of Italy, without prejudice to
          any mandatory consumer protection laws in your country of residence.
        </p>
      </section>
    </StaticPage>
  );
}
