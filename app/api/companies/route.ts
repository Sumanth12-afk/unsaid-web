import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/companies - List companies
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '20');

    const companies = await prisma.company.findMany({
      take: limit,
      orderBy: {
        created_at: 'desc',
      },
      select: {
        id: true,
        name: true,
        slug: true,
        industry: true,
        location: true,
        _count: {
          select: {
            posts: true,
          },
        },
      },
    });

    return NextResponse.json({
      companies: companies.map(c => ({
        ...c,
        postCount: c._count.posts,
        _count: undefined,
      })),
    });
  } catch (error) {
    console.error('Error fetching companies:', error);
    return NextResponse.json(
      { error: 'Failed to fetch companies' },
      { status: 500 }
    );
  }
}

// POST /api/companies - Create a new company
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, industry, location } = body;

    if (!name || name.trim().length === 0) {
      return NextResponse.json(
        { error: 'Company name is required' },
        { status: 400 }
      );
    }

    // Generate slug from name
    const slug = name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');

    // Check if company already exists
    const existing = await prisma.company.findFirst({
      where: {
        OR: [
          { slug },
          { name: { equals: name, mode: 'insensitive' } },
        ],
      },
    });

    if (existing) {
      return NextResponse.json(
        { error: 'Company already exists', company: existing },
        { status: 409 }
      );
    }

    // Create company
    const company = await prisma.company.create({
      data: {
        name: name.trim(),
        slug,
        industry: industry?.trim() || null,
        location: location?.trim() || null,
      },
    });

    return NextResponse.json({ company }, { status: 201 });
  } catch (error) {
    console.error('Error creating company:', error);
    return NextResponse.json(
      { error: 'Failed to create company' },
      { status: 500 }
    );
  }
}

