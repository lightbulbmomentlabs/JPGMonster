'use client';

export function UseCasesSection() {
  const useCases = [
    {
      icon: '🚀',
      title: 'Faster Website Load Speeds',
      description: 'Compressing JPGs for faster website load speeds',
      gradient: 'from-blue-400 to-blue-600'
    },
    {
      icon: '📝',
      title: 'Blog Image Optimization',
      description: 'Optimizing blog images for SEO',
      gradient: 'from-green-400 to-green-600'
    },
    {
      icon: '🛒',
      title: 'E-commerce Product Shots',
      description: 'Shrinking product shots on Shopify or WooCommerce',
      gradient: 'from-purple-400 to-purple-600'
    },
    {
      icon: '💯',
      title: 'PageSpeed Score',
      description: 'Getting that green PageSpeed score',
      gradient: 'from-yellow-400 to-orange-500'
    },
    {
      icon: '👔',
      title: 'Show Your Boss',
      description: 'Showing your boss you "optimized assets" even if you skipped the meeting',
      gradient: 'from-pink-400 to-red-500'
    },
    {
      icon: '📱',
      title: 'Mobile Performance',
      description: 'Optimizing images for mobile apps and responsive designs',
      gradient: 'from-teal-400 to-cyan-600'
    }
  ];

  return (
    <section className="py-20 px-4 bg-white">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-5xl font-heading font-semibold text-gray-900 mb-6">
            Use{' '}
            <span className="monster-gradient-text">JPG</span>Monster{' '}
            For:
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Whether you&apos;re a developer, designer, blogger, or just someone who cares about web performance
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {useCases.map((useCase, index) => (
            <div
              key={useCase.title}
              className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 animate-in fade-in duration-700"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${useCase.gradient} opacity-90`}></div>
              <div className="relative p-8 text-center text-white z-10">
                <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                  {useCase.icon}
                </div>
                <h3 className="text-xl font-heading font-medium mb-3 drop-shadow">
                  {useCase.title}
                </h3>
                <p className="text-white/90 leading-relaxed drop-shadow">
                  {useCase.description}
                </p>
              </div>
              <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="inline-block p-6 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl text-white shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 cursor-pointer"
          >
            <h3 className="text-xl font-heading font-medium mb-2">Ready to optimize?</h3>
            <p className="text-white/90">Scroll back up and feed the monster your chunky JPGs!</p>
          </button>
        </div>
      </div>
    </section>
  );
}