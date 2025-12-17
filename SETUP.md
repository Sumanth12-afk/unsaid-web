# UNSAID - Setup Guide

Complete step-by-step setup instructions for the UNSAID platform.

## Prerequisites

Before you begin, ensure you have:

- **Node.js** 18 or higher installed
- **npm** or **yarn** package manager
- **PostgreSQL** database (local or managed)
- **Firebase** project (for authentication) - Optional but recommended

## Step 1: Clone and Install

```bash
# Clone the repository
git clone <your-repo-url>
cd unsaid

# Install dependencies
npm install
```

## Step 2: Database Setup

### Option A: Local PostgreSQL

1. Install PostgreSQL on your machine
2. Create a new database:
   ```bash
   psql -U postgres
   CREATE DATABASE unsaid;
   \q
   ```

3. Your connection string will be:
   ```
   postgresql://postgres:your_password@localhost:5432/unsaid
   ```

### Option B: Managed PostgreSQL (Recommended for Production)

Use one of these managed services:

- **Vercel Postgres** (easiest with Vercel deployment)
- **Supabase** (generous free tier)
- **Railway** (simple setup)
- **Neon** (serverless PostgreSQL)

After creating your database, copy the connection string.

## Step 3: Firebase Setup (Optional but Recommended)

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or use an existing one
3. Enable **Authentication** → **Google Sign-In**
4. Go to Project Settings → General
5. Scroll down to "Your apps" and create a **Web app**
6. Copy the configuration values

## Step 4: Environment Variables

1. Create `.env` file in the root directory:
   ```bash
   cp .env.example .env
   ```

2. Edit `.env` with your values:
   ```env
   # Database
   DATABASE_URL="postgresql://username:password@host:5432/unsaid"

   # Firebase Configuration
   NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789012
   NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789012:web:abcdef123456

   # Optional
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   ```

## Step 5: Initialize Database

Run Prisma migrations to create the database schema:

```bash
# Generate Prisma Client
npx prisma generate

# Push schema to database
npx prisma db push
```

**Verify it worked:**
```bash
npx prisma studio
```

This opens Prisma Studio in your browser where you can see your empty tables.

## Step 6: Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Step 7: Seed Sample Data (Optional)

To test the platform with sample data, you can manually add companies through the UI or create a seed script.

### Manual Testing Steps:

1. Visit http://localhost:3000/search
2. Search for a company (e.g., "Acme Corp")
3. Click "Add company" if not found
4. Navigate to the company page
5. Click "Post anonymously" to create a test post
6. Go through the multi-step form and submit

## Troubleshooting

### Database Connection Issues

```bash
# Test your connection string
npx prisma db push

# View detailed errors
npx prisma studio
```

### Firebase Authentication Issues

1. Verify all Firebase config values in `.env`
2. Ensure Google Sign-In is enabled in Firebase Console
3. Add your domain to Firebase Authorized Domains
4. Check browser console for specific errors

### Port Already in Use

```bash
# Kill process on port 3000
npx kill-port 3000

# Or run on different port
PORT=3001 npm run dev
```

### Prisma Generate Errors

```bash
# Clear Prisma cache
npx prisma generate --force

# If still failing, reinstall Prisma
npm uninstall @prisma/client prisma
npm install @prisma/client prisma
npx prisma generate
```

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Deploy!

Vercel automatically detects Next.js and configures build settings.

### Database for Production

1. Use Vercel Postgres, Supabase, or another managed service
2. Update `DATABASE_URL` in Vercel environment variables
3. Run migrations after deployment:
   ```bash
   npx prisma db push
   ```

### Firebase for Production

1. Add your production domain to Firebase Authorized Domains
2. Update `NEXT_PUBLIC_SITE_URL` environment variable
3. Redeploy

## Next Steps

### Implement Delayed Post Publishing

Currently, posts are created with `is_published: false` and `publish_at` timestamp, but they're not automatically published.

**Option 1: Vercel Cron Jobs**
- Create `/app/api/cron/publish-posts/route.ts`
- Add cron schedule in `vercel.json`

**Option 2: Background Worker**
- Use a service like Inngest or Trigger.dev
- Check `publish_at` timestamps every minute

### Add Device Fingerprinting

Implement proper device fingerprinting for anonymous voting:
- Use a library like FingerprintJS
- Generate unique device IDs
- Store in Vote model

### Admin Dashboard

Create an admin interface for:
- Viewing and moderating reports
- Managing flagged content
- Viewing platform statistics
- Managing users and trust scores

## Development Tips

### Useful Commands

```bash
# View database in browser
npx prisma studio

# Reset database (WARNING: Deletes all data)
npx prisma db push --force-reset

# View database schema
npx prisma db pull

# Generate updated Prisma types
npx prisma generate

# Check for linting errors
npm run lint
```

### Project Structure

- `app/` - Next.js pages and API routes
- `components/` - Reusable React components
- `lib/` - Utilities, constants, and configurations
- `prisma/` - Database schema
- `contexts/` - React context providers

## Support

For issues or questions:
1. Check this setup guide first
2. Review the main README.md
3. Check GitHub Issues
4. Contact the maintainers

---

**You're all set!** Start building trust-first workplace transparency. 🚀

