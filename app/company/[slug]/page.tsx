'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Building2, AlertCircle } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CultureSnapshot from '@/components/CultureSnapshot';
import PostCard from '@/components/PostCard';
import ReportModal from '@/components/ReportModal';

interface Company {
  id: string;
  name: string;
  slug: string;
  industry?: string | null;
  location?: string | null;
}

interface Post {
  id: string;
  primary_category: string;
  sub_category?: string | null;
  employment_status: string;
  team_function?: string | null;
  sentiment: string;
  content: string;
  matches_count: number;
  not_matches_count: number;
  common_issue: number;
  recent: number;
  still_happening: number;
  management_driven: number;
  created_at: string;
}

export default function CompanyPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const [company, setCompany] = useState<Company | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reportingPostId, setReportingPostId] = useState<string | null>(null);

  useEffect(() => {
    if (slug) {
      fetchCompanyData();
    }
  }, [slug]);

  const fetchCompanyData = async () => {
    setLoading(true);
    setError(null);

    try {
      // Fetch company details
      const companyResponse = await fetch(`/api/companies/${slug}`);
      if (!companyResponse.ok) {
        throw new Error('Company not found');
      }
      const companyData = await companyResponse.json();
      setCompany(companyData.company);

      // Fetch posts
      const postsResponse = await fetch(`/api/posts?company_slug=${slug}`);
      if (postsResponse.ok) {
        const postsData = await postsResponse.json();
        setPosts(postsData.posts || []);
      }

      // Fetch stats
      const statsResponse = await fetch(`/api/companies/${slug}/stats`);
      if (statsResponse.ok) {
        const statsData = await statsResponse.json();
        setStats(statsData.stats);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to load company data');
    } finally {
      setLoading(false);
    }
  };

  const handleVote = async (postId: string, voteType: string) => {
    try {
      await fetch('/api/votes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ post_id: postId, vote_type: voteType }),
      });

      // Refresh posts to get updated counts
      const response = await fetch(`/api/posts?company_slug=${slug}`);
      if (response.ok) {
        const data = await response.json();
        setPosts(data.posts || []);
      }
    } catch (error) {
      console.error('Vote error:', error);
    }
  };

  const handleReport = async (reason: string, details: string) => {
    if (!reportingPostId) return;

    try {
      await fetch('/api/reports', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          post_id: reportingPostId,
          reason,
          details,
        }),
      });
    } catch (error) {
      console.error('Report error:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-secondary">Loading company data...</p>
          </div>
        </main>
      </div>
    );
  }

  if (error || !company) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center px-4">
          <div className="card max-w-md text-center">
            <AlertCircle className="w-12 h-12 text-negative mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">Company not found</h2>
            <p className="text-secondary mb-6">
              {error || 'The company you\'re looking for doesn\'t exist.'}
            </p>
            <a href="/search" className="btn-primary">
              Search companies
            </a>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 py-8">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Company Header */}
          <div className="mb-8 fade-in">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-16 h-16 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                <Building2 className="w-8 h-8 text-accent" />
              </div>
              <div className="flex-1">
                <h1 className="text-3xl md:text-4xl font-bold mb-2">{company.name}</h1>
                {(company.industry || company.location) && (
                  <div className="flex items-center gap-3 text-secondary">
                    {company.industry && <span>{company.industry}</span>}
                    {company.industry && company.location && <span>•</span>}
                    {company.location && <span>{company.location}</span>}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Culture Snapshot */}
          {stats && (
            <div className="fade-in">
              <CultureSnapshot stats={stats} />
            </div>
          )}

          {/* Posts Feed */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold">Anonymous Posts</h2>
              <span className="text-sm text-secondary">
                {posts.length} {posts.length === 1 ? 'post' : 'posts'}
              </span>
            </div>

            {posts.length > 0 ? (
              <div className="space-y-6">
                {posts.map((post) => (
                  <PostCard
                    key={post.id}
                    post={{
                      ...post,
                      created_at: new Date(post.created_at),
                    }}
                    onVote={handleVote}
                    onReport={(postId) => setReportingPostId(postId)}
                  />
                ))}
              </div>
            ) : (
              <div className="card text-center py-12">
                <p className="text-secondary mb-4">
                  No posts yet for this company.
                </p>
                <a href="/post/new" className="btn-primary inline-flex items-center gap-2">
                  Be the first to post
                </a>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Report Modal */}
      {reportingPostId && (
        <ReportModal
          postId={reportingPostId}
          onClose={() => setReportingPostId(null)}
          onSubmit={handleReport}
        />
      )}

      <Footer />
    </div>
  );
}

