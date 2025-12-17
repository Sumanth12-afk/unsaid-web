import type { Metadata, Viewport } from 'next';
import { Providers } from './providers';
import './globals.css';

export const metadata: Metadata = {
  title: 'UNSAID - What employees can\'t say publicly',
  description: 'A private space for anonymous workplace opinions. No email shown. No public identity. No HR access.',
  keywords: 'workplace culture, anonymous reviews, company culture, employee opinions, work-life balance, India',
  authors: [{ name: 'UNSAID' }],
  openGraph: {
    title: 'UNSAID - What employees can\'t say publicly',
    description: 'A private space for anonymous workplace opinions.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'UNSAID - What employees can\'t say publicly',
    description: 'A private space for anonymous workplace opinions.',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#0B0F14',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

