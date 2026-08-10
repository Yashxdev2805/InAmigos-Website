import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { getOrganizationJsonLd } from '@/lib/json-ld';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'InAmigos Foundation | 80G Tax-Exempt Non-Profit NGO in India',
  description: 'InAmigos Foundation is a Section 80G tax-exempt NGO empowering underprivileged communities through hunger relief, girl child education, and healthcare. 100% Tax Deductible.',
  keywords: [
    'InAmigos Foundation',
    'NGO in India',
    '80G Tax Exemption NGO',
    'Donate Food India',
    'Girl Child Education Sponsoring',
    'Hunger Relief India',
  ],
  authors: [{ name: 'InAmigos Foundation Team' }],
  creator: 'InAmigos Foundation',
  metadataBase: new URL('https://inamigosfoundation.org.in'),
  openGraph: {
    title: 'InAmigos Foundation | Transparent Non-Profit & 80G Tax Relief',
    description: 'Empowering communities through hunger relief, education, and healthcare with 100% financial transparency.',
    url: 'https://inamigosfoundation.org.in',
    siteName: 'InAmigos Foundation',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1200&auto=format&fit=crop',
        width: 1200,
        height: 630,
        alt: 'InAmigos Foundation Food Relief Drive',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'InAmigos Foundation | 80G Tax Deductible Non-Profit',
    description: 'Sponsor hot meals & child education in India with instant 80G tax receipts.',
    images: ['https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1200&auto=format&fit=crop'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = getOrganizationJsonLd();

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.className} antialiased selection:bg-emerald-600 selection:text-white`}>
        {children}
      </body>
    </html>
  );
}
