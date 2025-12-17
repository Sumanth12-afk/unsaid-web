import Link from 'next/link';
import { Search, PenLine, Shield, Lock, Eye } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
            <div className="text-center fade-in">
              {/* Hero Headline */}
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                What employees
                <br />
                <span className="text-gradient">can't say publicly</span>
              </h1>

              {/* Subtext */}
              <p className="text-xl md:text-2xl text-secondary max-w-3xl mx-auto mb-4 leading-relaxed">
                UNSAID is a private space for anonymous workplace opinions.
              </p>
              <p className="text-lg text-secondary max-w-2xl mx-auto mb-12">
                No email shown. No public identity. No HR access.
              </p>

              {/* Primary CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
                <Link href="/search" className="btn-primary flex items-center gap-2 w-full sm:w-auto">
                  <Search className="w-5 h-5" />
                  Search a company
                </Link>
                
                <Link href="/post/new" className="btn-secondary flex items-center gap-2 w-full sm:w-auto">
                  <PenLine className="w-5 h-5" />
                  Post anonymously
                </Link>
              </div>

              {/* Trust Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface border border-secondary/20">
                <Shield className="w-4 h-4 text-accent" />
                <span className="text-sm text-secondary">
                  100% anonymous • Fully private • No tracking
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* How UNSAID Works */}
        <section className="py-20 bg-surface/30">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
              How UNSAID works
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Step 1 */}
              <div className="card text-center fade-in">
                <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-6">
                  <Search className="w-8 h-8 text-accent" />
                </div>
                <h3 className="text-xl font-semibold mb-3">1. Search or Browse</h3>
                <p className="text-secondary leading-relaxed">
                  Find your company or explore workplace opinions. No login required to read.
                </p>
              </div>

              {/* Step 2 */}
              <div className="card text-center fade-in" style={{ animationDelay: '0.1s' }}>
                <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-6">
                  <Eye className="w-8 h-8 text-accent" />
                </div>
                <h3 className="text-xl font-semibold mb-3">2. Read Patterns</h3>
                <p className="text-secondary leading-relaxed">
                  See aggregated insights about culture, not individual drama. Validated by others.
                </p>
              </div>

              {/* Step 3 */}
              <div className="card text-center fade-in" style={{ animationDelay: '0.2s' }}>
                <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-6">
                  <Lock className="w-8 h-8 text-accent" />
                </div>
                <h3 className="text-xl font-semibold mb-3">3. Post Safely</h3>
                <p className="text-secondary leading-relaxed">
                  Share your experience anonymously. Your identity is never exposed, even if you log in.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Safety Note */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="card bg-accent/5 border border-accent/20">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <Shield className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-3">Your safety is our priority</h3>
                  <p className="text-secondary leading-relaxed mb-4">
                    UNSAID is built for trust and transparency. We use validation systems to surface
                    real patterns, not fake posts. All content is moderated. Personal names and
                    confidential information are filtered.
                  </p>
                  <p className="text-secondary leading-relaxed">
                    Optional Google login helps us prevent abuse while keeping your identity completely
                    private. Your email, name, and photo are never shown publicly.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-surface/30">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to discover the truth?
            </h2>
            <p className="text-xl text-secondary mb-8">
              Start by searching for a company or share your own experience.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/search" className="btn-primary flex items-center gap-2 w-full sm:w-auto">
                <Search className="w-5 h-5" />
                Search companies
              </Link>
              <Link href="/post/new" className="btn-secondary flex items-center gap-2 w-full sm:w-auto">
                <PenLine className="w-5 h-5" />
                Post your opinion
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

