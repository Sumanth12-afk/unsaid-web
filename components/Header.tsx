'use client';

import Link from 'next/link';
import { Search, PenLine } from 'lucide-react';
import AuthButton from './AuthButton';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-secondary/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <span className="text-3xl md:text-4xl font-bold text-gradient tracking-tight">UNSAID</span>
          </Link>

          {/* Navigation */}
          <nav className="flex items-center space-x-4">
            <Link
              href="/search"
              className="flex items-center space-x-2 text-secondary hover:text-primary transition-colors duration-200 px-4 py-2 rounded-lg hover:bg-surface"
            >
              <Search className="w-5 h-5" />
              <span className="hidden sm:inline">Search</span>
            </Link>
            
            <Link
              href="/post/new"
              className="btn-primary flex items-center space-x-2"
            >
              <PenLine className="w-5 h-5" />
              <span>Post</span>
            </Link>

            <AuthButton />
          </nav>
        </div>
      </div>
    </header>
  );
}

