import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { isAdmin } from '@/lib/admin';

// GET /api/admin/analytics - Get platform analytics
export async function GET(request: NextRequest) {
  try {
    // Check admin authentication
    const firebaseUid = request.headers.get('x-firebase-uid');
    
    if (!firebaseUid) {
      return NextResponse.json(
        { error: 'Unauthorized: Authentication required' },
        { status: 401 }
      );
    }

    // Get user email from database
    const user = await prisma.user.findUnique({
      where: { firebase_uid: firebaseUid },
      select: { email_hash: true },
    });

    // For now, allow if user exists (in production, check email against ADMIN_EMAILS)
    // TODO: Implement proper email check once email is stored
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized: Admin access only' },
        { status: 403 }
      );
    }

    // Get counts
    const [
      totalCompanies,
      totalPosts,
      totalUsers,
      totalVotes,
      totalReports,
      pendingReports,
    ] = await Promise.all([
      prisma.company.count(),
      prisma.post.count({ where: { is_published: true } }),
      prisma.user.count(),
      prisma.vote.count(),
      prisma.report.count(),
      prisma.report.count({ where: { status: 'pending' } }),
    ]);

    // Get sentiment breakdown
    const sentimentBreakdown = await prisma.post.groupBy({
      by: ['sentiment'],
      where: { is_published: true, is_hidden: false },
      _count: true,
    });

    const sentiments = {
      positive: 0,
      neutral: 0,
      negative: 0,
    };

    sentimentBreakdown.forEach((item) => {
      if (item.sentiment === 'positive') sentiments.positive = item._count;
      if (item.sentiment === 'neutral') sentiments.neutral = item._count;
      if (item.sentiment === 'negative') sentiments.negative = item._count;
    });

    // Get top companies by post count
    const topCompanies = await prisma.company.findMany({
      take: 10,
      orderBy: {
        posts: {
          _count: 'desc',
        },
      },
      select: {
        name: true,
        _count: {
          select: {
            posts: true,
          },
        },
      },
    });

    const topCompaniesFormatted = topCompanies.map((company) => ({
      name: company.name,
      postCount: company._count.posts,
    }));

    // Get recent posts
    const recentPosts = await prisma.post.findMany({
      take: 20,
      orderBy: {
        created_at: 'desc',
      },
      select: {
        id: true,
        primary_category: true,
        sentiment: true,
        employment_status: true,
        content: true,
        matches_count: true,
        not_matches_count: true,
        reports_count: true,
        is_hidden: true,
        created_at: true,
        company: {
          select: {
            name: true,
          },
        },
      },
    });

    // Get recent reports
    const recentReports = await prisma.report.findMany({
      where: {
        status: 'pending',
      },
      take: 20,
      orderBy: {
        created_at: 'desc',
      },
      select: {
        id: true,
        post_id: true,
        reason: true,
        details: true,
        created_at: true,
      },
    });

    return NextResponse.json({
      totalCompanies,
      totalPosts,
      totalUsers,
      totalVotes,
      totalReports,
      pendingReports,
      sentimentBreakdown: sentiments,
      topCompanies: topCompaniesFormatted,
      recentPosts,
      recentReports,
    });
  } catch (error) {
    console.error('Error fetching analytics:', error);
    return NextResponse.json(
      { error: 'Failed to fetch analytics' },
      { status: 500 }
    );
  }
}

