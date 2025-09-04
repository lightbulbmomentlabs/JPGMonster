import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { HeroSection } from '@/components/sections/hero-section';
import { HowItWorksSection } from '@/components/sections/how-it-works-section';
import { WhyJPGmonsterSection } from '@/components/sections/why-jpgmonster-section';
import { FeaturesDetailedSection } from '@/components/sections/features-detailed-section';
import { UseCasesSection } from '@/components/sections/use-cases-section';
import { PerformanceSection } from '@/components/sections/performance-section';
import { FAQSection } from '@/components/sections/faq-section';
import { SEOFooterSection } from '@/components/sections/seo-footer-section';
import { AdPlaceholder } from '@/components/ads/ad-placeholder';
import { StructuredData } from '@/components/seo/structured-data';

export default function Home() {
  return (
    <>
      <StructuredData />
      <Header />
      
      {/* Top Banner Ad */}
      <div className="py-4 bg-gray-50">
        <AdPlaceholder size="banner" />
      </div>

      <main className="flex-1">
        <HeroSection />
        
        {/* Ad after Hero */}
        <div className="py-8 bg-white">
          <AdPlaceholder size="rectangle" />
        </div>

        <HowItWorksSection />
        
        <WhyJPGmonsterSection />
        
        {/* Mid-page Ad */}
        <div className="py-8 bg-gray-50">
          <AdPlaceholder size="large-rectangle" />
        </div>

        <FeaturesDetailedSection />
        
        <UseCasesSection />
        
        {/* Ad before Performance */}
        <div className="py-8 bg-white">
          <AdPlaceholder size="banner" />
        </div>

        <PerformanceSection />
        
        {/* FAQ Section for SEO */}
        <FAQSection />
      </main>

      <SEOFooterSection />
      <Footer />
    </>
  );
}
