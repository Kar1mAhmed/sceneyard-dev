'use client';

import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { FiCheck, FiX, FiInfo, FiAlertTriangle } from 'react-icons/fi';

type ToastType = 'success' | 'error' | 'info' | 'warning';

interface Toast {
    id: string;
    message: string;
    type: ToastType;
    title?: string;
}

interface ToastContextType {
    showToast: (message: string, type?: ToastType, title?: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function useToast() {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within ToastProvider');
    }
    return context;
}

export function ToastProvider({ children }: { children: ReactNode }) {
    const [toasts, setToasts] = useState<Toast[]>([]);

    const showToast = useCallback((message: string, type: ToastType = 'success', title?: string) => {
        const id = Math.random().toString(36).substring(7);
        const newToast = { id, message, type, title };

        setToasts((prev) => [...prev, newToast]);

        setTimeout(() => {
            setToasts((prev) => prev.filter((toast) => toast.id !== id));
        }, 5000);
    }, []);

    const removeToast = useCallback((id: string) => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, []);

    const getDetails = (type: ToastType) => {
        switch (type) {
            case 'success': return {
                icon: <FiCheck className="w-4 h-4" />,
                color: '#45FF83',
                defaultTitle: 'Success!'
            };
            case 'error': return {
                icon: <FiX className="w-4 h-4" />,
                color: '#F99D9F',
                defaultTitle: 'Oops!'
            };
            case 'info': return {
                icon: <FiInfo className="w-4 h-4" />,
                color: '#D77BFF',
                defaultTitle: 'Info!'
            };
            case 'warning': return {
                icon: <FiAlertTriangle className="w-4 h-4" />,
                color: '#FFD53E',
                defaultTitle: 'Alert!'
            };
        }
    };

    const handleSize = 8;
    const halfHandle = handleSize / 2;

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}

            {/* Toast Container - Bottom Right, SelectionBox Style */}
            <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:bottom-6 z-[20000] flex flex-col gap-3 pointer-events-none sm:w-[360px]">
                {toasts.map((toast) => {
                    const details = getDetails(toast.type);
                    return (
                        <div
                            key={toast.id}
                            className="pointer-events-auto relative animate-in fade-in slide-in-from-bottom-4 duration-300"
                        >
                            {/* Background Overlay */}
                            <div
                                className="absolute inset-0 pointer-events-none"
                                style={{ backgroundColor: '#0a0a0c' }}
                            />

                            <div
                                className="relative z-10 flex items-center gap-4 px-5 py-4"
                            >
                                {/* Icon */}
                                <div style={{ color: details.color }}>
                                    {details.icon}
                                </div>

                                {/* Text */}
                                <div className="flex-1 min-w-0">
                                    <h4
                                        className="text-sm font-semibold tracking-tight leading-none"
                                        style={{
                                            color: details.color,
                                            fontFamily: 'var(--font-poppins), sans-serif'
                                        }}
                                    >
                                        {toast.title || details.defaultTitle}
                                    </h4>
                                    <p
                                        className="text-[11px] opacity-80 leading-tight truncate mt-1"
                                        style={{
                                            color: details.color,
                                            fontFamily: 'var(--font-geist-mono), monospace'
                                        }}
                                    >
                                        {toast.message}
                                    </p>
                                </div>

                                {/* Close Button */}
                                <button
                                    onClick={() => removeToast(toast.id)}
                                    className="flex-shrink-0 p-1 opacity-40 hover:opacity-100 transition-opacity"
                                    style={{ color: details.color }}
                                >
                                    <FiX className="w-4 h-4" />
                                </button>
                            </div>

                            {/* Border Box with Corner Handles */}
                            <div
                                className="absolute inset-0 pointer-events-none"
                                style={{ border: `1.5px solid ${details.color}` }}
                            >
                                {/* Top Left Handle */}
                                <div
                                    className="absolute"
                                    style={{
                                        width: handleSize,
                                        height: handleSize,
                                        backgroundColor: details.color,
                                        top: -halfHandle,
                                        left: -halfHandle
                                    }}
                                />
                                {/* Top Right Handle */}
                                <div
                                    className="absolute"
                                    style={{
                                        width: handleSize,
                                        height: handleSize,
                                        backgroundColor: details.color,
                                        top: -halfHandle,
                                        right: -halfHandle
                                    }}
                                />
                                {/* Bottom Left Handle */}
                                <div
                                    className="absolute"
                                    style={{
                                        width: handleSize,
                                        height: handleSize,
                                        backgroundColor: details.color,
                                        bottom: -halfHandle,
                                        left: -halfHandle
                                    }}
                                />
                                {/* Bottom Right Handle */}
                                <div
                                    className="absolute"
                                    style={{
                                        width: handleSize,
                                        height: handleSize,
                                        backgroundColor: details.color,
                                        bottom: -halfHandle,
                                        right: -halfHandle
                                    }}
                                />
                            </div>
                        </div>
                    );
                })}
            </div>
        </ToastContext.Provider>
    );
}
