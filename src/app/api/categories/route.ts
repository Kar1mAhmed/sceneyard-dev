import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/features/auth/auth';
import { getCategories, createCategory } from '@/features/categories/repo';

export async function GET() {
    const startTime = Date.now();
    console.log('[/api/categories] [GET] Request started');

    try {
        const categories = await getCategories();
        const duration = Date.now() - startTime;
        console.log(`[/api/categories] [GET] [200] Categories fetched successfully - Count: ${categories.length}, Duration: ${duration}ms`);
        return NextResponse.json({ categories });
    } catch (error) {
        const duration = Date.now() - startTime;
        console.error(`[/api/categories] [GET] [500] Error fetching categories - Duration: ${duration}ms`, error);
        return NextResponse.json({ error: 'Failed to fetch categories' }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    const startTime = Date.now();

    try {
        const session = await auth();
        const userEmail = session?.user?.email || 'unknown';
        console.log(`[/api/categories] [POST] Request started - User: ${userEmail}`);

        // @ts-ignore
        if (session?.user?.role !== 'admin') {
            console.log(`[/api/categories] [POST] [401] Unauthorized access attempt - User: ${userEmail}`);
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await request.json() as { name: string };
        const { name } = body;

        if (!name) {
            console.log(`[/api/categories] [POST] [400] Validation error: Missing category name - User: ${userEmail}`);
            return NextResponse.json({ error: 'Name is required' }, { status: 400 });
        }

        console.log(`[/api/categories] [POST] Creating category: "${name}" - User: ${userEmail}`);
        const category = await createCategory(name);
        const duration = Date.now() - startTime;
        console.log(`[/api/categories] [POST] [200] Category created successfully - ID: ${category.id}, Name: "${name}", Duration: ${duration}ms`);
        return NextResponse.json({ category });

    } catch (error) {
        const duration = Date.now() - startTime;
        console.error(`[/api/categories] [POST] [500] Error creating category - Duration: ${duration}ms`, error);
        return NextResponse.json({ error: 'Failed to create category' }, { status: 500 });
    }
}
