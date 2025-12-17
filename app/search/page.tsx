'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, Plus, Building2 } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface Company {
  id: string;
  name: string;
  slug: string;
  industry?: string | null;
  location?: string | null;
}

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Company[]>([]);
  const [loading, setLoading] = useState(false);
  const [recentCompanies, setRecentCompanies] = useState<Company[]>([]);

  // Load recent companies on mount
  useEffect(() => {
    fetchRecentCompanies();
  }, []);

  const fetchRecentCompanies = async () => {
    try {
      const response = await fetch('/api/companies?limit=10');
      if (response.ok) {
        const data = await response.json();
        setRecentCompanies(data.companies || []);
      }
    } catch (error) {
      console.error('Error fetching recent companies:', error);
    }
  };

  const handleSearch = async (searchQuery: string) => {
    setQuery(searchQuery);

    if (searchQuery.trim().length < 2) {
      setResults([]);
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`/api/companies/search?q=${encodeURIComponent(searchQuery)}`);
      if (response.ok) {
        const data = await response.json();
        setResults(data.companies || []);
      }
    } catch (error) {
      console.error('Error searching companies:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Search Header */}
          <div className="text-center mb-12 fade-in">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Search for a company
            </h1>
            <p className="text-lg text-secondary">
              Find anonymous workplace opinions and culture insights
            </p>
          </div>

          {/* Search Input */}
          <div className="relative mb-8 fade-in">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-secondary" />
              <input
                type="text"
                value={query}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="Search by company name..."
                className="input-field w-full pl-12 pr-4 py-4 text-lg"
                autoFocus
              />
            </div>

            {loading && (
              <div className="absolute right-4 top-1/2 -translate-y-1/2">
                <div className="w-5 h-5 border-2 border-accent border-t-transparent rounded-full animate-spin" />
              </div>
            )}
          </div>

          {/* Search Results */}
          {query.trim().length >= 2 && (
            <div className="mb-8">
              {results.length > 0 ? (
                <div className="space-y-3 fade-in">
                  <p className="text-sm text-secondary mb-4">
                    Found {results.length} {results.length === 1 ? 'company' : 'companies'}
                  </p>
                  {results.map((company) => (
                    <CompanySearchResult key={company.id} company={company} />
                  ))}
                </div>
              ) : (
                <div className="card text-center py-12 fade-in">
                  <Building2 className="w-12 h-12 text-secondary mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No companies found</h3>
                  <p className="text-secondary mb-6">
                    Can't find your company? Add it to UNSAID.
                  </p>
                  <Link
                    href={`/company/add?name=${encodeURIComponent(query)}`}
                    className="btn-primary inline-flex items-center gap-2"
                  >
                    <Plus className="w-5 h-5" />
                    Add "{query}"
                  </Link>
                </div>
              )}
            </div>
          )}

          {/* Recent/Popular Companies */}
          {query.trim().length === 0 && recentCompanies.length > 0 && (
            <div className="fade-in">
              <h2 className="text-xl font-semibold mb-4">Recent companies</h2>
              <div className="space-y-3">
                {recentCompanies.map((company) => (
                  <CompanySearchResult key={company.id} company={company} />
                ))}
              </div>
            </div>
          )}

          {/* Empty State */}
          {query.trim().length === 0 && recentCompanies.length === 0 && (
            <div className="card text-center py-12 fade-in">
              <Search className="w-12 h-12 text-secondary mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Start searching</h3>
              <p className="text-secondary">
                Type a company name to find workplace opinions
              </p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

function CompanySearchResult({ company }: { company: Company }) {
  return (
    <Link href={`/company/${company.slug}`}>
      <div className="card card-hover cursor-pointer flex items-center gap-4">
        <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
          <Building2 className="w-6 h-6 text-accent" />
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-primary truncate">
            {company.name}
          </h3>
          {(company.industry || company.location) && (
            <div className="flex items-center gap-2 text-sm text-secondary">
              {company.industry && <span>{company.industry}</span>}
              {company.industry && company.location && <span>•</span>}
              {company.location && <span>{company.location}</span>}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}

