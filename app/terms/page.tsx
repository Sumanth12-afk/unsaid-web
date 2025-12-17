import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="fade-in">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Terms of Service</h1>
            
            <p className="text-secondary mb-8">
              Last updated: {new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>

            <div className="prose prose-invert max-w-none">
              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Agreement to Terms</h2>
                <p className="text-secondary leading-relaxed">
                  By accessing or using UNSAID, you agree to be bound by these Terms of Service. 
                  If you disagree with any part of these terms, you may not access the platform.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Use License</h2>
                <p className="text-secondary leading-relaxed mb-4">
                  Permission is granted to temporarily access UNSAID for personal, non-commercial use. 
                  This is the grant of a license, not a transfer of title, and under this license you may not:
                </p>
                <ul className="list-disc list-inside space-y-2 text-secondary">
                  <li>Modify or copy the materials</li>
                  <li>Use the materials for any commercial purpose or public display</li>
                  <li>Attempt to decompile or reverse engineer any software</li>
                  <li>Remove any copyright or proprietary notations</li>
                  <li>Transfer the materials to another person or server</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">User Content & Conduct</h2>
                
                <h3 className="text-xl font-semibold mb-3 mt-6">Posting Rules</h3>
                <p className="text-secondary leading-relaxed mb-4">
                  By posting on UNSAID, you agree to:
                </p>
                <ul className="list-disc list-inside space-y-2 text-secondary">
                  <li>Share honest, authentic workplace experiences</li>
                  <li>Follow our <a href="/rules" className="text-accent hover:text-accent-hover underline">Posting Rules</a></li>
                  <li>Not post defamatory, harassing, or illegal content</li>
                  <li>Not share confidential or proprietary information</li>
                  <li>Not impersonate others or post fake experiences</li>
                </ul>

                <h3 className="text-xl font-semibold mb-3 mt-6">Content Ownership</h3>
                <p className="text-secondary leading-relaxed">
                  You retain ownership of content you post. By posting, you grant UNSAID a worldwide, 
                  non-exclusive, royalty-free license to use, display, and distribute your content 
                  on the platform.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Prohibited Activities</h2>
                <p className="text-secondary leading-relaxed mb-4">
                  You may not:
                </p>
                <ul className="list-disc list-inside space-y-2 text-secondary">
                  <li>Violate any applicable laws or regulations</li>
                  <li>Post false, misleading, or defamatory content</li>
                  <li>Harass, abuse, or harm other users or companies</li>
                  <li>Spam, phish, or distribute malware</li>
                  <li>Attempt to bypass security measures</li>
                  <li>Scrape or automated access without permission</li>
                  <li>Use the platform for commercial solicitation</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Content Moderation</h2>
                <p className="text-secondary leading-relaxed">
                  We reserve the right to:
                </p>
                <ul className="list-disc list-inside space-y-2 text-secondary mt-4">
                  <li>Review, edit, or remove any content at our discretion</li>
                  <li>Suspend or terminate accounts that violate these terms</li>
                  <li>Report illegal activity to authorities</li>
                  <li>Cooperate with legal requests and investigations</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Disclaimer</h2>
                <div className="card bg-warning/5 border border-warning/20">
                  <p className="text-secondary leading-relaxed">
                    UNSAID is provided "as is" without warranties of any kind. We do not guarantee 
                    the accuracy, completeness, or reliability of user-generated content. Views 
                    expressed by users do not represent the views of UNSAID.
                  </p>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Limitation of Liability</h2>
                <p className="text-secondary leading-relaxed">
                  In no event shall UNSAID or its suppliers be liable for any damages (including, 
                  without limitation, damages for loss of data or profit, or due to business interruption) 
                  arising out of the use or inability to use UNSAID, even if we have been notified 
                  of the possibility of such damage.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Indemnification</h2>
                <p className="text-secondary leading-relaxed">
                  You agree to indemnify and hold harmless UNSAID from any claims, damages, losses, 
                  liabilities, and expenses (including legal fees) arising from your use of the 
                  platform or violation of these terms.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Account Termination</h2>
                <p className="text-secondary leading-relaxed mb-4">
                  We may terminate or suspend your account immediately, without prior notice or 
                  liability, for any reason, including:
                </p>
                <ul className="list-disc list-inside space-y-2 text-secondary">
                  <li>Breach of these Terms of Service</li>
                  <li>Violation of Posting Rules</li>
                  <li>Fraudulent or abusive behavior</li>
                  <li>Legal or regulatory requirements</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Governing Law</h2>
                <p className="text-secondary leading-relaxed">
                  These terms shall be governed by and construed in accordance with the laws of India, 
                  without regard to its conflict of law provisions.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Changes to Terms</h2>
                <p className="text-secondary leading-relaxed">
                  We reserve the right to modify or replace these terms at any time. Material changes 
                  will be notified by updating the "Last updated" date. Your continued use of UNSAID 
                  after changes constitutes acceptance of the new terms.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
                <p className="text-secondary leading-relaxed">
                  If you have any questions about these Terms, please contact us through our{' '}
                  <a href="/contact" className="text-accent hover:text-accent-hover underline">
                    Contact page
                  </a>.
                </p>
              </section>

              <section className="card bg-accent/5 border border-accent/20">
                <p className="text-secondary text-sm">
                  By using UNSAID, you acknowledge that you have read, understood, and agree to 
                  be bound by these Terms of Service and our Privacy Policy.
                </p>
              </section>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

