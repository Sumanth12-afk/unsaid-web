# UNSAID - Deployment Guide

Complete guide for deploying UNSAID using Docker and GitHub Actions.

## 🐳 Docker Deployment

### Prerequisites
- Docker and Docker Compose installed
- PostgreSQL database (or use docker-compose)
- Environment variables configured

### Option 1: Using Docker Compose (Recommended for Development)

1. **Create `.env` file:**
```bash
cp .env.example .env
# Edit .env with your actual values
```

2. **Start all services:**
```bash
docker-compose up -d
```

This will start:
- PostgreSQL database on port 5432
- UNSAID app on port 3000

3. **Run database migrations:**
```bash
docker-compose exec app npx prisma db push
```

4. **Seed data (optional):**
```bash
docker-compose exec app npm run seed:all
```

5. **Access the app:**
```
http://localhost:3000
```

### Option 2: Build and Run Manually

1. **Build the Docker image:**
```bash
docker build -t unsaid:latest .
```

2. **Run the container:**
```bash
docker run -d \
  --name unsaid \
  -p 3000:3000 \
  -e DATABASE_URL="your_database_url" \
  -e NEXT_PUBLIC_FIREBASE_API_KEY="your_key" \
  -e NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="your_domain" \
  -e NEXT_PUBLIC_FIREBASE_PROJECT_ID="your_project" \
  -e NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET="your_bucket" \
  -e NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="your_sender" \
  -e NEXT_PUBLIC_FIREBASE_APP_ID="your_app_id" \
  -e NEXT_PUBLIC_ADMIN_EMAILS="admin@example.com" \
  unsaid:latest
```

### Docker Commands

```bash
# View logs
docker-compose logs -f app

# Stop services
docker-compose down

# Rebuild after code changes
docker-compose up -d --build

# Access container shell
docker-compose exec app sh

# View database
docker-compose exec postgres psql -U postgres -d unsaid
```

---

## 🚀 GitHub Actions CI/CD

### Setup GitHub Secrets

Go to **Settings → Secrets and variables → Actions** and add:

**Required Secrets:**
```
NEXT_PUBLIC_FIREBASE_API_KEY
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
NEXT_PUBLIC_FIREBASE_PROJECT_ID
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
NEXT_PUBLIC_FIREBASE_APP_ID
NEXT_PUBLIC_ADMIN_EMAILS
```

**Optional (for deployment):**
```
SSH_PRIVATE_KEY          # For SSH deployment
SERVER_HOST              # Your server IP/domain
SERVER_USER              # SSH username
VERCEL_TOKEN            # For Vercel deployment
VERCEL_ORG_ID           # Vercel organization ID
VERCEL_PROJECT_ID       # Vercel project ID
```

### Workflows Included

**1. `deploy.yml` - Main CI/CD Pipeline**
- Runs on push to `main` or `production` branches
- Lints and tests code
- Builds Docker image
- Pushes to GitHub Container Registry
- Deploys to production (if configured)

**2. `pr-check.yml` - Pull Request Checks**
- Runs on all PRs
- Validates code quality
- Checks TypeScript
- Validates Prisma schema
- Ensures build succeeds

### Triggering Workflows

**Automatic:**
- Push to `main` → Builds and pushes Docker image
- Push to `production` → Builds, pushes, and deploys
- Open PR → Runs quality checks

**Manual:**
```bash
# Push to main
git push origin main

# Create production release
git checkout production
git merge main
git push origin production
```

---

## 🌐 Production Deployment Options

### Option 1: Deploy to VPS/EC2

1. **SSH into your server**

2. **Install Docker and Docker Compose**

3. **Clone repository:**
```bash
git clone https://github.com/yourusername/unsaid.git
cd unsaid
```

4. **Create `.env` file with production values**

5. **Start services:**
```bash
docker-compose up -d
```

6. **Setup reverse proxy (Nginx):**
```nginx
server {
    listen 80;
    server_name unsaid.yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

7. **Setup SSL with Certbot:**
```bash
sudo certbot --nginx -d unsaid.yourdomain.com
```

### Option 2: Deploy to Vercel (Recommended)

1. **Push code to GitHub**

2. **Connect to Vercel:**
   - Go to https://vercel.com
   - Import your GitHub repository
   - Add environment variables

3. **Configure build settings:**
   - Framework: Next.js
   - Build Command: `npm run build`
   - Output Directory: `.next`

4. **Deploy!**

### Option 3: Deploy to Railway

1. **Install Railway CLI:**
```bash
npm i -g @railway/cli
```

2. **Login and init:**
```bash
railway login
railway init
```

3. **Add PostgreSQL:**
```bash
railway add
# Select PostgreSQL
```

4. **Deploy:**
```bash
railway up
```

---

## 📊 Health Checks

Add these endpoints to monitor your deployment:

**Check app health:**
```bash
curl http://localhost:3000/
```

**Check database connection:**
```bash
docker-compose exec app npx prisma db push --help
```

---

## 🔧 Environment Variables

### Required for Production

```env
# Database
DATABASE_URL=postgresql://user:pass@host:5432/unsaid

# Firebase
NEXT_PUBLIC_FIREBASE_API_KEY=your_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# Admin
NEXT_PUBLIC_ADMIN_EMAILS=admin1@example.com,admin2@example.com

# Site
NEXT_PUBLIC_SITE_URL=https://unsaid.yourdomain.com

# Node
NODE_ENV=production
```

---

## 🐛 Troubleshooting

### Docker build fails
```bash
# Clear cache and rebuild
docker-compose down -v
docker-compose build --no-cache
docker-compose up -d
```

### Database connection issues
```bash
# Check database is running
docker-compose ps

# View database logs
docker-compose logs postgres

# Test connection
docker-compose exec app npx prisma db push
```

### App won't start
```bash
# Check app logs
docker-compose logs app

# Verify environment variables
docker-compose exec app env | grep NEXT_PUBLIC
```

---

## 📝 Maintenance

### Backup Database
```bash
docker-compose exec postgres pg_dump -U postgres unsaid > backup.sql
```

### Restore Database
```bash
cat backup.sql | docker-compose exec -T postgres psql -U postgres unsaid
```

### Update Application
```bash
git pull
docker-compose up -d --build
```

---

## 🔐 Security Checklist

- [ ] Use strong database passwords
- [ ] Enable HTTPS/SSL
- [ ] Set up firewall rules
- [ ] Regular backups
- [ ] Monitor logs
- [ ] Update dependencies regularly
- [ ] Use secrets management
- [ ] Enable rate limiting

---

For more help, see README.md or open an issue on GitHub.

