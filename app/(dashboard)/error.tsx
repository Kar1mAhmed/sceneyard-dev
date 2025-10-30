'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Dashboard error:', error);
  }, [error]);

  const isDev = process.env.NODE_ENV === 'development';

  // Check if it's a database error
  const isDatabaseError = error.message.includes('D1_ERROR') || 
                          error.message.includes('database') ||
                          error.message.includes('SQLITE');

  return (
    <div className="min-h-screen bg-brand-black flex items-center justify-center px-6">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-8">
          <div className="w-20 h-20 rounded-full bg-red-500/20 flex items-center justify-center mx-auto mb-6">
            <svg
              className="w-10 h-10 text-red-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
              />
            </svg>
          </div>

          <h1 className="text-4xl font-bold text-brand-white mb-4">
            {isDatabaseError ? 'Database Error' : 'Admin Dashboard Error'}
          </h1>
          <p className="text-brand-white/70 text-lg mb-4">
            {isDatabaseError
              ? 'Unable to connect to the database. Please check your configuration.'
              : 'An error occurred in the admin dashboard.'}
          </p>
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 mb-8 max-w-2xl mx-auto">
            <p className="text-red-400 text-sm font-mono break-all">
              {error.message}
            </p>
          </div>

          <div className="flex items-center justify-center gap-4 mb-8">
            <button
              onClick={reset}
              className="px-6 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-primary/90 transition-colors"
            >
              Try Again
            </button>
            <Link
              href="/"
              className="px-6 py-3 bg-brand-white/10 text-brand-white rounded-xl font-semibold hover:bg-brand-white/20 transition-colors"
            >
              Go Home
            </Link>
          </div>
        </div>

        {/* Database-Specific Help */}
        {isDatabaseError && isDev && (
          <div className="bg-secondary-yellow/10 border border-secondary-yellow/20 rounded-2xl p-6 mb-6">
            <div className="flex items-start gap-3">
              <svg
                className="w-6 h-6 text-secondary-yellow flex-shrink-0 mt-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <div>
                <h3 className="text-lg font-semibold text-secondary-yellow mb-2">
                  Database Connection Issue
                </h3>
                <div className="text-brand-white/70 text-sm space-y-2">
                  <p>To fix this, try the following steps:</p>
                  <ol className="list-decimal list-inside space-y-1 ml-2">
                    <li>Run migrations: <code className="bg-brand-black/50 px-2 py-1 rounded text-secondary-cyan">npm run migrations-local</code></li>
                    <li>Check if the database file exists in <code className="bg-brand-black/50 px-2 py-1 rounded text-secondary-cyan">.wrangler/state/v3/d1</code></li>
                    <li>Verify <code className="bg-brand-black/50 px-2 py-1 rounded text-secondary-cyan">wrangler.jsonc</code> has correct database binding</li>
                    <li>Restart the dev server</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Debug Info */}
        {isDev && (
          <div className="bg-brand-white/5 backdrop-blur-sm border border-red-500/20 rounded-2xl p-6 space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
              <h2 className="text-xl font-bold text-red-500">Debug Information</h2>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-brand-white/70 mb-2">Error Message:</h3>
              <div className="bg-brand-black/50 rounded-lg p-4 overflow-x-auto">
                <code className="text-red-400 text-sm font-mono">{error.message}</code>
              </div>
            </div>

            {error.stack && (
              <div>
                <h3 className="text-sm font-semibold text-brand-white/70 mb-2">Stack Trace:</h3>
                <div className="bg-brand-black/50 rounded-lg p-4 overflow-x-auto max-h-96 overflow-y-auto">
                  <pre className="text-brand-white/70 text-xs font-mono whitespace-pre-wrap">
                    {error.stack}
                  </pre>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
