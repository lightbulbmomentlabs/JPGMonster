export function FeaturesDetailedSection() {
  const features = [
    'JPG compression tool with Light, Medium, Heavy, and Custom options',
    'Resize images for web and mobile use',
    'Remove EXIF data automatically',
    'Uses MozJPEG for maximum compression without looking like a 2003 meme',
    'Preview before/after comparison',
    'ZIP batch downloads',
    'No account, no problem'
  ];

  return (
    <section id="features" className="py-20 px-4 bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-5xl font-heading font-semibold text-gray-900 mb-6">
            Optimize JPGs Online{' '}
            <span className="monster-gradient-text">
              With These Features
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Everything you need to make your JPGs lean, mean, and web-ready
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="flex items-start space-x-4 p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 animate-in fade-in duration-700"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-monster-primary to-monster-secondary rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <p className="text-gray-700 leading-relaxed">
                {feature}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <div className="inline-flex items-center space-x-4 px-8 py-4 bg-white rounded-2xl shadow-lg">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-gray-700">Processing Power:</span>
            </div>
            <span className="text-xl font-bold monster-gradient-text">
              MozJPEG Engine
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}