import { NextResponse } from 'next/server';
import { getAllTags } from '@/features/tags/repo';

import { connection } from 'next/server';

export async function GET() {
    await connection();
    const startTime = Date.now();
    console.log('[/api/tags] [GET] Request started');

    try {
        const tags = await getAllTags();
        const duration = Date.now() - startTime;
        console.log(`[/api/tags] [GET] [200] Tags fetched successfully - Count: ${tags.length}, Duration: ${duration}ms`);
        return NextResponse.json({ tags });
    } catch (error) {
        const duration = Date.now() - startTime;
        console.error(`[/api/tags] [GET] [500] Error fetching tags - Duration: ${duration}ms`, error);
        return NextResponse.json({ error: 'Failed to fetch tags' }, { status: 500 });
    }
}
