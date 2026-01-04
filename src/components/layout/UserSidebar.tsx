"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "../ui/Button";

interface UserSidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

const loggedInMainItems = [
    { label: "LIBRARY", href: "/library", icon: "grid" },
    { label: "ACCOUNT", href: "/account", icon: "user" },
    { label: "YOUR PLAN", href: "/plan", icon: "crown" },
    { label: "DOWNLOAD HISTORY", href: "/downloads", icon: "download" },
    { label: "FAVORITES PROJECTS", href: "/favorites", icon: "heart" },
];

const loggedInSupportItems = [
    { label: "CONTACT US", href: "/contact", icon: "mail" },
    { label: "HOW TO USE", href: "/how-to-use", icon: "help" },
    { label: "FAQ", href: "/faq", icon: "file" },
];

const guestMenuItems = [
    { label: "HOME", href: "/", icon: "home" },
    { label: "ABOUT US", href: "/about", icon: "help" }, // Assuming about path
    { label: "LIBRARY", href: "/library", icon: "grid" },
    { label: "PRICING", href: "/pricing", icon: "pricing" },
    { label: "CONTACT US", href: "/contact", icon: "mail" },
];

export default function UserSidebar({ isOpen, onClose }: UserSidebarProps) {
    const { data: session, status } = useSession();
    const [isMounted, setIsMounted] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);
    const pathname = usePathname();

    const isLoggedIn = status === "authenticated" && !!session;

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

    const handleGoogleLogin = () => {
        signIn("google", { callbackUrl: "/library" });
    };

    const isHome = pathname === "/";
    const isLibrary = pathname === "/library";
    const isPricing = pathname === "/pricing";
    const isAbout = pathname === "/about";
    const isContact = pathname === "/contact";
    const isHowToUse = pathname === "/how-to-use";
    const isFAQ = pathname === "/faq";

    // Menu logic handled in render based on login status

    return (
        <div className="fixed inset-0 z-[200]">
            {/* Backdrop */}
            <div
                className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${isAnimating ? 'opacity-100' : 'opacity-0'} 
                    lg:bg-black/60 lg:backdrop-blur-sm`}
                onClick={onClose}
            >
                {/* Mobile Glassy Backdrop */}
                <div
                    className="absolute inset-0 lg:hidden"
                    style={{
                        background: '#000000DB',
                        backdropFilter: 'blur(32.79999923706055px)',
                        WebkitBackdropFilter: 'blur(32.79999923706055px)'
                    }}
                />
            </div>

            {/* Sidebar Panel */}
            <div
                className={`absolute right-0 top-0 h-full flex flex-col z-[201] transition-transform duration-500 ease-in-out 
                    ${isAnimating ? 'translate-x-0' : 'translate-x-full'} 
                    w-full lg:w-[min(400px,85vw)]`}
                style={{
                    background: typeof window !== 'undefined' && window.innerWidth >= 1024 ? '#000000DB' : 'rgba(0, 0, 0, 0.1)',
                    backdropFilter: 'blur(32.79999923706055px)',
                    WebkitBackdropFilter: 'blur(32.79999923706055px)'
                }}
            >
                {/* 1. Desktop Purple Header (GitHub Legacy) */}
                <div
                    className="hidden lg:block relative px-[clamp(1.5rem,2.5vw,2.5rem)] pt-[max(1.8rem,7vh)] pb-[max(1.2rem,3.5vh)]"
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
                        <div className="relative w-[clamp(3rem,6vh,4rem)] h-[clamp(3rem,6vh,4rem)] rounded-full overflow-hidden bg-white/20 flex-shrink-0 border-[3px] border-[var(--03,#947CFF)]">
                            {session?.user?.image ? (
                                <Image src={session.user.image} alt={session.user.name || "User"} fill className="object-cover" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-white text-[clamp(1rem,2.5vh,1.4rem)] font-bold">
                                    {session?.user?.name?.[0] || "U"}
                                </div>
                            )}
                        </div>
                        <div className="flex flex-col min-w-0 flex-1">
                            <span className="text-white font-medium text-[clamp(1rem,2vh,1.35rem)] leading-[120%] truncate px-1" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                                {session?.user?.name || "User"}
                            </span>
                            <span className="font-semibold text-[14px] leading-[120%] truncate px-1" style={{ fontFamily: 'var(--font-geist-mono), monospace', color: '#D77BFF' }}>
                                {session?.user?.email || ""}
                            </span>
                        </div>
                    </div>
                </div>

                {/* 2. Mobile Header */}
                <div className="lg:hidden flex items-center justify-between px-4 pt-8 pb-4">
                    <div className="relative w-[180px] h-[60px]">
                        <Image
                            src="/logo.svg"
                            alt="SceneYard"
                            fill
                            className="object-contain object-left"
                        />
                    </div>
                    <button
                        onClick={onClose}
                        className="text-white hover:opacity-80 transition-all cursor-pointer p-2"
                        aria-label="Close menu"
                    >
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Mobile User Info Section - SOLID BACKGROUND */}
                <div className="lg:hidden px-8 py-2">
                    {isLoggedIn && (
                        <div
                            className="flex items-center gap-4 p-4 rounded-[40px] relative overflow-hidden"
                            style={{
                                background: '#6C38FF',
                            }}
                        >
                            <div className="relative w-14 h-14 rounded-full overflow-hidden bg-white/20 flex-shrink-0 border-[3px] border-[#947CFF]">
                                {session?.user?.image ? (
                                    <Image src={session.user.image} alt={session.user.name || "User"} fill className="object-cover" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-white text-xl font-bold">{session?.user?.name?.[0] || "U"}</div>
                                )}
                            </div>
                            <div className="flex flex-col min-w-0">
                                <span className="text-white font-semibold text-lg leading-tight truncate">{session?.user?.name || "User"}</span>
                                <span className="font-mono text-[12px] truncate mt-0.5  tracking-wider font-bold" style={{ color: '#D77BFF', fontFamily: 'var(--font-geist-mono), monospace' }}>{session?.user?.email || ""}</span>
                            </div>
                        </div>
                    )}
                </div>

                {/* Menu Items Container */}
                <div className="flex-1 overflow-y-auto pt-4 pb-8 custom-scrollbar">
                    {isLoggedIn ? (
                        <>
                            {/* Logged In Sections */}
                            <div className="flex flex-col">
                                {loggedInMainItems.map((item) => (
                                    <MenuItem
                                        key={item.label}
                                        item={item}
                                        onClose={onClose}
                                        isActive={pathname === item.href}
                                    />
                                ))}
                            </div>

                            <div className="mx-8 my-6 h-[1px] bg-white/10" />

                            <div className="flex flex-col">
                                {loggedInSupportItems.map((item) => (
                                    <MenuItem
                                        key={item.label}
                                        item={item}
                                        onClose={onClose}
                                        isActive={pathname === item.href}
                                    />
                                ))}
                            </div>
                        </>
                    ) : (
                        /* Guest Section */
                        <div className="flex flex-col">
                            {guestMenuItems.map((item) => (
                                <MenuItem
                                    key={item.label}
                                    item={item}
                                    onClose={onClose}
                                    isActive={pathname === item.href}
                                />
                            ))}
                            {!isLoggedIn && (
                                <div className="px-8 mt-4 mb-8 flex justify-center w-full lg:hidden">
                                    <Button
                                        onClick={handleGoogleLogin}
                                        variant="primary"
                                        className="w-full !max-w-none"
                                    >
                                        Sign-in
                                    </Button>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* 3. Desktop Footer (GitHub Legacy) */}
                <div className="hidden lg:block px-[clamp(1.5rem,2.5vw,2.5rem)] py-[max(1.5rem,3vh)] border-t border-white/10">


                    <button
                        onClick={handleSignOut}
                        className="flex items-center gap-[max(1rem,1.5vw)] py-[max(0.5rem,1vh)] text-red-400 transition-all w-full group hover:bg-red-400/5 px-4 rounded-lg"
                    >
                        <div className="w-[min(1.5rem,4vh)] h-[min(1.5rem,4vh)] flex items-center justify-center" style={{ color: '#FF5B5B' }}>
                            <MenuIcon type="logout" />
                        </div>
                        <span className="text-[clamp(0.9rem,1.8vh,1.25rem)] font-normal tracking-wide uppercase leading-[120%]" style={{ fontFamily: 'var(--font-sans), sans-serif' }}>
                            SIGN-OUT
                        </span>
                    </button>
                </div>

                {/* 4. Mobile Footer - Sign-out for Mobile */}
                {isLoggedIn && (
                    <div className="lg:hidden px-8 py-4 border-t border-white/10 space-y-1">
                        <button
                            onClick={handleSignOut}
                            className="flex items-center gap-4 p-3 text-[#FF5B5B] transition-all w-full group hover:bg-red-400/5 rounded-xl"
                        >
                            <div className="w-8 h-8 flex items-center justify-center" style={{ color: '#FF5B5B' }}>
                                <MenuIcon type="logout" />
                            </div>
                            <span className="font-medium uppercase tracking-wider text-base">
                                SIGN-OUT
                            </span>
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

function MenuItem({ item, onClose, isActive = false }: { item: any, onClose: () => void, isActive?: boolean }) {
    return (
        <Link
            href={item.href}
            onClick={onClose}
            className="flex items-center justify-between px-8 lg:px-[clamp(1.5rem,2.5vw,2.5rem)] py-4 lg:py-[max(0.75rem,1.8vh)] group transition-all hover:bg-white/5"
        >
            <div className="flex items-center gap-6 lg:gap-[max(1rem,1.5vw)]">
                {/* Icon: Enlarged on mobile (w-8 h-8) */}
                {item.icon && (
                    <div
                        className="w-8 h-8 lg:w-[min(1.5rem,4vh)] lg:h-[min(1.5rem,4vh)] flex items-center justify-center transition-colors px-1 lg:px-0"
                        style={{ color: isActive ? '#00FFF0' : '#62646C' }}
                    >
                        <MenuIcon type={item.icon} />
                    </div>
                )}
                <div className="flex flex-col">
                    <span
                        className="uppercase tracking-normal text-[16px] lg:text-[clamp(0.9rem,1.8vh,1.25rem)] transition-colors leading-[120%]"
                        style={{
                            fontFamily: 'Poppins, sans-serif',
                            fontWeight: 400,
                            color: isActive ? '#00FFF0' : (typeof window !== 'undefined' && window.innerWidth >= 1024 ? '#AFB0B6' : '#E4E4E6')
                        }}
                    >
                        {item.label}
                    </span>
                    {isActive && (
                        <div className="h-[1.5px] w-full bg-[#00FFF0] mt-1" />
                    )}
                </div>
            </div>
            {/* Arrow indicator */}
            <div className="relative w-6 h-6 lg:w-[min(1rem,3vh)] lg:h-[min(1rem,3vh)] flex-shrink-0">
                <div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[75%] h-[75%] border-t-[1.5px] border-r-[1.5px] rotate-0 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                    style={{ borderColor: '#00FFF0' }}
                />
            </div>
        </Link>
    );
}

function MenuIcon({ type }: { type: string }) {
    switch (type) {
        case "grid":
            return (
                <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
            );
        case "crown":
            return (
                <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3l3.5 7L12 6l3.5 4L19 3M5 3v18h14V3" />
                </svg>
            );
        case "download":
            return (
                <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
            );
        case "heart":
            return (
                <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
            );
        case "mail":
            return (
                <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
            );
        case "help":
            return (
                <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            );
        case "file":
            return (
                <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
            );
        case "help-circle":
            return (
                <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            );
        case "logout":
            return (
                <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
            );
        case "home":
            return (
                <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
            );
        case "pricing":
            return (
                <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            );
        case "user":
            return (
                <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
            );
        default:
            return null;
    }
}
