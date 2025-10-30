import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';
import { Suspense } from 'react';

async function DashboardHeader() {
    const session = await auth();

    if (!session) {
        redirect('/');
    }

    return (
        <header className="border-b border-brand-white/10 bg-brand-black/50 backdrop-blur-sm sticky top-0 z-50">
            <div className="container mx-auto px-6 py-4 flex items-center justify-between">
                <h1 className="text-2xl font-bold text-brand-white">
                    Scene<span className="text-primary">Yard</span>
                </h1>

                <div className="flex items-center gap-4">
                    <span className="text-brand-white/70">{session.user.email}</span>
                    <img
                        src={session.user.image || '/default-avatar.png'}
                        alt={session.user.name || 'User'}
                        className="w-10 h-10 rounded-full border-2 border-primary"
                    />
                </div>
            </div>
        </header>
    );
}

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-brand-black">
            <Suspense fallback={
                <header className="border-b border-brand-white/10 bg-brand-black/50 backdrop-blur-sm sticky top-0 z-50">
                    <div className="container mx-auto px-6 py-4">
                        <div className="h-10 animate-pulse bg-brand-white/10 rounded w-32"></div>
                    </div>
                </header>
            }>
                <DashboardHeader />
            </Suspense>

            {/* Main Content */}
            <main className="container mx-auto px-6 py-8">
                {children}
            </main>
        </div>
    );
}
