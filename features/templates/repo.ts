import { getDb } from '@/lib/env';
import { Template, Asset, TemplateWithAssets } from './types';
import { v4 as uuidv4 } from 'uuid';

export async function getTemplateStats() {
    const db = getDb();
    const total = await db.prepare('SELECT COUNT(*) as count FROM templates WHERE deleted_at IS NULL').first<{ count: number }>();
    const published = await db.prepare('SELECT COUNT(*) as count FROM templates WHERE published_at IS NOT NULL AND deleted_at IS NULL').first<{ count: number }>();
    return {
        total: total?.count || 0,
        published: published?.count || 0
    };
}

export async function getTemplates(limit = 50, offset = 0): Promise<Template[]> {
    const db = getDb();
    const { results } = await db.prepare(`
        SELECT * FROM templates 
        WHERE deleted_at IS NULL 
        ORDER BY created_at DESC 
        LIMIT ? OFFSET ?
    `).bind(limit, offset).all<Template>();
    return results;
}

export async function getTemplatesWithThumbnails(limit = 50, offset = 0): Promise<(Template & { thumbnail_r2_key?: string })[]> {
    const db = getDb();
    const { results } = await db.prepare(`
        SELECT 
            t.*,
            a.r2_key as thumbnail_r2_key
        FROM templates t
        LEFT JOIN assets a ON t.preview_thumbnail_id = a.id
        WHERE t.deleted_at IS NULL 
        ORDER BY t.created_at DESC 
        LIMIT ? OFFSET ?
    `).bind(limit, offset).all<Template & { thumbnail_r2_key?: string }>();
    return results;
}


export async function getTemplateById(id: string): Promise<TemplateWithAssets | null> {
    const db = getDb();
    const template = await db.prepare('SELECT * FROM templates WHERE id = ?').bind(id).first<Template>();

    if (!template) return null;

    const previewAsset = await db.prepare('SELECT * FROM assets WHERE id = ?').bind(template.preview_asset_id).first<Asset>();
    const thumbnailAsset = template.preview_thumbnail_id
        ? await db.prepare('SELECT * FROM assets WHERE id = ?').bind(template.preview_thumbnail_id).first<Asset>()
        : null;
    const fileAsset = await db.prepare('SELECT * FROM assets WHERE id = ?').bind(template.file_asset_id).first<Asset>();

    return {
        ...template,
        preview_asset: previewAsset || undefined,
        preview_thumbnail: thumbnailAsset || undefined,
        file_asset: fileAsset || undefined
    };
}


export async function createAsset(data: {
    id: string;
    kind: 'preview' | 'download';
    r2_key: string;
    mime: string;
    bytes: number;
}): Promise<void> {
    const db = getDb();
    const now = Math.floor(Date.now() / 1000);

    await db.prepare(`
        INSERT INTO assets (id, kind, r2_key, mime, bytes, created_at)
        VALUES (?, ?, ?, ?, ?, ?)
    `).bind(data.id, data.kind, data.r2_key, data.mime, data.bytes, now).run();
}

export async function createTemplate(data: {
    title: string;
    description: string;
    credits_cost: number;
    preview_asset_id: string;
    preview_thumbnail_id: string | null;
    file_asset_id: string;
    orientation: 'horizontal' | 'vertical';
    ae_version_min?: string;
    tags?: string;
}): Promise<Template> {
    const db = getDb();
    const now = Math.floor(Date.now() / 1000);
    const templateId = uuidv4();

    await db.prepare(`
        INSERT INTO templates (
            id, title, description, preview_asset_id, preview_thumbnail_id, file_asset_id, 
            ae_version_min, credits_cost, orientation, tags_text, created_at, updated_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).bind(
        templateId,
        data.title,
        data.description,
        data.preview_asset_id,
        data.preview_thumbnail_id,
        data.file_asset_id,
        data.ae_version_min || null,
        data.credits_cost,
        data.orientation,
        data.tags || '',
        now,
        now
    ).run();

    return {
        id: templateId,
        title: data.title,
        description: data.description,
        preview_asset_id: data.preview_asset_id,
        preview_thumbnail_id: data.preview_thumbnail_id,
        file_asset_id: data.file_asset_id,
        ae_version_min: data.ae_version_min || null,
        credits_cost: data.credits_cost,
        orientation: data.orientation,
        likes_count: 0,
        downloads_count: 0,
        tags_text: data.tags || '',
        published_at: null,
        early_access_until: null,
        deleted_at: null,
        created_at: now,
        updated_at: now
    };
}

export async function updateTemplate(id: string, data: Partial<Template>): Promise<void> {
    const db = getDb();
    const sets: string[] = [];
    const values: any[] = [];

    if (data.title !== undefined) { sets.push('title = ?'); values.push(data.title); }
    if (data.description !== undefined) { sets.push('description = ?'); values.push(data.description); }
    if (data.credits_cost !== undefined) { sets.push('credits_cost = ?'); values.push(data.credits_cost); }
    if (data.ae_version_min !== undefined) { sets.push('ae_version_min = ?'); values.push(data.ae_version_min); }
    if (data.tags_text !== undefined) { sets.push('tags_text = ?'); values.push(data.tags_text); }
    if (data.published_at !== undefined) { sets.push('published_at = ?'); values.push(data.published_at); }

    if (sets.length === 0) return;

    sets.push('updated_at = ?');
    values.push(Math.floor(Date.now() / 1000));
    values.push(id);

    await db.prepare(`UPDATE templates SET ${sets.join(', ')} WHERE id = ?`).bind(...values).run();
}

export async function deleteTemplate(id: string): Promise<void> {
    const db = getDb();
    const now = Math.floor(Date.now() / 1000);
    await db.prepare('UPDATE templates SET deleted_at = ? WHERE id = ?').bind(now, id).run();
}
