export function SEOFooterSection() {
  return (
    <section className="py-16 px-4 bg-gray-900 text-white">
      <div className="container mx-auto max-w-4xl text-center">
        <div className="mb-8">
          <h2 className="text-2xl sm:text-3xl font-heading font-medium mb-6">
            The Ultimate{' '}
            <span className="monster-gradient-text">
              JPG Compression Tool
            </span>
          </h2>
        </div>
        
        <div className="bg-gray-800 rounded-2xl p-8 shadow-xl">
          <blockquote className="text-lg leading-relaxed text-gray-300 italic">
            JPGmonster is a fast and free JPG compression tool that reduces JPG file size for websites, blogs, emails, and online stores. Compress JPGs online using client-side MozJPEG compression with real-time previews and privacy-first design. JPGmonster is your go-to JPG optimizer for SEO, page speed, and performance.
          </blockquote>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="p-6">
            <div className="text-3xl mb-3">🎯</div>
            <h3 className="text-lg font-heading font-normal mb-2">SEO Optimized</h3>
            <p className="text-gray-400 text-sm">
              Faster images = better rankings
            </p>
          </div>
          <div className="p-6">
            <div className="text-3xl mb-3">⚡</div>
            <h3 className="text-lg font-heading font-normal mb-2">Lightning Fast</h3>
            <p className="text-gray-400 text-sm">
              Client-side processing in milliseconds
            </p>
          </div>
          <div className="p-6">
            <div className="text-3xl mb-3">🔒</div>
            <h3 className="text-lg font-heading font-normal mb-2">Privacy First</h3>
            <p className="text-gray-400 text-sm">
              Your images never leave your device
            </p>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-700">
          <p className="text-gray-400 text-sm">
            <strong>Keywords:</strong> JPG compression, image optimizer, compress JPG online, reduce JPG file size, 
            web image optimization, MozJPEG, batch JPG compression, SEO image tools, website speed optimization
          </p>
        </div>
      </div>
    </section>
  );
}