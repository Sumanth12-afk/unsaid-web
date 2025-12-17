'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import {
  Building2,
  Search,
  X,
  Plus,
  ArrowRight,
  TrendingUp,
  TrendingDown,
  Minus,
  BarChart3,
  Loader2,
  Scale
} from 'lucide-react';
import { PRIMARY_CATEGORIES } from '@/lib/constants';

interface CompanyStats {
  company: {
    id: string;
    name: string;
    slug: string;
    industry?: string | null;
    location?: string | null;
  };
  stats: {
    totalPosts: number;
    totalValidations: number;
    sentimentCounts: {
      positive: number;
      neutral: number;
      negative: number;
    };
    cultureScore: number;
    topCategories: { category: string; count: number }[];
    positivePercentage: number;
    negativePercentage: number;
  };
}

interface SearchResult {
  id: string;
  name: string;
  slug: string;
}

function CompareContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const [selectedCompanies, setSelectedCompanies] = useState<string[]>([]);
  const [companyData, setCompanyData] = useState<CompanyStats[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [searching, setSearching] = useState(false);

  // Initialize from URL params
  useEffect(() => {
    const companiesParam = searchParams.get('companies');
    if (companiesParam) {
      const slugs = companiesParam.split(',').filter(Boolean);
      setSelectedCompanies(slugs);
    }
  }, [searchParams]);

  // Fetch comparison data when companies change
  useEffect(() => {
    if (selectedCompanies.length >= 2) {
      fetchComparisonData();
    } else {
      setCompanyData([]);
    }
  }, [selectedCompanies]);

  const fetchComparisonData = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/compare?companies=${selectedCompanies.join(',')}`);
      const data = await res.json();
      
      if (res.ok) {
        setCompanyData(data.companies);
      }
    } catch (error) {
      console.error('Error fetching comparison:', error);
    } finally {
      setLoading(false);
    }
  };

  const searchCompanies = async (query: string) => {
    if (query.length < 2) {
      setSearchResults([]);
      return;
    }

    setSearching(true);
    try {
      const res = await fetch(`/api/companies/search?q=${encodeURIComponent(query)}`);
      const data = await res.json();
      
      if (res.ok) {
        // Filter out already selected companies
        const filtered = data.companies.filter(
          (c: SearchResult) => !selectedCompanies.includes(c.slug)
        );
        setSearchResults(filtered);
      }
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setSearching(false);
    }
  };

  const addCompany = (slug: string) => {
    if (selectedCompanies.length >= 4) return;
    
    const newCompanies = [...selectedCompanies, slug];
    setSelectedCompanies(newCompanies);
    setSearchQuery('');
    setSearchResults([]);
    
    // Update URL
    router.push(`/compare?companies=${newCompanies.join(',')}`, { scroll: false });
  };

  const removeCompany = (slug: string) => {
    const newCompanies = selectedCompanies.filter(s => s !== slug);
    setSelectedCompanies(newCompanies);
    
    // Update URL
    if (newCompanies.length > 0) {
      router.push(`/compare?companies=${newCompanies.join(',')}`, { scroll: false });
    } else {
      router.push('/compare', { scroll: false });
    }
  };

  const getCategoryLabel = (id: string) => {
    return PRIMARY_CATEGORIES.find(c => c.id === id)?.label || id;
  };

  const getScoreColor = (score: number) => {
    if (score >= 70) return 'text-positive';
    if (score >= 40) return 'text-warning';
    return 'text-negative';
  };

  const getScoreBg = (score: number) => {
    if (score >= 70) return 'bg-positive';
    if (score >= 40) return 'bg-warning';
    return 'bg-negative';
  };

  // Find best/worst for each metric
  const getBestWorst = (metric: keyof CompanyStats['stats']) => {
    if (companyData.length < 2) return { best: null, worst: null };
    
    const sorted = [...companyData].sort((a, b) => {
      const aVal = typeof a.stats[metric] === 'number' ? a.stats[metric] : 0;
      const bVal = typeof b.stats[metric] === 'number' ? b.stats[metric] : 0;
      return (bVal as number) - (aVal as number);
    });
    
    return {
      best: sorted[0]?.company.slug,
      worst: sorted[sorted.length - 1]?.company.slug,
    };
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page Header */}
          <div className="mb-8 fade-in">
            <div className="flex items-center gap-3 mb-2">
              <Scale className="w-8 h-8 text-accent" />
              <h1 className="text-3xl md:text-4xl font-bold">Compare Companies</h1>
            </div>
            <p className="text-secondary text-lg">
              Side-by-side comparison of workplace culture and employee sentiment
            </p>
          </div>

          {/* Company Selection */}
          <div className="card mb-8">
            <h2 className="font-semibold mb-4">Select Companies to Compare (2-4)</h2>
            
            {/* Selected Companies */}
            <div className="flex flex-wrap gap-2 mb-4">
              {selectedCompanies.map((slug) => {
                const data = companyData.find(c => c.company.slug === slug);
                return (
                  <span
                    key={slug}
                    className="inline-flex items-center gap-2 px-3 py-2 bg-accent/10 text-accent rounded-lg"
                  >
                    <Building2 className="w-4 h-4" />
                    {data?.company.name || slug}
                    <button
                      onClick={() => removeCompany(slug)}
                      className="hover:text-negative transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </span>
                );
              })}
              
              {selectedCompanies.length < 4 && (
                <div className="relative flex-1 min-w-[200px]">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-secondary" />
                  <input
                    type="text"
                    placeholder="Add company..."
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      searchCompanies(e.target.value);
                    }}
                    className="input-field w-full pl-10"
                  />
                  
                  {/* Search Results Dropdown */}
                  {searchResults.length > 0 && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-surface border border-border rounded-lg shadow-lg z-10 max-h-48 overflow-y-auto">
                      {searchResults.map((company) => (
                        <button
                          key={company.id}
                          onClick={() => addCompany(company.slug)}
                          className="w-full flex items-center gap-2 px-4 py-2 text-left hover:bg-surface-hover transition-colors"
                        >
                          <Plus className="w-4 h-4 text-accent" />
                          {company.name}
                        </button>
                      ))}
                    </div>
                  )}
                  
                  {searching && (
                    <Loader2 className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 animate-spin text-secondary" />
                  )}
                </div>
              )}
            </div>

            {selectedCompanies.length < 2 && (
              <p className="text-sm text-secondary">
                Select at least 2 companies to compare
              </p>
            )}
          </div>

          {/* Loading State */}
          {loading && (
            <div className="text-center py-12">
              <Loader2 className="w-12 h-12 text-accent animate-spin mx-auto mb-4" />
              <p className="text-secondary">Loading comparison data...</p>
            </div>
          )}

          {/* Comparison Results */}
          {!loading && companyData.length >= 2 && (
            <div className="space-y-8">
              {/* Culture Score Comparison */}
              <div className="card">
                <h3 className="font-semibold mb-6 flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-accent" />
                  Culture Score
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {companyData.map((data) => {
                    const { best } = getBestWorst('cultureScore');
                    const isBest = data.company.slug === best;
                    
                    return (
                      <div
                        key={data.company.id}
                        className={`text-center p-4 rounded-lg ${
                          isBest ? 'bg-positive/10 ring-2 ring-positive' : 'bg-surface'
                        }`}
                      >
                        <p className="text-sm text-secondary mb-2">{data.company.name}</p>
                        <p className={`text-4xl font-bold ${getScoreColor(data.stats.cultureScore)}`}>
                          {data.stats.cultureScore}
                        </p>
                        <div className="w-full h-2 bg-surface-hover rounded-full mt-2">
                          <div
                            className={`h-full rounded-full ${getScoreBg(data.stats.cultureScore)}`}
                            style={{ width: `${data.stats.cultureScore}%` }}
                          />
                        </div>
                        {isBest && (
                          <span className="inline-flex items-center gap-1 text-xs text-positive mt-2">
                            <TrendingUp className="w-3 h-3" />
                            Best
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Sentiment Comparison */}
              <div className="card">
                <h3 className="font-semibold mb-6">Sentiment Breakdown</h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-3 px-4">Company</th>
                        <th className="text-center py-3 px-4 text-positive">Positive</th>
                        <th className="text-center py-3 px-4 text-secondary">Neutral</th>
                        <th className="text-center py-3 px-4 text-negative">Negative</th>
                        <th className="text-center py-3 px-4">Total Posts</th>
                      </tr>
                    </thead>
                    <tbody>
                      {companyData.map((data) => (
                        <tr key={data.company.id} className="border-b border-border/50">
                          <td className="py-3 px-4 font-medium">{data.company.name}</td>
                          <td className="py-3 px-4 text-center">
                            <span className="text-positive font-medium">
                              {data.stats.positivePercentage}%
                            </span>
                            <span className="text-xs text-secondary ml-1">
                              ({data.stats.sentimentCounts.positive})
                            </span>
                          </td>
                          <td className="py-3 px-4 text-center">
                            <span className="text-secondary font-medium">
                              {data.stats.totalPosts > 0 
                                ? Math.round((data.stats.sentimentCounts.neutral / data.stats.totalPosts) * 100)
                                : 0}%
                            </span>
                            <span className="text-xs text-secondary ml-1">
                              ({data.stats.sentimentCounts.neutral})
                            </span>
                          </td>
                          <td className="py-3 px-4 text-center">
                            <span className="text-negative font-medium">
                              {data.stats.negativePercentage}%
                            </span>
                            <span className="text-xs text-secondary ml-1">
                              ({data.stats.sentimentCounts.negative})
                            </span>
                          </td>
                          <td className="py-3 px-4 text-center text-secondary">
                            {data.stats.totalPosts}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Top Issues Comparison */}
              <div className="card">
                <h3 className="font-semibold mb-6">Top Issues by Company</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {companyData.map((data) => (
                    <div key={data.company.id}>
                      <h4 className="font-medium text-accent mb-3">{data.company.name}</h4>
                      {data.stats.topCategories.length > 0 ? (
                        <div className="space-y-2">
                          {data.stats.topCategories.map((cat, index) => (
                            <div key={cat.category} className="flex items-center gap-2">
                              <span className="text-xs text-secondary w-4">{index + 1}.</span>
                              <span className="text-sm flex-1">{getCategoryLabel(cat.category)}</span>
                              <span className="text-xs text-secondary">{cat.count}</span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-sm text-secondary">No data</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Links */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {companyData.map((data) => (
                  <a
                    key={data.company.id}
                    href={`/company/${data.company.slug}`}
                    className="card card-hover flex items-center justify-between"
                  >
                    <span className="font-medium">{data.company.name}</span>
                    <ArrowRight className="w-4 h-4 text-accent" />
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Empty State */}
          {!loading && selectedCompanies.length < 2 && (
            <div className="card text-center py-12">
              <Scale className="w-16 h-16 text-secondary mx-auto mb-4 opacity-50" />
              <h2 className="text-xl font-semibold mb-2">Compare Workplace Cultures</h2>
              <p className="text-secondary mb-6 max-w-md mx-auto">
                Select 2-4 companies to see side-by-side comparison of employee sentiment, 
                culture scores, and common issues.
              </p>
              <a href="/search" className="btn-primary inline-flex items-center gap-2">
                <Search className="w-4 h-4" />
                Browse Companies
              </a>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function ComparePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-accent animate-spin" />
      </div>
    }>
      <CompareContent />
    </Suspense>
  );
}

