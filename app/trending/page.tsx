'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { 
  TrendingUp, 
  Building2, 
  MessageSquare, 
  ThumbsUp,
  Flame,
  BarChart3,
  ArrowRight,
  Loader2
} from 'lucide-react';
import { PRIMARY_CATEGORIES, SENTIMENTS } from '@/lib/constants';
import { formatRelativeTime, truncateText } from '@/lib/utils';

interface TrendingPost {
  id: string;
  content: string;
  primary_category: string;
  sentiment: string;
  matches_count: number;
  common_issue: number;
  created_at: string;
  company: {
    id: string;
    name: string;
    slug: string;
  };
}

interface CategoryStat {
  category: string;
  label: string;
  count: number;
}

interface ActiveCompany {
  company: {
    id: string;
    name: string;
    slug: string;
  };
  postCount: number;
  totalValidations: number;
}

interface SentimentStat {
  sentiment: string;
  count: number;
}

export default function TrendingPage() {
  const [trendingPosts, setTrendingPosts] = useState<TrendingPost[]>([]);
  const [categoryStats, setCategoryStats] = useState<CategoryStat[]>([]);
  const [activeCompanies, setActiveCompanies] = useState<ActiveCompany[]>([]);
  const [sentimentStats, setSentimentStats] = useState<SentimentStat[]>([]);
  const [stats, setStats] = useState({ totalPosts: 0, postsThisWeek: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTrendingData();
  }, []);

  const fetchTrendingData = async () => {
    try {
      const res = await fetch('/api/trending');
      const data = await res.json();
      
      if (res.ok) {
        setTrendingPosts(data.trendingPosts || []);
        setCategoryStats(data.categoryStats || []);
        setActiveCompanies(data.activeCompanies || []);
        setSentimentStats(data.sentimentStats || []);
        setStats(data.stats || { totalPosts: 0, postsThisWeek: 0 });
      }
    } catch (error) {
      console.error('Error fetching trending data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getCategoryLabel = (id: string) => {
    return PRIMARY_CATEGORIES.find(c => c.id === id)?.label || id;
  };

  const getSentimentColor = (sentiment: string) => {
    const found = SENTIMENTS.find(s => s.id === sentiment);
    if (found?.id === 'positive') return 'text-positive';
    if (found?.id === 'negative') return 'text-negative';
    return 'text-secondary';
  };

  const totalSentimentCount = sentimentStats.reduce((acc, s) => acc + s.count, 0);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="w-12 h-12 text-accent animate-spin mx-auto mb-4" />
            <p className="text-secondary">Loading trending data...</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page Header */}
          <div className="mb-8 fade-in">
            <div className="flex items-center gap-3 mb-2">
              <TrendingUp className="w-8 h-8 text-accent" />
              <h1 className="text-3xl md:text-4xl font-bold">Trending Now</h1>
            </div>
            <p className="text-secondary text-lg">
              Real-time insights into what employees are talking about
            </p>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="card text-center">
              <MessageSquare className="w-8 h-8 text-accent mx-auto mb-2" />
              <p className="text-2xl font-bold">{stats.totalPosts}</p>
              <p className="text-sm text-secondary">Total Posts</p>
            </div>
            <div className="card text-center">
              <Flame className="w-8 h-8 text-warning mx-auto mb-2" />
              <p className="text-2xl font-bold">{stats.postsThisWeek}</p>
              <p className="text-sm text-secondary">This Week</p>
            </div>
            <div className="card text-center">
              <Building2 className="w-8 h-8 text-accent mx-auto mb-2" />
              <p className="text-2xl font-bold">{activeCompanies.length}</p>
              <p className="text-sm text-secondary">Active Companies</p>
            </div>
            <div className="card text-center">
              <BarChart3 className="w-8 h-8 text-accent mx-auto mb-2" />
              <p className="text-2xl font-bold">{categoryStats.length}</p>
              <p className="text-sm text-secondary">Topics Discussed</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Trending Posts */}
            <div className="lg:col-span-2 space-y-6">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <Flame className="w-5 h-5 text-warning" />
                Hot Posts (Last 24 Hours)
              </h2>

              {trendingPosts.length > 0 ? (
                <div className="space-y-4">
                  {trendingPosts.map((post, index) => (
                    <Link
                      key={post.id}
                      href={`/company/${post.company.slug}#post-${post.id}`}
                      className="card card-hover block"
                    >
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center text-accent font-bold">
                          {index + 1}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-sm font-medium text-accent">
                              {post.company.name}
                            </span>
                            <span className="text-secondary">•</span>
                            <span className="text-xs text-secondary">
                              {getCategoryLabel(post.primary_category)}
                            </span>
                            <span className={`text-xs ${getSentimentColor(post.sentiment)}`}>
                              {post.sentiment}
                            </span>
                          </div>
                          <p className="text-primary text-sm leading-relaxed mb-2">
                            {truncateText(post.content, 150)}
                          </p>
                          <div className="flex items-center gap-4 text-xs text-secondary">
                            <span className="flex items-center gap-1">
                              <ThumbsUp className="w-3 h-3" />
                              {post.matches_count} validations
                            </span>
                            <span>{formatRelativeTime(new Date(post.created_at))}</span>
                          </div>
                        </div>
                        <ArrowRight className="w-5 h-5 text-secondary flex-shrink-0" />
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="card text-center py-8">
                  <p className="text-secondary">No trending posts yet. Be the first to share!</p>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Hot Topics */}
              <div className="card">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-accent" />
                  Hot Topics This Week
                </h3>
                {categoryStats.length > 0 ? (
                  <div className="space-y-3">
                    {categoryStats.slice(0, 5).map((cat, index) => (
                      <div key={cat.category} className="flex items-center gap-3">
                        <span className="text-sm font-medium text-secondary w-4">
                          {index + 1}
                        </span>
                        <div className="flex-1">
                          <p className="text-sm font-medium">{cat.label}</p>
                          <div className="w-full h-2 bg-surface-hover rounded-full mt-1">
                            <div
                              className="h-full bg-accent rounded-full"
                              style={{
                                width: `${(cat.count / categoryStats[0].count) * 100}%`,
                              }}
                            />
                          </div>
                        </div>
                        <span className="text-sm text-secondary">{cat.count}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-secondary">No data yet</p>
                )}
              </div>

              {/* Active Companies */}
              <div className="card">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-accent" />
                  Most Discussed Companies
                </h3>
                {activeCompanies.length > 0 ? (
                  <div className="space-y-3">
                    {activeCompanies.slice(0, 5).map((ac) => (
                      <Link
                        key={ac.company?.id}
                        href={`/company/${ac.company?.slug}`}
                        className="flex items-center justify-between p-2 rounded-lg hover:bg-surface-hover transition-colors"
                      >
                        <span className="text-sm font-medium">{ac.company?.name}</span>
                        <span className="text-xs text-secondary">
                          {ac.postCount} posts
                        </span>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-secondary">No data yet</p>
                )}
              </div>

              {/* Sentiment Overview */}
              <div className="card">
                <h3 className="font-semibold mb-4">Sentiment This Week</h3>
                {sentimentStats.length > 0 && totalSentimentCount > 0 ? (
                  <div className="space-y-3">
                    {sentimentStats.map((ss) => {
                      const percentage = Math.round((ss.count / totalSentimentCount) * 100);
                      return (
                        <div key={ss.sentiment} className="flex items-center gap-3">
                          <span className={`text-sm capitalize ${getSentimentColor(ss.sentiment)}`}>
                            {ss.sentiment}
                          </span>
                          <div className="flex-1 h-2 bg-surface-hover rounded-full">
                            <div
                              className={`h-full rounded-full ${
                                ss.sentiment === 'positive'
                                  ? 'bg-positive'
                                  : ss.sentiment === 'negative'
                                  ? 'bg-negative'
                                  : 'bg-secondary'
                              }`}
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                          <span className="text-sm text-secondary">{percentage}%</span>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <p className="text-sm text-secondary">No data yet</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

