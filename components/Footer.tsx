import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-secondary/10 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="text-2xl font-bold text-gradient">
              UNSAID
            </Link>
            <p className="mt-4 text-secondary max-w-md">
              A private space for anonymous workplace opinions.
              <br />
              No email shown. No public identity. No HR access.
            </p>
          </div>

          {/* About */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-secondary mb-4">
              About
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-secondary hover:text-primary transition-colors">
                  How UNSAID works
                </Link>
              </li>
              <li>
                <Link href="/rules" className="text-secondary hover:text-primary transition-colors">
                  Posting Rules
                </Link>
              </li>
              <li>
                <Link href="/safety" className="text-secondary hover:text-primary transition-colors">
                  Safety & Moderation
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-secondary mb-4">
              Legal
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy" className="text-secondary hover:text-primary transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-secondary hover:text-primary transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-secondary hover:text-primary transition-colors">
                  Contact / Takedown
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-secondary/10">
          <p className="text-secondary text-sm text-center">
            © {new Date().getFullYear()} UNSAID. Built for transparency and trust.
          </p>
        </div>
      </div>
    </footer>
  );
}

