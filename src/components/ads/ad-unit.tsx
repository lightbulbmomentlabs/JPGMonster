'use client';

import { useEffect } from 'react';

interface AdUnitProps {
  size?: 'medium-rectangle' | 'large-rectangle' | 'skyscraper' | 'large-skyscraper';
  position?: 'left' | 'right';
  className?: string;
  adSlot?: string; // Custom ad slot ID
}

const AD_SIZES = {
  'medium-rectangle': { width: 300, height: 250 },
  'large-rectangle': { width: 336, height: 280 },
  'skyscraper': { width: 160, height: 600 },
  'large-skyscraper': { width: 300, height: 600 },
};

// Default ad slot IDs - you'll need to replace these with actual slot IDs from AdSense
const DEFAULT_AD_SLOTS = {
  'medium-rectangle-left': '1234567890',
  'medium-rectangle-right': '1234567891',
  'large-rectangle-left': '1234567892',
  'large-rectangle-right': '1234567893',
  'skyscraper-left': '1234567894',
  'skyscraper-right': '1234567895',
  'large-skyscraper-left': '1234567896',
  'large-skyscraper-right': '1234567897',
};

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

export function AdUnit({ 
  size = 'medium-rectangle', 
  position = 'left', 
  className = '',
  adSlot
}: AdUnitProps) {
  const adSize = AD_SIZES[size];
  const slotId = adSlot || DEFAULT_AD_SLOTS[`${size}-${position}` as keyof typeof DEFAULT_AD_SLOTS];

  useEffect(() => {
    try {
      if (typeof window !== 'undefined' && window.adsbygoogle) {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (error) {
      console.error('AdSense error:', error);
    }
  }, []);

  return (
    <div 
      className={`
        hidden xl:block
        ${className}
      `}
      style={{ 
        width: adSize.width,
        height: adSize.height,
        minWidth: adSize.width,
        minHeight: adSize.height,
      }}
    >
      <ins
        className="adsbygoogle"
        style={{
          display: 'block',
          width: `${adSize.width}px`,
          height: `${adSize.height}px`,
        }}
        data-ad-client="ca-pub-8970429986961450"
        data-ad-slot={slotId}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}