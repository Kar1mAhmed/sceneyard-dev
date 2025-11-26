import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/features/auth/auth';
import { getCategories, createCategory } from '@/features/categories/repo';

export async function GET() {
    try {
        const categories = await getCategories();
        return NextResponse.json({ categories });
    } catch (error) {
        console.error('Get categories error:', error);
        return NextResponse.json({ error: 'Failed to fetch categories' }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        const session = await auth();
        // @ts-ignore
        if (session?.user?.role !== 'admin') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await request.json() as { name: string };
        const { name } = body;

        if (!name) {
            return NextResponse.json({ error: 'Name is required' }, { status: 400 });
        }

        const category = await createCategory(name);
        return NextResponse.json({ category });

    } catch (error) {
        console.error('Create category error:', error);
        return NextResponse.json({ error: 'Failed to create category' }, { status: 500 });
    }
}
