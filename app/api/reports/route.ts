import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { POST_LIMITS } from '@/lib/constants';

// POST /api/reports - Create a report
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { post_id, reason, details } = body;

    if (!post_id || !reason) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Verify post exists
    const post = await prisma.post.findUnique({
      where: { id: post_id },
      select: {
        id: true,
        reports_count: true,
      },
    });

    if (!post) {
      return NextResponse.json(
        { error: 'Post not found' },
        { status: 404 }
      );
    }

    // TODO: Get user_id from Firebase auth if logged in
    const user_id = null;

    // Create report
    await prisma.report.create({
      data: {
        post_id,
        user_id,
        reason,
        details: details || null,
        status: 'pending',
      },
    });

    // Increment reports count on post
    const newReportsCount = post.reports_count + 1;
    
    await prisma.post.update({
      where: { id: post_id },
      data: {
        reports_count: newReportsCount,
        // Auto-hide if threshold reached
        is_hidden: newReportsCount >= POST_LIMITS.AUTO_HIDE_REPORTS_THRESHOLD,
      },
    });

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error('Error creating report:', error);
    return NextResponse.json(
      { error: 'Failed to create report' },
      { status: 500 }
    );
  }
}

