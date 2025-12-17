import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/features/auth/auth';
import { v4 as uuidv4 } from 'uuid';
import { generatePresignedPutUrl } from '@/lib/r2';

export async function POST(request: NextRequest) {
    const startTime = Date.now();

    try {
        const session = await auth();
        const userEmail = session?.user?.email || 'unknown';
        console.log(`[/api/r2/presigned-url] [POST] Request started - User: ${userEmail}`);

        if (session?.user?.role !== 'admin') {
            console.log(`[/api/r2/presigned-url] [POST] [401] Unauthorized access attempt - User: ${userEmail}`);
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await request.json() as { filename: string; contentType: string; kind: string; existingR2Key?: string };
        const { filename, contentType, kind, existingR2Key } = body;

        if (!filename || !contentType || !kind) {
            console.log(`[/api/r2/presigned-url] [POST] [400] Missing required fields - User: ${userEmail}`);
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        if (!['preview', 'thumbnail', 'download'].includes(kind)) {
            console.log(`[/api/r2/presigned-url] [POST] [400] Invalid kind: ${kind} - User: ${userEmail}`);
            return NextResponse.json({ error: 'Invalid kind' }, { status: 400 });
        }

        let assetId: string;
        let r2Key: string;

        if (existingR2Key) {
            // Security check: Ensure the key matches the kind to prevent cross-kind overwrites
            if (!existingR2Key.startsWith(`${kind}s/`)) {
                console.log(`[/api/r2/presigned-url] [POST] [400] Invalid existing key for kind - User: ${userEmail}`);
                return NextResponse.json({ error: 'Invalid existing key for this kind' }, { status: 400 });
            }
            r2Key = existingR2Key;
            // Extract assetId from key: kinds/assetId.ext
            const parts = r2Key.split('/');
            const filenamePart = parts[parts.length - 1];
            assetId = filenamePart.split('.')[0];
            console.log(`[/api/r2/presigned-url] [POST] Reusing existing key: ${r2Key} - User: ${userEmail}`);
        } else {
            assetId = uuidv4();
            // Generate R2 key with proper structure
            const extension = filename.split('.').pop();
            r2Key = `${kind}s/${assetId}.${extension}`;
            console.log(`[/api/r2/presigned-url] [POST] Generating new key: ${r2Key} - User: ${userEmail}`);
        }

        console.log(`[/api/r2/presigned-url] [POST] Generating signed URL for: ${r2Key} (${kind}) - User: ${userEmail}`);

        // Generate Presigned URL using helper
        const signedUrl = await generatePresignedPutUrl(r2Key, contentType);
        const duration = Date.now() - startTime;

        console.log(`[/api/r2/presigned-url] [POST] [200] Signed URL generated successfully - Asset ID: ${assetId}, Duration: ${duration}ms`);

        // Return credentials for client-side upload
        return NextResponse.json({
            assetId,
            r2Key,
            uploadEndpoint: signedUrl
        });

    } catch (error) {
        const duration = Date.now() - startTime;
        console.error(`[/api/r2/presigned-url] [POST] [500] Upload credentials error - Duration: ${duration}ms`, error);
        return NextResponse.json({ error: 'Failed to generate upload credentials' }, { status: 500 });
    }
}
