// Admin configuration for UNSAID

export function getAdminEmails(): string[] {
  const adminEmailsEnv = process.env.NEXT_PUBLIC_ADMIN_EMAILS || process.env.ADMIN_EMAILS;
  
  if (!adminEmailsEnv) {
    console.warn('No admin emails configured in environment variables');
    return [];
  }

  // Support comma-separated list of emails
  return adminEmailsEnv.split(',').map(email => email.trim().toLowerCase());
}

export function isAdmin(email: string | null | undefined): boolean {
  if (!email) return false;
  const adminEmails = getAdminEmails();
  return adminEmails.includes(email.toLowerCase());
}

