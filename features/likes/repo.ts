import { getDb } from '@/lib/env';
import { v4 as uuidv4 } from 'uuid';

export interface Like {
    id: string;
    user_id: string;
    template_id: string; // Maps to video_id in DB
    created_at: number;
}

export interface LikeWithTemplate extends Like {
    template_title: string;
    template_orientation: string;
    thumbnail_r2_key: string | null;
    credits_cost: number;
    likes_count: number;
    downloads_count: number;
}

/**
 * Toggle like for a template (add if not exists, remove if exists)
 * Returns whether the template is now liked
 * Note: DB column is video_id (legacy name), we use templateId in code
 */
export async function toggleLike(userId: string, templateId: string): Promise<{ liked: boolean; newCount: number }> {
    const db = getDb();

    // Check if already liked (video_id is the DB column name for template)
    const existing = await db.prepare(`
        SELECT id FROM likes WHERE user_id = ? AND video_id = ?
    `).bind(userId, templateId).first();

    if (existing) {
        // Remove like
        await db.prepare(`
            DELETE FROM likes WHERE user_id = ? AND video_id = ?
        `).bind(userId, templateId).run();

        // Decrement likes_count
        await db.prepare(`
            UPDATE templates SET likes_count = MAX(0, likes_count - 1) WHERE id = ?
        `).bind(templateId).run();

        const result = await db.prepare(`
            SELECT likes_count FROM templates WHERE id = ?
        `).bind(templateId).first<{ likes_count: number }>();

        console.log(`[likes/repo] User ${userId} unliked template ${templateId}`);
        return { liked: false, newCount: result?.likes_count ?? 0 };
    } else {
        // Add like
        const id = uuidv4();
        await db.prepare(`
            INSERT INTO likes (id, user_id, video_id) VALUES (?, ?, ?)
        `).bind(id, userId, templateId).run();

        // Increment likes_count
        await db.prepare(`
            UPDATE templates SET likes_count = likes_count + 1 WHERE id = ?
        `).bind(templateId).run();

        const result = await db.prepare(`
            SELECT likes_count FROM templates WHERE id = ?
        `).bind(templateId).first<{ likes_count: number }>();

        console.log(`[likes/repo] User ${userId} liked template ${templateId}`);
        return { liked: true, newCount: result?.likes_count ?? 0 };
    }
}

/**
 * Check if a user has liked a template
 */
export async function isLikedByUser(userId: string, templateId: string): Promise<boolean> {
    const db = getDb();

    const result = await db.prepare(`
        SELECT id FROM likes WHERE user_id = ? AND video_id = ?
    `).bind(userId, templateId).first();

    return !!result;
}

/**
 * Get all templates liked by a user with template details
 */
export async function getLikesWithTemplates(userId: string): Promise<LikeWithTemplate[]> {
    const db = getDb();

    const { results } = await db.prepare(`
        SELECT 
            l.id,
            l.user_id,
            l.video_id as template_id,
            l.created_at,
            t.title as template_title,
            t.orientation as template_orientation,
            t.credits_cost,
            t.likes_count,
            t.downloads_count,
            a.r2_key as thumbnail_r2_key
        FROM likes l
        JOIN templates t ON l.video_id = t.id
        LEFT JOIN assets a ON t.preview_thumbnail_id = a.id
        WHERE l.user_id = ? AND t.deleted_at IS NULL
        ORDER BY l.created_at DESC
    `).bind(userId).all();

    console.log(`[likes/repo] Fetched ${results.length} likes for user ${userId}`);

    return results as unknown as LikeWithTemplate[];
}

/**
 * Get template IDs liked by a user (for initial state on page load)
 */
export async function getLikedTemplateIds(userId: string): Promise<string[]> {
    const db = getDb();

    const { results } = await db.prepare(`
        SELECT video_id as template_id FROM likes WHERE user_id = ?
    `).bind(userId).all<{ template_id: string }>();

    return results.map(r => r.template_id);
}

