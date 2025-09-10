export function AboutSection() {
  return (
    <section id="about" className="py-20 px-4 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-5xl font-heading font-semibold text-gray-900 mb-6">
            About <span className="monster-gradient-text">JPG</span>Monster
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            The simple, powerful JPG compression tool built for everyone
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
          <div className="prose prose-lg max-w-none">
            <h3 className="text-2xl font-heading font-semibold text-gray-900 mb-6">
              Why JPGMonster Exists
            </h3>
            <p className="text-gray-600 mb-6">
              We built JPGMonster because compressing images shouldn&apos;t be complicated, expensive, or require a PhD in image processing. Whether you&apos;re a blogger trying to speed up your site, a developer optimizing assets, or someone who just needs smaller files, JPGMonster gets the job done fast.
            </p>

            <h3 className="text-2xl font-heading font-semibold text-gray-900 mb-6">
              What Makes Us Different
            </h3>
            <ul className="list-disc list-inside text-gray-600 mb-6 space-y-2">
              <li>Powered by MozJPEG - the same technology used by major websites</li>
              <li>No account required, no watermarks, no nonsense</li>
              <li>Process multiple images at once with batch downloads</li>
              <li>Your images never leave your browser - everything happens client-side</li>
              <li>Free to use, always</li>
            </ul>

            <h3 className="text-2xl font-heading font-semibold text-gray-900 mb-6">
              Our Mission
            </h3>
            <p className="text-gray-600">
              To make high-quality image compression accessible to everyone. No complex software, no subscriptions, no limits. Just upload, compress, and download. That&apos;s the JPGMonster way.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}