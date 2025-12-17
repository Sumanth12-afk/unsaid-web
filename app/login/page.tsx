'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '@/lib/firebase';
import { useAuth } from '@/contexts/AuthContext';
import { LogIn, Shield, Lock, Eye } from 'lucide-react';
import Header from '@/components/Header';

export default function LoginPage() {
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    // Redirect if already logged in
    if (user) {
      const returnUrl = new URLSearchParams(window.location.search).get('returnUrl') || '/';
      router.push(returnUrl);
    }
  }, [user, router]);

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      // User will be redirected by useEffect after login
    } catch (error) {
      console.error('Login error:', error);
      alert('Failed to login. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-secondary">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="max-w-md w-full">
          <div className="card text-center fade-in">
            {/* Icon */}
            <div className="w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-6">
              <Shield className="w-10 h-10 text-accent" />
            </div>

            {/* Heading */}
            <h1 className="text-3xl font-bold mb-3">Login Required</h1>
            <p className="text-secondary text-lg mb-8">
              To prevent spam and maintain quality, you need to login before posting.
            </p>

            {/* Privacy Assurance */}
            <div className="bg-accent/5 border border-accent/20 rounded-lg p-4 mb-8 text-left">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <Lock className="w-5 h-5 text-accent" />
                Your Privacy is Protected
              </h3>
              <ul className="space-y-2 text-sm text-secondary">
                <li className="flex items-start gap-2">
                  <Eye className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                  <span>Your name, email, and photo are <strong className="text-primary">never shown publicly</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <Eye className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                  <span>Posts remain <strong className="text-primary">completely anonymous</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <Eye className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                  <span>Login is <strong className="text-primary">only for spam prevention</strong></span>
                </li>
              </ul>
            </div>

            {/* Login Button */}
            <button
              onClick={handleGoogleLogin}
              className="btn-primary w-full flex items-center justify-center gap-3 text-lg py-4"
            >
              <LogIn className="w-6 h-6" />
              Continue with Google
            </button>

            <p className="text-xs text-secondary mt-4">
              By logging in, you agree to our Terms of Service and Privacy Policy
            </p>
          </div>

          {/* Additional Info */}
          <div className="mt-6 text-center">
            <p className="text-sm text-secondary">
              Don't want to post? You can still{' '}
              <a href="/search" className="text-accent hover:text-accent-hover underline">
                browse companies
              </a>
              {' '}without logging in.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

