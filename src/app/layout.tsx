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
    default: 'Free JPG Compressor Online - Compress Images Without Losing Quality | JPGMonster 2025',
    template: '%s | Free JPG Optimizer 2025',
  },
  description: 'Reduce image size with our free JPG compressor online. Compress JPEG images without losing quality, batch process multiple files, and optimize images for web. No signup required - instant compression tool 2025.',
  keywords: ['compress JPG without losing quality', 'free JPG compressor online', 'reduce image size', 'compress image online', 'batch image compression free', 'image optimizer', 'bulk JPEG optimizer', 'lossless image compression tool', 'compress images for website', 'reduce image size for web', 'progressive JPEG compression', 'JPG compression 2025'],
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
    title: 'Free JPG Compressor Online - Compress Images Without Losing Quality 2025',
    description: 'Reduce image size with our free JPG compressor online. Compress JPEG images without losing quality, batch process multiple files, and optimize images for web.',
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
    title: 'Free JPG Compressor Online - Compress Images Without Losing Quality 2025',
    description: 'Reduce image size with our free JPG compressor online. Compress JPEG images without losing quality, batch process multiple files, and optimize images for web.',
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
        {/* Google tag (gtag.js) */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-44J4YK1QDR"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-44J4YK1QDR');
            `,
          }}
        />
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
          href="/jpg-monster-icon.webp"
        />
        <link 
          rel="preload" 
          as="image" 
          href="/jpg-monster-mascot.webp"
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
