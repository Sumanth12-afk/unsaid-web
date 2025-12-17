import crypto from 'crypto';

// Hash email for duplicate detection (privacy-preserving)
export function hashEmail(email: string): string {
  return crypto.createHash('sha256').update(email.toLowerCase()).digest('hex');
}

// Generate device ID from browser fingerprint
export function generateDeviceId(): string {
  if (typeof window === 'undefined') return '';
  
  const components = [
    navigator.userAgent,
    navigator.language,
    screen.colorDepth,
    screen.width,
    screen.height,
    new Date().getTimezoneOffset(),
  ];
  
  const fingerprint = components.join('|');
  return crypto.createHash('sha256').update(fingerprint).digest('hex');
}

// Calculate post visibility score based on validations
export function calculateVisibilityScore(
  matchesCount: number,
  notMatchesCount: number,
  totalVotes: number
): number {
  if (totalVotes === 0) return 0;
  
  const matchRatio = matchesCount / totalVotes;
  const confidence = Math.min(totalVotes / 10, 1); // Full confidence at 10 votes
  
  return matchRatio * confidence;
}

// Profanity filter (basic - extend as needed)
const profanityList = [
  // Add profanity words here
  'damn', 'hell', 'shit', 'fuck', 'bastard', 'asshole', 'bitch',
];

export function containsProfanity(text: string): boolean {
  const lowerText = text.toLowerCase();
  return profanityList.some(word => lowerText.includes(word));
}

// Check if text contains potential personal names
// Simple heuristic: capitalized words that aren't at sentence start
export function containsPotentialNames(text: string): boolean {
  const sentences = text.split(/[.!?]+/);
  
  for (const sentence of sentences) {
    const words = sentence.trim().split(/\s+/);
    
    // Skip first word (sentence start)
    for (let i = 1; i < words.length; i++) {
      const word = words[i];
      // Check if word starts with capital and is not a common word
      if (/^[A-Z][a-z]+$/.test(word) && word.length > 2) {
        return true;
      }
    }
  }
  
  return false;
}

// Slugify company name
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// Format date relative to now
export function formatRelativeTime(date: Date): string {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  if (diffInSeconds < 60) return 'Just now';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`;
  if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 604800)}w ago`;
  
  return date.toLocaleDateString('en-IN', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  });
}

// Truncate text with ellipsis
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
}

