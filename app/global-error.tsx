'use client';

import { useEffect } from 'react';

export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error('Global error:', error);
    }, [error]);

    return (
        <html>
            <body style={{
                margin: 0,
                padding: 0,
                backgroundColor: '#0f111a',
                color: '#e8eaf6',
                fontFamily: 'system-ui, -apple-system, sans-serif',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '100vh'
            }}>
                <div style={{
                    maxWidth: '600px',
                    padding: '2rem',
                    textAlign: 'center'
                }}>
                    <div style={{
                        width: '80px',
                        height: '80px',
                        borderRadius: '50%',
                        backgroundColor: 'rgba(239, 68, 68, 0.2)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 2rem'
                    }}>
                        <svg
                            width="40"
                            height="40"
                            fill="none"
                            stroke="#ef4444"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                            />
                        </svg>
                    </div>

                    <h1 style={{
                        fontSize: '2.5rem',
                        fontWeight: 'bold',
                        marginBottom: '1rem'
                    }}>
                        Critical Error
                    </h1>

                    <p style={{
                        fontSize: '1.125rem',
                        color: 'rgba(232, 234, 246, 0.7)',
                        marginBottom: '2rem'
                    }}>
                        A critical error occurred. Please refresh the page or contact support.
                    </p>

                    <div style={{
                        display: 'flex',
                        gap: '1rem',
                        justifyContent: 'center',
                        marginBottom: '2rem'
                    }}>
                        <button
                            onClick={reset}
                            style={{
                                padding: '0.75rem 1.5rem',
                                backgroundColor: '#7558f8',
                                color: 'white',
                                border: 'none',
                                borderRadius: '0.75rem',
                                fontSize: '1rem',
                                fontWeight: '600',
                                cursor: 'pointer'
                            }}
                        >
                            Try Again
                        </button>
                        <a
                            href="/"
                            style={{
                                padding: '0.75rem 1.5rem',
                                backgroundColor: 'rgba(232, 234, 246, 0.1)',
                                color: '#e8eaf6',
                                border: 'none',
                                borderRadius: '0.75rem',
                                fontSize: '1rem',
                                fontWeight: '600',
                                textDecoration: 'none',
                                display: 'inline-block'
                            }}
                        >
                            Go Home
                        </a>
                    </div>

                    {process.env.NODE_ENV === 'development' && (
                        <div style={{
                            backgroundColor: 'rgba(232, 234, 246, 0.05)',
                            border: '1px solid rgba(239, 68, 68, 0.2)',
                            borderRadius: '1rem',
                            padding: '1.5rem',
                            textAlign: 'left'
                        }}>
                            <h3 style={{
                                color: '#ef4444',
                                marginBottom: '1rem',
                                fontSize: '1.125rem'
                            }}>
                                Debug Info:
                            </h3>
                            <div style={{
                                backgroundColor: 'rgba(15, 17, 26, 0.5)',
                                borderRadius: '0.5rem',
                                padding: '1rem',
                                marginBottom: '1rem',
                                overflowX: 'auto'
                            }}>
                                <code style={{
                                    color: '#f87171',
                                    fontSize: '0.875rem',
                                    fontFamily: 'monospace'
                                }}>
                                    {error.message}
                                </code>
                            </div>
                            {error.stack && (
                                <div style={{
                                    backgroundColor: 'rgba(15, 17, 26, 0.5)',
                                    borderRadius: '0.5rem',
                                    padding: '1rem',
                                    maxHeight: '200px',
                                    overflowY: 'auto'
                                }}>
                                    <pre style={{
                                        color: 'rgba(232, 234, 246, 0.7)',
                                        fontSize: '0.75rem',
                                        fontFamily: 'monospace',
                                        margin: 0,
                                        whiteSpace: 'pre-wrap'
                                    }}>
                                        {error.stack}
                                    </pre>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </body>
        </html>
    );
}
