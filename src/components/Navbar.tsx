"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

interface NavbarProps {
    isHidden?: boolean;
}

import { useState } from "react";
import LoginPopup from "./auth/LoginPopup";

export default function Navbar({ isHidden = false }: NavbarProps) {
    const pathname = usePathname();
    const [isLoginOpen, setIsLoginOpen] = useState(false);

    const navLinks = [
        { href: "/", label: "Home" },
        { href: "/about", label: "About Us" },
        { href: "/library", label: "library" },
        { href: "/pricing", label: "Pricing" },
    ];

    return (
        <>
            <header
                className={`fixed top-0 left-0 right-0 z-50 transition-transform duration-500 ease-in-out ${isHidden ? '-translate-y-full' : 'translate-y-0'}`}
                style={{
                    height: '100px',
                    paddingLeft: '125px',
                    paddingRight: '125px',
                    background: isHidden ? 'transparent' : 'linear-gradient(180deg, rgba(0, 0, 0, 0.15) 0%, rgba(0, 0, 0, 0) 100%)',
                }}
            >
                {/* Gradient Blur Layer */}
                <div
                    className="absolute inset-0 z-[-1]"
                    style={{
                        backdropFilter: 'blur(20px)',
                        WebkitBackdropFilter: 'blur(20px)',
                        maskImage: 'linear-gradient(to right, transparent 0%, black 100%)',
                        WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 100%)'
                    }}
                />

                <div className="flex items-center justify-between h-full w-full">
                    {/* Logo - Left */}
                    <Link href="/" className="flex items-center">
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

                    {/* Navigation Links - Center */}
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

                    {/* Contact Us / Login Button - Right */}
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
                </div>
            </header>

            <LoginPopup
                isOpen={isLoginOpen}
                onClose={() => setIsLoginOpen(false)}
            />
        </>
    );
}
