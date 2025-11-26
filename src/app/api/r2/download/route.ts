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
    try {
        // Check authentication - admin only
        const session = await auth();
        // @ts-ignore
        if (!session?.user || session.user.role !== 'admin') {
            return new Response('Unauthorized', { status: 401 });
        }

        const searchParams = request.nextUrl.searchParams;
        const r2Key = searchParams.get('r2_key');

        if (!r2Key) {
            return new Response('Missing r2_key parameter', { status: 400 });
        }

        const bucket = getR2();
        const object = await bucket.get(r2Key);

        if (!object) {
            return new Response('File not found', { status: 404 });
        }

        const headers = new Headers();
        object.writeHttpMetadata(headers);
        headers.set('etag', object.httpEtag);
        headers.set('Content-Disposition', `attachment; filename="${r2Key.split('/').pop()}"`);
        headers.set('Cache-Control', 'private, no-cache');

        return new Response(object.body, {
            headers,
        });

    } catch (error) {
        console.error('Error downloading file:', error);
        return new Response('Failed to download file', { status: 500 });
    }
}
