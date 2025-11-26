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
    try {
        const searchParams = request.nextUrl.searchParams;
        const r2Key = searchParams.get('r2_key');

        if (!r2Key) {
            return new Response('Missing r2_key parameter', { status: 400 });
        }

        const bucket = getR2();
        const object = await bucket.get(r2Key);

        if (!object) {
            return new Response('Video not found', { status: 404 });
        }

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

        return new Response(object.body, {
            headers,
        });

    } catch (error) {
        console.error('Error streaming video:', error);
        return new Response('Failed to stream video', { status: 500 });
    }
}
