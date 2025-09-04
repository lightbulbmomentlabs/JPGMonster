export function FeaturesSection() {
  const features = [
    {
      icon: '⚡',
      title: 'Instant Processing',
      description: 'Client-side compression means no waiting for uploads or downloads',
      gradient: 'from-yellow-400 to-orange-500'
    },
    {
      icon: '🔒',
      title: 'Privacy First', 
      description: 'Your images never leave your device - everything happens locally',
      gradient: 'from-green-400 to-blue-500'
    },
    {
      icon: '🎯',
      title: 'Perfect Quality',
      description: 'Advanced algorithms maintain visual quality while reducing file size',
      gradient: 'from-purple-400 to-pink-500'
    }
  ];

  return (
    <section className="py-16 px-4 bg-white">
      <div className="container mx-auto max-w-4xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div key={feature.title} className={`
              text-center p-6 h-full rounded-xl bg-gradient-to-br ${feature.gradient} 
              shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 transform-gpu
              animate-in fade-in duration-700 delay-${(index + 1) * 150}
            `}>
              <div className="text-4xl mb-4 filter drop-shadow-lg animate-bounce">
                {feature.icon}
              </div>
              <h3 className="font-bold text-white mb-3 text-lg drop-shadow">
                {feature.title}
              </h3>
              <p className="text-white/90 text-sm leading-relaxed drop-shadow">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}