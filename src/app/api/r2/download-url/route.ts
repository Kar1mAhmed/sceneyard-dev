import { NextRequest, NextResponse } from 'next/server';
import { getR2 } from '@/lib/env';
import { auth } from '@/features/auth/auth';

/**
 * POST /api/r2/download-url
 * Returns streaming URL for zip file downloads
 * Requires admin authentication
 */
export async function POST(request: NextRequest) {
    try {
        // Check authentication - admin only
        const session = await auth();
        // @ts-ignore
        if (!session?.user || session.user.role !== 'admin') {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        const body = await request.json() as { r2_key: string };
        const r2_key = body.r2_key;

        if (!r2_key) {
            return NextResponse.json(
                { error: 'Missing r2_key parameter' },
                { status: 400 }
            );
        }

        const bucket = getR2();
        const object = await bucket.get(r2_key);

        if (!object) {
            return NextResponse.json(
                { error: 'Asset not found' },
                { status: 404 }
            );
        }

        // Return a URL to the download endpoint
        const downloadUrl = `/api/r2/download?r2_key=${encodeURIComponent(r2_key)}`;

        return NextResponse.json({
            url: downloadUrl,
            r2_key,
            contentType: object.httpMetadata?.contentType || 'application/zip',
            size: object.size,
            expiresIn: 'session' // Valid for the current session
        });

    } catch (error) {
        console.error('Error generating download URL:', error);
        return NextResponse.json(
            { error: 'Failed to generate download URL', details: error instanceof Error ? error.message : 'Unknown error' },
            { status: 500 }
        );
    }
}
