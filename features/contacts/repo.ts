import { getDb } from '@/lib/env';
import { ContactMessage, ContactFormData } from './types';
import { v4 as uuidv4 } from 'uuid';

export async function createContactMessage(data: ContactFormData): Promise<ContactMessage> {
    const db = getDb();
    const id = uuidv4();
    const now = Math.floor(Date.now() / 1000);

    const message: ContactMessage = {
        id,
        ...data,
        status: 'unread',
        created_at: now,
        updated_at: now,
    };

    await db.prepare(
        `INSERT INTO contacts (id, name, email, message, status, created_at, updated_at)
         VALUES (?, ?, ?, ?, ?, ?, ?)`
    ).bind(
        message.id,
        message.name,
        message.email,
        message.message,
        message.status,
        message.created_at,
        message.updated_at
    ).run();

    return message;
}

export async function getContactMessages(limit = 50, offset = 0): Promise<ContactMessage[]> {
    const db = getDb();
    const { results } = await db.prepare(
        'SELECT * FROM contacts ORDER BY created_at DESC LIMIT ? OFFSET ?'
    ).bind(limit, offset).all<ContactMessage>();

    return results;
}

export async function updateContactStatus(id: string, status: ContactMessage['status']): Promise<void> {
    const db = getDb();
    const now = Math.floor(Date.now() / 1000);

    await db.prepare(
        'UPDATE contacts SET status = ?, updated_at = ? WHERE id = ?'
    ).bind(status, now, id).run();
}
