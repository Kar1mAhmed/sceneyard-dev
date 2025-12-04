import { NextRequest } from 'next/server';
import { getR2 } from '@/lib/env';
import { auth } from '@/features/auth/auth';

import { connection } from 'next/server';

/**
 * GET /api/r2/download
 * Streams zip files from R2 bucket for download
 * Requires admin authentication
 */
export async function GET(request: NextRequest) {
    await connection();
    const startTime = Date.now();

    try {
        // Check authentication - admin only
        const session = await auth();
        const userEmail = session?.user?.email || 'unknown';
        const searchParams = request.nextUrl.searchParams;
        const r2Key = searchParams.get('r2_key');

        console.log(`[/api/r2/download] [GET] Request started - User: ${userEmail}, R2 Key: ${r2Key}`);

        // @ts-ignore
        if (!session?.user || session.user.role !== 'admin') {
            console.log(`[/api/r2/download] [GET] [401] Unauthorized access attempt - User: ${userEmail}`);
            return new Response('Unauthorized', { status: 401 });
        }

        if (!r2Key) {
            console.log(`[/api/r2/download] [GET] [400] Missing r2_key parameter - User: ${userEmail}`);
            return new Response('Missing r2_key parameter', { status: 400 });
        }

        const bucket = getR2();
        const object = await bucket.get(r2Key);

        if (!object) {
            console.log(`[/api/r2/download] [GET] [404] File not found: ${r2Key} - User: ${userEmail}`);
            return new Response('File not found', { status: 404 });
        }

        const fileSizeMB = (object.size / (1024 * 1024)).toFixed(2);
        console.log(`[/api/r2/download] [GET] Streaming file: ${r2Key} (${fileSizeMB}MB) - User: ${userEmail}`);

        const headers = new Headers();
        object.writeHttpMetadata(headers);
        headers.set('etag', object.httpEtag);
        headers.set('Content-Disposition', `attachment; filename="${r2Key.split('/').pop()}"`);
        headers.set('Cache-Control', 'private, no-cache');

        const duration = Date.now() - startTime;
        console.log(`[/api/r2/download] [GET] [200] File download started successfully - Duration: ${duration}ms`);

        return new Response(object.body, {
            headers,
        });

    } catch (error) {
        const duration = Date.now() - startTime;
        console.error(`[/api/r2/download] [GET] [500] Error downloading file - Duration: ${duration}ms`, error);
        return new Response('Failed to download file', { status: 500 });
    }
}
