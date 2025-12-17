interface CultureSnapshotProps {
  stats: {
    totalPosts: number;
    positivePercent: number;
    neutralPercent: number;
    negativePercent: number;
    topCategories: Array<{ category: string; count: number }>;
    recentActivity: number; // posts in last 30 days
  };
}

export default function CultureSnapshot({ stats }: CultureSnapshotProps) {
  return (
    <div className="card mb-8">
      <h2 className="text-xl font-semibold mb-6">Culture Snapshot</h2>

      {/* Sentiment Distribution */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-secondary mb-3">Overall Sentiment</h3>
        
        <div className="flex items-center gap-2 mb-2">
          <div className="flex-1 h-3 bg-surface-hover rounded-full overflow-hidden flex">
            <div
              className="bg-positive"
              style={{ width: `${stats.positivePercent}%` }}
              title={`${stats.positivePercent}% Positive`}
            />
            <div
              className="bg-secondary/50"
              style={{ width: `${stats.neutralPercent}%` }}
              title={`${stats.neutralPercent}% Neutral`}
            />
            <div
              className="bg-negative"
              style={{ width: `${stats.negativePercent}%` }}
              title={`${stats.negativePercent}% Negative`}
            />
          </div>
        </div>

        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-positive" />
            <span className="text-secondary">{stats.positivePercent}% Positive</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-secondary/50" />
            <span className="text-secondary">{stats.neutralPercent}% Neutral</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-negative" />
            <span className="text-secondary">{stats.negativePercent}% Negative</span>
          </div>
        </div>
      </div>

      {/* Top Categories */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-secondary mb-3">Most Discussed Topics</h3>
        <div className="space-y-2">
          {stats.topCategories.slice(0, 3).map((cat, index) => (
            <div key={index} className="flex items-center justify-between text-sm">
              <span className="text-primary capitalize">{cat.category.replace(/_/g, ' ')}</span>
              <span className="text-accent font-medium">{cat.count} posts</span>
            </div>
          ))}
        </div>
      </div>

      {/* Activity Indicator */}
      <div className="pt-4 border-t border-secondary/10">
        <div className="flex items-center justify-between text-sm">
          <span className="text-secondary">Recent Activity</span>
          <span className="text-primary font-medium">
            {stats.recentActivity} posts in last 30 days
          </span>
        </div>
      </div>
    </div>
  );
}

