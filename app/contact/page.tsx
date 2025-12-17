import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Mail, AlertTriangle, Shield } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="fade-in">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Contact & Takedown Requests</h1>
            
            <p className="text-xl text-secondary mb-12 leading-relaxed">
              Have a question or concern? Here's how to reach us.
            </p>

            {/* General Contact */}
            <section className="mb-12">
              <div className="card">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-accent" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-xl font-semibold mb-2">General Inquiries</h2>
                    <p className="text-secondary mb-4">
                      For general questions, feedback, or partnership inquiries:
                    </p>
                    <p className="text-accent font-medium">
                      [Add your contact email here]
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Takedown Requests */}
            <section className="mb-12">
              <div className="card bg-warning/5 border border-warning/20">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-warning/10 flex items-center justify-center flex-shrink-0">
                    <AlertTriangle className="w-6 h-6 text-warning" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-xl font-semibold mb-2">Content Takedown Requests</h2>
                    <p className="text-secondary mb-4">
                      If you believe content on UNSAID violates our rules or your legal rights:
                    </p>
                    
                    <div className="space-y-3 text-secondary text-sm mb-4">
                      <p><strong className="text-primary">What to include:</strong></p>
                      <ul className="list-disc list-inside space-y-1 ml-2">
                        <li>Direct link to the specific post or company page</li>
                        <li>Detailed explanation of why it should be removed</li>
                        <li>Your relationship to the content (if applicable)</li>
                        <li>Supporting evidence (optional but helpful)</li>
                      </ul>
                    </div>

                    <p className="text-accent font-medium">
                      [Add your legal/takedown email here]
                    </p>

                    <p className="text-secondary text-sm mt-4">
                      We review all takedown requests within 48-72 hours. We take action when 
                      content violates our rules, but we also protect free speech and anonymous 
                      workplace opinions.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Reporting Posts */}
            <section className="mb-12">
              <div className="card">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <Shield className="w-6 h-6 text-accent" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-xl font-semibold mb-2">Report Individual Posts</h2>
                    <p className="text-secondary mb-4">
                      For individual posts that violate our rules, use the built-in report button:
                    </p>
                    <ol className="list-decimal list-inside space-y-2 text-secondary text-sm">
                      <li>Find the post you want to report</li>
                      <li>Click the flag icon (🚩) on the post</li>
                      <li>Select a reason and provide details</li>
                      <li>Submit your report</li>
                    </ol>
                    <p className="text-secondary text-sm mt-4">
                      Reports are reviewed privately. Posts with multiple reports are automatically hidden pending review.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Legal Notice */}
            <section className="card border-2 border-secondary/20">
              <h2 className="text-xl font-semibold mb-4">Legal Notice</h2>
              <p className="text-secondary text-sm leading-relaxed mb-4">
                UNSAID is a platform for anonymous workplace opinions. We are not responsible 
                for user-generated content, but we actively moderate and remove content that 
                violates our rules.
              </p>
              <p className="text-secondary text-sm leading-relaxed">
                For DMCA notices, legal subpoenas, or other formal legal requests, please send 
                written notice to our legal email address above. Include all required legal documentation.
              </p>
            </section>

            {/* Response Time */}
            <section className="mt-12">
              <h2 className="text-2xl font-semibold mb-4">Response Time</h2>
              <div className="card">
                <ul className="space-y-2 text-secondary">
                  <li>• General inquiries: 2-5 business days</li>
                  <li>• Content reports (via platform): 24-48 hours</li>
                  <li>• Takedown requests: 48-72 hours</li>
                  <li>• Legal requests: As required by law</li>
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

