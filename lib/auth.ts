import NextAuth, { type DefaultSession } from "next-auth";
import Google from "next-auth/providers/google";
import type { JWT } from "next-auth/jwt";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { AuthService } from "@/lib/services/auth.service";

/**
 * Module augmentation for NextAuth types
 * Extend the built-in session and JWT types with custom properties
 */
declare module "next-auth" {
    interface Session {
        user: {
            id: string;
            email: string;
            name: string | null;
            image: string | null;
        } & DefaultSession["user"];
    }

    interface User {
        id: string;
        email: string;
        name: string | null;
        image: string | null;
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        id: string;
        email: string;
    }
}

/**
 * NextAuth.js Configuration
 * 
 * This configuration uses:
 * - Google OAuth provider
 * - JWT session strategy (required for Cloudflare Workers)
 * - Custom callbacks for sign-in logic
 */
export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Google({
            clientId: process.env.AUTH_GOOGLE_ID!,
            clientSecret: process.env.AUTH_GOOGLE_SECRET!,
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code",
                },
            },
        }),
    ],

    /**
     * Use JWT strategy (required for Cloudflare Workers)
     * Database sessions are not compatible with edge runtimes
     */
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60, // 30 days
    },

    /**
     * Custom pages (optional - can be customized later)
     */
    pages: {
        signIn: "/auth/signin",
        error: "/auth/error",
    },

    callbacks: {
        /**
         * Sign-in callback
         * 
         * This is where we check if the user exists in the database:
         * - If user exists: Sign them in (existing user)
         * - If user doesn't exist: Create new user and sign them in
         * 
         * @placeholder - Database logic should be implemented here
         */
        async signIn({ user, account, profile }) {
            try {
                if (!user.email) {
                    console.error("No email provided by OAuth provider");
                    return false;
                }

                // Try to get Cloudflare D1 database
                try {
                    const { env } = await getCloudflareContext();
                    const db = env.SCENEYARD_DB;

                    if (db) {
                        // Initialize auth service
                        const authService = new AuthService(db);

                        // Handle Google sign-in (creates user if doesn't exist)
                        const dbUser = await authService.handleGoogleSignIn({
                            email: user.email,
                            name: user.name || null,
                            image: user.image || null,
                            sub: account?.providerAccountId || '',
                        });

                        // Store user ID for JWT callback
                        user.id = dbUser.id;

                        console.log("User signed in:", {
                            id: dbUser.id,
                            email: dbUser.email,
                            name: dbUser.name,
                            isNewUser: !profile?.email_verified,
                        });

                        return true;
                    }
                } catch (dbError) {
                    console.warn("Database not available (local dev mode):", dbError);
                }

                // Fallback for local development without database
                console.log("Sign-in without database (local dev):", {
                    email: user.email,
                    name: user.name,
                    provider: account?.provider,
                });

                // Generate a temporary ID for local dev
                user.id = account?.providerAccountId || crypto.randomUUID();
                
                return true;
            } catch (error) {
                console.error("Error in signIn callback:", error);
                return false;
            }
        },

        /**
         * JWT callback
         * 
         * This callback is called whenever a JWT is created or updated.
         * Add custom properties to the JWT token here.
         */
        async jwt({ token, user, account, profile, trigger }) {
            // Initial sign in
            if (user) {
                token.id = user.id;
                token.email = user.email;

                // TODO: Fetch additional user data from database
                // const dbUser = await userRepository.findByEmail(user.email);
                // if (dbUser) {
                //   token.id = dbUser.id;
                //   token.role = dbUser.role;
                //   token.subscriptionStatus = dbUser.subscriptionStatus;
                // }
            }

            // Handle token refresh or update
            if (trigger === "update") {
                // TODO: Refresh user data from database
                // const dbUser = await userRepository.findById(token.id);
                // if (dbUser) {
                //   token.email = dbUser.email;
                //   token.name = dbUser.name;
                // }
            }

            return token;
        },

        /**
         * Session callback
         * 
         * This callback is called whenever a session is checked.
         * Add custom properties from the JWT token to the session object.
         */
        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.id;
                session.user.email = token.email;

                // TODO: Add additional user data to session
                // session.user.role = token.role;
                // session.user.subscriptionStatus = token.subscriptionStatus;
            }

            return session;
        },

        /**
         * Redirect callback
         * 
         * Control where users are redirected after sign-in/sign-out
         */
        async redirect({ url, baseUrl }) {
            // Allows relative callback URLs
            if (url.startsWith("/")) return `${baseUrl}${url}`;

            // Allows callback URLs on the same origin
            if (new URL(url).origin === baseUrl) return url;

            return baseUrl;
        },
    },

    /**
     * Events
     * 
     * Async functions that do not return a response, useful for logging
     */
    events: {
        async signIn({ user, account, profile, isNewUser }) {
            console.log("User signed in:", {
                email: user.email,
                isNewUser,
                provider: account?.provider,
            });

            // TODO: Log sign-in event to database or analytics
        },

        async signOut(message) {
            const email = "token" in message
                ? message.token?.email
                : undefined;

            console.log("User signed out:", { email });

            // TODO: Log sign-out event to database or analytics
        },
    },

    /**
     * Enable debug messages in development
     */
    debug: process.env.NODE_ENV === "development",
});
