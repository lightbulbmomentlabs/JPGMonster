'use client';

import { useState } from 'react';
import { ImageUploader } from '@/components/upload/image-uploader';
import { ProcessedImage } from '@/types';
import { AdUnit } from '@/components/ads/ad-unit';

export function HeroSection() {
  const [processedImages, setProcessedImages] = useState<ProcessedImage[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const hasResults = processedImages.length > 0;

  const scrollToTop = () => {
    const heading = document.getElementById('main-heading');
    if (heading) {
      const headerOffset = 150; // Account for fixed header
      const elementPosition = heading.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
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
    <section className="relative bg-gradient-to-br from-blue-50 to-purple-50 py-20 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="flex justify-center items-start gap-8">
          
          {/* Left Ad */}
          <div className="flex-shrink-0 xl:sticky xl:top-[150px] xl:self-start">
            <AdUnit size="medium-rectangle" position="left" />
          </div>

          {/* Main Content */}
          <div className="max-w-4xl text-center flex-grow">
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
                  Your{' '}
                  <span className="monster-gradient-text">
                    JPGs Are Too Fat
                  </span>
                  . Feed 'Em to the Monster.
                </>
              )}
            </h1>

            {/* Upload Area */}
            <div className="max-w-2xl mx-auto mb-12 animate-in slide-in-from-bottom duration-700 delay-200">
              <ImageUploader 
                integrated={true}
                onProcessingStart={handleProcessingStart}
                onProcessingComplete={handleProcessingComplete}
                onReset={handleReset}
              />
            </div>

            {/* Subheading */}
            <p className="mb-10 text-lg text-gray-600 sm:text-xl max-w-3xl mx-auto animate-in fade-in duration-1000 delay-500">
              Compress JPGs online faster than you can say "PageSpeed penalty." No logins. No nonsense. 
              Just a hungry little monster who chews through file sizes like it's leg day.
            </p>
          </div>

          {/* Right Ad */}
          <div className="flex-shrink-0 xl:sticky xl:top-[150px] xl:self-start">
            <AdUnit size="medium-rectangle" position="right" />
          </div>

        </div>
      </div>
    </section>
  );
}