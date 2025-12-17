# UNSAID - Quick Start Guide

Get UNSAID running in under 5 minutes.

## Prerequisites

- Node.js 18+
- PostgreSQL database
- Firebase project (optional)

## Quick Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Environment Variables

Create `.env` file:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/unsaid"

# Optional: Firebase config
NEXT_PUBLIC_FIREBASE_API_KEY=your_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

### 3. Setup Database

```bash
npx prisma generate
npx prisma db push
```

### 4. Run Development Server

```bash
npm run dev
```

Open http://localhost:3000 🚀

## First Steps

1. **Browse**: Visit the landing page
2. **Search**: Go to `/search` and look for companies
3. **Add Company**: Click "Add company" if not found
4. **Post**: Create an anonymous post via `/post/new`
5. **View Insights**: Check out the company page with patterns

## Testing Without Firebase

Firebase is optional. You can:
- Browse all pages without login
- Create anonymous posts without authentication
- Vote and interact without an account

To enable login, set up Firebase authentication.

## Common Issues

**Database connection error?**
```bash
# Test your connection
npx prisma studio
```

**Port already in use?**
```bash
PORT=3001 npm run dev
```

**Prisma errors?**
```bash
npx prisma generate --force
```

## What's Next?

See `SETUP.md` for detailed deployment instructions and `README.md` for full documentation.

---

**Need help?** Check the troubleshooting section in SETUP.md

