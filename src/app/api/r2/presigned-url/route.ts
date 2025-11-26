import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/features/auth/auth';
import { v4 as uuidv4 } from 'uuid';
import { generatePresignedPutUrl } from '@/lib/r2';

export async function POST(request: NextRequest) {
    try {
        const session = await auth();
        // @ts-ignore
        if (session?.user?.role !== 'admin') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await request.json() as { filename: string; contentType: string; kind: string; existingR2Key?: string };
        const { filename, contentType, kind, existingR2Key } = body;

        if (!filename || !contentType || !kind) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        if (!['preview', 'thumbnail', 'download'].includes(kind)) {
            return NextResponse.json({ error: 'Invalid kind' }, { status: 400 });
        }

        let assetId: string;
        let r2Key: string;

        if (existingR2Key) {
            // Security check: Ensure the key matches the kind to prevent cross-kind overwrites
            if (!existingR2Key.startsWith(`${kind}s/`)) {
                return NextResponse.json({ error: 'Invalid existing key for this kind' }, { status: 400 });
            }
            r2Key = existingR2Key;
            // Extract assetId from key: kinds/assetId.ext
            const parts = r2Key.split('/');
            const filenamePart = parts[parts.length - 1];
            assetId = filenamePart.split('.')[0];
            console.log('[R2 Presigned] Reusing existing key:', r2Key);
        } else {
            assetId = uuidv4();
            // Generate R2 key with proper structure
            const extension = filename.split('.').pop();
            r2Key = `${kind}s/${assetId}.${extension}`;
            console.log('[R2 Presigned] Generating new key:', r2Key);
        }

        console.log('[R2 Presigned] Generating signed URL for:', r2Key);

        // Generate Presigned URL using helper
        const signedUrl = await generatePresignedPutUrl(r2Key, contentType);

        console.log('[R2 Presigned] Signed URL generated successfully');

        // Return credentials for client-side upload
        return NextResponse.json({
            assetId,
            r2Key,
            uploadEndpoint: signedUrl
        });

    } catch (error) {
        console.error('Upload credentials error:', error);
        return NextResponse.json({ error: 'Failed to generate upload credentials' }, { status: 500 });
    }
}
