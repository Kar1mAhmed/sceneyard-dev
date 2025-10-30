/**
 * Authentication Helper Functions
 * 
 * Utility functions for working with NextAuth.js sessions and authentication
 */

import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

/**
 * Get the current session
 * 
 * @returns The current session or null if not authenticated
 * @example
 * const session = await getSession();
 * if (!session) {
 *   redirect('/auth/signin');
 * }
 */
export async function getSession() {
  return await auth();
}

/**
 * Get the current user
 * 
 * @returns The current user or null if not authenticated
 * @example
 * const user = await getCurrentUser();
 * if (!user) {
 *   redirect('/auth/signin');
 * }
 */
export async function getCurrentUser() {
  const session = await auth();
  return session?.user ?? null;
}

/**
 * Require authentication
 * 
 * Redirects to sign-in page if user is not authenticated
 * 
 * @param redirectTo - Optional redirect path after sign-in
 * @returns The authenticated user
 * @example
 * // In a Server Component or Server Action
 * const user = await requireAuth();
 */
export async function requireAuth(redirectTo?: string) {
  const session = await auth();
  
  if (!session?.user) {
    const callbackUrl = redirectTo || "/";
    redirect(`/auth/signin?callbackUrl=${encodeURIComponent(callbackUrl)}`);
  }
  
  return session.user;
}

/**
 * Check if user is authenticated
 * 
 * @returns True if user is authenticated, false otherwise
 * @example
 * const isAuthenticated = await isAuth();
 * if (!isAuthenticated) {
 *   return <SignInButton />;
 * }
 */
export async function isAuth() {
  const session = await auth();
  return !!session?.user;
}

/**
 * Get user ID
 * 
 * @returns The current user's ID or null if not authenticated
 * @example
 * const userId = await getUserId();
 * if (!userId) {
 *   throw new Error('Unauthorized');
 * }
 */
export async function getUserId() {
  const session = await auth();
  return session?.user?.id ?? null;
}
