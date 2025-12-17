import Link from 'next/link';
import { CheckCircle2, Home, Search } from 'lucide-react';
import Header from '@/components/Header';

export default function PostSuccessPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center fade-in">
          <div className="w-20 h-20 rounded-full bg-positive/10 flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 text-positive" />
          </div>

          <h1 className="text-3xl font-bold mb-4">Post Submitted!</h1>
          
          <p className="text-secondary text-lg mb-2">
            Your anonymous post will be published shortly.
          </p>
          
          <p className="text-secondary mb-8">
            We delay publishing by a few minutes to ensure your safety and anonymity.
          </p>

          <div className="card bg-accent/5 border border-accent/20 mb-8 text-left">
            <p className="text-sm text-secondary">
              <strong className="text-primary">What happens next?</strong>
              <br />
              <br />
              Your post goes through automatic checks for profanity and personal information.
              It will be visible on the company page in approximately 3 minutes.
              Other users can validate your experience, helping surface real patterns.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/" className="btn-secondary flex items-center justify-center gap-2 flex-1">
              <Home className="w-5 h-5" />
              Go Home
            </Link>
            <Link href="/search" className="btn-primary flex items-center justify-center gap-2 flex-1">
              <Search className="w-5 h-5" />
              Search Companies
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

