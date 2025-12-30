"use client";

import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";
import { ToastProvider } from "./layout/ToastProvider";

interface ProvidersProps {
    children: React.ReactNode;
    session?: Session | null;
}

export function Providers({ children, session }: ProvidersProps) {
    return (
        <SessionProvider session={session}>
            <ToastProvider>
                {children}
            </ToastProvider>
        </SessionProvider>
    );
}
