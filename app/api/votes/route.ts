import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { calculateVisibilityScore } from '@/lib/utils';

// POST /api/votes - Create a vote
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { post_id, vote_type } = body;

    if (!post_id || !vote_type) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate vote type
    const validVoteTypes = [
      'matches',
      'not_matches',
      'common_issue',
      'recent',
      'still_happening',
      'management_driven',
    ];

    if (!validVoteTypes.includes(vote_type)) {
      return NextResponse.json(
        { error: 'Invalid vote type' },
        { status: 400 }
      );
    }

    // Verify post exists
    const post = await prisma.post.findUnique({
      where: { id: post_id },
    });

    if (!post) {
      return NextResponse.json(
        { error: 'Post not found' },
        { status: 404 }
      );
    }

    // TODO: Get user_id from Firebase auth if logged in
    // TODO: Generate device_id from browser fingerprint for anonymous users
    // For now, we'll skip duplicate vote checking
    const user_id = null;
    const device_id = null;

    // Create vote
    try {
      await prisma.vote.create({
        data: {
          post_id,
          user_id,
          device_id,
          vote_type,
        },
      });
    } catch (error: any) {
      // If unique constraint fails, user already voted
      if (error.code === 'P2002') {
        return NextResponse.json(
          { error: 'You have already voted on this post' },
          { status: 409 }
        );
      }
      throw error;
    }

    // Update post counts
    const updateData: any = {};
    
    switch (vote_type) {
      case 'matches':
        updateData.matches_count = { increment: 1 };
        break;
      case 'not_matches':
        updateData.not_matches_count = { increment: 1 };
        break;
      case 'common_issue':
        updateData.common_issue = { increment: 1 };
        break;
      case 'recent':
        updateData.recent = { increment: 1 };
        break;
      case 'still_happening':
        updateData.still_happening = { increment: 1 };
        break;
      case 'management_driven':
        updateData.management_driven = { increment: 1 };
        break;
    }

    // Get updated post data
    const updatedPost = await prisma.post.update({
      where: { id: post_id },
      data: updateData,
      select: {
        matches_count: true,
        not_matches_count: true,
      },
    });

    // Recalculate visibility score for validation votes
    if (vote_type === 'matches' || vote_type === 'not_matches') {
      const totalVotes = updatedPost.matches_count + updatedPost.not_matches_count;
      const visibilityScore = calculateVisibilityScore(
        updatedPost.matches_count,
        updatedPost.not_matches_count,
        totalVotes
      );

      await prisma.post.update({
        where: { id: post_id },
        data: { visibility_score: visibilityScore },
      });
    }

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error('Error creating vote:', error);
    return NextResponse.json(
      { error: 'Failed to create vote' },
      { status: 500 }
    );
  }
}

