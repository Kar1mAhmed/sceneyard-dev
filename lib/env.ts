import { getCloudflareContext } from '@opennextjs/cloudflare';

export interface CloudflareEnv {
    AUTH_URL: string;
    AUTH_GOOGLE_ID: string;
    AUTH_GOOGLE_SECRET: string;
    AUTH_SECRET: string;
    SCENEYARD_DB: D1Database;
    ASSETS: Fetcher;
    ASSET_BUCKET: R2Bucket;
    R2_ACCOUNT_ID: string;
    R2_ACCESS_KEY_ID: string;
    R2_SECRET_ACCESS_KEY: string;
    R2_BUCKET_NAME: string;
    R2_PUBLIC_DOMAIN: string;
}

export function getCloudflareEnv(): CloudflareEnv {
    // In development, process.env might be populated by Next.js from .env.local
    // In production (Cloudflare Workers), we use getCloudflareContext().env

    try {
        const cfContext = getCloudflareContext();
        if (cfContext && cfContext.env) {
            return cfContext.env as unknown as CloudflareEnv;
        }
    } catch (e) {
        // Ignore error if not in Cloudflare context (e.g. build time)
    }

    // Fallback to process.env for local dev if not running in worker context yet
    // or if specific vars are needed that are polyfilled
    return process.env as unknown as CloudflareEnv;
}

export function getDb() {
    const env = getCloudflareEnv();
    if (!env.SCENEYARD_DB) {
        throw new Error('SCENEYARD_DB binding not found');
    }
    return env.SCENEYARD_DB;
}

export function getR2() {
    const env = getCloudflareEnv();
    if (!env.ASSET_BUCKET) {
        throw new Error('ASSET_BUCKET binding not found');
    }
    return env.ASSET_BUCKET;
}
