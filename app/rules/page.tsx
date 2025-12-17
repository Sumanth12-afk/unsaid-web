import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { CheckCircle2, XCircle } from 'lucide-react';

export default function RulesPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="fade-in">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Posting Rules</h1>
            
            <p className="text-xl text-secondary mb-12 leading-relaxed">
              UNSAID is built on trust. Follow these rules to keep the platform safe and helpful.
            </p>

            {/* Content Guidelines */}
            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-6">Content Guidelines</h2>

              <div className="space-y-6">
                <div className="card border-2 border-positive/20">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-positive flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-positive mb-2">✓ Do This</h3>
                      <ul className="space-y-2 text-secondary">
                        <li>• Share honest, real experiences from your workplace</li>
                        <li>• Focus on behaviors, patterns, and culture</li>
                        <li>• Be specific about what happened and when</li>
                        <li>• Mention your role/team for context (optional)</li>
                        <li>• Use constructive language</li>
                        <li>• Validate others' posts if they match your experience</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="card border-2 border-negative/20">
                  <div className="flex items-start gap-3">
                    <XCircle className="w-6 h-6 text-negative flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-negative mb-2">✗ Don't Do This</h3>
                      <ul className="space-y-2 text-secondary">
                        <li>• Don't mention names of people (managers, colleagues, HR)</li>
                        <li>• Don't share confidential company information</li>
                        <li>• Don't make personal attacks or use abusive language</li>
                        <li>• Don't post fake or made-up experiences</li>
                        <li>• Don't share contact details or identifying information</li>
                        <li>• Don't spam or promote products/services</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Technical Limits */}
            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-4">Technical Requirements</h2>
              
              <div className="card">
                <ul className="space-y-3 text-secondary">
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-1">•</span>
                    <span>Minimum 150 characters, maximum 1,500 characters per post</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-1">•</span>
                    <span>Posts are automatically checked for profanity</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-1">•</span>
                    <span>Posts with potential names are flagged for review</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-1">•</span>
                    <span>Publishing is delayed by 3 minutes for safety</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-1">•</span>
                    <span>Multiple reports will auto-hide a post pending review</span>
                  </li>
                </ul>
              </div>
            </section>

            {/* Examples */}
            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-4">Examples</h2>

              <div className="space-y-6">
                <div className="card bg-positive/5 border border-positive/20">
                  <h3 className="font-semibold text-positive mb-2">✓ Good Post Example</h3>
                  <p className="text-secondary text-sm italic">
                    "Management expects us to be available on Slack 24/7. I've received messages at 
                    11 PM asking for updates on non-urgent tasks. When I didn't respond immediately, 
                    my manager brought it up in my review. This has been consistent over the past year 
                    in the engineering team."
                  </p>
                </div>

                <div className="card bg-negative/5 border border-negative/20">
                  <h3 className="font-semibold text-negative mb-2">✗ Bad Post Example</h3>
                  <p className="text-secondary text-sm italic line-through">
                    "My manager Rajesh Kumar is the worst. He's incompetent and everyone hates him. 
                    HR does nothing. This company is going to fail."
                  </p>
                  <p className="text-sm text-negative mt-2">
                    ❌ Contains personal name, makes personal attacks, lacks specifics
                  </p>
                </div>
              </div>
            </section>

            {/* Consequences */}
            <section className="card bg-warning/5 border border-warning/20">
              <h2 className="text-2xl font-semibold mb-4">Consequences of Rule Violations</h2>
              <p className="text-secondary mb-4">
                We take content moderation seriously. Violations may result in:
              </p>
              <ul className="space-y-2 text-secondary">
                <li>• Post removal or hiding</li>
                <li>• Account trust score reduction</li>
                <li>• Temporary or permanent account suspension</li>
                <li>• Legal action for severe violations (defamation, threats, etc.)</li>
              </ul>
            </section>

            {/* Report */}
            <section className="mt-12 text-center">
              <p className="text-secondary mb-4">
                See a post that violates these rules?
              </p>
              <p className="text-sm text-secondary">
                Use the report button (🚩) on any post to flag it for review.
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

