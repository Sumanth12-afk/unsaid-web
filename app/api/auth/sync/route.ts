import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { hashEmail } from '@/lib/utils';
import { TRUST_WEIGHTS } from '@/lib/constants';

// POST /api/auth/sync - Sync Firebase user with database
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { firebase_uid, email } = body;

    if (!firebase_uid || !email) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const email_hash = hashEmail(email);

    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { firebase_uid },
    });

    if (existingUser) {
      // User exists, return success
      return NextResponse.json({ user: existingUser });
    }

    // Create new user
    const user = await prisma.user.create({
      data: {
        firebase_uid,
        email_hash,
        trust_score: TRUST_WEIGHTS.LOGGED_IN_USER,
        is_verified: true, // Firebase email verification can be added
      },
    });

    return NextResponse.json({ user }, { status: 201 });
  } catch (error: any) {
    console.error('Error syncing user:', error);
    
    // Handle duplicate email_hash
    if (error.code === 'P2002') {
      return NextResponse.json(
        { error: 'Email already registered with different account' },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to sync user' },
      { status: 500 }
    );
  }
}

