import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';
import Link from 'next/link';

async function UserHomeContent() {
  const session = await auth();

  if (!session) {
    redirect('/');
  }

  return (
    <div className="min-h-screen bg-brand-black">
      {/* Header */}
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

      {/* Main Content */}
      <main className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Welcome Section */}
          <div className="bg-gradient-to-r from-primary/20 to-secondary-purple/20 rounded-2xl p-8 border border-primary/20">
            <h1 className="text-4xl font-bold text-brand-white mb-2">
              Welcome, {session.user.name || 'User'}! 👋
            </h1>
            <p className="text-brand-white/70 text-lg">
              You're successfully signed in
            </p>
          </div>

          {/* User Info Card */}
          <div className="bg-brand-white/5 backdrop-blur-sm border border-brand-white/10 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-brand-white mb-6">Your Profile</h2>
            
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <img
                  src={session.user.image || '/default-avatar.png'}
                  alt={session.user.name || 'User'}
                  className="w-20 h-20 rounded-full border-4 border-primary"
                />
                <div>
                  <p className="text-2xl font-bold text-brand-white">
                    {session.user.name || 'Unnamed User'}
                  </p>
                  <p className="text-brand-white/70">{session.user.email}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <div className="p-4 bg-brand-black/50 rounded-xl">
                  <p className="text-brand-white/50 text-sm mb-1">User ID</p>
                  <p className="text-brand-white font-mono text-sm">{session.user.id}</p>
                </div>
                <div className="p-4 bg-brand-black/50 rounded-xl">
                  <p className="text-brand-white/50 text-sm mb-1">Account Type</p>
                  <p className="text-brand-white">Free Plan</p>
                </div>
              </div>
            </div>
          </div>

          {/* Coming Soon */}
          <div className="bg-brand-white/5 backdrop-blur-sm border border-brand-white/10 rounded-2xl p-8 text-center">
            <div className="w-16 h-16 rounded-full bg-secondary-cyan/20 flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-secondary-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-brand-white mb-2">
              Video Templates Coming Soon
            </h3>
            <p className="text-brand-white/70">
              Browse and download premium video templates
            </p>
          </div>

          {/* Sign Out */}
          <div className="text-center">
            <Link
              href="/api/auth/signout"
              className="inline-block px-6 py-3 bg-brand-white/10 text-brand-white rounded-xl font-semibold hover:bg-brand-white/20 transition-colors"
            >
              Sign Out
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function UserHomePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-brand-black flex items-center justify-center">
        <div className="animate-pulse space-y-4">
          <div className="h-12 bg-brand-white/10 rounded w-64"></div>
          <div className="h-6 bg-brand-white/10 rounded w-48"></div>
        </div>
      </div>
    }>
      <UserHomeContent />
    </Suspense>
  );
}
