import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Shield, Eye, Lock, AlertTriangle, CheckCircle2 } from 'lucide-react';

export default function SafetyPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="fade-in">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Safety & Moderation</h1>
            
            <p className="text-xl text-secondary mb-12 leading-relaxed">
              Your safety and anonymity are our top priorities. Here's how we protect you.
            </p>

            {/* Anonymity Protection */}
            <section className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
                  <Lock className="w-6 h-6 text-accent" />
                </div>
                <h2 className="text-2xl font-semibold">Complete Anonymity</h2>
              </div>

              <div className="space-y-4">
                <div className="card">
                  <h3 className="font-semibold mb-2">No Public Identity</h3>
                  <p className="text-secondary text-sm leading-relaxed">
                    Your name, email, profile photo, and any identifying information are NEVER 
                    shown publicly. Even if you log in with Google, your identity stays completely private.
                  </p>
                </div>

                <div className="card">
                  <h3 className="font-semibold mb-2">No User Profiles</h3>
                  <p className="text-secondary text-sm leading-relaxed">
                    There are no public user profiles or post history. Nobody can connect posts 
                    to a specific person.
                  </p>
                </div>

                <div className="card">
                  <h3 className="font-semibold mb-2">No Activity Tracking</h3>
                  <p className="text-secondary text-sm leading-relaxed">
                    We don't track what companies you view or what posts you read. Your browsing 
                    is completely private.
                  </p>
                </div>
              </div>
            </section>

            {/* Content Moderation */}
            <section className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
                  <Shield className="w-6 h-6 text-accent" />
                </div>
                <h2 className="text-2xl font-semibold">Content Moderation</h2>
              </div>

              <div className="space-y-4">
                <div className="card">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-positive flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-semibold mb-1">Automatic Filtering</h3>
                      <p className="text-secondary text-sm leading-relaxed">
                        All posts are automatically checked for profanity, personal names, 
                        and confidential information before publishing.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="card">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-positive flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-semibold mb-1">Delayed Publishing</h3>
                      <p className="text-secondary text-sm leading-relaxed">
                        Posts are delayed by 3 minutes before going live. This adds a layer 
                        of protection and makes it harder to track when someone posted.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="card">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-positive flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-semibold mb-1">Community Reports</h3>
                      <p className="text-secondary text-sm leading-relaxed">
                        Users can report inappropriate posts. After multiple reports, 
                        posts are automatically hidden pending review.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="card">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-positive flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-semibold mb-1">Manual Review</h3>
                      <p className="text-secondary text-sm leading-relaxed">
                        Flagged content is reviewed by moderators. We remove posts that 
                        violate our rules or pose safety risks.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Validation System */}
            <section className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
                  <Eye className="w-6 h-6 text-accent" />
                </div>
                <h2 className="text-2xl font-semibold">Trust & Validation</h2>
              </div>

              <div className="card">
                <p className="text-secondary mb-4 leading-relaxed">
                  Instead of likes, UNSAID uses a validation system to surface authentic experiences:
                </p>

                <div className="space-y-3">
                  <div className="flex items-start gap-2">
                    <span className="text-accent">•</span>
                    <p className="text-secondary text-sm">
                      <strong className="text-primary">Validation votes:</strong> "Matches my experience" 
                      or "Doesn't match" help identify real patterns
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-accent">•</span>
                    <p className="text-secondary text-sm">
                      <strong className="text-primary">Topic reactions:</strong> Mark if something is 
                      a "Common issue," "Recent," "Still happening," or "Management-driven"
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-accent">•</span>
                    <p className="text-secondary text-sm">
                      <strong className="text-primary">Visibility scoring:</strong> Posts with more 
                      validation rise to the top; fake posts sink
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* For Companies */}
            <section className="card bg-warning/5 border border-warning/20">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-6 h-6 text-warning flex-shrink-0 mt-1" />
                <div>
                  <h2 className="text-xl font-semibold mb-3">For Companies & Legal Teams</h2>
                  <p className="text-secondary text-sm leading-relaxed mb-4">
                    We understand companies may have concerns about content on UNSAID. Here's what you need to know:
                  </p>
                  <ul className="space-y-2 text-secondary text-sm">
                    <li>• All content follows our posting rules and content guidelines</li>
                    <li>• We actively moderate and remove rule-violating posts</li>
                    <li>• Posts must focus on patterns and behaviors, not personal attacks</li>
                    <li>• We don't allow defamation, harassment, or confidential information</li>
                    <li>• For takedown requests, see our Contact page</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Data Privacy */}
            <section className="mt-12">
              <h2 className="text-2xl font-semibold mb-4">Data Privacy</h2>
              
              <div className="card">
                <p className="text-secondary leading-relaxed mb-4">
                  UNSAID is built privacy-first:
                </p>
                <ul className="space-y-2 text-secondary">
                  <li>• We store minimal user data (only for logged-in users)</li>
                  <li>• Email addresses are hashed for duplicate prevention</li>
                  <li>• We don't sell or share your data</li>
                  <li>• We don't show ads or use tracking pixels</li>
                  <li>• See our full Privacy Policy for details</li>
                </ul>
              </div>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

