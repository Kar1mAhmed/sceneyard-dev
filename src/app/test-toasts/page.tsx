'use client';

import LandingPageWrapper from "@/src/components/layout/LandingPageWrapper";
import GridBackground from "@/src/components/layout/GridBackground";
import { useToast } from "@/src/components/layout/ToastProvider";
import { FiCheck, FiX, FiInfo, FiAlertTriangle } from 'react-icons/fi';

export default function ToastTestPage() {
    const { showToast } = useToast();

    const testToasts = [
        {
            id: 'success',
            title: 'Success!',
            message: 'Congratulations! You have been successfully authenticated',
            type: 'success' as const,
            icon: <FiCheck className="w-6 h-6" />,
            color: '#45FF83'
        },
        {
            id: 'error',
            title: 'Oops!',
            message: 'This is not good!',
            type: 'error' as const,
            icon: <FiX className="w-6 h-6" />,
            color: '#F99D9F'
        },
        {
            id: 'info',
            title: 'Error!',
            message: 'Just some information for you.',
            type: 'info' as const,
            icon: <FiInfo className="w-6 h-6" />,
            color: '#D77BFF'
        },
        {
            id: 'warning',
            title: 'Alert!',
            message: 'You are being warned',
            type: 'warning' as const,
            icon: <FiAlertTriangle className="w-6 h-6" />,
            color: '#FFD53E'
        }
    ];

    return (
        <LandingPageWrapper>
            <GridBackground>
                <div className="min-h-screen py-40 flex flex-col items-center justify-center px-6">
                    <div className="max-w-4xl w-full space-y-12">
                        <div className="text-center space-y-4">
                            <h1 className="text-4xl md:text-6xl font-poppins font-bold text-white tracking-tight">
                                Cinematic <span className="text-[#CFA6FA]">Toasts</span>
                            </h1>
                            <p className="font-geist-mono text-gray-400 uppercase tracking-widest text-sm">
                                Visual Verification Suite
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {testToasts.map((t) => (
                                <button
                                    key={t.id}
                                    onClick={() => showToast(t.message, t.type, t.title)}
                                    className="group relative flex items-center gap-6 p-8 rounded-[32px] border transition-all duration-500 hover:scale-[1.02] active:scale-95 bg-black/40 backdrop-blur-sm"
                                    style={{ borderColor: `${t.color}33` }}
                                >
                                    {/* Hover Glow */}
                                    <div 
                                        className="absolute inset-0 rounded-[32px] opacity-0 group-hover:opacity-10 transition-opacity duration-500"
                                        style={{ backgroundColor: t.color, filter: 'blur(40px)' }}
                                    />

                                    <div 
                                        className="flex-shrink-0 w-14 h-14 rounded-full border-2 flex items-center justify-center transition-transform duration-500 group-hover:rotate-12"
                                        style={{ borderColor: `${t.color}66`, color: t.color, backgroundColor: `${t.color}11` }}
                                    >
                                        {t.icon}
                                    </div>

                                    <div className="flex-1 text-left">
                                        <h3 className="font-poppins text-xl font-semibold transition-colors" style={{ color: t.color }}>
                                            Trigger {t.title}
                                        </h3>
                                        <p className="font-geist-mono text-sm text-gray-400 mt-1 opacity-60">
                                            Click to test {t.type} variant
                                        </p>
                                    </div>
                                </button>
                            ))}
                        </div>

                        <div className="flex justify-center pt-8">
                            <p className="text-gray-500 font-geist-mono text-xs uppercase tracking-tighter">
                                SceneYard // Internal Design System 2026
                            </p>
                        </div>
                    </div>
                </div>
            </GridBackground>
        </LandingPageWrapper>
    );
}

