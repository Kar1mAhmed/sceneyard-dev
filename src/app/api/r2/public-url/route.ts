import { NextRequest, NextResponse } from 'next/server';
import { getR2 } from '@/lib/env';

import { connection } from 'next/server';

/**
 * GET /api/r2/public-url
 * Returns public R2 URL for video assets (preview and thumbnail)
 * Videos are publicly accessible - uses R2 bucket binding
 */
export async function GET(request: NextRequest) {
    await connection();
    const startTime = Date.now();

    try {
        const searchParams = request.nextUrl.searchParams;
        const r2Key = searchParams.get('r2_key');

        console.log(`[/api/r2/public-url] [GET] Request started - R2 Key: ${r2Key}`);

        if (!r2Key) {
            console.log(`[/api/r2/public-url] [GET] [400] Missing r2_key parameter`);
            return NextResponse.json(
                { error: 'Missing r2_key parameter' },
                { status: 400 }
            );
        }

        const bucket = getR2();

        // Get the object from R2
        const object = await bucket.get(r2Key);

        if (!object) {
            console.error(`[/api/r2/public-url] [GET] [404] Object not found in R2: ${r2Key}`);
            return NextResponse.json(
                { error: 'Asset not found' },
                { status: 404 }
            );
        }

        // For development, we can use R2's public URL if the bucket has public access
        // Or we need to stream the object through our API
        // Since R2 doesn't have built-in signed URLs like S3, we'll stream it

        // Convert the R2 object to a blob URL that can be used by the video player
        const arrayBuffer = await object.arrayBuffer();
        const blob = new Blob([arrayBuffer], { type: object.httpMetadata?.contentType || 'video/webm' });

        // Return the object as a data URL (for small files) or stream it
        // For better performance, we should stream it, but for now let's use a simpler approach

        // Actually, let's just return a URL to this same endpoint with a different parameter
        // that will stream the video
        const streamUrl = `/api/r2/stream?r2_key=${encodeURIComponent(r2Key)}`;
        const fileSizeMB = (object.size / (1024 * 1024)).toFixed(2);
        const duration = Date.now() - startTime;

        console.log(`[/api/r2/public-url] [GET] [200] Public URL generated successfully - File: ${r2Key} (${fileSizeMB}MB), Type: ${object.httpMetadata?.contentType}, Duration: ${duration}ms`);

        return NextResponse.json({
            url: streamUrl,
            r2_key: r2Key,
            contentType: object.httpMetadata?.contentType || 'video/webm',
            size: object.size
        });

    } catch (error) {
        const duration = Date.now() - startTime;
        console.error(`[/api/r2/public-url] [GET] [500] Error generating public URL - Duration: ${duration}ms`, error);
        return NextResponse.json(
            { error: 'Failed to generate public URL', details: error instanceof Error ? error.message : 'Unknown error' },
            { status: 500 }
        );
    }
}
