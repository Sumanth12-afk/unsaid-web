'use client';

import { useState } from 'react';
import { ThumbsUp, ThumbsDown, AlertTriangle, Clock, RefreshCw, Brain, Flag, Share2, Link2, Twitter, Linkedin, Check, TrendingUp } from 'lucide-react';
import { formatRelativeTime, truncateText } from '@/lib/utils';
import { PRIMARY_CATEGORIES, SENTIMENTS } from '@/lib/constants';

interface PostCardProps {
  post: {
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
    created_at: Date;
  };
  companySlug?: string;
  companyName?: string;
  onVote?: (postId: string, voteType: string) => void;
  onReport?: (postId: string) => void;
}

export default function PostCard({ post, companySlug, companyName, onVote, onReport }: PostCardProps) {
  const [expanded, setExpanded] = useState(false);
  const [voted, setVoted] = useState<string | null>(null);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [copied, setCopied] = useState(false);

  const categoryLabel = PRIMARY_CATEGORIES.find(c => c.id === post.primary_category)?.label || post.primary_category;
  const sentimentData = SENTIMENTS.find(s => s.id === post.sentiment);
  
  const needsTruncation = post.content.length > 300;
  const displayContent = expanded || !needsTruncation 
    ? post.content 
    : truncateText(post.content, 300);

  // Calculate total validations and trending status
  const totalValidations = post.matches_count + post.common_issue + post.recent + post.still_happening;
  const isTrending = totalValidations >= 10;
  const validationRate = post.matches_count + post.not_matches_count > 0 
    ? Math.round((post.matches_count / (post.matches_count + post.not_matches_count)) * 100)
    : 0;

  const handleVote = (voteType: string) => {
    if (voted === voteType) return;
    setVoted(voteType);
    onVote?.(post.id, voteType);
  };

  const getShareUrl = () => {
    const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
    return companySlug ? `${baseUrl}/company/${companySlug}#post-${post.id}` : `${baseUrl}`;
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(getShareUrl());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleShareTwitter = () => {
    const text = `Anonymous workplace insight${companyName ? ` about ${companyName}` : ''} on UNSAID`;
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(getShareUrl())}`;
    window.open(url, '_blank', 'width=550,height=420');
  };

  const handleShareLinkedIn = () => {
    const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(getShareUrl())}`;
    window.open(url, '_blank', 'width=550,height=420');
  };

  return (
    <article className="card card-hover fade-in" id={`post-${post.id}`}>
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center flex-wrap gap-2 mb-2">
            <span className="text-xs font-medium px-3 py-1 rounded-full bg-accent/10 text-accent">
              {categoryLabel}
            </span>
            
            {post.sub_category && (
              <span className="text-xs px-3 py-1 rounded-full bg-surface-hover text-secondary">
                {post.sub_category.replace(/_/g, ' ')}
              </span>
            )}
            
            <span className={`text-xs font-medium ${sentimentData?.color || 'text-secondary'}`}>
              {sentimentData?.label}
            </span>

            {/* Trending Badge */}
            {isTrending && (
              <span className="flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full bg-warning/10 text-warning">
                <TrendingUp className="w-3 h-3" />
                Trending
              </span>
            )}
          </div>

          <div className="flex items-center gap-3 text-xs text-secondary">
            <span className="capitalize">{post.employment_status.replace(/_/g, ' ')}</span>
            {post.team_function && (
              <>
                <span>•</span>
                <span>{post.team_function}</span>
              </>
            )}
            <span>•</span>
            <span>{formatRelativeTime(new Date(post.created_at))}</span>
            {totalValidations > 0 && (
              <>
                <span>•</span>
                <span className="text-positive">{totalValidations} validations</span>
              </>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-1">
          {/* Share Button */}
          <div className="relative">
            <button
              onClick={() => setShowShareMenu(!showShareMenu)}
              className="text-secondary hover:text-accent transition-colors p-2 rounded-lg hover:bg-surface-hover"
              title="Share post"
            >
              <Share2 className="w-4 h-4" />
            </button>

            {/* Share Menu */}
            {showShareMenu && (
              <div className="absolute right-0 top-10 bg-surface border border-border rounded-lg shadow-lg p-2 z-10 min-w-[160px]">
                <button
                  onClick={handleCopyLink}
                  className="w-full flex items-center gap-2 px-3 py-2 text-sm text-secondary hover:text-primary hover:bg-surface-hover rounded-lg transition-colors"
                >
                  {copied ? <Check className="w-4 h-4 text-positive" /> : <Link2 className="w-4 h-4" />}
                  {copied ? 'Copied!' : 'Copy link'}
                </button>
                <button
                  onClick={handleShareTwitter}
                  className="w-full flex items-center gap-2 px-3 py-2 text-sm text-secondary hover:text-primary hover:bg-surface-hover rounded-lg transition-colors"
                >
                  <Twitter className="w-4 h-4" />
                  Share on X
                </button>
                <button
                  onClick={handleShareLinkedIn}
                  className="w-full flex items-center gap-2 px-3 py-2 text-sm text-secondary hover:text-primary hover:bg-surface-hover rounded-lg transition-colors"
                >
                  <Linkedin className="w-4 h-4" />
                  Share on LinkedIn
                </button>
              </div>
            )}
          </div>

          {/* Report Button */}
          <button
            onClick={() => onReport?.(post.id)}
            className="text-secondary hover:text-negative transition-colors p-2 rounded-lg hover:bg-surface-hover"
            title="Report post"
          >
            <Flag className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Validation Rate Bar */}
      {post.matches_count + post.not_matches_count >= 5 && (
        <div className="mb-4 p-3 bg-surface rounded-lg">
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="text-secondary">Validation rate</span>
            <span className={validationRate >= 70 ? 'text-positive' : validationRate >= 40 ? 'text-warning' : 'text-negative'}>
              {validationRate}% agree this matches their experience
            </span>
          </div>
          <div className="w-full h-2 bg-surface-hover rounded-full overflow-hidden">
            <div 
              className={`h-full transition-all ${validationRate >= 70 ? 'bg-positive' : validationRate >= 40 ? 'bg-warning' : 'bg-negative'}`}
              style={{ width: `${validationRate}%` }}
            />
          </div>
        </div>
      )}

      {/* Content */}
      <div className="mb-4">
        <p className="text-primary leading-relaxed whitespace-pre-wrap">
          {displayContent}
        </p>
        
        {needsTruncation && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-accent hover:text-accent-hover text-sm font-medium mt-2 transition-colors"
          >
            {expanded ? 'Show less' : 'Read more'}
          </button>
        )}
      </div>

      {/* Validation Actions */}
      <div className="flex items-center gap-3 pb-4 mb-4 border-b border-secondary/10">
        <button
          onClick={() => handleVote('matches')}
          disabled={voted === 'matches'}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
            voted === 'matches'
              ? 'bg-positive/20 text-positive'
              : 'bg-surface-hover hover:bg-positive/10 text-secondary hover:text-positive'
          }`}
        >
          <ThumbsUp className="w-4 h-4" />
          <span className="text-sm font-medium">{post.matches_count}</span>
          <span className="text-xs hidden sm:inline">Matches my experience</span>
        </button>

        <button
          onClick={() => handleVote('not_matches')}
          disabled={voted === 'not_matches'}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
            voted === 'not_matches'
              ? 'bg-negative/20 text-negative'
              : 'bg-surface-hover hover:bg-negative/10 text-secondary hover:text-negative'
          }`}
        >
          <ThumbsDown className="w-4 h-4" />
          <span className="text-sm font-medium">{post.not_matches_count}</span>
          <span className="text-xs hidden sm:inline">Doesn't match</span>
        </button>
      </div>

      {/* Topic Reactions */}
      <div className="flex items-center gap-2 flex-wrap">
        <ReactionButton
          icon={<AlertTriangle className="w-4 h-4" />}
          label="Common issue"
          count={post.common_issue}
          onClick={() => handleVote('common_issue')}
          active={voted === 'common_issue'}
        />
        
        <ReactionButton
          icon={<Clock className="w-4 h-4" />}
          label="Happened recently"
          count={post.recent}
          onClick={() => handleVote('recent')}
          active={voted === 'recent'}
        />
        
        <ReactionButton
          icon={<RefreshCw className="w-4 h-4" />}
          label="Still happening"
          count={post.still_happening}
          onClick={() => handleVote('still_happening')}
          active={voted === 'still_happening'}
        />
        
        <ReactionButton
          icon={<Brain className="w-4 h-4" />}
          label="Management-driven"
          count={post.management_driven}
          onClick={() => handleVote('management_driven')}
          active={voted === 'management_driven'}
        />
      </div>
    </article>
  );
}

function ReactionButton({ 
  icon, 
  label, 
  count, 
  onClick, 
  active 
}: { 
  icon: React.ReactNode; 
  label: string; 
  count: number; 
  onClick: () => void;
  active: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={active}
      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs transition-all ${
        active
          ? 'bg-accent/20 text-accent'
          : 'bg-surface-hover hover:bg-accent/10 text-secondary hover:text-accent'
      }`}
      title={label}
    >
      {icon}
      {count > 0 && <span className="font-medium">{count}</span>}
      <span className="hidden lg:inline">{label}</span>
    </button>
  );
}

