import { getDb } from '@/lib/env';
import { Tag } from '../categories/types';
import { v4 as uuidv4 } from 'uuid';

function slugify(text: string): string {
    return text
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_-]+/g, '-')
        .replace(/^-+|-+$/g, '');
}

export async function getAllTags(): Promise<Tag[]> {
    const db = getDb();
    const { results } = await db.prepare('SELECT * FROM tags ORDER BY name ASC').all<Tag>();
    return results;
}

export async function createOrGetTag(name: string): Promise<Tag> {
    const db = getDb();
    const normalizedName = name.toLowerCase().trim();
    const slug = slugify(normalizedName);

    // Try to find existing tag
    const existing = await db.prepare('SELECT * FROM tags WHERE slug = ?').bind(slug).first<Tag>();
    if (existing) {
        return existing;
    }

    // Create new tag
    const id = uuidv4();
    await db.prepare('INSERT INTO tags (id, name, slug) VALUES (?, ?, ?)').bind(id, normalizedName, slug).run();

    return { id, name: normalizedName, slug };
}

export async function getTemplateTags(templateId: string): Promise<Tag[]> {
    const db = getDb();
    const { results } = await db.prepare(`
        SELECT t.* FROM tags t
        INNER JOIN template_tags tt ON t.id = tt.tag_id
        WHERE tt.template_id = ?
    `).bind(templateId).all<Tag>();
    return results;
}

export async function setTemplateTags(templateId: string, tagNames: string[]): Promise<void> {
    const db = getDb();

    // Delete existing associations
    await db.prepare('DELETE FROM template_tags WHERE template_id = ?').bind(templateId).run();

    // Create or get tags and associate them
    if (tagNames.length > 0) {
        const tags = await Promise.all(tagNames.map(name => createOrGetTag(name)));
        const statements = tags.map(tag =>
            db.prepare('INSERT INTO template_tags (template_id, tag_id) VALUES (?, ?)').bind(templateId, tag.id)
        );
        await db.batch(statements);
    }
}
