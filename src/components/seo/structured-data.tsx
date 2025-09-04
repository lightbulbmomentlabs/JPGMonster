'use client';

import { useEffect } from 'react';

export function StructuredData() {
  useEffect(() => {
    // Only run on client side to avoid hydration mismatch
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "JPGMonster - Free JPG Compressor Online",
      "description": "Free online JPG compression tool that reduces image size without losing quality. Batch process multiple files, optimize images for web, and compress JPEG files instantly.",
      "url": "https://jpgmonster.com",
      "applicationCategory": "ImageApplication",
      "operatingSystem": "Web Browser",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "featureList": [
        "Compress JPG without losing quality",
        "Batch image compression",
        "Lossless image compression",
        "Progressive JPEG optimization",
        "Bulk JPEG processing",
        "No registration required",
        "Privacy-focused local processing"
      ],
      "keywords": "compress JPG without losing quality, free JPG compressor online, reduce image size, batch image compression, image optimizer, bulk JPEG optimizer",
      "dateModified": "2025-01-01",
      "author": {
        "@type": "Organization",
        "name": "JPGMonster"
      }
    };

    // Check if script already exists
    const existingScript = document.querySelector('script[type="application/ld+json"]');
    if (!existingScript) {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify(structuredData);
      document.head.appendChild(script);
    }
  }, []);

  return null; // This component doesn't render anything
}