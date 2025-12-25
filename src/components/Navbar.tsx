"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import LoginPopup from "./auth/LoginPopup";
import UserSidebar from "./UserSidebar";
import { MenuGridIcon } from "./ui/MenuGridIcon";

interface NavbarProps {
    isHidden?: boolean;
}

export default function Navbar({ isHidden = false }: NavbarProps) {
    const pathname = usePathname();
    const { data: session, status } = useSession();
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    const isLoggedIn = status === "authenticated" && !!session;

    useEffect(() => {
        const controlNavbar = () => {
            if (typeof window !== 'undefined') {
                // Don't hide navbar on scroll for logged in users
                if (isLoggedIn) {
                    setIsVisible(true);
                    return;
                }

                if (window.scrollY < 10) {
                    setIsVisible(true);
                } else if (window.scrollY > lastScrollY) { // if scroll down hide the navbar
                    setIsVisible(false);
                } else { // if scroll up show the navbar
                    setIsVisible(true);
                }

                // remember current page location to use in the next move
                setLastScrollY(window.scrollY);
            }
        };

        if (typeof window !== 'undefined') {
            window.addEventListener('scroll', controlNavbar);

            // cleanup function
            return () => {
                window.removeEventListener('scroll', controlNavbar);
            };
        }
    }, [lastScrollY, isLoggedIn]); // Add isLoggedIn to dependency array

    const effectivelyHidden = isHidden || !isVisible;

    const navLinks = [
        { href: "/", label: "Home" },
        { href: "/about", label: "About Us" },
        { href: "/library", label: "library" },
        { href: "/pricing", label: "Pricing" },
    ];

    // Don't render complex navbar until session is checked to avoid flicker
    if (status === "loading") {
        return (
            <header
                className="fixed top-0 left-0 right-0 z-50 flex items-center px-[125px] transition-all duration-500 ease-in-out"
                style={{
                    height: '100px',
                    background: 'linear-gradient(180deg, rgba(0, 0, 0, 0.15) 0%, rgba(0, 0, 0, 0) 100%)'
                }}
            >
                <div className="relative" style={{ width: '220px', height: '94px' }}>
                    <Image
                        src="/logo.svg"
                        alt="SceneYard"
                        fill
                        className="object-contain"
                        priority
                    />
                </div>
            </header>
        );
    }

    return (
        <>
            <header
                className={`fixed top-0 left-0 right-0 transition-[transform,background-color,opacity] duration-500 ease-in-out ${effectivelyHidden ? '-translate-y-full' : 'translate-y-0'}`}
                style={{
                    height: '100px',
                    paddingLeft: '125px',
                    paddingRight: '125px',
                    background: (effectivelyHidden || isSidebarOpen) ? 'transparent' : 'linear-gradient(180deg, rgba(0, 0, 0, 0.15) 0%, rgba(0, 0, 0, 0) 100%)',
                    zIndex: isSidebarOpen ? 210 : 50, // Higher than sidebar z-200, immediate shift
                    pointerEvents: isSidebarOpen ? 'none' : 'auto', // Don't block sidebar clicks
                }}
            >
                {/* Gradient Blur Layer - Disable blur when sidebar is open to keep logo clear */}
                <div
                    className="absolute inset-0 z-[-1] transition-opacity duration-300"
                    style={{
                        backdropFilter: isSidebarOpen ? 'none' : 'blur(20px)',
                        WebkitBackdropFilter: isSidebarOpen ? 'none' : 'blur(20px)',
                        maskImage: 'linear-gradient(to right, transparent 0%, black 100%)',
                        WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 100%)',
                        opacity: isSidebarOpen ? 0 : 1,
                    }}
                />

                <div className="flex items-center justify-between h-full w-full">
                    {/* Logo - Left */}
                    <Link
                        href={isLoggedIn ? "/library" : "/"}
                        className="flex items-center relative z-[111] pointer-events-auto transition-opacity hover:opacity-80"
                    >
                        <div className="relative" style={{ width: '220px', height: '94px' }}>
                            <Image
                                src="/logo.svg"
                                alt="SceneYard"
                                fill
                                className="object-contain"
                                priority
                            />
                        </div>
                    </Link>

                    {/* Navigation Links - Center (only for guests) */}
                    {!isLoggedIn && !isSidebarOpen && (
                        <nav
                            className="flex items-center gap-[20px] absolute left-1/2 -translate-x-1/2"
                            style={{
                                fontFamily: 'var(--font-geist-mono), monospace',
                                fontWeight: 400,
                                fontSize: '20px',
                                lineHeight: '150%',
                                letterSpacing: '0%'
                            }}
                        >
                            {navLinks.map((link) => {
                                const isActive = pathname === link.href;

                                return (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        className={`relative px-[10px] py-[10px] transition-colors duration-200 whitespace-nowrap flex flex-col items-center justify-center ${isActive ? 'text-[var(--color-primary-90)]' : 'text-white hover:text-[var(--color-primary-90)]'
                                            }`}
                                    >
                                        <span className={isActive ? "font-medium" : ""}>{link.label}</span>

                                        {/* Active Decoration: Line with Diamonds */}
                                        {isActive && (
                                            <div className="absolute bottom-0 flex items-center justify-center w-[calc(100%+0px)]">
                                                {/* Left Diamond */}
                                                <div
                                                    className="w-[6px] h-[6px] bg-[var(--color-primary-90)] rotate-45"
                                                    style={{ boxShadow: '0 0 4px var(--color-primary-90)' }}
                                                />

                                                {/* Line */}
                                                <div
                                                    className="h-[2px] flex-grow bg-[var(--color-primary-90)] mx-[-2px]"
                                                    style={{ boxShadow: '0 0 4px var(--color-primary-90)' }}
                                                />

                                                {/* Right Diamond */}
                                                <div
                                                    className="w-[6px] h-[6px] bg-[var(--color-primary-90)] rotate-45"
                                                    style={{ boxShadow: '0 0 4px var(--color-primary-90)' }}
                                                />
                                            </div>
                                        )}
                                    </Link>
                                );
                            })}
                        </nav>
                    )}

                    {/* Right Side - Login Button (guests) or Menu Icon (logged in) */}
                    <div className="relative z-[111] pointer-events-auto">
                        {isLoggedIn ? (
                            !isSidebarOpen && (
                                <MenuGridIcon
                                    size={48}
                                    onClick={() => setIsSidebarOpen(true)}
                                />
                            )
                        ) : (
                            <button
                                onClick={() => setIsLoginOpen(true)}
                                className="flex items-center justify-center bg-transparent border border-white text-white hover:bg-white hover:text-black transition-all duration-200 whitespace-nowrap cursor-pointer"
                                style={{
                                    height: '48px',
                                    padding: '8px 32px',
                                    borderRadius: '100px',
                                    fontFamily: 'var(--font-geist-mono), monospace',
                                    fontWeight: 500,
                                    fontSize: '18px',
                                    lineHeight: '150%',
                                    letterSpacing: '0%'
                                }}
                            >
                                Login
                            </button>
                        )}
                    </div>
                </div>
            </header>

            {/* Login Popup (for guests) */}
            <LoginPopup
                isOpen={isLoginOpen}
                onClose={() => setIsLoginOpen(false)}
            />

            {/* User Sidebar (for logged in users) */}
            <UserSidebar
                isOpen={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
            />
        </>
    );
}
