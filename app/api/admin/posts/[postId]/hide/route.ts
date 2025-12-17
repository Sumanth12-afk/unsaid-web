import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// POST /api/admin/posts/[postId]/hide - Toggle post visibility
export async function POST(
  request: NextRequest,
  { params }: { params: { postId: string } }
) {
  try {
    // Check admin authentication
    const firebaseUid = request.headers.get('x-firebase-uid');
    
    if (!firebaseUid) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { firebase_uid: firebaseUid },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized: Admin access only' },
        { status: 403 }
      );
    }

    const post = await prisma.post.findUnique({
      where: { id: params.postId },
      select: { is_hidden: true },
    });

    if (!post) {
      return NextResponse.json(
        { error: 'Post not found' },
        { status: 404 }
      );
    }

    // Toggle hidden status
    const updatedPost = await prisma.post.update({
      where: { id: params.postId },
      data: {
        is_hidden: !post.is_hidden,
      },
    });

    return NextResponse.json({ 
      success: true, 
      is_hidden: updatedPost.is_hidden 
    });
  } catch (error) {
    console.error('Error toggling post visibility:', error);
    return NextResponse.json(
      { error: 'Failed to update post' },
      { status: 500 }
    );
  }
}

