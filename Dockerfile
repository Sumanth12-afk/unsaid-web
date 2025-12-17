# UNSAID - Production Dockerfile

# Stage 1: Dependencies
FROM node:20-alpine AS deps

# Install libc6-compat for Alpine (needed for some npm packages)
RUN apk add --no-cache libc6-compat

WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json package-lock.json* ./
# Use --ignore-scripts to skip postinstall (prisma generate) - we'll run it in builder stage
RUN npm install --legacy-peer-deps --no-audit --no-fund --ignore-scripts

# Stage 2: Builder
FROM node:20-alpine AS builder

# Install libc6-compat for Alpine
RUN apk add --no-cache libc6-compat

WORKDIR /app

# Set environment for build
ENV NEXT_TELEMETRY_DISABLED=1

# Copy dependencies from deps stage
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Generate Prisma Client
RUN npx prisma generate

# Build the application
RUN npm run build

# Stage 3: Runner
FROM node:20-alpine AS runner

# Install libc6-compat for Alpine (needed for Prisma)
RUN apk add --no-cache libc6-compat

WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Create a non-root user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy necessary files
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma

# Set correct permissions
RUN chown -R nextjs:nodejs /app

USER nextjs

EXPOSE 3000

CMD ["node", "server.js"]

