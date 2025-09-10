'use client';

import Script from 'next/script';
import { useEffect, useState } from 'react';
import { ScriptErrorBoundary } from '@/components/error/error-boundary';

export function GoogleAnalytics() {
  const [analyticsLoaded, setAnalyticsLoaded] = useState(false);

  useEffect(() => {
    // Detect if Google Analytics is blocked by firewall/ad blockers
    const checkAnalyticsBlocked = () => {
      const timeout = setTimeout(() => {
        if (!window.gtag || !analyticsLoaded) {
          console.info('Google Analytics appears to be blocked - running in fallback mode');
        }
      }, 5000); // Wait 5 seconds for GA to load

      return () => clearTimeout(timeout);
    };

    checkAnalyticsBlocked();
  }, [analyticsLoaded]);

  const handleScriptLoad = () => {
    setAnalyticsLoaded(true);
  };

  const handleScriptError = (error: Event) => {
    console.warn('Google Analytics failed to load:', error);
    
    // Implement basic fallback analytics tracking
    window.gtag = window.gtag || function(...args: unknown[]) {
      // Fallback function when GA is blocked
      console.info('Analytics event (fallback):', args);
    };
  };

  return (
    <ScriptErrorBoundary scriptName="Google Analytics">
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-44J4YK1QDR"
        strategy="afterInteractive"
        onLoad={handleScriptLoad}
        onError={handleScriptError}
      />
      <Script 
        id="google-analytics" 
        strategy="afterInteractive"
        onLoad={handleScriptLoad}
        onError={handleScriptError}
      >
        {`
          try {
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-44J4YK1QDR', {
              // Enhanced privacy settings for firewall compatibility
              anonymize_ip: true,
              cookie_flags: 'secure;samesite=lax',
              transport_type: 'beacon',
              // Graceful degradation settings
              send_page_view: true,
              custom_map: {}
            });
          } catch (error) {
            console.warn('Google Analytics initialization failed:', error);
            // Ensure gtag function exists even if GA fails
            window.gtag = window.gtag || function(...args) {
              console.info('Analytics event (error fallback):', args);
            };
          }
        `}
      </Script>
      
      {/* DNS prefetch for better loading in restrictive networks */}
      <link rel="dns-prefetch" href="//www.google-analytics.com" />
      <link rel="dns-prefetch" href="//www.googletagmanager.com" />
    </ScriptErrorBoundary>
  );
}