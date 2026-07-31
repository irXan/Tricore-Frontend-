import type { Metadata } from 'next';
import { Inter, Montserrat, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { Footer } from '@/components/layout/Footer';
import { Navbar } from '@/components/layout/Navbar';
import { LoaderScreen } from '@/components/ui/LoaderScreen';
import { ChatWidget } from '@/components/ui/ChatWidget';

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      name: 'TriCore Surgical',
      url: 'https://tricore-frontend.vercel.app',
      description: 'Wholesale and retail distributor of general surgical equipment and hospital furniture.',
      contactPoint: { '@type': 'ContactPoint', contactType: 'sales', telephone: '+Add verified business phone before launch', email: 'tester@coolmail.com' },
    },
    {
      '@type': 'WebSite',
      url: 'https://tricore-frontend.vercel.app',
      name: 'TriCore Surgical',
      potentialAction: { '@type': 'SearchAction', target: { '@type': 'EntryPoint', urlTemplate: 'https://tricore-frontend.vercel.app/products?search={search_term_string}' }, 'query-input': 'required name=search_term_string' },
    },
  ],
};

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const montserrat = Montserrat({ subsets: ['latin'], variable: '--font-montserrat', display: 'swap' });
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-jetbrains', display: 'swap' });

export const metadata: Metadata = {
  title: { default: 'TriCore Surgical | Equipment & Hospital Furniture', template: '%s | TriCore Surgical' },
  description: 'TriCore Surgical supplies general surgical equipment and hospital furniture for wholesale and retail requirements.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body className={`${inter.variable} ${montserrat.variable} ${jetbrainsMono.variable}`}>
        <LoaderScreen />
        <Navbar />
        <main>{children}</main>
        <Footer />
        <ChatWidget />
      </body>
    </html>
  );
}
