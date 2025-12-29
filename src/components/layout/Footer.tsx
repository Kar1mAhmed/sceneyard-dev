"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Ribbon } from "../ui/Ribbon";
import { ArrowUpRight, Facebook, Twitter, Linkedin, X } from "lucide-react"; // Using generic icons

interface FooterProps {
    onVisibilityChange?: (isVisible: boolean) => void;
}

const Footer = ({ onVisibilityChange }: FooterProps) => {
    const footerRef = React.useRef<HTMLElement>(null);

    React.useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (onVisibilityChange) {
                    onVisibilityChange(entry.isIntersecting);
                }
            },
            { threshold: 0.1 } // Detect as soon as 10% is visible
        );

        if (footerRef.current) {
            observer.observe(footerRef.current);
        }

        return () => {
            if (footerRef.current) {
                observer.unobserve(footerRef.current);
            }
        };
    }, [onVisibilityChange]);

    return (
        <footer ref={footerRef} className="w-full bg-black flex flex-col items-center border-t border-[var(--color-grid-line)] relative z-50">
            {/* Top Ribbon */}
            <Ribbon
                items={[
                    { text: "CREATIVE FREEDOM", icon: "sun" },
                    { text: "FAST WORKFLOW", icon: "timer" },
                    { text: "NO PLUGINS", icon: "cpu" },
                    { text: "DRAG & DROP", icon: "cursor" },
                    { text: "SAVE TIME", icon: "hour-glass" },
                    { text: "HANDLE MORE PROJECTS", icon: "box" }
                ]}
                backgroundColor="transparent"
                textColor="var(--color-grid-line)"
                borderColor="var(--color-grid-line)"
                iconColor="var(--color-grid-line)"
                className="opacity-80 border-b border-[var(--color-grid-line)]"
            />

            {/* Main Content Split */}
            <div className="w-full max-w-[1598px] grid grid-cols-1 lg:grid-cols-2">
                {/* LEFT SIDE: Brand & CTA */}
                <div className="flex flex-col justify-between py-8 md:py-12 px-6 md:px-8 lg:px-16 border-b lg:border-b-0 lg:border-r border-[var(--color-grid-line)]">
                    <div className="mb-0">
                        {/* Logo - Smaller on mobile */}
                        <div className="mb-4 md:mb-8 flex justify-center lg:justify-start">
                            <Image
                                src="/logo.svg"
                                alt="SceneYard"
                                width={140}
                                height={140}
                                className="object-contain md:w-[180px] md:h-[180px]"
                            />
                        </div>

                        {/* BIG CTA - Responsive sizing */}
                        <div className="flex flex-col gap-0 w-full items-center lg:items-start">
                            {/* Mobile: Stacked and smaller */}
                            <div className="text-center lg:text-left">
                                <span
                                    className="text-white uppercase leading-none block text-2xl md:text-4xl lg:text-[56px]"
                                    style={{
                                        fontFamily: 'var(--font-poppins)',
                                        fontWeight: 400,
                                        lineHeight: '100%',
                                        letterSpacing: '0%'
                                    }}
                                >
                                    START CREATING
                                </span>
                            </div>

                            {/* Row 2: NOW + Button */}
                            <div className="flex items-center justify-center lg:justify-start gap-4 md:gap-6 mt-2">
                                <span
                                    className="text-white uppercase leading-none text-2xl md:text-4xl lg:text-[56px]"
                                    style={{
                                        fontFamily: 'var(--font-poppins)',
                                        fontWeight: 400,
                                        lineHeight: '100%',
                                        letterSpacing: '0%'
                                    }}
                                >
                                    NOW
                                </span>
                                {/* Purple CTA Button */}
                                <Link
                                    href="/templates"
                                    className="flex items-center justify-center w-12 h-12 md:w-[100px] md:h-[50px] bg-[#CFA6FA] hover:bg-[#b88df0] transition-colors rounded-full text-black"
                                >
                                    <ArrowUpRight size={20} className="md:w-7 md:h-7" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* RIGHT SIDE: Navigation */}
                <div className="py-12 px-8 lg:px-24">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-8 text-white">
                        {/* Column 1 */}
                        <div className="flex flex-col gap-4">
                            <h4 className="text-[#62646C] text-sm font-semibold uppercase tracking-wider mb-2" style={{ fontFamily: 'var(--font-poppins)' }}>Home</h4>
                            <Link href="/about" className="text-sm uppercase font-medium hover:text-[#CFA6FA] transition-colors" style={{ fontFamily: 'var(--font-geist-mono)' }}>About Us</Link>
                            <Link href="/library" className="text-sm uppercase font-medium hover:text-[#CFA6FA] transition-colors" style={{ fontFamily: 'var(--font-geist-mono)' }}>Library</Link>
                            <Link href="/pricing" className="text-sm uppercase font-medium hover:text-[#CFA6FA] transition-colors" style={{ fontFamily: 'var(--font-geist-mono)' }}>Pricing</Link>
                        </div>

                        {/* Column 2 */}
                        <div className="flex flex-col gap-4">
                            <h4 className="text-[#62646C] text-sm font-semibold uppercase tracking-wider mb-2" style={{ fontFamily: 'var(--font-poppins)' }}>Library</h4>
                            <Link href="/templates" className="text-sm uppercase font-medium hover:text-[#CFA6FA] transition-colors" style={{ fontFamily: 'var(--font-geist-mono)' }}>After Effects</Link>
                            <Link href="/scenes" className="text-sm uppercase font-medium hover:text-[#CFA6FA] transition-colors" style={{ fontFamily: 'var(--font-geist-mono)' }}>Motion Scenes</Link>
                            <Link href="/templates" className="text-sm uppercase font-medium hover:text-[#CFA6FA] transition-colors" style={{ fontFamily: 'var(--font-geist-mono)' }}>After Effects</Link>
                            <Link href="/scenes" className="text-sm uppercase font-medium hover:text-[#CFA6FA] transition-colors" style={{ fontFamily: 'var(--font-geist-mono)' }}>Motion Scenes</Link>
                            <Link href="/templates" className="text-sm uppercase font-medium hover:text-[#CFA6FA] transition-colors" style={{ fontFamily: 'var(--font-geist-mono)' }}>After Effects</Link>
                        </div>

                        {/* Column 3 */}
                        <div className="flex flex-col gap-4">
                            <h4 className="text-[#62646C] text-sm font-semibold uppercase tracking-wider mb-2" style={{ fontFamily: 'var(--font-poppins)' }}>Services</h4>
                            <Link href="/contact" className="text-sm uppercase font-medium hover:text-[#CFA6FA] transition-colors" style={{ fontFamily: 'var(--font-geist-mono)' }}>Contact Us</Link>
                            <Link href="/pricing" className="text-sm uppercase font-medium hover:text-[#CFA6FA] transition-colors" style={{ fontFamily: 'var(--font-geist-mono)' }}>Pricing</Link>
                            <Link href="/commercial" className="text-sm uppercase font-medium hover:text-[#CFA6FA] transition-colors" style={{ fontFamily: 'var(--font-geist-mono)' }}>Commercial</Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="w-full border-t border-[var(--color-grid-line)] py-8 px-4 md:px-16">
                <div className="w-full max-w-[1598px] mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
                    {/* Left: Legal */}
                    <div className="flex items-center gap-6 text-[#62646C] text-xs font-bold uppercase tracking-wider" style={{ fontFamily: 'var(--font-geist-mono)' }}>
                        <Link href="/terms" className="hover:text-white transition-colors">Terms & Conditions</Link>
                        <span className="w-[1px] h-3 bg-[#62646C]"></span>
                        <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
                    </div>

                    {/* Center: Socials */}
                    <div className="flex items-center gap-4">
                        <a href="#" className="w-10 h-10 rounded-full border border-[#62646C] flex items-center justify-center text-[#62646C] hover:text-white hover:border-white transition-colors text-xs">
                            <Facebook size={16} fill="currentColor" />
                        </a>
                        <a href="#" className="w-10 h-10 rounded-full border border-[#62646C] flex items-center justify-center text-[#62646C] hover:text-white hover:border-white transition-colors text-xs">
                            <span className="font-bold text-lg">X</span>
                        </a>
                        <a href="#" className="w-10 h-10 rounded-full border border-[#62646C] flex items-center justify-center text-[#62646C] hover:text-white hover:border-white transition-colors text-xs">
                            <Linkedin size={16} fill="currentColor" />
                        </a>
                    </div>

                    {/* Right: Copyright */}
                    <div className="text-[#62646C] text-xs font-bold uppercase tracking-wider" style={{ fontFamily: 'var(--font-geist-mono)' }}>
                        © 2026 SceneYard. All rights reserved.
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
