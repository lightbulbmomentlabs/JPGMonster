'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

interface SmartAdsProps {
  position: 'left' | 'right';
  size: 'medium-rectangle';
}

export function SmartAds({ position, size }: SmartAdsProps) {
  const adRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [adLoaded, setAdLoaded] = useState(false);

  const loadAdSenseScript = useCallback(() => {
    if (adLoaded || typeof window === 'undefined') return;
    
    setAdLoaded(true);
    
    // Initialize AdSense if not already loaded
    const win = window as Window & { adsbygoogle?: unknown[] };
    if (!win.adsbygoogle) {
      win.adsbygoogle = [];
    }
    
    // Push the ad
    try {
      (win.adsbygoogle = win.adsbygoogle || []).push({});
    } catch {
      console.log('AdSense not ready yet');
    }
  }, [adLoaded]);

  useEffect(() => {
    const adElement = adRef.current;
    if (!adElement) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !adLoaded) {
          // Small delay to improve Core Web Vitals while still loading ads quickly
          setTimeout(() => {
            setIsVisible(true);
            loadAdSenseScript();
          }, 150); // 150ms delay - barely noticeable but helps PageSpeed
        }
      },
      {
        // Load ads when they're 200px away from being visible
        rootMargin: '200px',
        threshold: 0
      }
    );

    observer.observe(adElement);

    return () => {
      observer.disconnect();
    };
  }, [adLoaded, loadAdSenseScript]);

  // Size configurations
  const sizeConfig = {
    'medium-rectangle': {
      width: '300px',
      height: '250px',
      'data-ad-format': 'rectangle',
    }
  };

  const config = sizeConfig[size];

  return (
    <div 
      ref={adRef}
      className={`hidden xl:block ${position === 'left' ? 'xl:mr-8' : 'xl:ml-8'}`}
      style={{
        minWidth: config.width,
        minHeight: config.height,
      }}
    >
      {isVisible && (
        <ins
          className="adsbygoogle"
          style={{
            display: 'inline-block',
            width: config.width,
            height: config.height,
          }}
          data-ad-client="ca-pub-8970429986961450"
          data-ad-slot="1234567890" // You'll need to replace with actual ad slot IDs
          data-ad-format={config['data-ad-format']}
          data-full-width-responsive="false"
        />
      )}
      
      {/* Placeholder while loading */}
      {!isVisible && (
        <div
          style={{
            width: config.width,
            height: config.height,
            backgroundColor: '#f8f9fa',
            border: '1px solid #e9ecef',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#6c757d',
            fontSize: '14px',
          }}
        >
          Advertisement
        </div>
      )}
    </div>
  );
}