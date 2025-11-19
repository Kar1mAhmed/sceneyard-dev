import { getDb } from '@/lib/env';
import { User, UserRole } from './types';

export async function getUserByEmail(email: string): Promise<User | null> {
    const db = getDb();
    const result = await db.prepare('SELECT * FROM users WHERE email = ?').bind(email).first<User>();
    return result;
}

export async function createUser(user: {
    id: string;
    email: string;
    name?: string | null;
    image?: string | null;
    provider?: string;
    provider_id?: string;
    role?: UserRole;
}): Promise<User> {
    const db = getDb();
    const now = Math.floor(Date.now() / 1000);

    // Check if this is the first user
    let role = user.role || 'user';
    if (!user.role) {
        const countResult = await db.prepare('SELECT COUNT(*) as count FROM users').first<{ count: number }>();
        if (countResult && countResult.count === 0) {
            role = 'admin';
        }
    }

    await db.prepare(
        `INSERT INTO users (id, email, name, image, provider, provider_id, role, created_at, updated_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`
    ).bind(
        user.id,
        user.email,
        user.name || null,
        user.image || null,
        user.provider || 'google',
        user.provider_id || null,
        role,
        now,
        now
    ).run();

    return {
        id: user.id,
        email: user.email,
        name: user.name || null,
        image: user.image || null,
        role,
        provider: user.provider || 'google',
        provider_id: user.provider_id || null,
        created_at: now,
        updated_at: now
    };
}

export async function updateUser(id: string, data: Partial<User>): Promise<void> {
    const db = getDb();
    const sets: string[] = [];
    const values: any[] = [];

    if (data.name !== undefined) { sets.push('name = ?'); values.push(data.name); }
    if (data.image !== undefined) { sets.push('image = ?'); values.push(data.image); }
    if (data.role !== undefined) { sets.push('role = ?'); values.push(data.role); }

    if (sets.length === 0) return;

    sets.push('updated_at = ?');
    values.push(Math.floor(Date.now() / 1000));
    values.push(id);

    await db.prepare(`UPDATE users SET ${sets.join(', ')} WHERE id = ?`).bind(...values).run();
}

export async function getUserCount(): Promise<number> {
    const db = getDb();
    const result = await db.prepare('SELECT COUNT(*) as count FROM users').first<{ count: number }>();
    return result?.count || 0;
}

export async function getAllUsers(limit = 50, offset = 0): Promise<User[]> {
    const db = getDb();
    const { results } = await db.prepare('SELECT * FROM users ORDER BY created_at DESC LIMIT ? OFFSET ?')
        .bind(limit, offset)
        .all<User>();
    return results;
}
