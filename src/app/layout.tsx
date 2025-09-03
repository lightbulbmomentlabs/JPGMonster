import type { Metadata } from 'next';
import { Inter, Fredoka } from 'next/font/google';
import Script from 'next/script';
import './globals.css';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  weight: ['400'],
});

const fredoka = Fredoka({
  variable: '--font-fredoka',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: {
    default: 'JPGMonster - Free JPG Optimizer',
    template: '%s | JPGMonster',
  },
  description: 'Optimize your JPGs for your website in a fast, fun, and free way. Compress JPEG images instantly with our monster-powered tool.',
  keywords: ['JPG optimizer', 'image compression', 'JPEG compressor', 'web optimization', 'free tool'],
  authors: [{ name: 'JPGMonster' }],
  creator: 'JPGMonster',
  publisher: 'JPGMonster',
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://jpgmonster.com'),
  icons: {
    icon: 'https://yxmgdkcvglytfkklfutp.supabase.co/storage/v1/object/public/website-assets/JPG-Monster-Icon-Sml.png',
    shortcut: 'https://yxmgdkcvglytfkklfutp.supabase.co/storage/v1/object/public/website-assets/JPG-Monster-Icon-Sml.png',
    apple: 'https://yxmgdkcvglytfkklfutp.supabase.co/storage/v1/object/public/website-assets/JPG-Monster-Icon-Sml.png',
  },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'JPGMonster - Free JPG Optimizer',
    description: 'Optimize your JPGs for your website in a fast, fun, and free way',
    url: '/',
    siteName: 'JPGMonster',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'JPGMonster - Free JPG Optimizer',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'JPGMonster - Free JPG Optimizer',
    description: 'Optimize your JPGs for your website in a fast, fun, and free way',
    images: ['/og-image.png'],
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
  return (
    <html lang="en">
      <head>
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8970429986961450"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      <body className={`${inter.variable} ${fredoka.variable} font-sans antialiased min-h-screen bg-gray-50`} suppressHydrationWarning={true}>
        <div className="flex min-h-screen flex-col">
          {children}
        </div>
      </body>
    </html>
  );
}
