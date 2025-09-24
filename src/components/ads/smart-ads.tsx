'use client';

import { useEffect, useRef } from 'react';

interface SmartAdsProps {
  position: 'left' | 'right' | 'header' | 'footer';
  size: 'medium-rectangle' | 'header-banner' | 'large-rectangle';
  adSlot?: string; // Allow custom ad slot ID
}

export function SmartAds({ position, size, adSlot }: SmartAdsProps) {
  const loadedRef = useRef(false);

  // Size configurations
  const sizeConfig = {
    'medium-rectangle': {
      width: '300px',
      height: '250px',
      'data-ad-format': 'rectangle',
      'data-ad-slot': adSlot || '1234567890', // Use provided slot or placeholder
      'data-full-width-responsive': 'false',
    },
    'header-banner': {
      width: '100%',
      height: '90px',
      'data-ad-format': 'auto',
      'data-full-width-responsive': 'true',
      'data-ad-slot': adSlot || '4874135573', // Default to header ad slot
    },
    'large-rectangle': {
      width: '336px',
      height: '280px',
      'data-ad-format': 'rectangle',
      'data-ad-slot': adSlot || '1234567890', // Use provided slot or placeholder
      'data-full-width-responsive': 'false',
    }
  };

  const config = sizeConfig[size];

  useEffect(() => {
    // Only run once per component instance
    if (loadedRef.current || typeof window === 'undefined') return;

    loadedRef.current = true;

    const initializeAd = () => {
      try {
        // Initialize AdSense array if it doesn't exist
        const win = window as Window & { adsbygoogle?: unknown[] };
        win.adsbygoogle = win.adsbygoogle || [];

        console.log('Initializing AdSense ad for slot:', config['data-ad-slot']);

        // Push this specific ad element
        win.adsbygoogle.push({});
      } catch (error) {
        console.error('AdSense initialization failed:', error);
      }
    };

    // Wait for AdSense script to be available
    const checkAdSense = () => {
      const win = window as Window & { adsbygoogle?: unknown[] };
      if (win.adsbygoogle) {
        initializeAd();
      } else {
        setTimeout(checkAdSense, 100);
      }
    };

    // Start checking after a short delay
    setTimeout(checkAdSense, 500);
  }, [config]);

  return (
    <div
      className={`
        ${position === 'header' || position === 'footer' ? 'w-full max-w-none' : 'w-full max-w-sm mx-auto'}
        ${position === 'left' ? 'xl:mr-8' : position === 'right' ? 'xl:ml-8' : ''}
      `}
      style={{
        minWidth: size === 'header-banner' ? '100%' : config.width,
        minHeight: config.height,
      }}
    >
      <ins
        className="adsbygoogle"
        style={{
          display: 'block',
          width: config.width,
          height: size === 'header-banner' ? 'auto' : config.height,
        }}
        data-ad-client="ca-pub-8970429986961450"
        data-ad-slot={config['data-ad-slot']}
        data-ad-format={config['data-ad-format']}
        data-full-width-responsive={config['data-full-width-responsive']}
      />
    </div>
  );
}