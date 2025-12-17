import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { PRIMARY_CATEGORIES } from '@/lib/constants';

// GET /api/trending - Get trending topics and posts
export async function GET() {
  try {
    const now = new Date();
    const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

    // Get trending posts (most validated in last 24 hours)
    const trendingPosts = await prisma.post.findMany({
      where: {
        is_hidden: false,
        OR: [
          { is_published: true },
          { publish_at: { lte: now } },
        ],
        created_at: {
          gte: oneDayAgo,
        },
      },
      orderBy: [
        { matches_count: 'desc' },
        { common_issue: 'desc' },
      ],
      take: 10,
      include: {
        company: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
      },
    });

    // Get category breakdown for the week
    const categoryStats = await prisma.post.groupBy({
      by: ['primary_category'],
      where: {
        is_hidden: false,
        OR: [
          { is_published: true },
          { publish_at: { lte: now } },
        ],
        created_at: {
          gte: oneWeekAgo,
        },
      },
      _count: {
        id: true,
      },
      orderBy: {
        _count: {
          id: 'desc',
        },
      },
    });

    // Get companies with most posts this week
    const activeCompanies = await prisma.post.groupBy({
      by: ['company_id'],
      where: {
        is_hidden: false,
        OR: [
          { is_published: true },
          { publish_at: { lte: now } },
        ],
        created_at: {
          gte: oneWeekAgo,
        },
      },
      _count: {
        id: true,
      },
      _sum: {
        matches_count: true,
      },
      orderBy: {
        _count: {
          id: 'desc',
        },
      },
      take: 10,
    });

    // Get company details for active companies
    const companyIds = activeCompanies.map(c => c.company_id);
    const companies = await prisma.company.findMany({
      where: {
        id: { in: companyIds },
      },
      select: {
        id: true,
        name: true,
        slug: true,
      },
    });

    const activeCompaniesWithDetails = activeCompanies.map(ac => {
      const company = companies.find(c => c.id === ac.company_id);
      return {
        company,
        postCount: ac._count.id,
        totalValidations: ac._sum.matches_count || 0,
      };
    });

    // Get sentiment breakdown
    const sentimentStats = await prisma.post.groupBy({
      by: ['sentiment'],
      where: {
        is_hidden: false,
        OR: [
          { is_published: true },
          { publish_at: { lte: now } },
        ],
        created_at: {
          gte: oneWeekAgo,
        },
      },
      _count: {
        id: true,
      },
    });

    // Calculate total posts
    const totalPosts = await prisma.post.count({
      where: {
        is_hidden: false,
        OR: [
          { is_published: true },
          { publish_at: { lte: now } },
        ],
      },
    });

    const postsThisWeek = await prisma.post.count({
      where: {
        is_hidden: false,
        OR: [
          { is_published: true },
          { publish_at: { lte: now } },
        ],
        created_at: {
          gte: oneWeekAgo,
        },
      },
    });

    // Format category stats with labels
    const categoryStatsWithLabels = categoryStats.map(cs => ({
      category: cs.primary_category,
      label: PRIMARY_CATEGORIES.find(c => c.id === cs.primary_category)?.label || cs.primary_category,
      count: cs._count.id,
    }));

    return NextResponse.json({
      trendingPosts: trendingPosts.map(post => ({
        id: post.id,
        content: post.content,
        primary_category: post.primary_category,
        sentiment: post.sentiment,
        matches_count: post.matches_count,
        common_issue: post.common_issue,
        created_at: post.created_at,
        company: post.company,
      })),
      categoryStats: categoryStatsWithLabels,
      activeCompanies: activeCompaniesWithDetails,
      sentimentStats: sentimentStats.map(ss => ({
        sentiment: ss.sentiment,
        count: ss._count.id,
      })),
      stats: {
        totalPosts,
        postsThisWeek,
      },
    });
  } catch (error) {
    console.error('Error fetching trending data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch trending data' },
      { status: 500 }
    );
  }
}

