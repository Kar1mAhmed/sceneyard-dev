import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/features/auth/auth';
import { createTemplate } from '@/features/templates/service';
import { CreateTemplateData } from '@/features/templates/types';

export async function POST(request: NextRequest) {
    const startTime = Date.now();

    try {
        const session = await auth();
        const userEmail = session?.user?.email || 'unknown';
        console.log(`[/api/templates/create] [POST] Request started - User: ${userEmail}`);

        if (session?.user?.role !== 'admin') {
            console.log(`[/api/templates/create] [POST] [401] Unauthorized access attempt - User: ${userEmail}`);
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await request.json() as CreateTemplateData;
        console.log(`[/api/templates/create] [POST] Creating template: "${body.title}" (${body.credits_cost} credits) - User: ${userEmail}`);

        const template = await createTemplate(body);
        const duration = Date.now() - startTime;
        console.log(`[/api/templates/create] [POST] [200] Template created successfully - ID: ${template.id}, Title: "${body.title}", Duration: ${duration}ms`);

        return NextResponse.json({ success: true, template });

    } catch (error) {
        const duration = Date.now() - startTime;
        console.error(`[/api/templates/create] [POST] [500] Template creation error - Duration: ${duration}ms`, error);
        return NextResponse.json({ error: 'Failed to create template' }, { status: 500 });
    }
}
