import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/my-posts - Get user's own posts
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const firebase_uid = searchParams.get('firebase_uid');

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
      return NextResponse.json({ posts: [] });
    }

    // Fetch user's posts with company info
    const posts = await prisma.post.findMany({
      where: {
        user_id: user.id,
      },
      orderBy: {
        created_at: 'desc',
      },
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

    // Calculate if each post is editable (within 5 minutes of creation)
    const now = new Date();
    const postsWithMeta = posts.map((post) => {
      const createdAt = new Date(post.created_at);
      const diffMinutes = (now.getTime() - createdAt.getTime()) / (1000 * 60);
      const isEditable = diffMinutes <= 5; // 5 minute edit window
      const isPublished = post.is_published || (post.publish_at && new Date(post.publish_at) <= now);

      return {
        ...post,
        isEditable,
        isPublished,
        editTimeRemaining: isEditable ? Math.ceil(5 - diffMinutes) : 0,
      };
    });

    return NextResponse.json({ posts: postsWithMeta });
  } catch (error) {
    console.error('Error fetching user posts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch posts' },
      { status: 500 }
    );
  }
}

