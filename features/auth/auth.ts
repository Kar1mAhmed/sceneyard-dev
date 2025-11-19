import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { getCloudflareEnv } from "@/lib/env";
import { getUserByEmail, createUser, updateUser } from "@/features/users/repo";
import { v4 as uuidv4 } from 'uuid';

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Google({
            clientId: process.env.AUTH_GOOGLE_ID,
            clientSecret: process.env.AUTH_GOOGLE_SECRET,
        }),
    ],
    callbacks: {
        async signIn({ user, account, profile }) {
            if (!user.email) return false;

            try {
                const existingUser = await getUserByEmail(user.email);

                if (!existingUser) {
                    // Create new user
                    await createUser({
                        id: uuidv4(),
                        email: user.email,
                        name: user.name,
                        image: user.image,
                        provider: account?.provider,
                        provider_id: account?.providerAccountId,
                    });
                } else {
                    // Update existing user info if needed
                    await updateUser(existingUser.id, {
                        name: user.name,
                        image: user.image,
                    });
                }
                return true;
            } catch (error) {
                console.error("Error in signIn callback:", error);
                return false;
            }
        },
        async jwt({ token, user }) {
            if (user && user.email) {
                const dbUser = await getUserByEmail(user.email);
                if (dbUser) {
                    token.role = dbUser.role;
                    token.id = dbUser.id;
                }
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user && token.role) {
                // @ts-ignore
                session.user.role = token.role;
                // @ts-ignore
                session.user.id = token.id;
            }
            return session;
        },
    },
    secret: process.env.AUTH_SECRET,
});
