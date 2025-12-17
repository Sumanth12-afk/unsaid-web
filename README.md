# UNSAID

**What employees can't say publicly**

UNSAID is an anonymous workplace opinion platform focused on India. It allows employees to read and post completely anonymous opinions about company work culture, managers, layoffs, work-life balance, salary practices, and HR policies.

## 🎯 Product Vision

- **Anonymity > Virality**: Posts remain completely publicly anonymous, even if users log in privately
- **Patterns > Drama**: Surface real workplace patterns, not individual complaints
- **Trust First**: Built with validation systems and moderation to ensure authenticity
- **Safe Space**: No public user identities, no HR access, no tracking

## 🛠 Tech Stack

- **Frontend**: Next.js 14 (App Router), React, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: Firebase Authentication (Google login optional)
- **Hosting**: Vercel + managed PostgreSQL

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- PostgreSQL database
- Firebase project (for optional authentication)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd unsaid
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```bash
   cp .env.example .env
   ```

   Update the following variables:
   ```env
   DATABASE_URL="postgresql://username:password@localhost:5432/unsaid"
   
   # Firebase Configuration (Optional)
   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
   ```

4. **Set up the database**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
unsaid/
├── app/                      # Next.js App Router pages
│   ├── api/                  # API routes
│   │   ├── auth/            # Authentication endpoints
│   │   ├── companies/       # Company CRUD & search
│   │   ├── posts/           # Post management
│   │   ├── votes/           # Validation & reactions
│   │   └── reports/         # Report system
│   ├── company/[slug]/      # Company insight pages
│   ├── post/                # Post creation & success
│   ├── search/              # Company search
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Landing page
│   ├── providers.tsx        # Client providers
│   └── globals.css          # Global styles
├── components/              # React components
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── PostCard.tsx
│   ├── CompanyCard.tsx
│   ├── CultureSnapshot.tsx
│   ├── ProgressSteps.tsx
│   ├── ReportModal.tsx
│   └── AuthButton.tsx
├── contexts/                # React contexts
│   └── AuthContext.tsx      # Firebase auth context
├── lib/                     # Utilities & config
│   ├── constants.ts         # App constants
│   ├── firebase.ts          # Firebase setup
│   ├── prisma.ts            # Prisma client
│   └── utils.ts             # Helper functions
├── prisma/
│   └── schema.prisma        # Database schema
├── .env.example             # Environment variables template
├── package.json
├── tailwind.config.ts       # Tailwind configuration
├── tsconfig.json
└── README.md
```

## 🗃 Database Schema

Key models:
- **User**: Private authentication data (never exposed publicly)
- **Company**: Company information
- **Post**: Anonymous workplace opinions
- **Vote**: Validation actions and topic reactions
- **Report**: Content moderation system
- **Poll**: Simple yes/no or multiple-choice polls

## 🔒 Privacy & Security

- **Complete Anonymity**: User identities are NEVER exposed publicly
- **Private Auth**: Optional Google login is for abuse prevention only
- **No Tracking**: No public profiles, usernames, or user activity tracking
- **Content Moderation**: Profanity filtering, name detection, delayed publishing
- **Auto-Hide**: Posts auto-hide after multiple reports

## ✨ Key Features

### For Readers
- Browse companies without login
- View aggregated culture insights
- See validated workplace patterns
- Filter by category, sentiment, role

### For Contributors
- Post completely anonymously
- Optional private login for trust scoring
- Multi-step guided post creation
- Delayed publishing for safety

### Validation System
- 👍/👎 "Matches my experience" (instead of likes)
- Topic-based reactions: Common issue, Recent, Still happening, Management-driven
- Visibility based on validation, not recency

## 🚧 Phase 2 Features (TODO)

- [ ] Automated post publishing job (currently manual)
- [ ] Device fingerprinting for anonymous voting
- [ ] Email verification for trust scoring
- [ ] Admin moderation dashboard
- [ ] Poll creation & voting
- [ ] Advanced search & filters
- [ ] Company comparison view
- [ ] Export/API for researchers
- [ ] Mobile app

## 📝 Posting Rules

- Minimum 150 characters, maximum 1,500 characters
- No personal names or identifying information
- No confidential company data
- Focus on behaviors and patterns, not attacks
- Posts are delayed 3 minutes before publishing

## 🎨 Design System

- **Colors**: Dark theme with deep charcoal background (#0B0F14)
- **Accent**: Electric blue (#4F7CFF)
- **Typography**: Inter font family
- **Style**: Minimal, premium, editorial, calm
- **Icons**: Lucide React (thin, neutral)

## 📦 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy!

### Database

Use a managed PostgreSQL service:
- **Vercel Postgres** (recommended)
- **Supabase**
- **Railway**
- **Neon**

Update `DATABASE_URL` in your environment variables.

## 🤝 Contributing

This is a trust-first platform. Contributions should prioritize:
1. User anonymity and privacy
2. Content authenticity and validation
3. Safety and moderation
4. Clean, maintainable code

## 📄 License

[Add your license here]

## 📧 Contact

For takedown requests or inquiries, contact: [Add contact method]

---

Built with trust, transparency, and respect for workplace truth.

