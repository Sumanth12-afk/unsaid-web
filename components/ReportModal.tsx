'use client';

import { useState } from 'react';
import { X } from 'lucide-react';
import { REPORT_REASONS } from '@/lib/constants';

interface ReportModalProps {
  postId: string;
  onClose: () => void;
  onSubmit: (reason: string, details: string) => void;
}

export default function ReportModal({ postId, onClose, onSubmit }: ReportModalProps) {
  const [reason, setReason] = useState('');
  const [details, setDetails] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reason) return;

    setSubmitting(true);
    await onSubmit(reason, details);
    setSubmitting(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="card max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Report Post</h2>
          <button
            onClick={onClose}
            className="text-secondary hover:text-primary transition-colors p-2 rounded-lg hover:bg-surface-hover"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Reason Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-secondary mb-3">
              Why are you reporting this post?
            </label>
            <div className="space-y-2">
              {REPORT_REASONS.map((r) => (
                <label
                  key={r.id}
                  className={`flex items-center gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    reason === r.id
                      ? 'border-accent bg-accent/5'
                      : 'border-secondary/20 hover:border-secondary/40'
                  }`}
                >
                  <input
                    type="radio"
                    name="reason"
                    value={r.id}
                    checked={reason === r.id}
                    onChange={(e) => setReason(e.target.value)}
                    className="w-4 h-4 text-accent"
                  />
                  <span className="text-sm text-primary">{r.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Additional Details */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-secondary mb-2">
              Additional details (optional)
            </label>
            <textarea
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              placeholder="Provide more context if needed..."
              rows={4}
              className="input-field w-full resize-none"
            />
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="btn-secondary flex-1"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!reason || submitting}
              className="btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? 'Submitting...' : 'Submit Report'}
            </button>
          </div>
        </form>

        {/* Privacy Note */}
        <p className="text-xs text-secondary mt-4 text-center">
          Reports are reviewed privately. Multiple reports may auto-hide the post.
        </p>
      </div>
    </div>
  );
}

