import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Shield, Eye, Lock, Users } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="fade-in">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About UNSAID</h1>
            
            <p className="text-xl text-secondary mb-12 leading-relaxed">
              UNSAID is a trust-first platform for anonymous workplace opinions in India.
              We help you understand real company culture before joining.
            </p>

            {/* Mission */}
            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
              <p className="text-secondary leading-relaxed mb-4">
                Workplace culture matters. But too often, the truth about what it's really like
                to work at a company stays hidden—because employees fear retaliation for speaking up.
              </p>
              <p className="text-secondary leading-relaxed mb-4">
                UNSAID creates a safe, anonymous space where employees can share honest experiences
                about managers, work-life balance, compensation, layoffs, and HR practices.
              </p>
              <p className="text-secondary leading-relaxed">
                We're not building a social network. We're building a pattern-discovery platform
                that surfaces real insights to help you make informed career decisions.
              </p>
            </section>

            {/* Core Values */}
            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-6">Our Core Values</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="card">
                  <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                    <Shield className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Anonymity First</h3>
                  <p className="text-secondary text-sm leading-relaxed">
                    Your identity is never exposed publicly. We prioritize safety over engagement metrics.
                  </p>
                </div>

                <div className="card">
                  <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                    <Eye className="w-6 h-6 text-accent" />
                  </div>
                <h3 className="text-lg font-semibold mb-2">Patterns Over Drama</h3>
                <p className="text-secondary text-sm leading-relaxed">
                  We surface validated patterns, not viral complaints. Validation &gt; likes.
                </p>
                </div>

                <div className="card">
                  <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                    <Lock className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Trust & Safety</h3>
                  <p className="text-secondary text-sm leading-relaxed">
                    Content moderation, delayed publishing, and validation systems ensure authenticity.
                  </p>
                </div>

                <div className="card">
                  <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                    <Users className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Community Driven</h3>
                  <p className="text-secondary text-sm leading-relaxed">
                    The community validates experiences. Real insights rise to the top.
                  </p>
                </div>
              </div>
            </section>

            {/* How It Works */}
            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-4">How UNSAID Works</h2>
              
              <div className="space-y-6">
                <div className="card">
                  <h3 className="font-semibold mb-2">1. No Login Required to Browse</h3>
                  <p className="text-secondary text-sm leading-relaxed">
                    Search for any company and read anonymous workplace opinions. No account needed.
                  </p>
                </div>

                <div className="card">
                  <h3 className="font-semibold mb-2">2. Optional Private Login</h3>
                  <p className="text-secondary text-sm leading-relaxed">
                    Login with Google (optional) to increase your post's trust score. Your identity
                    stays completely private—we never show your name, email, or photo publicly.
                  </p>
                </div>

                <div className="card">
                  <h3 className="font-semibold mb-2">3. Multi-Step Post Creation</h3>
                  <p className="text-secondary text-sm leading-relaxed">
                    Guided flow helps you share structured feedback: category, context, sentiment,
                    and your experience. Posts are delayed by 3 minutes for safety.
                  </p>
                </div>

                <div className="card">
                  <h3 className="font-semibold mb-2">4. Validation, Not Likes</h3>
                  <p className="text-secondary text-sm leading-relaxed">
                    Instead of likes, users validate: "Matches my experience" or "Doesn't match."
                    Plus topic reactions like "Common issue" and "Still happening."
                  </p>
                </div>

                <div className="card">
                  <h3 className="font-semibold mb-2">5. Pattern Discovery</h3>
                  <p className="text-secondary text-sm leading-relaxed">
                    Aggregated insights show you sentiment distribution, top discussed topics,
                    and recent activity—helping you see real patterns.
                  </p>
                </div>
              </div>
            </section>

            {/* What We Don't Do */}
            <section className="card bg-accent/5 border border-accent/20">
              <h2 className="text-2xl font-semibold mb-4">What We Don't Do</h2>
              <ul className="space-y-3 text-secondary">
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-1">•</span>
                  <span>We don't expose user identities publicly, ever.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-1">•</span>
                  <span>We don't allow comments or threads (reduces toxicity).</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-1">•</span>
                  <span>We don't create company rankings or "worst companies" lists.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-1">•</span>
                  <span>We don't optimize for virality or engagement metrics.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-1">•</span>
                  <span>We don't sell your data or show ads.</span>
                </li>
              </ul>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

