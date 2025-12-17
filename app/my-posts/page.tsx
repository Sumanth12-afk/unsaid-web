'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import Header from '@/components/Header';
import { 
  FileText, 
  Trash2, 
  Edit3, 
  Clock, 
  Eye, 
  EyeOff,
  AlertCircle,
  CheckCircle,
  Building2,
  Calendar,
  Loader2,
  ArrowLeft
} from 'lucide-react';
import { PRIMARY_CATEGORIES, SENTIMENTS } from '@/lib/constants';

interface Post {
  id: string;
  primary_category: string;
  sub_category: string | null;
  employment_status: string;
  sentiment: string;
  content: string;
  created_at: string;
  is_published: boolean;
  is_hidden: boolean;
  publish_at: string | null;
  matches_count: number;
  not_matches_count: number;
  isEditable: boolean;
  isPublished: boolean;
  editTimeRemaining: number;
  company: {
    id: string;
    name: string;
    slug: string;
  };
}

export default function MyPostsPage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingPost, setEditingPost] = useState<string | null>(null);
  const [editContent, setEditContent] = useState('');
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login?returnUrl=/my-posts');
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    if (user) {
      fetchMyPosts();
    }
  }, [user]);

  const fetchMyPosts = async () => {
    if (!user) return;

    try {
      setLoading(true);
      const res = await fetch(`/api/my-posts?firebase_uid=${user.uid}`);
      const data = await res.json();

      if (res.ok) {
        setPosts(data.posts);
      } else {
        setError(data.error || 'Failed to fetch posts');
      }
    } catch (err) {
      setError('Failed to fetch posts');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (postId: string) => {
    if (!user) return;
    if (!confirm('Are you sure you want to delete this post? This action cannot be undone.')) {
      return;
    }

    try {
      setActionLoading(postId);
      const res = await fetch(`/api/my-posts/${postId}?firebase_uid=${user.uid}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        setPosts(posts.filter(p => p.id !== postId));
      } else {
        const data = await res.json();
        alert(data.error || 'Failed to delete post');
      }
    } catch (err) {
      alert('Failed to delete post');
    } finally {
      setActionLoading(null);
    }
  };

  const startEdit = (post: Post) => {
    setEditingPost(post.id);
    setEditContent(post.content);
  };

  const cancelEdit = () => {
    setEditingPost(null);
    setEditContent('');
  };

  const handleEdit = async (postId: string) => {
    if (!user) return;

    try {
      setActionLoading(postId);
      const res = await fetch(`/api/my-posts/${postId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firebase_uid: user.uid,
          content: editContent,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setPosts(posts.map(p => 
          p.id === postId ? { ...p, content: editContent } : p
        ));
        setEditingPost(null);
        setEditContent('');
      } else {
        alert(data.error || 'Failed to update post');
      }
    } catch (err) {
      alert('Failed to update post');
    } finally {
      setActionLoading(null);
    }
  };

  const getCategoryLabel = (id: string) => {
    return PRIMARY_CATEGORIES.find(c => c.id === id)?.label || id;
  };

  const getSentimentColor = (sentiment: string) => {
    const found = SENTIMENTS.find(s => s.id === sentiment);
    return found?.color || 'text-secondary';
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-accent animate-spin mx-auto mb-4" />
          <p className="text-secondary">Loading your posts...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 max-w-4xl mx-auto px-4 py-8 w-full">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-secondary hover:text-primary mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
          
          <div className="flex items-center gap-3 mb-2">
            <FileText className="w-8 h-8 text-accent" />
            <h1 className="text-3xl font-bold">My Posts</h1>
          </div>
          <p className="text-secondary">
            Manage your anonymous posts. You can delete anytime or edit within 5 minutes.
          </p>
        </div>

        {/* Info Banner */}
        <div className="bg-accent/10 border border-accent/20 rounded-lg p-4 mb-8">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-accent mt-0.5" />
            <div className="text-sm">
              <p className="font-medium text-primary mb-1">Your Privacy is Protected</p>
              <p className="text-secondary">
                These posts are linked to your account for management only. 
                Your identity is <strong>never shown publicly</strong> - all posts appear anonymous.
              </p>
            </div>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="bg-negative/10 border border-negative/20 rounded-lg p-4 mb-6 text-negative">
            {error}
          </div>
        )}

        {/* Posts List */}
        {posts.length === 0 ? (
          <div className="card text-center py-12">
            <FileText className="w-16 h-16 text-secondary mx-auto mb-4 opacity-50" />
            <h2 className="text-xl font-semibold mb-2">No posts yet</h2>
            <p className="text-secondary mb-6">
              You haven&apos;t created any posts. Share your workplace experience anonymously.
            </p>
            <button
              onClick={() => router.push('/post/new')}
              className="btn-primary"
            >
              Create Your First Post
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {posts.map((post) => (
              <div key={post.id} className="card">
                {/* Post Header */}
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <a 
                    href={`/company/${post.company.slug}`}
                    className="flex items-center gap-2 text-accent hover:text-accent-hover transition-colors"
                  >
                    <Building2 className="w-4 h-4" />
                    <span className="font-medium">{post.company.name}</span>
                  </a>
                  <span className="text-secondary">•</span>
                  <span className="text-sm text-secondary">{getCategoryLabel(post.primary_category)}</span>
                  <span className="text-secondary">•</span>
                  <span className={`text-sm capitalize ${getSentimentColor(post.sentiment)}`}>
                    {post.sentiment}
                  </span>
                </div>

                {/* Status Badges */}
                <div className="flex flex-wrap gap-2 mb-3">
                  {post.isPublished ? (
                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs bg-positive/10 text-positive">
                      <Eye className="w-3 h-3" />
                      Published
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs bg-warning/10 text-warning">
                      <Clock className="w-3 h-3" />
                      Publishing soon...
                    </span>
                  )}
                  {post.is_hidden && (
                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs bg-negative/10 text-negative">
                      <EyeOff className="w-3 h-3" />
                      Hidden
                    </span>
                  )}
                  {post.isEditable && (
                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs bg-accent/10 text-accent">
                      <Edit3 className="w-3 h-3" />
                      Editable ({post.editTimeRemaining} min left)
                    </span>
                  )}
                </div>

                {/* Content */}
                {editingPost === post.id ? (
                  <div className="mb-4">
                    <textarea
                      value={editContent}
                      onChange={(e) => setEditContent(e.target.value)}
                      className="input-field w-full h-40 resize-none"
                      placeholder="Edit your post..."
                    />
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-sm text-secondary">
                        {editContent.length}/1500 characters
                      </span>
                      <div className="flex gap-2">
                        <button
                          onClick={cancelEdit}
                          className="btn-secondary text-sm"
                          disabled={actionLoading === post.id}
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => handleEdit(post.id)}
                          className="btn-primary text-sm"
                          disabled={actionLoading === post.id || editContent.length < 150}
                        >
                          {actionLoading === post.id ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            'Save Changes'
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <p className="text-primary leading-relaxed mb-4 whitespace-pre-wrap">
                    {post.content}
                  </p>
                )}

                {/* Footer */}
                <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-border">
                  <div className="flex items-center gap-4 text-sm text-secondary">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {formatDate(post.created_at)}
                    </span>
                    <span className="flex items-center gap-1">
                      <CheckCircle className="w-4 h-4 text-positive" />
                      {post.matches_count} validations
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    {post.isEditable && editingPost !== post.id && (
                      <button
                        onClick={() => startEdit(post)}
                        className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm bg-surface-hover hover:bg-surface text-secondary hover:text-primary transition-all"
                        disabled={actionLoading === post.id}
                      >
                        <Edit3 className="w-4 h-4" />
                        Edit
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(post.id)}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm bg-negative/10 hover:bg-negative/20 text-negative transition-all"
                      disabled={actionLoading === post.id}
                    >
                      {actionLoading === post.id ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <>
                          <Trash2 className="w-4 h-4" />
                          Delete
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

