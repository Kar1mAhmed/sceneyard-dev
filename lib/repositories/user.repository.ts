/**
 * User Repository
 * 
 * Database CRUD operations for users.
 * No business logic, validation, or external API calls.
 * Never calls other repositories.
 */

import type { D1Database } from '@cloudflare/workers-types';
import type { User, CreateUserInput, UpdateUserInput, UserWithSubscription } from '@/lib/models/user.model';
import { UserRole } from '@/lib/models/user.model';

export class UserRepository {
    constructor(private db: D1Database) { }

    /**
     * Find user by ID
     */
    async findById(id: string): Promise<User | null> {
        const result = await this.db
            .prepare('SELECT * FROM users WHERE id = ?')
            .bind(id)
            .first<User>();

        return result || null;
    }

    /**
     * Find user by email
     */
    async findByEmail(email: string): Promise<User | null> {
        const result = await this.db
            .prepare('SELECT * FROM users WHERE email = ?')
            .bind(email)
            .first<User>();

        return result || null;
    }

    /**
     * Find user by provider and provider ID
     */
    async findByProvider(provider: string, providerId: string): Promise<User | null> {
        const result = await this.db
            .prepare('SELECT * FROM users WHERE provider = ? AND provider_id = ?')
            .bind(provider, providerId)
            .first<User>();

        return result || null;
    }

    /**
     * Create a new user
     */
    async create(data: CreateUserInput): Promise<User> {
        const id = crypto.randomUUID();
        const now = new Date().toISOString();

        await this.db
            .prepare(`
        INSERT INTO users (id, email, name, image, role, provider, provider_id, created_at, updated_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `)
            .bind(
                id,
                data.email,
                data.name,
                data.image || null,
                UserRole.USER,
                data.provider,
                data.providerId,
                now,
                now
            )
            .run();

        const user = await this.findById(id);
        if (!user) {
            throw new Error('Failed to create user');
        }

        return user;
    }

    /**
     * Update user by ID
     */
    async update(id: string, data: UpdateUserInput): Promise<User> {
        const now = new Date().toISOString();
        const updates: string[] = [];
        const bindings: any[] = [];

        if (data.name !== undefined) {
            updates.push('name = ?');
            bindings.push(data.name);
        }

        if (data.image !== undefined) {
            updates.push('image = ?');
            bindings.push(data.image);
        }

        if (data.role !== undefined) {
            updates.push('role = ?');
            bindings.push(data.role);
        }

        updates.push('updated_at = ?');
        bindings.push(now);

        bindings.push(id);

        await this.db
            .prepare(`UPDATE users SET ${updates.join(', ')} WHERE id = ?`)
            .bind(...bindings)
            .run();

        const user = await this.findById(id);
        if (!user) {
            throw new Error('User not found after update');
        }

        return user;
    }

    /**
     * Delete user by ID
     */
    async delete(id: string): Promise<void> {
        await this.db
            .prepare('DELETE FROM users WHERE id = ?')
            .bind(id)
            .run();
    }

    /**
     * Get all users with pagination
     */
    async findAll(limit: number = 50, offset: number = 0): Promise<User[]> {
        const results = await this.db
            .prepare('SELECT * FROM users ORDER BY created_at DESC LIMIT ? OFFSET ?')
            .bind(limit, offset)
            .all<User>();

        return results.results || [];
    }

    /**
     * Get user with subscription info
     */
    async findByIdWithSubscription(id: string): Promise<UserWithSubscription | null> {
        const result = await this.db
            .prepare(`
        SELECT 
          u.*,
          s.status as subscription_status,
          s.credits_balance,
          p.name as plan_name
        FROM users u
        LEFT JOIN subscriptions s ON u.id = s.user_id
        LEFT JOIN plans p ON s.plan_id = p.id
        WHERE u.id = ?
      `)
            .bind(id)
            .first<any>();

        if (!result) {
            return null;
        }

        return {
            id: result.id,
            email: result.email,
            name: result.name,
            image: result.image,
            role: result.role,
            provider: result.provider,
            providerId: result.provider_id,
            createdAt: result.created_at,
            updatedAt: result.updated_at,
            subscriptionStatus: result.subscription_status,
            creditsBalance: result.credits_balance || 0,
            planName: result.plan_name,
        };
    }

    /**
     * Get all users with subscription info
     */
    async findAllWithSubscription(limit: number = 50, offset: number = 0): Promise<UserWithSubscription[]> {
        const results = await this.db
            .prepare(`
        SELECT 
          u.*,
          s.status as subscription_status,
          s.credits_balance,
          p.name as plan_name
        FROM users u
        LEFT JOIN subscriptions s ON u.id = s.user_id
        LEFT JOIN plans p ON s.plan_id = p.id
        ORDER BY u.created_at DESC
        LIMIT ? OFFSET ?
      `)
            .bind(limit, offset)
            .all<any>();

        return (results.results || []).map((result: any) => ({
            id: result.id,
            email: result.email,
            name: result.name,
            image: result.image,
            role: result.role,
            provider: result.provider,
            providerId: result.provider_id,
            createdAt: result.created_at,
            updatedAt: result.updated_at,
            subscriptionStatus: result.subscription_status,
            creditsBalance: result.credits_balance || 0,
            planName: result.plan_name,
        }));
    }

    /**
     * Count total users
     */
    async count(): Promise<number> {
        const result = await this.db
            .prepare('SELECT COUNT(*) as count FROM users')
            .first<{ count: number }>();

        return result?.count || 0;
    }
}
