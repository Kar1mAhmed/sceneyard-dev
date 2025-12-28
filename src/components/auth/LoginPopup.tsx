"use client";

import React from "react";
import Image from "next/image";
import { FaGoogle } from "react-icons/fa";
import { signIn } from "next-auth/react";
import { Button } from "@/src/components/ui/Button";

interface LoginPopupProps {
    isOpen: boolean;
    onClose: () => void;
    message?: string;
}

export default function LoginPopup({ isOpen, onClose, message = "Login and start creating" }: LoginPopupProps) {
    if (!isOpen) return null;

    const handleGoogleLogin = () => {
        signIn("google", { callbackUrl: "/library" });
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />

            {/* Popup Content */}
            <div
                className="relative flex flex-col items-center text-center animate-in fade-in zoom-in-95 duration-200"
                style={{
                    width: '900px',
                    height: 'auto',
                    minHeight: '600px',
                    borderRadius: '64px',
                    padding: '82px',
                    background: 'rgba(117, 88, 248, 1)',
                    boxShadow: '0px 24px 48px -12px rgba(0, 0, 0, 0.5)',
                    maxWidth: '95vw',
                    maxHeight: '95vh'
                }}
            >
                {/* Top Section: Logo and Message */}
                <div className="flex flex-col items-center w-full mb-12">
                    {/* Logo */}
                    <div className="relative w-[180px] h-[80px] mb-8">
                        <Image
                            src="/logo.svg"
                            alt="SceneYard"
                            fill
                            className="object-contain"
                        />
                    </div>

                    {/* Message */}
                    <h3
                        className="text-white font-light"
                        style={{
                            fontFamily: 'var(--font-poppins), sans-serif',
                            fontSize: '48px',
                            lineHeight: '1.2',
                            fontWeight: 400,
                            textTransform: 'uppercase',
                        }}
                    >
                        {message}
                    </h3>
                </div>

                {/* Bottom Section: Actions */}
                <div className="flex flex-col items-center w-full gap-6">
                    {/* Google Login Button */}
                    <button
                        onClick={handleGoogleLogin}
                        className="w-full h-[60px] rounded-full flex items-center justify-center gap-4 hover:opacity-90 transition-opacity"
                        style={{
                            backgroundColor: 'white',
                            fontFamily: 'var(--font-geist-mono), monospace',
                            fontWeight: 500,
                            fontSize: '18px',
                            lineHeight: '25px',
                            letterSpacing: '0%',
                            color: 'black'
                        }}
                    >
                        <FaGoogle size={24} className="text-black" />
                        Login with Google
                    </button>

                    {/* Cancel Button */}
                    <button
                        onClick={onClose}
                        className="w-full h-[60px] rounded-full flex items-center justify-center bg-transparent border border-white hover:bg-white/10 transition-colors"
                        style={{
                            fontFamily: 'var(--font-geist-mono), monospace',
                            fontWeight: 500,
                            fontSize: '18px',
                            lineHeight: '25px',
                            letterSpacing: '0%',
                            color: 'white'
                        }}
                    >
                        Cancel
                    </button>

                    {/* Trouble signing in? */}
                    <button
                        className="text-white/60 hover:text-white transition-colors mt-2"
                        style={{
                            fontFamily: 'var(--font-geist-mono), monospace',
                            fontSize: '16px'
                        }}
                    >
                        Trouble signing in?
                    </button>
                </div>
            </div>
        </div>
    );
}
