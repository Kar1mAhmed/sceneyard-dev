"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

interface UserSidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

// Sidebar menu items with icons
const menuItems = [
    { label: "LIBRARY", href: "/library", icon: "grid" },
    { label: "YOUR PLAN", href: "/plan", icon: "crown" },
    { label: "DOWNLOAD HISTORY", href: "/downloads", icon: "download" },
    { label: "FAVORITES PROJECTS", href: "/favorites", icon: "heart" },
    { label: "CONTACT US", href: "/contact", icon: "mail" },
    { label: "HOW TO USE", href: "/how-to-use", icon: "help" },
    { label: "FAQ", href: "/faq", icon: "file" },
];

export default function UserSidebar({ isOpen, onClose }: UserSidebarProps) {
    const { data: session } = useSession();
    const [isMounted, setIsMounted] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setIsMounted(true);
            const timer = setTimeout(() => setIsAnimating(true), 10);
            return () => clearTimeout(timer);
        } else {
            setIsAnimating(false);
            const timer = setTimeout(() => setIsMounted(false), 300);
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    if (!isMounted) return null;

    const handleSignOut = () => {
        signOut({ callbackUrl: "/" });
    };

    return (
        <div className="fixed inset-0 z-[200]">
            {/* Backdrop */}
            <div
                className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-500 ease-in-out ${isAnimating ? 'opacity-100' : 'opacity-0'}`}
                onClick={onClose}
            />

            {/* Sidebar Panel */}
            <div
                className={`absolute right-0 top-0 h-full w-[min(400px,85vw)] flex flex-col z-[201] ${isOpen && isAnimating
                        ? 'animate-slide-in-right'
                        : !isOpen
                            ? 'animate-slide-out-right'
                            : 'opacity-0 translate-x-full'
                    }`}
                style={{
                    background: 'var(--color-dark-08)',
                }}
            >
                {/* Purple Header */}
                <div
                    className="relative px-[clamp(1.5rem,2.5vw,2.5rem)] pt-[max(1.8rem,7vh)] pb-[max(1.2rem,3.5vh)]"
                    style={{
                        background: 'var(--color-primary-60)',
                    }}
                >
                    {/* Close Button - Top Right */}
                    <button
                        onClick={onClose}
                        className="absolute top-[1.2rem] right-[max(1rem,2vw)] text-white hover:opacity-80 transition-all cursor-pointer z-[210] p-2"
                        aria-label="Close menu"
                    >
                        <svg className="w-[min(1.8rem,5vh)] h-[min(1.8rem,5vh)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>

                    {/* User Info */}
                    <div className="flex items-center gap-[max(0.8rem,1.2vw)] mt-[max(1rem,2vh)]">
                        {/* Avatar */}
                        <div className="relative w-[clamp(3rem,6vh,4rem)] h-[clamp(3rem,6vh,4rem)] rounded-full overflow-hidden bg-white/20 flex-shrink-0 border-[3px] border-[var(--03,#947CFF)]">
                            {session?.user?.image ? (
                                <Image
                                    src={session.user.image}
                                    alt={session.user.name || "User"}
                                    fill
                                    className="object-cover"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-white text-[clamp(1rem,2.5vh,1.4rem)] font-bold">
                                    {session?.user?.name?.[0] || "U"}
                                </div>
                            )}
                        </div>

                        {/* Name & Email */}
                        <div className="flex flex-col min-w-0 flex-1">
                            <span
                                className="text-white font-medium text-[clamp(1rem,2vh,1.35rem)] leading-[120%] tracking-[0%] truncate px-1"
                                style={{ fontFamily: 'var(--font-poppins), sans-serif' }}
                                title={session?.user?.name || ""}
                            >
                                {session?.user?.name || "User"}
                            </span>
                            <span
                                className="text-white/70 font-semibold text-[14px] leading-[120%] tracking-[0%] truncate px-1"
                                style={{ fontFamily: 'var(--font-geist-mono), monospace' }}
                                title={session?.user?.email || ""}
                            >
                                {session?.user?.email || ""}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Menu Items */}
                <div className="flex-1 overflow-y-auto py-[max(1rem,2vh)] custom-scrollbar">
                    {menuItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            onClick={onClose}
                            className="flex items-center justify-between px-[clamp(1.5rem,2.5vw,2.5rem)] py-[max(0.75rem,1.8vh)] group transition-all hover:bg-white/5"
                        >
                            <div className="flex items-center gap-[max(1rem,1.5vw)]">
                                {/* Icon with Gry-3 color */}
                                <div
                                    className="w-[min(1.5rem,4vh)] h-[min(1.5rem,4vh)] flex items-center justify-center transition-colors"
                                    style={{ color: '#AFB0B6' }}
                                >
                                    <MenuIcon type={item.icon} />
                                </div>
                                <span
                                    className="text-[clamp(0.9rem,1.8vh,1.25rem)] font-normal tracking-wide uppercase leading-[120%]"
                                    style={{
                                        fontFamily: 'var(--font-sans), sans-serif',
                                        color: '#AFB0B6'
                                    }}
                                >
                                    {item.label}
                                </span>
                            </div>

                            {/* Arrow indicator - Top Right pointing */}
                            <div className="relative w-[min(1rem,3vh)] h-[min(1rem,3vh)] flex-shrink-0">
                                <div
                                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[75%] h-[75%] border-t-[1.5px] border-r-[1.5px] rotate-0 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                                    style={{ borderColor: 'rgba(215, 123, 255, 1)' }}
                                />
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Footer - Support & Sign Out */}
                <div className="px-[clamp(1.5rem,2.5vw,2.5rem)] py-[max(1.5rem,3vh)] border-t border-white/10">
                    <Link
                        href="/support"
                        onClick={onClose}
                        className="flex items-center gap-[max(1rem,1.5vw)] py-[max(0.5rem,1vh)] group transition-all hover:bg-white/5 px-4 rounded-lg"
                    >
                        <div
                            className="w-[min(1.5rem,4vh)] h-[min(1.5rem,4vh)] flex items-center justify-center transition-colors"
                            style={{ color: '#AFB0B6' }}
                        >
                            <MenuIcon type="help-circle" />
                        </div>
                        <span
                            className="text-[clamp(0.9rem,1.8vh,1.25rem)] font-normal tracking-wide uppercase leading-[120%]"
                            style={{
                                fontFamily: 'var(--font-sans), sans-serif',
                                color: '#AFB0B6'
                            }}
                        >
                            SUPPORT
                        </span>
                    </Link>

                    <button
                        onClick={handleSignOut}
                        className="flex items-center gap-[max(1rem,1.5vw)] py-[max(0.5rem,1vh)] text-red-400 transition-all w-full group hover:bg-red-400/5 px-4 rounded-lg"
                    >
                        <div className="w-[min(1.5rem,4vh)] h-[min(1.5rem,4vh)] flex items-center justify-center">
                            <MenuIcon type="logout" />
                        </div>
                        <span
                            className="text-[clamp(0.9rem,1.8vh,1.25rem)] font-normal tracking-wide uppercase leading-[120%]"
                            style={{ fontFamily: 'var(--font-sans), sans-serif' }}
                        >
                            SIGN-OUT
                        </span>
                    </button>
                </div>
            </div>
        </div>
    );
}

// Simple icon component for menu items
function MenuIcon({ type }: { type: string }) {
    switch (type) {
        case "grid":
            return (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
            );
        case "crown":
            return (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3l3.5 7L12 6l3.5 4L19 3M5 3v18h14V3" />
                </svg>
            );
        case "download":
            return (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
            );
        case "heart":
            return (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
            );
        case "mail":
            return (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
            );
        case "help":
            return (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            );
        case "file":
            return (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
            );
        case "help-circle":
            return (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            );
        case "logout":
            return (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
            );
        default:
            return null;
    }
}
