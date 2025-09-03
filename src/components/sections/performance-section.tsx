export function PerformanceSection() {
  const performanceFeatures = [
    {
      icon: '⚡',
      metric: '< 3s',
      title: 'Load Time',
      description: 'Even on potato-powered WiFi'
    },
    {
      icon: '📱',
      metric: '100%',
      title: 'Mobile Responsive',
      description: 'Looks great on every device'
    },
    {
      icon: '🎯',
      metric: 'SEO',
      title: 'Core Web Vitals',
      description: 'Structured for peak performance'
    },
    {
      icon: '💾',
      metric: 'PWA',
      title: 'Works Offline',
      description: 'Like a true champion'
    }
  ];

  const badges = [
    { label: 'Client-Side Processing', color: 'from-green-400 to-green-600' },
    { label: 'Privacy First', color: 'from-blue-400 to-blue-600' },
    { label: 'No Server Required', color: 'from-purple-400 to-purple-600' },
    { label: 'MozJPEG Powered', color: 'from-orange-400 to-red-500' }
  ];

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-indigo-50 to-blue-50">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-5xl font-heading font-semibold text-gray-900 mb-6">
            Built for{' '}
            <span className="monster-gradient-text">
              Speed
            </span>
            , Designed for{' '}
            <span className="monster-gradient-text">
              Web
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            JPGmonster isn&apos;t just fast—it&apos;s built to make your entire website faster
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {performanceFeatures.map((feature, index) => (
            <div 
              key={feature.title}
              className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 animate-in fade-in duration-700"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <div className="text-3xl font-bold text-monster-primary mb-2">
                {feature.metric}
              </div>
              <h3 className="text-lg font-heading font-medium text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center mb-12">
          <h3 className="text-2xl font-heading font-medium text-gray-900 mb-8">
            Tech Stack That Delivers
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            {badges.map((badge, index) => (
              <div
                key={badge.label}
                className={`
                  px-6 py-3 rounded-full bg-gradient-to-r ${badge.color} 
                  text-white font-semibold shadow-lg hover:shadow-xl 
                  transform hover:-translate-y-1 transition-all duration-300
                  animate-in fade-in duration-700
                `}
                style={{ animationDelay: `${index * 150}ms` }}
              >
                {badge.label}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-3xl p-8 shadow-xl text-center">
          <div className="flex items-center justify-center mb-6">
            <div className="text-6xl mr-4">🏆</div>
            <div>
              <h3 className="text-2xl font-heading font-medium text-gray-900">
                Performance Champion
              </h3>
              <p className="text-gray-600">
                Optimized for Google Core Web Vitals and user experience
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-2xl font-bold text-green-600">95+</div>
              <div className="text-sm text-gray-600">PageSpeed Score</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-600">0ms</div>
              <div className="text-sm text-gray-600">Server Latency</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-600">∞</div>
              <div className="text-sm text-gray-600">Privacy Protection</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}