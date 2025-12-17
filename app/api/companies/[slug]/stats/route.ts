import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/companies/[slug]/stats - Get aggregated stats for a company
export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const company = await prisma.company.findUnique({
      where: { slug: params.slug },
      select: { id: true },
    });

    if (!company) {
      return NextResponse.json(
        { error: 'Company not found' },
        { status: 404 }
      );
    }

    // Get all published posts for this company
    const posts = await prisma.post.findMany({
      where: {
        company_id: company.id,
        is_published: true,
        is_hidden: false,
      },
      select: {
        sentiment: true,
        primary_category: true,
        created_at: true,
      },
    });

    const totalPosts = posts.length;

    if (totalPosts === 0) {
      return NextResponse.json({
        stats: {
          totalPosts: 0,
          positivePercent: 0,
          neutralPercent: 0,
          negativePercent: 0,
          topCategories: [],
          recentActivity: 0,
        },
      });
    }

    // Calculate sentiment percentages
    const sentimentCounts = {
      positive: 0,
      neutral: 0,
      negative: 0,
    };

    posts.forEach((post) => {
      if (post.sentiment === 'positive') sentimentCounts.positive++;
      else if (post.sentiment === 'neutral') sentimentCounts.neutral++;
      else if (post.sentiment === 'negative') sentimentCounts.negative++;
    });

    const positivePercent = Math.round((sentimentCounts.positive / totalPosts) * 100);
    const neutralPercent = Math.round((sentimentCounts.neutral / totalPosts) * 100);
    const negativePercent = Math.round((sentimentCounts.negative / totalPosts) * 100);

    // Calculate top categories
    const categoryCountsMap: Record<string, number> = {};
    posts.forEach((post) => {
      categoryCountsMap[post.primary_category] = (categoryCountsMap[post.primary_category] || 0) + 1;
    });

    const topCategories = Object.entries(categoryCountsMap)
      .map(([category, count]) => ({ category, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 3);

    // Calculate recent activity (last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const recentActivity = posts.filter(
      (post) => new Date(post.created_at) >= thirtyDaysAgo
    ).length;

    return NextResponse.json({
      stats: {
        totalPosts,
        positivePercent,
        neutralPercent,
        negativePercent,
        topCategories,
        recentActivity,
      },
    });
  } catch (error) {
    console.error('Error fetching company stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch company stats' },
      { status: 500 }
    );
  }
}

