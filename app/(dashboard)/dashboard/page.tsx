import { auth } from '@/lib/auth';
import Link from 'next/link';
import { Suspense } from 'react';

async function AdminDashboardContent() {
  // Admin check is handled by layout - no need to check again here
  // Just render the dashboard content
  
  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-primary/20 to-secondary-purple/20 rounded-2xl p-8 border border-primary/20">
        <h1 className="text-4xl font-bold text-brand-white mb-2">
          Admin Dashboard
        </h1>
        <p className="text-brand-white/70 text-lg">
          Manage users, templates, and monitor platform statistics
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-brand-white/5 backdrop-blur-sm border border-brand-white/10 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-brand-white/70 text-sm font-medium">Total Users</h3>
            <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </div>
          <p className="text-3xl font-bold text-brand-white">1,234</p>
          <p className="text-brand-white/50 text-sm mt-1">+12% from last month</p>
        </div>

        <div className="bg-brand-white/5 backdrop-blur-sm border border-brand-white/10 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-brand-white/70 text-sm font-medium">Active Subscribers</h3>
            <svg className="w-6 h-6 text-secondary-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
            </svg>
          </div>
          <p className="text-3xl font-bold text-brand-white">456</p>
          <p className="text-brand-white/50 text-sm mt-1">+8% from last month</p>
        </div>

        <div className="bg-brand-white/5 backdrop-blur-sm border border-brand-white/10 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-brand-white/70 text-sm font-medium">Monthly Revenue</h3>
            <svg className="w-6 h-6 text-secondary-yellow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p className="text-3xl font-bold text-brand-white">$12,345</p>
          <p className="text-brand-white/50 text-sm mt-1">+15% from last month</p>
        </div>

        <div className="bg-brand-white/5 backdrop-blur-sm border border-brand-white/10 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-brand-white/70 text-sm font-medium">Total Templates</h3>
            <svg className="w-6 h-6 text-secondary-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          </div>
          <p className="text-3xl font-bold text-brand-white">89</p>
          <p className="text-brand-white/50 text-sm mt-1">+5 this month</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Subscribers Over Time */}
        <div className="bg-brand-white/5 backdrop-blur-sm border border-brand-white/10 rounded-xl p-6">
          <h3 className="text-xl font-semibold text-brand-white mb-4">Subscribers Over Time</h3>
          <div className="h-64 flex items-center justify-center bg-brand-black/50 rounded-xl">
            <p className="text-brand-white/50">Chart placeholder - Coming soon</p>
          </div>
        </div>

        {/* Revenue Over Time */}
        <div className="bg-brand-white/5 backdrop-blur-sm border border-brand-white/10 rounded-xl p-6">
          <h3 className="text-xl font-semibold text-brand-white mb-4">Revenue Over Time</h3>
          <div className="h-64 flex items-center justify-center bg-brand-black/50 rounded-xl">
            <p className="text-brand-white/50">Chart placeholder - Coming soon</p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link
          href="/dashboard/users"
          className="group bg-brand-white/5 backdrop-blur-sm border border-brand-white/10 rounded-xl p-8 hover:border-primary/50 transition-all duration-300 hover:scale-105"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center group-hover:bg-primary/30 transition-colors">
              <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-brand-white group-hover:text-primary transition-colors">
                Manage Users
              </h3>
              <p className="text-brand-white/60 text-sm">View and manage all users</p>
            </div>
          </div>
        </Link>

        <div className="group bg-brand-white/5 backdrop-blur-sm border border-brand-white/10 rounded-xl p-8 opacity-50 cursor-not-allowed">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-xl bg-secondary-cyan/20 flex items-center justify-center">
              <svg className="w-6 h-6 text-secondary-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-brand-white">
                Manage Templates
              </h3>
              <p className="text-brand-white/60 text-sm">Coming soon</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <Suspense fallback={
      <div className="space-y-8">
        <div className="bg-gradient-to-r from-primary/20 to-secondary-purple/20 rounded-2xl p-8 border border-primary/20 animate-pulse">
          <div className="h-10 bg-brand-white/10 rounded w-64 mb-2"></div>
          <div className="h-6 bg-brand-white/10 rounded w-96"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-brand-white/5 backdrop-blur-sm border border-brand-white/10 rounded-xl p-6 animate-pulse">
            <div className="h-8 bg-brand-white/10 rounded"></div>
          </div>
          <div className="bg-brand-white/5 backdrop-blur-sm border border-brand-white/10 rounded-xl p-6 animate-pulse">
            <div className="h-8 bg-brand-white/10 rounded"></div>
          </div>
          <div className="bg-brand-white/5 backdrop-blur-sm border border-brand-white/10 rounded-xl p-6 animate-pulse">
            <div className="h-8 bg-brand-white/10 rounded"></div>
          </div>
        </div>
      </div>
    }>
      <AdminDashboardContent />
    </Suspense>
  );
}
