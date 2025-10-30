/**
 * Authentication Module
 * 
 * Re-export all authentication utilities from a single entry point
 */

export { auth, signIn, signOut, handlers } from "@/lib/auth";
export {
  getSession,
  getCurrentUser,
  requireAuth,
  isAuth,
  getUserId,
} from "./helpers";
