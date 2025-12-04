import { NextRequest, NextResponse } from 'next/server';
import { getR2 } from '@/lib/env';
import { auth } from '@/features/auth/auth';

/**
 * POST /api/r2/download-url
 * Returns streaming URL for zip file downloads
 * Requires admin authentication
 */
export async function POST(request: NextRequest) {
    const startTime = Date.now();

    try {
        // Check authentication - admin only
        const session = await auth();
        const userEmail = session?.user?.email || 'unknown';
        console.log(`[/api/r2/download-url] [POST] Request started - User: ${userEmail}`);

        // @ts-ignore
        if (!session?.user || session.user.role !== 'admin') {
            console.log(`[/api/r2/download-url] [POST] [401] Unauthorized access attempt - User: ${userEmail}`);
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        const body = await request.json() as { r2_key: string };
        const r2_key = body.r2_key;

        if (!r2_key) {
            console.log(`[/api/r2/download-url] [POST] [400] Missing r2_key parameter - User: ${userEmail}`);
            return NextResponse.json(
                { error: 'Missing r2_key parameter' },
                { status: 400 }
            );
        }

        console.log(`[/api/r2/download-url] [POST] Generating download URL for: ${r2_key} - User: ${userEmail}`);

        const bucket = getR2();
        const object = await bucket.get(r2_key);

        if (!object) {
            console.log(`[/api/r2/download-url] [POST] [404] Asset not found: ${r2_key} - User: ${userEmail}`);
            return NextResponse.json(
                { error: 'Asset not found' },
                { status: 404 }
            );
        }

        // Return a URL to the download endpoint
        const downloadUrl = `/api/r2/download?r2_key=${encodeURIComponent(r2_key)}`;
        const fileSizeMB = (object.size / (1024 * 1024)).toFixed(2);
        const duration = Date.now() - startTime;

        console.log(`[/api/r2/download-url] [POST] [200] Download URL generated successfully - File: ${r2_key} (${fileSizeMB}MB), Duration: ${duration}ms`);

        return NextResponse.json({
            url: downloadUrl,
            r2_key,
            contentType: object.httpMetadata?.contentType || 'application/zip',
            size: object.size,
            expiresIn: 'session' // Valid for the current session
        });

    } catch (error) {
        const duration = Date.now() - startTime;
        console.error(`[/api/r2/download-url] [POST] [500] Error generating download URL - Duration: ${duration}ms`, error);
        return NextResponse.json(
            { error: 'Failed to generate download URL', details: error instanceof Error ? error.message : 'Unknown error' },
            { status: 500 }
        );
    }
}
