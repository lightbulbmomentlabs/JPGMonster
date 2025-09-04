import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center space-y-6">
          <Link href="/" className="flex items-center justify-center space-x-2">
            <img 
              src="/jpg-monster-icon.jpg"
              alt="JPG Monster Logo"
              className="h-8 w-8 object-contain rounded-lg"
            />
            <span className="font-bold text-xl font-heading">
              <span className="monster-gradient-text">JPG</span>Monster
            </span>
          </Link>
          
          <p className="text-gray-400 text-sm max-w-md mx-auto">
            Optimize your JPGs for your website in a fast, fun, and free way.
          </p>
          
          <p className="text-gray-400 text-sm">
            © 2024 JPGMonster. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}