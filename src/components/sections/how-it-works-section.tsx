export function HowItWorksSection() {
  const steps = [
    {
      number: '1',
      title: 'Upload Those Chunky JPGs',
      description: 'Drag and drop or click to upload. Single image? Cool. Got ten? Even better. JPGmonster is always hungry.',
      icon: '📁'
    },
    {
      number: '2', 
      title: 'Pick Your Crunch Factor',
      description: 'Light, Medium, Heavy, or grab the slider and go wild. You\'re in charge of how skinny your JPGs get.',
      icon: '⚙️'
    },
    {
      number: '3',
      title: 'Download Optimized Goodness', 
      description: 'Instantly get back smaller, optimized images that still look amazing. Boom. Done. You\'re a compression wizard now.',
      icon: '⬇️'
    }
  ];

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-5xl font-heading font-semibold text-gray-900 mb-6">
            How It Works
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Three simple steps to transform your heavy JPGs into web-ready masterpieces
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((step, index) => (
            <div 
              key={step.number} 
              className="text-center animate-in fade-in duration-700"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <div className="relative mb-8">
                <div className="w-24 h-24 mx-auto bg-gradient-to-br from-monster-primary to-monster-secondary rounded-full flex items-center justify-center mb-4 shadow-lg">
                  <span className="text-4xl">{step.icon}</span>
                </div>
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg border-3 border-white">
                  {step.number}
                </div>
              </div>
              
              <h3 className="text-xl font-heading font-medium text-gray-900 mb-4">
                {step.title}
              </h3>
              
              <p className="text-gray-600 leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        {/* Connection lines for desktop */}
        <div className="hidden md:block relative -mt-16">
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-full max-w-4xl">
            <svg className="w-full h-4" viewBox="0 0 800 40" fill="none">
              <path 
                d="M200 20 L600 20" 
                stroke="url(#gradient)" 
                strokeWidth="3" 
                strokeDasharray="8,8"
                className="animate-pulse"
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="rgb(99, 102, 241)" />
                  <stop offset="100%" stopColor="rgb(139, 92, 246)" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}