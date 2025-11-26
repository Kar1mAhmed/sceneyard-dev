import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/features/auth/auth';
import { createTemplate } from '@/features/templates/repo';

interface CreateTemplateBody {
    title: string;
    description: string;
    credits_cost: number;
    preview_asset_id: string;
    preview_thumbnail_id: string | null;
    file_asset_id: string;
    orientation: 'horizontal' | 'vertical';
    ae_version_min?: string;
    tags?: string;
}

export async function POST(request: NextRequest) {
    try {
        const session = await auth();
        // @ts-ignore
        if (session?.user?.role !== 'admin') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await request.json() as CreateTemplateBody;
        const template = await createTemplate(body);

        return NextResponse.json({ success: true, template });

    } catch (error) {
        console.error('Template creation error:', error);
        return NextResponse.json({ error: 'Failed to create template' }, { status: 500 });
    }
}
