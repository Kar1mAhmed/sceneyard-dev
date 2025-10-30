/**
 * NextAuth.js API Route Handler
 * 
 * This file exports the GET and POST handlers for NextAuth.js
 * All authentication requests will be handled through this route:
 * - /api/auth/signin
 * - /api/auth/signout
 * - /api/auth/callback/google
 * - /api/auth/session
 * - etc.
 */

import { handlers } from "@/lib/auth";

export const { GET, POST } = handlers;
