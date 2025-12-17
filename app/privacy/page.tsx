import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="fade-in">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Privacy Policy</h1>
            
            <p className="text-secondary mb-8">
              Last updated: {new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>

            <div className="prose prose-invert max-w-none">
              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
                <p className="text-secondary leading-relaxed">
                  UNSAID ("we," "us," or "our") is committed to protecting your privacy. 
                  This Privacy Policy explains how we collect, use, disclose, and safeguard 
                  your information when you use our platform.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Information We Collect</h2>
                
                <h3 className="text-xl font-semibold mb-3 mt-6">For Anonymous Users</h3>
                <ul className="list-disc list-inside space-y-2 text-secondary">
                  <li>Device fingerprint (for duplicate vote prevention)</li>
                  <li>Browser type and version</li>
                  <li>Page views and interactions (anonymized)</li>
                </ul>

                <h3 className="text-xl font-semibold mb-3 mt-6">For Logged-In Users (Optional)</h3>
                <ul className="list-disc list-inside space-y-2 text-secondary">
                  <li>Email address (hashed for privacy)</li>
                  <li>Firebase User ID (internal use only)</li>
                  <li>Authentication timestamps</li>
                  <li>Trust score (calculated internally)</li>
                </ul>

                <p className="text-secondary mt-4 leading-relaxed">
                  <strong className="text-primary">We NEVER collect or display publicly:</strong> 
                  Your name, profile photo, email address, or any identifying information.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">How We Use Your Information</h2>
                <ul className="list-disc list-inside space-y-2 text-secondary">
                  <li>To provide and maintain the UNSAID platform</li>
                  <li>To prevent abuse and ensure content authenticity</li>
                  <li>To calculate trust scores for post visibility</li>
                  <li>To moderate content and enforce our rules</li>
                  <li>To improve our services and user experience</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Anonymity Guarantee</h2>
                <div className="card bg-accent/5 border border-accent/20">
                  <p className="text-secondary leading-relaxed">
                    <strong className="text-primary">Your posts are completely anonymous.</strong> 
                    Even if you log in, we never link your public posts to your identity. 
                    Your Firebase UID is stored internally for abuse prevention, but it is 
                    NEVER exposed in any public API or interface.
                  </p>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Data Sharing</h2>
                <p className="text-secondary leading-relaxed mb-4">
                  We do NOT sell, trade, or share your personal information with third parties, except:
                </p>
                <ul className="list-disc list-inside space-y-2 text-secondary">
                  <li>When required by law or legal process</li>
                  <li>To protect our rights, safety, or property</li>
                  <li>With service providers bound by confidentiality (e.g., hosting, analytics)</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Cookies & Tracking</h2>
                <p className="text-secondary leading-relaxed">
                  We use minimal cookies for essential functionality only (authentication, preferences). 
                  We do NOT use tracking pixels, ad networks, or third-party analytics that compromise privacy.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Data Security</h2>
                <p className="text-secondary leading-relaxed">
                  We implement industry-standard security measures to protect your data, including 
                  encryption, secure servers, and regular security audits. However, no method of 
                  transmission over the Internet is 100% secure.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Your Rights</h2>
                <p className="text-secondary leading-relaxed mb-4">
                  You have the right to:
                </p>
                <ul className="list-disc list-inside space-y-2 text-secondary">
                  <li>Access your personal data</li>
                  <li>Request deletion of your account</li>
                  <li>Opt out of optional features (like login)</li>
                  <li>Object to data processing</li>
                  <li>Request data portability</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Children's Privacy</h2>
                <p className="text-secondary leading-relaxed">
                  UNSAID is not intended for users under 18 years of age. We do not knowingly 
                  collect personal information from children.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Changes to This Policy</h2>
                <p className="text-secondary leading-relaxed">
                  We may update this Privacy Policy from time to time. We will notify users of 
                  material changes by updating the "Last updated" date and posting a notice on our platform.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
                <p className="text-secondary leading-relaxed">
                  If you have questions about this Privacy Policy, please contact us through 
                  our <a href="/contact" className="text-accent hover:text-accent-hover underline">Contact page</a>.
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

