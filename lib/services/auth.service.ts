/**
 * Auth Service
 * 
 * Business logic for authentication and user management.
 * Orchestrates multiple repositories.
 * Uses dependency injection via constructor.
 */

import type { D1Database } from '@cloudflare/workers-types';
import { UserRepository } from '@/lib/repositories/user.repository';
import type { User, CreateUserInput } from '@/lib/models/user.model';
import { validateCreateUser } from '@/lib/models/user.model';

export class AuthService {
  private userRepository: UserRepository;

  constructor(db: D1Database) {
    this.userRepository = new UserRepository(db);
  }

  /**
   * Handle Google OAuth sign-in
   * 
   * Checks if user exists, creates if not, returns user
   */
  async handleGoogleSignIn(profile: {
    email: string;
    name?: string | null;
    image?: string | null;
    sub: string; // Google's user ID
  }): Promise<User> {
    // Check if user exists by email
    let user = await this.userRepository.findByEmail(profile.email);

    if (user) {
      // User exists, return existing user
      return user;
    }

    // Check if user exists by provider ID
    user = await this.userRepository.findByProvider('google', profile.sub);

    if (user) {
      // User exists with this Google account
      return user;
    }

    // Create new user
    const createUserData: CreateUserInput = {
      email: profile.email,
      name: profile.name || null,
      image: profile.image || null,
      provider: 'google',
      providerId: profile.sub,
    };

    // Validate input
    const validatedData = validateCreateUser(createUserData);

    // Create user in database
    const newUser = await this.userRepository.create(validatedData);

    return newUser;
  }

  /**
   * Get user by ID
   */
  async getUserById(id: string): Promise<User | null> {
    return await this.userRepository.findById(id);
  }

  /**
   * Get user by email
   */
  async getUserByEmail(email: string): Promise<User | null> {
    return await this.userRepository.findByEmail(email);
  }

  /**
   * Check if user is admin
   */
  async isAdmin(userId: string): Promise<boolean> {
    const user = await this.userRepository.findById(userId);
    return user?.role === 'admin';
  }

  /**
   * Get all users (admin only)
   */
  async getAllUsers(limit: number = 50, offset: number = 0) {
    const users = await this.userRepository.findAllWithSubscription(limit, offset);
    const total = await this.userRepository.count();

    return {
      users,
      total,
      limit,
      offset,
      hasMore: offset + limit < total,
    };
  }
}
