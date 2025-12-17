'use client';

import { useState } from 'react';
import { ThumbsUp, ThumbsDown, AlertTriangle, Clock, RefreshCw, Brain, Flag } from 'lucide-react';
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
  onVote?: (postId: string, voteType: string) => void;
  onReport?: (postId: string) => void;
}

export default function PostCard({ post, onVote, onReport }: PostCardProps) {
  const [expanded, setExpanded] = useState(false);
  const [voted, setVoted] = useState<string | null>(null);

  const categoryLabel = PRIMARY_CATEGORIES.find(c => c.id === post.primary_category)?.label || post.primary_category;
  const sentimentData = SENTIMENTS.find(s => s.id === post.sentiment);
  
  const needsTruncation = post.content.length > 300;
  const displayContent = expanded || !needsTruncation 
    ? post.content 
    : truncateText(post.content, 300);

  const handleVote = (voteType: string) => {
    if (voted === voteType) return;
    setVoted(voteType);
    onVote?.(post.id, voteType);
  };

  return (
    <article className="card card-hover fade-in">
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
          </div>
        </div>

        <button
          onClick={() => onReport?.(post.id)}
          className="text-secondary hover:text-negative transition-colors p-2 rounded-lg hover:bg-surface-hover"
          title="Report post"
        >
          <Flag className="w-4 h-4" />
        </button>
      </div>

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

