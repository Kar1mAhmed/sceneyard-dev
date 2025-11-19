import { getCloudflareContext } from '@opennextjs/cloudflare';

export interface CloudflareEnv {
    AUTH_URL: string;
    AUTH_GOOGLE_ID: string;
    AUTH_GOOGLE_SECRET: string;
    AUTH_SECRET: string;
    SCENEYARD_DB: D1Database;
    ASSETS: Fetcher;
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
