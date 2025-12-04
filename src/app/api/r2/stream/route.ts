import { NextRequest } from 'next/server';
import { getR2 } from '@/lib/env';

import { connection } from 'next/server';

/**
 * GET /api/r2/stream
 * Streams video files from R2 bucket
 * Public access for video previews
 */
export async function GET(request: NextRequest) {
    await connection();
    const startTime = Date.now();

    try {
        const searchParams = request.nextUrl.searchParams;
        const r2Key = searchParams.get('r2_key');

        console.log(`[/api/r2/stream] [GET] Request started - R2 Key: ${r2Key}`);

        if (!r2Key) {
            console.log(`[/api/r2/stream] [GET] [400] Missing r2_key parameter`);
            return new Response('Missing r2_key parameter', { status: 400 });
        }

        const bucket = getR2();
        const object = await bucket.get(r2Key);

        if (!object) {
            console.log(`[/api/r2/stream] [GET] [404] Video not found: ${r2Key}`);
            return new Response('Video not found', { status: 404 });
        }

        const fileSizeMB = (object.size / (1024 * 1024)).toFixed(2);
        const contentType = object.httpMetadata?.contentType || 'video/webm';
        console.log(`[/api/r2/stream] [GET] Streaming video: ${r2Key} (${fileSizeMB}MB, ${contentType})`);

        const headers = new Headers();
        // Manual header setting to avoid potential serialization issues in dev
        if (object.httpMetadata?.contentType) {
            headers.set('Content-Type', object.httpMetadata.contentType);
        }
        if (object.httpMetadata?.contentDisposition) {
            headers.set('Content-Disposition', object.httpMetadata.contentDisposition);
        }
        if (object.httpMetadata?.cacheControl) {
            headers.set('Cache-Control', object.httpMetadata.cacheControl);
        } else {
            headers.set('Cache-Control', 'public, max-age=604800'); // 7 days default
        }
        headers.set('etag', object.httpEtag);

        const duration = Date.now() - startTime;
        console.log(`[/api/r2/stream] [GET] [200] Video stream started successfully - Duration: ${duration}ms`);

        return new Response(object.body, {
            headers,
        });

    } catch (error) {
        const duration = Date.now() - startTime;
        console.error(`[/api/r2/stream] [GET] [500] Error streaming video - Duration: ${duration}ms`, error);
        return new Response('Failed to stream video', { status: 500 });
    }
}
