import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/compare?companies=slug1,slug2,slug3
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const companySlugs = searchParams.get('companies')?.split(',').filter(Boolean) || [];

    if (companySlugs.length < 2) {
      return NextResponse.json(
        { error: 'At least 2 companies are required for comparison' },
        { status: 400 }
      );
    }

    if (companySlugs.length > 4) {
      return NextResponse.json(
        { error: 'Maximum 4 companies can be compared at once' },
        { status: 400 }
      );
    }

    const now = new Date();

    // Fetch companies
    const companies = await prisma.company.findMany({
      where: {
        slug: { in: companySlugs },
      },
    });

    if (companies.length < 2) {
      return NextResponse.json(
        { error: 'Not enough valid companies found' },
        { status: 404 }
      );
    }

    // Get stats for each company
    const companyStats = await Promise.all(
      companies.map(async (company) => {
        // Get all posts for this company
        const posts = await prisma.post.findMany({
          where: {
            company_id: company.id,
            is_hidden: false,
            OR: [
              { is_published: true },
              { publish_at: { lte: now } },
            ],
          },
          select: {
            primary_category: true,
            sentiment: true,
            matches_count: true,
            not_matches_count: true,
            common_issue: true,
            recent: true,
            still_happening: true,
          },
        });

        // Calculate statistics
        const totalPosts = posts.length;
        const totalValidations = posts.reduce((acc, p) => acc + p.matches_count, 0);

        // Sentiment breakdown
        const sentimentCounts = {
          positive: posts.filter(p => p.sentiment === 'positive').length,
          neutral: posts.filter(p => p.sentiment === 'neutral').length,
          negative: posts.filter(p => p.sentiment === 'negative').length,
        };

        // Category breakdown
        const categoryCounts: Record<string, number> = {};
        posts.forEach(p => {
          categoryCounts[p.primary_category] = (categoryCounts[p.primary_category] || 0) + 1;
        });

        // Calculate scores (0-100)
        const positiveRatio = totalPosts > 0 ? sentimentCounts.positive / totalPosts : 0;
        const negativeRatio = totalPosts > 0 ? sentimentCounts.negative / totalPosts : 0;
        
        // Culture score: more positive = higher score
        const cultureScore = totalPosts > 0 
          ? Math.round((positiveRatio * 100) + ((1 - negativeRatio) * 100) / 2)
          : 50;

        // Top issues
        const topCategories = Object.entries(categoryCounts)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 3)
          .map(([category, count]) => ({ category, count }));

        return {
          company: {
            id: company.id,
            name: company.name,
            slug: company.slug,
            industry: company.industry,
            location: company.location,
          },
          stats: {
            totalPosts,
            totalValidations,
            sentimentCounts,
            cultureScore: Math.min(100, Math.max(0, cultureScore)),
            topCategories,
            positivePercentage: totalPosts > 0 ? Math.round((sentimentCounts.positive / totalPosts) * 100) : 0,
            negativePercentage: totalPosts > 0 ? Math.round((sentimentCounts.negative / totalPosts) * 100) : 0,
          },
        };
      })
    );

    return NextResponse.json({ companies: companyStats });
  } catch (error) {
    console.error('Error comparing companies:', error);
    return NextResponse.json(
      { error: 'Failed to compare companies' },
      { status: 500 }
    );
  }
}

