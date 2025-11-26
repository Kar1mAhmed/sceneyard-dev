import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/features/auth/auth';
import { v4 as uuidv4 } from 'uuid';

export async function POST(request: NextRequest) {
    try {
        const session = await auth();
        // @ts-ignore
        if (session?.user?.role !== 'admin') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await request.json() as { filename: string; contentType: string; kind: string };
        const { filename, contentType, kind } = body;

        if (!filename || !contentType || !kind) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        if (!['preview', 'thumbnail', 'download'].includes(kind)) {
            return NextResponse.json({ error: 'Invalid kind' }, { status: 400 });
        }

        const assetId = uuidv4();

        // Generate R2 key with proper structure
        const extension = filename.split('.').pop();
        const r2Key = `${kind}s/${assetId}.${extension}`;

        // Return credentials for client-side upload via our API
        return NextResponse.json({
            assetId,
            r2Key,
            uploadEndpoint: '/api/r2/upload'
        });

    } catch (error) {
        console.error('Upload credentials error:', error);
        return NextResponse.json({ error: 'Failed to generate upload credentials' }, { status: 500 });
    }
}
