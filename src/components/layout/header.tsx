'use client';

import Link from 'next/link';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto px-4 flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center space-x-3">
          <img 
            src="https://yxmgdkcvglytfkklfutp.supabase.co/storage/v1/object/public/website-assets/optimized/JPG-Monster-Icon-Sml.jpg"
            alt="JPG Monster Logo"
            className="h-8 w-8 object-contain rounded-lg"
          />
          <span className="font-bold text-xl text-black font-heading">
            <span className="monster-gradient-text">JPG</span>Monster
          </span>
        </Link>
        
        <nav className="hidden md:flex items-center space-x-6">
          <Link 
            href="/#how-it-works" 
            className="text-sm font-medium text-gray-600 hover:text-monster-primary transition-colors"
          >
            How It Works
          </Link>
          <Link 
            href="/#features" 
            className="text-sm font-medium text-gray-600 hover:text-monster-primary transition-colors"
          >
            Features
          </Link>
          <Link 
            href="/about" 
            className="text-sm font-medium text-gray-600 hover:text-monster-primary transition-colors"
          >
            About
          </Link>
        </nav>
      </div>
    </header>
  );
}