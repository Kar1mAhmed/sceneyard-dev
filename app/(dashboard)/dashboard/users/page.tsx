import { getCloudflareContext } from '@opennextjs/cloudflare';
import { AuthService } from '@/lib/services/auth.service';
import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';

async function UsersContent() {
  const session = await auth();

  if (!session) {
    redirect('/');
  }

  // Get database from Cloudflare context - REQUIRED
  let users: any[] = [];
  let total = 0;

  try {
    const { env } = await getCloudflareContext();
    const db = env.SCENEYARD_DB;

    if (!db) {
      console.error('❌ Database binding not found in Cloudflare context');
      throw new Error('Database not available - Check wrangler.jsonc configuration');
    }

    // Initialize auth service
    const authService = new AuthService(db);

    // Check if user is admin - REQUIRED
    const isAdmin = await authService.isAdmin(session.user.id);

    if (!isAdmin) {
      console.warn('⚠️  Non-admin user attempted to access users page:', session.user.email);
      redirect('/home');
    }

    // Get all users
    const result = await authService.getAllUsers(100, 0);
    users = result.users;
    total = result.total;

    console.log('✅ Users page loaded for admin:', session.user.email);
  } catch (error: any) {
    console.error('❌ Failed to load users page:', {
      message: error.message,
      stack: error.stack,
      cause: error.cause,
      name: error.name,
    });
    
    // Provide specific error messages
    if (error.message?.includes('Connection closed')) {
      throw new Error('Database connection closed unexpectedly. This may be due to: 1) Database not running, 2) Connection timeout, 3) Database file locked. Try restarting the dev server.');
    } else if (error.message?.includes('no such column') || error.message?.includes('no such table')) {
      throw new Error(`Database schema error: ${error.message}. Run: npm run migrations-local`);
    } else if (error.message?.includes('D1_ERROR')) {
      throw new Error(`Database error: ${error.message}. Check your database configuration.`);
    } else {
      throw new Error(`Failed to load users: ${error.message}`);
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-brand-white mb-2">Users</h1>
          <p className="text-brand-white/70">
            Manage all users in the system ({total} total)
          </p>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-brand-white/5 backdrop-blur-sm border border-brand-white/10 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-brand-white/5 border-b border-brand-white/10">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-brand-white">User</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-brand-white">Email</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-brand-white">Role</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-brand-white">Credits</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-brand-white">Plan</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-brand-white">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-brand-white">Joined</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-white/10">
              {users.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-brand-white/50">
                    No users found
                  </td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr key={user.id} className="hover:bg-brand-white/5 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={user.image || '/default-avatar.png'}
                          alt={user.name || 'User'}
                          className="w-10 h-10 rounded-full border-2 border-primary/50"
                        />
                        <div>
                          <p className="text-brand-white font-medium">
                            {user.name || 'Unnamed User'}
                          </p>
                          <p className="text-brand-white/50 text-sm">ID: {user.id.slice(0, 8)}...</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-brand-white/70">{user.email}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${
                        user.role === 'admin'
                          ? 'bg-primary/20 text-primary'
                          : 'bg-brand-white/10 text-brand-white/70'
                      }`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-secondary-yellow font-semibold">
                        {user.creditsBalance || 0}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-brand-white/70">
                      {user.planName || 'Free'}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${
                        user.subscriptionStatus === 'active'
                          ? 'bg-secondary-cyan/20 text-secondary-cyan'
                          : 'bg-brand-white/10 text-brand-white/50'
                      }`}>
                        {user.subscriptionStatus || 'inactive'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-brand-white/50 text-sm">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-brand-white/5 backdrop-blur-sm border border-brand-white/10 rounded-xl p-6">
          <p className="text-brand-white/70 text-sm mb-2">Total Users</p>
          <p className="text-3xl font-bold text-brand-white">{total}</p>
        </div>
        <div className="bg-brand-white/5 backdrop-blur-sm border border-brand-white/10 rounded-xl p-6">
          <p className="text-brand-white/70 text-sm mb-2">Admins</p>
          <p className="text-3xl font-bold text-primary">
            {users.filter(u => u.role === 'admin').length}
          </p>
        </div>
        <div className="bg-brand-white/5 backdrop-blur-sm border border-brand-white/10 rounded-xl p-6">
          <p className="text-brand-white/70 text-sm mb-2">Active Subscriptions</p>
          <p className="text-3xl font-bold text-secondary-cyan">
            {users.filter(u => u.subscriptionStatus === 'active').length}
          </p>
        </div>
        <div className="bg-brand-white/5 backdrop-blur-sm border border-brand-white/10 rounded-xl p-6">
          <p className="text-brand-white/70 text-sm mb-2">Total Credits</p>
          <p className="text-3xl font-bold text-secondary-yellow">
            {users.reduce((sum, u) => sum + (u.creditsBalance || 0), 0)}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function UsersPage() {
  return (
    <Suspense fallback={
      <div className="space-y-8">
        <div className="animate-pulse">
          <div className="h-12 bg-brand-white/10 rounded w-48 mb-4"></div>
          <div className="h-6 bg-brand-white/10 rounded w-64"></div>
        </div>
        <div className="bg-brand-white/5 backdrop-blur-sm border border-brand-white/10 rounded-xl p-8">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-brand-white/10 rounded"></div>
            <div className="h-8 bg-brand-white/10 rounded"></div>
            <div className="h-8 bg-brand-white/10 rounded"></div>
          </div>
        </div>
      </div>
    }>
      <UsersContent />
    </Suspense>
  );
}
