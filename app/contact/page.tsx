import { Metadata } from 'next';
import { Mail, MapPin, Phone } from 'lucide-react';
import ContactForm from '@/components/ui/ContactForm';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with the Lux Pick Florence customer care team.',
};

export default function ContactPage() {
  return (
    <div className="bg-white">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-16 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div>
          <p className="font-body text-xs font-semibold uppercase tracking-widest2 text-brand-pink">
            Get In Touch
          </p>
          <h1 className="mt-3 font-display text-4xl text-brand-black sm:text-5xl">
            We&apos;d love to hear from you
          </h1>
          <div className="mt-4 h-px w-16 bg-brand-pink" />
          <p className="mt-6 max-w-md font-body leading-relaxed text-brand-black/70">
            Whether it&apos;s a question about sizing, an order update, or feedback on
            your latest piece — our customer care team responds within one
            business day.
          </p>

          <div className="mt-10 space-y-6">
            <div className="flex items-start gap-4">
              <Mail size={20} className="mt-0.5 text-brand-pink" />
              <div>
                <p className="font-body text-sm font-semibold text-brand-black">Email</p>
                <a href="mailto:care@luxpickflorence.com" className="font-body text-sm text-brand-black/70 hover:text-brand-pink">
                  care@luxpickflorence.com
                </a>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Phone size={20} className="mt-0.5 text-brand-pink" />
              <div>
                <p className="font-body text-sm font-semibold text-brand-black">Phone</p>
                <p className="font-body text-sm text-brand-black/70">
                  Mon–Fri, 9am–6pm CET · +39 055 123 4567
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <MapPin size={20} className="mt-0.5 text-brand-pink" />
              <div>
                <p className="font-body text-sm font-semibold text-brand-black">Atelier</p>
                <p className="font-body text-sm text-brand-black/70">
                  Via de&apos; Tornabuoni, 50123 Florence, Italy
                </p>
              </div>
            </div>
          </div>
        </div>

        <ContactForm />
      </div>
    </div>
  );
}
