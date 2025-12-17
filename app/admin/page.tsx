'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Building2, 
  FileText, 
  ThumbsUp,
  AlertTriangle,
  Eye,
  EyeOff,
  Trash2
} from 'lucide-react';
import Header from '@/components/Header';

interface Analytics {
  totalCompanies: number;
  totalPosts: number;
  totalUsers: number;
  totalVotes: number;
  totalReports: number;
  pendingReports: number;
  sentimentBreakdown: {
    positive: number;
    neutral: number;
    negative: number;
  };
  topCompanies: Array<{
    name: string;
    postCount: number;
  }>;
  recentPosts: Array<any>;
  recentReports: Array<any>;
}

export default function AdminPage() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [loadingData, setLoadingData] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'posts' | 'reports'>('overview');

  // Check admin access
  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push('/login?returnUrl=/admin');
      } else {
        // Check if user is admin
        const adminEmails = (process.env.NEXT_PUBLIC_ADMIN_EMAILS || '')
          .split(',')
          .map(e => e.trim().toLowerCase());
        
        if (!adminEmails.includes(user.email?.toLowerCase() || '')) {
          alert('Unauthorized: Admin access only');
          router.push('/');
        }
      }
    }
  }, [user, loading, router]);

  // Fetch analytics data
  useEffect(() => {
    if (user) {
      const adminEmails = (process.env.NEXT_PUBLIC_ADMIN_EMAILS || '')
        .split(',')
        .map(e => e.trim().toLowerCase());
      
      if (adminEmails.includes(user.email?.toLowerCase() || '')) {
        fetchAnalytics();
      }
    }
  }, [user]);

  const fetchAnalytics = async () => {
    try {
      const token = await user?.getIdToken();
      const response = await fetch('/api/admin/analytics', {
        headers: {
          'x-firebase-uid': user?.uid || '',
        },
      });
      if (response.ok) {
        const data = await response.json();
        setAnalytics(data);
      } else {
        console.error('Failed to fetch analytics');
      }
    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setLoadingData(false);
    }
  };

  const handleHidePost = async (postId: string) => {
    if (!confirm('Hide this post?')) return;
    
    try {
      await fetch(`/api/admin/posts/${postId}/hide`, { 
        method: 'POST',
        headers: {
          'x-firebase-uid': user?.uid || '',
        },
      });
      fetchAnalytics();
    } catch (error) {
      console.error('Error hiding post:', error);
    }
  };

  const handleDeletePost = async (postId: string) => {
    if (!confirm('Permanently delete this post? This cannot be undone!')) return;
    
    try {
      await fetch(`/api/admin/posts/${postId}`, { 
        method: 'DELETE',
        headers: {
          'x-firebase-uid': user?.uid || '',
        },
      });
      fetchAnalytics();
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  if (loading || loadingData) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-secondary">Loading admin dashboard...</p>
          </div>
        </main>
      </div>
    );
  }

  if (!user || !analytics) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
            <p className="text-secondary">
              Manage UNSAID platform - Analytics, Posts, and Moderation
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard
              icon={<Building2 className="w-6 h-6" />}
              label="Total Companies"
              value={analytics.totalCompanies}
              color="text-accent"
            />
            <StatCard
              icon={<FileText className="w-6 h-6" />}
              label="Total Posts"
              value={analytics.totalPosts}
              color="text-accent"
            />
            <StatCard
              icon={<Users className="w-6 h-6" />}
              label="Total Users"
              value={analytics.totalUsers}
              color="text-accent"
            />
            <StatCard
              icon={<ThumbsUp className="w-6 h-6" />}
              label="Total Votes"
              value={analytics.totalVotes}
              color="text-accent"
            />
          </div>

          {/* Sentiment Breakdown */}
          <div className="card mb-8">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Sentiment Breakdown
            </h2>
            <div className="space-y-4">
              <SentimentBar
                label="Positive"
                count={analytics.sentimentBreakdown.positive}
                total={analytics.totalPosts}
                color="bg-positive"
              />
              <SentimentBar
                label="Neutral"
                count={analytics.sentimentBreakdown.neutral}
                total={analytics.totalPosts}
                color="bg-secondary"
              />
              <SentimentBar
                label="Negative"
                count={analytics.sentimentBreakdown.negative}
                total={analytics.totalPosts}
                color="bg-negative"
              />
            </div>
          </div>

          {/* Top Companies */}
          <div className="card mb-8">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Top Companies by Posts
            </h2>
            <div className="space-y-3">
              {analytics.topCompanies.map((company, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-primary">{company.name}</span>
                  <span className="text-accent font-semibold">{company.postCount} posts</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tabs */}
          <div className="flex items-center gap-4 mb-6 border-b border-secondary/20">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-4 py-3 font-medium transition-colors border-b-2 ${
                activeTab === 'overview'
                  ? 'border-accent text-accent'
                  : 'border-transparent text-secondary hover:text-primary'
              }`}
            >
              Recent Posts
            </button>
            <button
              onClick={() => setActiveTab('reports')}
              className={`px-4 py-3 font-medium transition-colors border-b-2 flex items-center gap-2 ${
                activeTab === 'reports'
                  ? 'border-accent text-accent'
                  : 'border-transparent text-secondary hover:text-primary'
              }`}
            >
              <AlertTriangle className="w-4 h-4" />
              Reports ({analytics.pendingReports})
            </button>
          </div>

          {/* Recent Posts */}
          {activeTab === 'overview' && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold mb-4">Recent Posts</h2>
              {analytics.recentPosts.map((post) => (
                <div key={post.id} className="card">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-xs px-3 py-1 rounded-full bg-accent/10 text-accent">
                          {post.primary_category}
                        </span>
                        <span className={`text-xs font-medium ${
                          post.sentiment === 'positive' ? 'text-positive' :
                          post.sentiment === 'negative' ? 'text-negative' :
                          'text-secondary'
                        }`}>
                          {post.sentiment}
                        </span>
                        {post.is_hidden && (
                          <span className="text-xs px-3 py-1 rounded-full bg-warning/10 text-warning">
                            Hidden
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-secondary mb-2">
                        {post.company?.name || 'Unknown Company'} • {post.employment_status}
                      </p>
                      <p className="text-primary text-sm">{post.content.substring(0, 200)}...</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 pt-3 border-t border-secondary/10">
                    <span className="text-xs text-secondary">
                      {post.matches_count} matches • {post.not_matches_count} doesn't match • {post.reports_count} reports
                    </span>
                    <div className="ml-auto flex items-center gap-2">
                      <button
                        onClick={() => handleHidePost(post.id)}
                        className="text-xs px-3 py-1 rounded bg-warning/10 text-warning hover:bg-warning/20 transition-colors flex items-center gap-1"
                      >
                        {post.is_hidden ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                        {post.is_hidden ? 'Unhide' : 'Hide'}
                      </button>
                      <button
                        onClick={() => handleDeletePost(post.id)}
                        className="text-xs px-3 py-1 rounded bg-negative/10 text-negative hover:bg-negative/20 transition-colors flex items-center gap-1"
                      >
                        <Trash2 className="w-3 h-3" />
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Reports */}
          {activeTab === 'reports' && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold mb-4">Pending Reports</h2>
              {analytics.recentReports.length > 0 ? (
                analytics.recentReports.map((report) => (
                  <div key={report.id} className="card">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <span className="text-xs px-3 py-1 rounded-full bg-warning/10 text-warning mb-2 inline-block">
                          {report.reason.replace(/_/g, ' ')}
                        </span>
                        <p className="text-sm text-secondary mb-2">
                          Post ID: {report.post_id}
                        </p>
                        {report.details && (
                          <p className="text-sm text-primary">{report.details}</p>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="card text-center py-12">
                  <AlertTriangle className="w-12 h-12 text-secondary mx-auto mb-4" />
                  <p className="text-secondary">No pending reports</p>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

function StatCard({ icon, label, value, color }: any) {
  return (
    <div className="card">
      <div className="flex items-center justify-between mb-2">
        <div className={`${color}`}>{icon}</div>
        <span className="text-3xl font-bold">{value}</span>
      </div>
      <p className="text-sm text-secondary">{label}</p>
    </div>
  );
}

function SentimentBar({ label, count, total, color }: any) {
  const percentage = total > 0 ? (count / total) * 100 : 0;
  
  return (
    <div>
      <div className="flex items-center justify-between mb-2 text-sm">
        <span className="text-primary">{label}</span>
        <span className="text-secondary">{count} ({percentage.toFixed(1)}%)</span>
      </div>
      <div className="h-2 bg-surface-hover rounded-full overflow-hidden">
        <div
          className={`h-full ${color} transition-all duration-300`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

