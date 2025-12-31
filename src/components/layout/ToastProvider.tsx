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
                icon: <FiCheck className="w-5 h-5 text-[#45FF83]" />,
                gradient: 'radial-gradient(170.41% 350.78% at -1.38% 0%, rgba(69, 255, 131, 0.1) 0%, rgba(0, 255, 132, 0.02) 100%)',
                borderColor: 'rgba(69, 255, 131, 0.3)',
                defaultTitle: 'Success!',
                textColor: '#45FF83'
            };
            case 'error': return {
                icon: <FiX className="w-5 h-5 text-[#F99D9F]" />,
                gradient: 'radial-gradient(170.41% 350.78% at -1.38% 0%, rgba(249, 157, 159, 0.1) 0%, rgba(249, 157, 159, 0.02) 100%)',
                borderColor: 'rgba(249, 157, 159, 0.3)',
                defaultTitle: 'Oops!',
                textColor: '#F99D9F'
            };
            case 'info': return {
                icon: <FiInfo className="w-5 h-5 text-[#D77BFF]" />,
                gradient: 'radial-gradient(170.41% 350.78% at -1.38% 0%, rgba(215, 123, 255, 0.1) 0%, rgba(215, 123, 255, 0.02) 100%)',
                borderColor: 'rgba(215, 123, 255, 0.3)',
                defaultTitle: 'Info!',
                textColor: '#D77BFF'
            };
            case 'warning': return {
                icon: <FiAlertTriangle className="w-5 h-5 text-[#FFD53E]" />,
                gradient: 'radial-gradient(170.41% 350.78% at -1.38% 0%, rgba(255, 213, 62, 0.1) 0%, rgba(255, 213, 62, 0.02) 100%)',
                borderColor: 'rgba(255, 213, 62, 0.3)',
                defaultTitle: 'Alert!',
                textColor: '#FFD53E'
            };
        }
    };

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}

            {/* Responsive Toast Container */}
            <div className="fixed top-4 left-4 right-4 sm:left-auto sm:right-6 sm:top-6 z-[20000] flex flex-col gap-3 pointer-events-none sm:w-[320px]">
                {toasts.map((toast) => {
                    const details = getDetails(toast.type);
                    return (
                        <div
                            key={toast.id}
                            className="
                                pointer-events-auto
                                flex items-center gap-4 w-full
                                px-4 py-3 rounded-2xl
                                border backdrop-blur-[68.1px]
                                shadow-2xl
                                animate-in fade-in slide-in-from-top-4 duration-300
                                relative overflow-hidden group
                            "
                            style={{
                                background: details.gradient,
                                borderColor: details.borderColor,
                                backgroundColor: 'transparent'
                            }}
                        >
                            <div
                                className="flex-shrink-0 w-8 h-8 rounded-full border flex items-center justify-center bg-black/10"
                                style={{ borderColor: details.borderColor }}
                            >
                                {details.icon}
                            </div>

                            <div className="flex-1 min-w-0">
                                <h4
                                    className="font-poppins text-sm font-semibold tracking-tight leading-none"
                                    style={{ color: details.textColor }}
                                >
                                    {toast.title || details.defaultTitle}
                                </h4>
                                <p
                                    className="font-geist-mono text-[11px] opacity-80 leading-tight truncate mt-1"
                                    style={{ color: details.textColor }}
                                >
                                    {toast.message}
                                </p>
                            </div>

                            <button
                                onClick={() => removeToast(toast.id)}
                                className="flex-shrink-0 p-1 text-white/20 hover:text-white transition-colors"
                            >
                                <FiX className="w-4 h-4" />
                            </button>
                        </div>
                    );
                })}
            </div>
        </ToastContext.Provider>
    );
}
