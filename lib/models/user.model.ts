/**
 * User Model
 * 
 * Defines TypeScript types and Zod schemas for user entities.
 * No database calls, API calls, or business logic.
 */

import { z } from 'zod';

/**
 * User role enum
 */
export enum UserRole {
  USER = 'user',
  ADMIN = 'admin',
}

/**
 * Zod schema for creating a new user
 */
export const CreateUserSchema = z.object({
  email: z.string().email('Invalid email address'),
  name: z.string().min(1, 'Name is required').nullable(),
  image: z.string().url('Invalid image URL').nullable().optional(),
  provider: z.string().default('google'),
  providerId: z.string().min(1, 'Provider ID is required'),
});

/**
 * Zod schema for updating a user
 */
export const UpdateUserSchema = z.object({
  name: z.string().min(1, 'Name is required').nullable().optional(),
  image: z.string().url('Invalid image URL').nullable().optional(),
  role: z.nativeEnum(UserRole).optional(),
});

/**
 * TypeScript types inferred from Zod schemas
 */
export type CreateUserInput = z.infer<typeof CreateUserSchema>;
export type UpdateUserInput = z.infer<typeof UpdateUserSchema>;

/**
 * User entity type (from database)
 */
export interface User {
  id: string;
  email: string;
  name: string | null;
  image: string | null;
  role: UserRole;
  provider: string;
  providerId: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * User with subscription info (for dashboard)
 */
export interface UserWithSubscription extends User {
  subscriptionStatus: string | null;
  creditsBalance: number;
  planName: string | null;
}

/**
 * Validation functions
 */
export function validateCreateUser(data: unknown): CreateUserInput {
  return CreateUserSchema.parse(data);
}

export function validateUpdateUser(data: unknown): UpdateUserInput {
  return UpdateUserSchema.parse(data);
}
