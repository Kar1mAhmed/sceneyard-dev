'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Suspense } from 'react';

function ErrorContent() {
  const searchParams = useSearchParams();
  const error = searchParams.get('error');

  const errorMessages: Record<string, string> = {
    Configuration: 'There is a problem with the server configuration.',
    AccessDenied: 'Access was denied. You may not have permission to sign in.',
    Verification: 'The verification token has expired or has already been used.',
    Default: 'An error occurred during authentication.',
  };

  const errorMessage = errorMessages[error || 'Default'] || errorMessages.Default;

  return (
    <div className="min-h-screen bg-brand-black flex items-center justify-center px-6">
      <div className="max-w-md w-full bg-brand-white/5 backdrop-blur-sm border border-brand-white/10 rounded-2xl p-8 text-center">
        {/* Error Icon */}
        <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center mx-auto mb-6">
          <svg
            className="w-8 h-8 text-red-500"
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

        {/* Error Message */}
        <h1 className="text-2xl font-bold text-brand-white mb-2">
          Authentication Error
        </h1>
        <p className="text-brand-white/70 mb-2">{errorMessage}</p>
        {error && (
          <p className="text-brand-white/50 text-sm mb-6">Error code: {error}</p>
        )}

        {/* Actions */}
        <div className="space-y-3">
          <Link
            href="/"
            className="block w-full px-6 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-primary/90 transition-colors"
          >
            Try Again
          </Link>
          <Link
            href="/"
            className="block w-full px-6 py-3 bg-brand-white/10 text-brand-white rounded-xl font-semibold hover:bg-brand-white/20 transition-colors"
          >
            Go Home
          </Link>
        </div>

        {/* Debug Info (only in development) */}
        {process.env.NODE_ENV === 'development' && (
          <div className="mt-6 p-4 bg-brand-black/50 rounded-lg text-left">
            <p className="text-brand-white/50 text-xs font-mono">
              Debug Info:
              <br />
              Error: {error || 'Unknown'}
              <br />
              Check server logs for more details
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function AuthErrorPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-brand-black flex items-center justify-center px-6">
        <div className="max-w-md w-full bg-brand-white/5 backdrop-blur-sm border border-brand-white/10 rounded-2xl p-8 text-center">
          <div className="animate-pulse space-y-4">
            <div className="w-16 h-16 rounded-full bg-brand-white/10 mx-auto"></div>
            <div className="h-8 bg-brand-white/10 rounded w-48 mx-auto"></div>
            <div className="h-6 bg-brand-white/10 rounded w-64 mx-auto"></div>
          </div>
        </div>
      </div>
    }>
      <ErrorContent />
    </Suspense>
  );
}
