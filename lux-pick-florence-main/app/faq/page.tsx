import { Metadata } from 'next';
import StaticPage from '@/components/ui/StaticPage';
import FaqAccordion from '@/components/ui/FaqAccordion';

export const metadata: Metadata = {
  title: 'FAQ',
  description: 'Answers to common questions about sizing, shipping, returns and caring for your Lux Pick Florence pieces.',
};

const faqs = [
  {
    question: 'How long does delivery take?',
    answer:
      'Standard shipping arrives in 3–6 business days across Australia, the US, UK and Canada, and 4–8 business days across Europe. Express options are available at checkout.',
  },
  {
    question: 'Do you ship internationally?',
    answer:
      'Yes — we ship to Australia, the United States, the United Kingdom, Canada and all of Europe. Duties and taxes are calculated and shown at checkout, never charged on delivery.',
  },
  {
    question: 'What is your return policy?',
    answer:
      'Unworn items in original packaging can be returned within 30 days of delivery for a full refund. Sale items are final unless faulty. Visit our Return Policy page to start a return.',
  },
  {
    question: 'How do I know what size to order?',
    answer:
      'Every product page includes a detailed size guide with measurements in cm and inches. If you are between sizes, our customer care team is happy to advise.',
  },
  {
    question: 'How should I care for my leather goods?',
    answer:
      'Store pieces in their dust bag away from direct sunlight, avoid prolonged water exposure, and condition leather every few months with a quality leather balm.',
  },
  {
    question: 'Is my payment information secure?',
    answer:
      'Yes. All transactions are processed over an encrypted, PCI-compliant checkout, and we never store your full card details on our servers.',
  },
];

export default function FaqPage() {
  return (
    <StaticPage
      eyebrow="Support"
      title="Frequently asked questions"
      intro="Can't find what you're looking for? Our customer care team is one message away."
    >
      <FaqAccordion faqs={faqs} />
    </StaticPage>
  );
}
