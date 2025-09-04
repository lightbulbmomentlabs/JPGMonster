export function WhyJPGmonsterSection() {
  const benefits = [
    {
      icon: '⚡',
      title: 'Instant Client-Side Compression',
      description: 'No waiting rooms. No upload queues. JPGmonster handles your image optimization locally so your files never leave your device.',
      gradient: 'from-yellow-400 to-orange-500'
    },
    {
      icon: '🐱',
      title: 'So Easy Your Cat Could Use It',
      description: 'But please don\'t let your cat near your keyboard. Again.',
      gradient: 'from-pink-400 to-purple-500'
    },
    {
      icon: '🎯',
      title: 'Batch JPG Optimization',
      description: 'One? Fine. Ten? Great. JPGmonster doesn\'t judge. It just chomps.',
      gradient: 'from-blue-400 to-cyan-500'
    },
    {
      icon: '👁️',
      title: 'Real-Time Previews',
      description: 'See how your image will look *before* you commit to crunch mode.',
      gradient: 'from-green-400 to-teal-500'
    },
    {
      icon: '🔒',
      title: 'Privacy Like Fort Knox',
      description: 'Files are processed in-browser and vanish like socks in a dryer. We store nothing.',
      gradient: 'from-indigo-400 to-purple-500'
    },
    {
      icon: '🚀',
      title: 'Blazing Fast Performance',
      description: 'Faster than your morning coffee routine. The monster works harder than a caffeinated intern.',
      gradient: 'from-red-400 to-pink-500'
    }
  ];

  return (
    <section className="py-20 px-4 bg-white">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-5xl font-heading font-semibold text-gray-900 mb-6">
            Why JPGmonster is the Internet&apos;s Favorite{' '}
            <span className="monster-gradient-text">
              Compression Beast
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Because your images deserve better than bloated file sizes and slow load times
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => (
            <div 
              key={benefit.title}
              className={`
                text-center p-6 h-full rounded-xl bg-gradient-to-br ${benefit.gradient} 
                shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 transform-gpu
                animate-in fade-in duration-700
              `}
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="text-4xl mb-4 filter drop-shadow-lg">
                {benefit.icon}
              </div>
              <h3 className="font-heading font-medium text-white mb-3 text-lg drop-shadow">
                {benefit.title}
              </h3>
              <p className="text-white/90 text-sm leading-relaxed drop-shadow">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}