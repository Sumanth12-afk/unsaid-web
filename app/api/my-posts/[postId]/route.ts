import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { containsProfanity, containsPotentialNames } from '@/lib/utils';
import { POST_LIMITS } from '@/lib/constants';

// DELETE /api/my-posts/[postId] - Delete user's own post
export async function DELETE(
  request: NextRequest,
  { params }: { params: { postId: string } }
) {
  try {
    const { searchParams } = new URL(request.url);
    const firebase_uid = searchParams.get('firebase_uid');
    const postId = params.postId;

    if (!firebase_uid) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    // Find user
    const user = await prisma.user.findUnique({
      where: { firebase_uid },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Find post and verify ownership
    const post = await prisma.post.findUnique({
      where: { id: postId },
    });

    if (!post) {
      return NextResponse.json(
        { error: 'Post not found' },
        { status: 404 }
      );
    }

    if (post.user_id !== user.id) {
      return NextResponse.json(
        { error: 'You can only delete your own posts' },
        { status: 403 }
      );
    }

    // Delete the post
    await prisma.post.delete({
      where: { id: postId },
    });

    return NextResponse.json({ success: true, message: 'Post deleted successfully' });
  } catch (error) {
    console.error('Error deleting post:', error);
    return NextResponse.json(
      { error: 'Failed to delete post' },
      { status: 500 }
    );
  }
}

// PATCH /api/my-posts/[postId] - Edit user's own post (within time limit)
export async function PATCH(
  request: NextRequest,
  { params }: { params: { postId: string } }
) {
  try {
    const body = await request.json();
    const { firebase_uid, content } = body;
    const postId = params.postId;

    if (!firebase_uid) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    if (!content) {
      return NextResponse.json(
        { error: 'Content is required' },
        { status: 400 }
      );
    }

    // Content validation
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

    // Find user
    const user = await prisma.user.findUnique({
      where: { firebase_uid },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Find post and verify ownership
    const post = await prisma.post.findUnique({
      where: { id: postId },
    });

    if (!post) {
      return NextResponse.json(
        { error: 'Post not found' },
        { status: 404 }
      );
    }

    if (post.user_id !== user.id) {
      return NextResponse.json(
        { error: 'You can only edit your own posts' },
        { status: 403 }
      );
    }

    // Check if post is still within edit window (5 minutes)
    const now = new Date();
    const createdAt = new Date(post.created_at);
    const diffMinutes = (now.getTime() - createdAt.getTime()) / (1000 * 60);

    if (diffMinutes > 5) {
      return NextResponse.json(
        { error: 'Edit window has expired. Posts can only be edited within 5 minutes of creation.' },
        { status: 403 }
      );
    }

    // Update the post
    const updatedPost = await prisma.post.update({
      where: { id: postId },
      data: {
        content,
        updated_at: now,
      },
    });

    return NextResponse.json({ success: true, post: updatedPost });
  } catch (error) {
    console.error('Error updating post:', error);
    return NextResponse.json(
      { error: 'Failed to update post' },
      { status: 500 }
    );
  }
}

