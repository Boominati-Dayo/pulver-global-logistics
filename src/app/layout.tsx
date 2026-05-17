import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';
import ClientLayout from '@/components/ClientLayout';
import SchemaMarkup from '@/components/SchemaMarkup';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://swift-xpress-inc.vercel.app/';

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'SwiftXpress Inc. | Fast & Reliable Shipping Solutions',
    template: 'SwiftXpress Inc. | %s',
  },
  description: 'SwiftXpress Inc. provides comprehensive shipping and logistics solutions worldwide. Real-time package tracking, air freight, sea freight, warehousing, and express delivery services.',
  keywords: [
    'package delivery',
    'shipping services',
    'package tracking',
    'air freight',
    'sea freight',
    'ground transport',
    'warehousing',
    'express delivery',
    'cargo tracking',
    'international shipping',
    'logistics company',
    'supply chain',
    'freight forwarding',
    'SwiftXpress',
    'swift xpress',
    'swift express inc',
    'swift express',
  ],
  authors: [{ name: 'SwiftXpress Inc.' }],
  creator: 'SwiftXpress Inc.',
  publisher: 'SwiftXpress Inc.',
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: BASE_URL,
    siteName: 'SwiftXpress Inc.',
    title: 'SwiftXpress Inc. | Fast & Reliable Shipping Solutions',
    description: 'SwiftXpress Inc. provides comprehensive shipping and logistics solutions worldwide. Real-time tracking, air freight, sea freight, and express delivery.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'SwiftXpress Inc. - Your Trusted Logistics Partner',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SwiftXpress Inc. | Fast & Reliable Shipping Solutions',
    description: 'SwiftXpress Inc. provides comprehensive shipping and logistics solutions worldwide.',
    images: ['/og-image.png'],
    creator: '@SwiftXpressInc',
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-icon.png',
  },
  manifest: '/manifest.json',
  alternates: {
    canonical: BASE_URL,
  },
  category: 'Logistics & Transportation',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <meta name="theme-color" content="#1a365d" />
        <meta name="color-scheme" content="light dark" />

        <Script id="smartsupp-chat" strategy="afterInteractive">
          {`
            var _smartsupp = _smartsupp || {};
            _smartsupp.key = '2bb2b5c624922e5b9b0efa663193a6dd85387609';

            window.smartsupp || (function(d) {
              var s, c, o = smartsupp = function() {
                o._.push(arguments);
              };

              o._ = [];
              s = d.getElementsByTagName('script')[0];
              c = d.createElement('script');

              c.type = 'text/javascript';
              c.charset = 'utf-8';
              c.async = true;
              c.src = 'https://www.smartsuppchat.com/loader.js?';

              s.parentNode.insertBefore(c, s);
            })(document);
          `}
        </Script>
      </head>
      <body className="antialiased">
        <SchemaMarkup />
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}