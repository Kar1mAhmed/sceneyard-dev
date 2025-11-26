import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/features/auth/auth';
import { v4 as uuidv4 } from 'uuid';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { getCloudflareEnv } from '@/lib/env';

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

        const env = getCloudflareEnv();

        // Initialize S3 Client for R2
        const S3 = new S3Client({
            region: 'auto',
            endpoint: `https://${env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
            credentials: {
                accessKeyId: env.R2_ACCESS_KEY_ID,
                secretAccessKey: env.R2_SECRET_ACCESS_KEY,
            },
        });

        const assetId = uuidv4();

        // Generate R2 key with proper structure
        const extension = filename.split('.').pop();
        const r2Key = `${kind}s/${assetId}.${extension}`;

        // Generate Presigned URL
        const command = new PutObjectCommand({
            Bucket: env.R2_BUCKET_NAME,
            Key: r2Key,
            ContentType: contentType,
        });

        const signedUrl = await getSignedUrl(S3, command, { expiresIn: 3600 });

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
