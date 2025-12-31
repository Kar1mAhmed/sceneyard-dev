import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/features/auth/auth';
import { recordDownload, getUserDownloads } from '@/features/downloads/service';

/**
 * POST /api/downloads
 * Record a download and return the file URL
 */
export async function POST(request: NextRequest) {
    try {
        const session = await auth();

        if (!session?.user?.id) {
            console.log('[API /downloads] Unauthorized request');
            return NextResponse.json(
                { error: 'Authentication required' },
                { status: 401 }
            );
        }

        const body = await request.json() as { templateId?: string };
        const { templateId } = body;

        if (!templateId) {
            return NextResponse.json(
                { error: 'Template ID is required' },
                { status: 400 }
            );
        }

        console.log(`[API /downloads] Recording download for user ${session.user.id}, template ${templateId}`);

        const result = await recordDownload(session.user.id, templateId);

        if (!result.success) {
            return NextResponse.json(
                { error: result.error },
                { status: 400 }
            );
        }

        return NextResponse.json({
            success: true,
            downloadUrl: result.downloadUrl,
            alreadyDownloaded: result.alreadyDownloaded,
        });

    } catch (error) {
        console.error('[API /downloads] Error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

/**
 * GET /api/downloads
 * Get user's download history
 */
export async function GET() {
    try {
        const session = await auth();

        if (!session?.user?.id) {
            console.log('[API /downloads] Unauthorized request');
            return NextResponse.json(
                { error: 'Authentication required' },
                { status: 401 }
            );
        }

        console.log(`[API /downloads] Fetching downloads for user ${session.user.id}`);

        const downloads = await getUserDownloads(session.user.id);

        return NextResponse.json({ downloads });

    } catch (error) {
        console.error('[API /downloads] Error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
