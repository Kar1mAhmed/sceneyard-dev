import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';
import { Suspense } from 'react';
import { getCloudflareContext } from '@opennextjs/cloudflare';
import { AuthService } from '@/lib/services/auth.service';

async function AdminHeader() {
    const session = await auth();

    if (!session) {
        redirect('/');
    }

    // Check if user is admin - REQUIRED
    let isAdmin = false;
    
    try {
        const { env } = await getCloudflareContext();
        const db = env.SCENEYARD_DB;

        if (!db) {
            console.error('❌ Database not available - Admin access denied');
            redirect('/home');
        }

        const authService = new AuthService(db);
        isAdmin = await authService.isAdmin(session.user.id);

        if (!isAdmin) {
            console.warn('⚠️  Non-admin user attempted to access dashboard:', session.user.email);
            redirect('/home');
        }

        console.log('✅ Admin access granted:', session.user.email);
    } catch (error: any) {
        console.error('❌ Admin check failed:', error.message);
        // If admin check fails, deny access
        redirect('/home');
    }

    return (
        <header className="border-b border-brand-white/10 bg-brand-black/50 backdrop-blur-sm sticky top-0 z-50">
            <div className="container mx-auto px-6 py-4 flex items-center justify-between">
                <h1 className="text-2xl font-bold text-brand-white">
                    Scene<span className="text-primary">Yard</span> <span className="text-brand-white/50 text-base font-normal">Admin</span>
                </h1>

                <div className="flex items-center gap-4">
                    <span className="px-3 py-1 rounded-full bg-primary/20 text-primary text-sm font-medium">Admin</span>
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
                <AdminHeader />
            </Suspense>

            {/* Main Content */}
            <main className="container mx-auto px-6 py-8">
                {children}
            </main>
        </div>
    );
}
