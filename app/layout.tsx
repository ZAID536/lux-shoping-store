import type { Metadata } from 'next';
import { Playfair_Display, Jost } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CartDrawer from '@/components/layout/CartDrawer';
import { CartProvider } from '@/context/CartContext';
import { WishlistProvider } from '@/context/WishlistContext';

const display = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
  weight: ['500', '600', '700'],
});

const body = Jost({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
  weight: ['300', '400', '500', '600'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.luxpickflorence.com'),
  title: {
    default: 'Lux Pick Florence | Luxury Bags, Watches & Jewelry',
    template: '%s | Lux Pick Florence',
  },
  description:
    'Shop the Lux Pick Florence edit — premium luxury bags, watches, jewelry, shoes and accessories, hand-finished in Italy. Free shipping across Australia, US, UK, Canada and Europe.',
  keywords: [
    'luxury fashion',
    'designer bags',
    'luxury watches',
    'luxury jewelry',
    'Lux Pick Florence',
  ],
  openGraph: {
    title: 'Lux Pick Florence | Luxury Bags, Watches & Jewelry',
    description:
      'Elegant, minimal, premium — discover the Lux Pick Florence collection.',
    type: 'website',
    locale: 'en_US',
    siteName: 'Lux Pick Florence',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lux Pick Florence',
    description: 'Timeless luxury, made for the modern woman.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body className="min-h-screen bg-white font-body text-brand-black antialiased">
        <CartProvider>
          <WishlistProvider>
            <Header />
            <main>{children}</main>
            <Footer />
            <CartDrawer />
          </WishlistProvider>
        </CartProvider>
      </body>
    </html>
  );
}
