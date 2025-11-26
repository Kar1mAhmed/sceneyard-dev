import { getDb } from '@/lib/env';
import { Category } from './types';
import { v4 as uuidv4 } from 'uuid';

function slugify(text: string): string {
    return text
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_-]+/g, '-')
        .replace(/^-+|-+$/g, '');
}

export async function getCategories(): Promise<Category[]> {
    const db = getDb();
    const { results } = await db.prepare('SELECT * FROM styles ORDER BY name ASC').all<Category>();
    return results;
}

export async function getCategoryById(id: string): Promise<Category | null> {
    const db = getDb();
    return await db.prepare('SELECT * FROM styles WHERE id = ?').bind(id).first<Category>();
}

export async function createCategory(name: string): Promise<Category> {
    const db = getDb();
    const id = uuidv4();
    const slug = slugify(name);

    await db.prepare('INSERT INTO styles (id, name, slug) VALUES (?, ?, ?)').bind(id, name, slug).run();

    return { id, name, slug };
}

export async function updateCategory(id: string, name: string): Promise<void> {
    const db = getDb();
    const slug = slugify(name);
    await db.prepare('UPDATE styles SET name = ?, slug = ? WHERE id = ?').bind(name, slug, id).run();
}

export async function deleteCategory(id: string): Promise<void> {
    const db = getDb();
    await db.prepare('DELETE FROM styles WHERE id = ?').bind(id).run();
}

export async function getTemplateCategories(templateId: string): Promise<Category[]> {
    const db = getDb();
    const { results } = await db.prepare(`
        SELECT s.* FROM styles s
        INNER JOIN template_styles ts ON s.id = ts.style_id
        WHERE ts.template_id = ?
    `).bind(templateId).all<Category>();
    return results;
}

export async function setTemplateCategories(templateId: string, categoryIds: string[]): Promise<void> {
    const db = getDb();

    // Delete existing associations
    await db.prepare('DELETE FROM template_styles WHERE template_id = ?').bind(templateId).run();

    // Insert new associations
    if (categoryIds.length > 0) {
        const statements = categoryIds.map(categoryId =>
            db.prepare('INSERT INTO template_styles (template_id, style_id) VALUES (?, ?)').bind(templateId, categoryId)
        );
        await db.batch(statements);
    }
}

export async function getCategoryStats(): Promise<{ total: number }> {
    const db = getDb();
    const result = await db.prepare('SELECT COUNT(*) as count FROM styles').first<{ count: number }>();
    return { total: result?.count || 0 };
}
