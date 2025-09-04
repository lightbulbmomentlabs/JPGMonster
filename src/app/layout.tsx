import type { Metadata } from 'next';
import { Inter, Fredoka } from 'next/font/google';
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
    icon: [
      { url: '/icon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/icon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon.ico', sizes: 'any' }
    ],
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'JPGMonster - Free JPG Optimizer',
    description: 'Optimize your JPGs for your website in a fast, fun, and free way. Compress JPEG images instantly with our monster-powered tool.',
    url: '/',
    siteName: 'JPGMonster',
    images: [
      {
        url: 'https://yxmgdkcvglytfkklfutp.supabase.co/storage/v1/object/public/website-assets/JPGMonster-Feat-Image-FB.jpg',
        width: 1200,
        height: 630,
        alt: 'JPGMonster - Free JPG Optimizer - Compress your images instantly',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'JPGMonster - Free JPG Optimizer',
    description: 'Optimize your JPGs for your website in a fast, fun, and free way. Compress JPEG images instantly with our monster-powered tool.',
    images: [
      {
        url: 'https://yxmgdkcvglytfkklfutp.supabase.co/storage/v1/object/public/website-assets/JPGMonster-Feat-Image-TW.jpg',
        width: 1200,
        height: 675,
        alt: 'JPGMonster - Free JPG Optimizer - Compress your images instantly',
      }
    ],
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
  other: {
    'google-adsense-account': 'ca-pub-8970429986961450',
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
        <link 
          rel="preconnect" 
          href="https://pagead2.googlesyndication.com" 
        />
        <link 
          rel="dns-prefetch" 
          href="https://pagead2.googlesyndication.com" 
        />
        <link 
          rel="preload" 
          as="image" 
          href="/jpg-monster-icon.jpg"
        />
        <link 
          rel="preload" 
          as="image" 
          href="/jpg-monster-mascot.jpg"
        />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8970429986961450"
          crossOrigin="anonymous"
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
