import { NextResponse } from 'next/server';
import { getAllTags } from '@/features/tags/repo';

import { connection } from 'next/server';

export async function GET() {
    await connection();
    try {
        const tags = await getAllTags();
        return NextResponse.json({ tags });
    } catch (error) {
        console.error('Get tags error:', error);
        return NextResponse.json({ error: 'Failed to fetch tags' }, { status: 500 });
    }
}
