'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to console
    console.error('Application error:', error);
  }, [error]);

  const isDev = process.env.NODE_ENV === 'development';

  return (
    <div className="min-h-screen bg-brand-black flex items-center justify-center px-6">
      <div className="max-w-4xl w-full">
        {/* Error Icon */}
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
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>

          <h1 className="text-4xl font-bold text-brand-white mb-4">
            Something went wrong!
          </h1>
          <p className="text-brand-white/70 text-lg mb-8">
            {isDev
              ? 'An error occurred while processing your request. See details below.'
              : 'We encountered an unexpected error. Please try again.'}
          </p>

          {/* Action Buttons */}
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

        {/* Debug Info (Development Only) */}
        {isDev && (
          <div className="bg-brand-white/5 backdrop-blur-sm border border-red-500/20 rounded-2xl p-6 space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <svg
                className="w-5 h-5 text-red-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                />
              </svg>
              <h2 className="text-xl font-bold text-red-500">Debug Information</h2>
            </div>

            {/* Error Message */}
            <div>
              <h3 className="text-sm font-semibold text-brand-white/70 mb-2">
                Error Message:
              </h3>
              <div className="bg-brand-black/50 rounded-lg p-4 overflow-x-auto">
                <code className="text-red-400 text-sm font-mono">
                  {error.message}
                </code>
              </div>
            </div>

            {/* Error Name */}
            <div>
              <h3 className="text-sm font-semibold text-brand-white/70 mb-2">
                Error Type:
              </h3>
              <div className="bg-brand-black/50 rounded-lg p-4">
                <code className="text-secondary-cyan text-sm font-mono">
                  {error.name}
                </code>
              </div>
            </div>

            {/* Stack Trace */}
            {error.stack && (
              <div>
                <h3 className="text-sm font-semibold text-brand-white/70 mb-2">
                  Stack Trace:
                </h3>
                <div className="bg-brand-black/50 rounded-lg p-4 overflow-x-auto max-h-96 overflow-y-auto">
                  <pre className="text-brand-white/70 text-xs font-mono whitespace-pre-wrap">
                    {error.stack}
                  </pre>
                </div>
              </div>
            )}

            {/* Error Digest */}
            {error.digest && (
              <div>
                <h3 className="text-sm font-semibold text-brand-white/70 mb-2">
                  Error Digest:
                </h3>
                <div className="bg-brand-black/50 rounded-lg p-4">
                  <code className="text-secondary-yellow text-sm font-mono">
                    {error.digest}
                  </code>
                </div>
              </div>
            )}

            {/* Timestamp */}
            <div>
              <h3 className="text-sm font-semibold text-brand-white/70 mb-2">
                Timestamp:
              </h3>
              <div className="bg-brand-black/50 rounded-lg p-4">
                <code className="text-brand-white/70 text-sm font-mono">
                  {new Date().toISOString()}
                </code>
              </div>
            </div>

            {/* Common Solutions */}
            <div className="mt-6 p-4 bg-secondary-cyan/10 border border-secondary-cyan/20 rounded-lg">
              <h3 className="text-sm font-semibold text-secondary-cyan mb-2">
                💡 Common Solutions:
              </h3>
              <ul className="text-sm text-brand-white/70 space-y-1 list-disc list-inside">
                <li>Check if the database is running and migrations are applied</li>
                <li>Verify environment variables are set correctly</li>
                <li>Check server logs for more details</li>
                <li>Try clearing .next cache and rebuilding</li>
              </ul>
            </div>
          </div>
        )}

        {/* Production Error */}
        {!isDev && (
          <div className="bg-brand-white/5 backdrop-blur-sm border border-brand-white/10 rounded-2xl p-6 text-center">
            <p className="text-brand-white/70 text-sm">
              Error ID: {error.digest || 'Unknown'}
            </p>
            <p className="text-brand-white/50 text-xs mt-2">
              If this problem persists, please contact support with the error ID above.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
