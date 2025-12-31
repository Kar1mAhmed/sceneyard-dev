import { getDb } from '@/lib/env';
import { v4 as uuidv4 } from 'uuid';

export interface Download {
    id: string;
    user_id: string;
    template_id: string;
    cost_credits: number;
    idempotency_key: string | null;
    created_at: number;
}

export interface DownloadWithTemplate extends Download {
    template_title: string;
    template_orientation: string;
    thumbnail_r2_key: string | null;
}

/**
 * Create a new download record
 */
export async function createDownload(
    userId: string,
    templateId: string,
    costCredits: number,
    idempotencyKey?: string
): Promise<Download> {
    const db = getDb();
    const id = uuidv4();
    const key = idempotencyKey || `${userId}-${templateId}-${Date.now()}`;

    await db.prepare(`
        INSERT INTO downloads (id, user_id, template_id, cost_credits, idempotency_key)
        VALUES (?, ?, ?, ?, ?)
    `).bind(id, userId, templateId, costCredits, key).run();

    console.log(`[downloads/repo] Created download: ${id} for user ${userId}, template ${templateId}`);

    return {
        id,
        user_id: userId,
        template_id: templateId,
        cost_credits: costCredits,
        idempotency_key: key,
        created_at: Math.floor(Date.now() / 1000),
    };
}

/**
 * Get all downloads for a user with template details
 */
export async function getDownloadsByUser(userId: string): Promise<DownloadWithTemplate[]> {
    const db = getDb();

    const result = await db.prepare(`
        SELECT 
            d.id,
            d.user_id,
            d.template_id,
            d.cost_credits,
            d.idempotency_key,
            d.created_at,
            t.title as template_title,
            t.orientation as template_orientation,
            a.r2_key as thumbnail_r2_key
        FROM downloads d
        JOIN templates t ON d.template_id = t.id
        LEFT JOIN assets a ON t.preview_thumbnail_id = a.id
        WHERE d.user_id = ?
        ORDER BY d.created_at DESC
    `).bind(userId).all();

    console.log(`[downloads/repo] Fetched ${result.results.length} downloads for user ${userId}`);

    return result.results as unknown as DownloadWithTemplate[];
}

/**
 * Check if user has already downloaded a template (for idempotency)
 */
export async function hasUserDownloaded(userId: string, templateId: string): Promise<boolean> {
    const db = getDb();

    const result = await db.prepare(`
        SELECT id FROM downloads
        WHERE user_id = ? AND template_id = ?
        LIMIT 1
    `).bind(userId, templateId).first();

    return !!result;
}

/**
 * Get a specific download by ID
 */
export async function getDownloadById(downloadId: string): Promise<Download | null> {
    const db = getDb();

    const result = await db.prepare(`
        SELECT * FROM downloads WHERE id = ?
    `).bind(downloadId).first();

    return result as Download | null;
}
