import { NextRequest, NextResponse } from 'next/server';
import { connection } from 'next/server';
import { auth } from '@/features/auth/auth';
import { getR2 } from '@/lib/env';

export async function POST(request: NextRequest) {
    await connection();

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

        console.log(`[R2 Upload] Starting upload: ${r2Key}, size: ${file.size} bytes`);

        const r2 = getR2();
        if (!r2) {
            console.error('[R2 Upload] R2 bucket not available');
            return NextResponse.json({ error: 'R2 storage not configured' }, { status: 503 });
        }

        // Upload to R2
        const arrayBuffer = await file.arrayBuffer();
        await r2.put(r2Key, arrayBuffer, {
            httpMetadata: {
                contentType: file.type,
            },
        });

        console.log(`[R2 Upload] Successfully uploaded: ${r2Key}`);

        return NextResponse.json({
            success: true,
            r2Key,
            size: file.size
        });

    } catch (error) {
        console.error('[R2 Upload] Error:', error);
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        return NextResponse.json({
            error: 'Failed to upload file',
            details: errorMessage
        }, { status: 500 });
    }
}
