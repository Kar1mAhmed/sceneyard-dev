import { AwsClient } from 'aws4fetch';
import { getCloudflareEnv } from '@/lib/env';

/**
 * Generate a presigned URL for uploading a file to R2 using PUT method.
 * Uses aws4fetch for Cloudflare Worker compatibility.
 */
export async function generatePresignedPutUrl(
    r2Key: string,
    contentType: string,
    expiresIn: number = 3600
): Promise<string> {
    const env = getCloudflareEnv();

    const r2 = new AwsClient({
        accessKeyId: env.R2_ACCESS_KEY_ID,
        secretAccessKey: env.R2_SECRET_ACCESS_KEY,
        region: 'auto',
        service: 's3',
    });

    const url = new URL(
        `https://${env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com/${env.R2_BUCKET_NAME}/${r2Key}`
    );

    const signedUrl = await r2.sign(url, {
        method: 'PUT',
        aws: { signQuery: true },
        headers: {
            'Content-Type': contentType
        }
    });

    return signedUrl.url;
}

/**
 * Delete a file from R2 using the R2 bucket binding.
 * This is more efficient than using the S3 API for deletions within Workers.
 */
export async function deleteFileFromR2(key: string): Promise<void> {
    const env = getCloudflareEnv();
    if (!env.ASSET_BUCKET) {
        throw new Error('ASSET_BUCKET binding not found');
    }
    await env.ASSET_BUCKET.delete(key);
}
