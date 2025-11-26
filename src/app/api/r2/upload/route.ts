import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/features/auth/auth';
import { getR2 } from '@/lib/env';

export async function POST(request: NextRequest) {
    try {
        const session = await auth();
        // @ts-ignore
        if (session?.user?.role !== 'admin') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const formData = await request.formData();
        const file = formData.get('file') as File;
        const r2Key = formData.get('r2Key') as string;

        if (!file || !r2Key) {
            return NextResponse.json({ error: 'Missing file or r2Key' }, { status: 400 });
        }

        const r2 = getR2();

        // Upload to R2
        const arrayBuffer = await file.arrayBuffer();
        await r2.put(r2Key, arrayBuffer, {
            httpMetadata: {
                contentType: file.type,
            },
        });

        return NextResponse.json({
            success: true,
            r2Key,
            size: file.size
        });

    } catch (error) {
        console.error('R2 upload error:', error);
        return NextResponse.json({ error: 'Failed to upload file' }, { status: 500 });
    }
}
