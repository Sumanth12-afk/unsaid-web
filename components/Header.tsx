'use client';

import Link from 'next/link';
import { Search, PenLine, FileText, TrendingUp, Scale } from 'lucide-react';
import AuthButton from './AuthButton';
import { useAuth } from '@/contexts/AuthContext';

export default function Header() {
  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-secondary/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <span className="text-3xl md:text-4xl font-bold text-gradient tracking-tight">UNSAID</span>
          </Link>

          {/* Navigation */}
          <nav className="flex items-center space-x-1 sm:space-x-2">
            <Link
              href="/search"
              className="flex items-center space-x-1 text-secondary hover:text-primary transition-colors duration-200 px-2 sm:px-3 py-2 rounded-lg hover:bg-surface"
              title="Search Companies"
            >
              <Search className="w-5 h-5" />
              <span className="hidden md:inline">Search</span>
            </Link>

            <Link
              href="/trending"
              className="flex items-center space-x-1 text-secondary hover:text-primary transition-colors duration-200 px-2 sm:px-3 py-2 rounded-lg hover:bg-surface"
              title="Trending Topics"
            >
              <TrendingUp className="w-5 h-5" />
              <span className="hidden md:inline">Trending</span>
            </Link>

            <Link
              href="/compare"
              className="flex items-center space-x-1 text-secondary hover:text-primary transition-colors duration-200 px-2 sm:px-3 py-2 rounded-lg hover:bg-surface"
              title="Compare Companies"
            >
              <Scale className="w-5 h-5" />
              <span className="hidden lg:inline">Compare</span>
            </Link>
            
            {user && (
              <Link
                href="/my-posts"
                className="flex items-center space-x-1 text-secondary hover:text-primary transition-colors duration-200 px-2 sm:px-3 py-2 rounded-lg hover:bg-surface"
                title="My Posts"
              >
                <FileText className="w-5 h-5" />
                <span className="hidden lg:inline">My Posts</span>
              </Link>
            )}
            
            <Link
              href="/post/new"
              className="btn-primary flex items-center space-x-2 ml-1"
            >
              <PenLine className="w-5 h-5" />
              <span className="hidden sm:inline">Post</span>
            </Link>

            <AuthButton />
          </nav>
        </div>
      </div>
    </header>
  );
}

