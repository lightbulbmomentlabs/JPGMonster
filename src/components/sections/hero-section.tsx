'use client';

import { useState } from 'react';
import { ImageUploader } from '@/components/upload/image-uploader';
import { ProcessedImage } from '@/types';
import { SmartAds } from '@/components/ads/smart-ads';

export function HeroSection() {
  const [processedImages, setProcessedImages] = useState<ProcessedImage[]>([]);
  const [, setIsProcessing] = useState(false);

  const hasResults = processedImages.length > 0;

  const scrollToTop = () => {
    const heading = document.getElementById('main-heading');
    if (heading) {
      const headerOffset = 150; // Account for fixed header
      // Use scrollIntoView instead of getBoundingClientRect to avoid forced reflow
      heading.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      });
      // Adjust for header offset after scroll completes
      setTimeout(() => {
        window.scrollBy(0, -headerOffset);
      }, 50);
    }
  };

  const handleProcessingStart = () => {
    setIsProcessing(true);
    scrollToTop();
  };

  const handleProcessingComplete = (processed: ProcessedImage[]) => {
    setProcessedImages(processed);
    setIsProcessing(false);
    // Scroll again after a short delay to ensure results are visible
    setTimeout(() => scrollToTop(), 100);
  };

  const handleReset = () => {
    setProcessedImages([]);
    setIsProcessing(false);
  };

  return (
    <section className="relative bg-gradient-to-br from-blue-50 to-purple-50 py-20 px-2 sm:px-4">
      <div className="container mx-auto max-w-[1600px] px-4">
        <div className="flex justify-between items-start gap-8 xl:gap-12">
          
          {/* Left Ad */}
          <div className="hidden xl:block flex-shrink-0 xl:sticky xl:top-[150px] xl:self-start w-[300px]">
            <SmartAds size="medium-rectangle" position="left" />
          </div>

          {/* Main Content */}
          <div className="w-full xl:max-w-6xl text-center xl:flex-grow">
            {/* Headline */}
            <h1 
              id="main-heading"
              className="mb-6 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl font-heading font-bold animate-in fade-in duration-1000 delay-300"
            >
              {hasResults ? (
                <>
                  Mmmmm. <span className="monster-gradient-text">JPG</span>Monster happy.
                </>
              ) : (
                <>
                  Free{' '}
                  <span className="monster-gradient-text">
                    JPG Compressor Online
                  </span>
                  <br />
                  Compress Images Without Losing Quality
                </>
              )}
            </h1>

            {/* Upload Area */}
            <div className="max-w-4xl mx-auto mb-12 animate-in slide-in-from-bottom duration-700 delay-200">
              <ImageUploader 
                integrated={true}
                onProcessingStart={handleProcessingStart}
                onProcessingComplete={handleProcessingComplete}
                onReset={handleReset}
              />
            </div>

            {/* Subheading */}
            <p className="mb-10 text-lg text-gray-600 sm:text-xl max-w-3xl mx-auto animate-in fade-in duration-1000 delay-500">
              Reduce image size instantly with our free online tool. Batch image compression, lossless optimization, 
              and bulk JPEG processing — perfect for websites, emails, and social media. No signup required in 2025.
            </p>
          </div>

          {/* Right Ad */}
          <div className="hidden xl:block flex-shrink-0 xl:sticky xl:top-[150px] xl:self-start w-[300px]">
            <SmartAds size="medium-rectangle" position="right" />
          </div>

        </div>
      </div>
    </section>
  );
}