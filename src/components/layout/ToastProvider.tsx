'use client';

import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { FiCheckCircle, FiXCircle, FiInfo, FiX } from 'react-icons/fi';

type ToastType = 'success' | 'error' | 'info';

interface Toast {
    id: string;
    message: string;
    type: ToastType;
}

interface ToastContextType {
    showToast: (message: string, type?: ToastType) => void;
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

    const showToast = useCallback((message: string, type: ToastType = 'success') => {
        const id = Math.random().toString(36).substring(7);
        const newToast = { id, message, type };

        setToasts((prev) => [...prev, newToast]);

        // Auto-dismiss after 4 seconds
        setTimeout(() => {
            setToasts((prev) => prev.filter((toast) => toast.id !== id));
        }, 4000);
    }, []);

    const removeToast = useCallback((id: string) => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, []);

    const getDetails = (type: ToastType) => {
        switch (type) {
            case 'success': return {
                icon: <FiCheckCircle className="w-4 h-4 text-[#F9D423]" />,
                accent: '#F9D423',
                label: 'Success'
            };
            case 'error': return {
                icon: <FiXCircle className="w-4 h-4 text-[#FF3366]" />,
                accent: '#FF3366',
                label: 'Error'
            };
            default: return {
                icon: <FiInfo className="w-4 h-4 text-[#4325F6]" />,
                accent: '#4325F6',
                label: 'Heads up'
            };
        }
    };

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}

            {/* Toast Container */}
            <div className="fixed bottom-10 right-10 z-[10000] flex flex-col gap-4 pointer-events-none">
                {toasts.map((toast) => {
                    const details = getDetails(toast.type);
                    return (
                        <div
                            key={toast.id}
                            className="
                                pointer-events-auto
                                flex items-start gap-5 min-w-[340px] max-w-[420px]
                                px-6 py-5 rounded-2xl
                                bg-black/60 backdrop-blur-2xl border border-white/10
                                shadow-[0_20px_50px_rgba(0,0,0,0.6)]
                                animate-in fade-in slide-in-from-right-10 duration-700
                                relative overflow-hidden group
                            "
                        >
                            {/* Accent Glow */}
                            <div
                                className="absolute top-0 left-0 w-1 h-full opacity-60"
                                style={{ backgroundColor: details.accent }}
                            />

                            <div className="flex-shrink-0 mt-1">
                                {details.icon}
                            </div>

                            <div className="flex-1 space-y-1.5">
                                <p
                                    className="opacity-40"
                                    style={{
                                        fontFamily: 'var(--font-geist-mono)',
                                        fontWeight: 400,
                                        fontSize: '10px',
                                        letterSpacing: '0.1em',
                                        textTransform: 'uppercase'
                                    }}
                                >
                                    {details.label}
                                </p>
                                <p className="text-white font-poppins text-[15px] leading-relaxed font-light">
                                    {toast.message}
                                </p>
                            </div>

                            <button
                                onClick={() => removeToast(toast.id)}
                                className="flex-shrink-0 p-1.5 rounded-full hover:bg-white/5 transition-all duration-300 opacity-20 hover:opacity-100"
                            >
                                <FiX className="w-4 h-4 text-white" />
                            </button>
                        </div>
                    );
                })}
            </div>
        </ToastContext.Provider>
    );
}
