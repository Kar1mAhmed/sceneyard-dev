'use client';

/**
 * Session Provider Component
 * 
 * Wraps the app with NextAuth SessionProvider
 */

import { SessionProvider as NextAuthSessionProvider } from 'next-auth/react';
import type { Session } from 'next-auth';

interface SessionProviderProps {
    children: React.ReactNode;
    session?: Session | null;
}

export function SessionProvider({ children, session }: SessionProviderProps) {
    return (
        <NextAuthSessionProvider session={session}>
            {children}
        </NextAuthSessionProvider>
    );
}
