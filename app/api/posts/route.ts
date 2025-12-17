import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { containsProfanity, containsPotentialNames } from '@/lib/utils';
import { POST_LIMITS, TRUST_WEIGHTS } from '@/lib/constants';

// GET /api/posts - List posts
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const companySlug = searchParams.get('company_slug');
    const limit = parseInt(searchParams.get('limit') || '50');

    if (!companySlug) {
      return NextResponse.json(
        { error: 'company_slug is required' },
        { status: 400 }
      );
    }

    // Find company by slug
    const company = await prisma.company.findUnique({
      where: { slug: companySlug },
      select: { id: true },
    });

    if (!company) {
      return NextResponse.json(
        { error: 'Company not found' },
        { status: 404 }
      );
    }

    // Fetch posts - show posts that have passed their publish delay
    const now = new Date();
    const posts = await prisma.post.findMany({
      where: {
        company_id: company.id,
        is_hidden: false,
        // Show posts where publish_at has passed (auto-publish after 3 min delay)
        OR: [
          { is_published: true },
          { publish_at: { lte: now } },
        ],
      },
      take: limit,
      orderBy: [
        { visibility_score: 'desc' },
        { created_at: 'desc' },
      ],
      select: {
        id: true,
        primary_category: true,
        sub_category: true,
        employment_status: true,
        team_function: true,
        sentiment: true,
        content: true,
        matches_count: true,
        not_matches_count: true,
        common_issue: true,
        recent: true,
        still_happening: true,
        management_driven: true,
        created_at: true,
      },
    });

    return NextResponse.json({ posts });
  } catch (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch posts' },
      { status: 500 }
    );
  }
}

// POST /api/posts - Create a new post
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      company_id,
      primary_category,
      sub_category,
      employment_status,
      team_function,
      location,
      sentiment,
      content,
      firebase_uid, // Sent from client
    } = body;

    // Require authentication for posting
    if (!firebase_uid) {
      return NextResponse.json(
        { error: 'Authentication required to create posts' },
        { status: 401 }
      );
    }

    // Validation
    if (!company_id || !primary_category || !employment_status || !sentiment || !content) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Content length validation
    if (content.length < POST_LIMITS.MIN_CHARACTERS) {
      return NextResponse.json(
        { error: `Content must be at least ${POST_LIMITS.MIN_CHARACTERS} characters` },
        { status: 400 }
      );
    }

    if (content.length > POST_LIMITS.MAX_CHARACTERS) {
      return NextResponse.json(
        { error: `Content must be less than ${POST_LIMITS.MAX_CHARACTERS} characters` },
        { status: 400 }
      );
    }

    // Content moderation
    if (containsProfanity(content)) {
      return NextResponse.json(
        { error: 'Content contains inappropriate language' },
        { status: 400 }
      );
    }

    if (containsPotentialNames(content)) {
      return NextResponse.json(
        { error: 'Content may contain personal names. Please remove them.' },
        { status: 400 }
      );
    }

    // Verify company exists
    const company = await prisma.company.findUnique({
      where: { id: company_id },
    });

    if (!company) {
      return NextResponse.json(
        { error: 'Company not found' },
        { status: 404 }
      );
    }

    // Calculate delayed publish time (3 minutes from now)
    const publishAt = new Date();
    publishAt.setMinutes(publishAt.getMinutes() + POST_LIMITS.PUBLISH_DELAY_MINUTES);

    // Get or create user from firebase_uid
    let user = await prisma.user.findUnique({
      where: { firebase_uid },
    });

    if (!user) {
      // Create user if doesn't exist (shouldn't happen if auth/sync works)
      user = await prisma.user.create({
        data: {
          firebase_uid,
          trust_score: TRUST_WEIGHTS.LOGGED_IN_USER,
        },
      });
    }

    const user_id = user.id;

    // Create post
    const post = await prisma.post.create({
      data: {
        company_id,
        user_id,
        primary_category,
        sub_category: sub_category || null,
        employment_status,
        team_function: team_function || null,
        location: location || null,
        sentiment,
        content,
        is_published: false, // Will be published after delay
        publish_at: publishAt,
        visibility_score: 0.0,
      },
    });

    // TODO: Schedule background job to publish post after delay
    // For MVP, you can manually set is_published to true after delay
    // Or use a cron job to check publish_at timestamps

    return NextResponse.json({ post }, { status: 201 });
  } catch (error) {
    console.error('Error creating post:', error);
    return NextResponse.json(
      { error: 'Failed to create post' },
      { status: 500 }
    );
  }
}

