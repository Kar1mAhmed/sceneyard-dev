import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/features/auth/auth';
import { toggleLike, getLikesWithTemplates, getLikedTemplateIds } from '@/features/likes/service';

/**
 * POST /api/likes - Toggle like for a template
 * Body: { templateId: string }
 */
export async function POST(request: NextRequest) {
    try {
        const session = await auth();

        if (!session?.user?.id) {
            console.log('[API /api/likes POST] Unauthorized - no session');
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await request.json() as { templateId?: string };
        const { templateId } = body;

        if (!templateId) {
            console.log('[API /api/likes POST] Missing templateId');
            return NextResponse.json({ error: 'Missing templateId' }, { status: 400 });
        }

        console.log(`[API /api/likes POST] User ${session.user.id} toggling like for template ${templateId}`);

        const result = await toggleLike(session.user.id, templateId);

        console.log(`[API /api/likes POST] Result: liked=${result.liked}, newCount=${result.newCount}`);

        return NextResponse.json({
            success: true,
            liked: result.liked,
            likesCount: result.newCount
        });
    } catch (error) {
        console.error('[API /api/likes POST] Error:', error);
        return NextResponse.json(
            { error: 'Failed to toggle like' },
            { status: 500 }
        );
    }
}

/**
 * GET /api/likes - Get user's liked templates
 * Query params:
 *   - full=true: Get full template details (for favorites page)
 *   - full=false (default): Get only template IDs (for initial state)
 */
export async function GET(request: NextRequest) {
    try {
        const session = await auth();

        if (!session?.user?.id) {
            console.log('[API /api/likes GET] Unauthorized - no session');
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { searchParams } = new URL(request.url);
        const full = searchParams.get('full') === 'true';

        console.log(`[API /api/likes GET] User ${session.user.id} fetching likes (full=${full})`);

        if (full) {
            const likes = await getLikesWithTemplates(session.user.id);
            console.log(`[API /api/likes GET] Returning ${likes.length} liked templates with details`);
            return NextResponse.json({ likes });
        } else {
            const templateIds = await getLikedTemplateIds(session.user.id);
            console.log(`[API /api/likes GET] Returning ${templateIds.length} liked template IDs`);
            return NextResponse.json({ likedTemplateIds: templateIds });
        }
    } catch (error) {
        console.error('[API /api/likes GET] Error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch likes' },
            { status: 500 }
        );
    }
}
