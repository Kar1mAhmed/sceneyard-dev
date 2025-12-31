'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const tabs = [
    { href: '/profile', label: 'Profile' },
    { href: '/favorites', label: 'Favorites' },
    { href: '/downloads', label: 'Download history' },
    { href: '/plan', label: 'Your Plan' },
];

export default function SettingsNav() {
    const pathname = usePathname();

    return (
        <div className="w-full py-4 md:py-12">
            {/* Container matching ProfileHeader width */}
            <div
                className="mx-auto px-4"
                style={{ width: 'calc(100% - (var(--grid-margin) * 2))', maxWidth: '1200px' }}
            >
                {/* Toggle Container - Transparent with border, full width */}
                <div
                    className="relative inline-flex items-center bg-transparent p-1 rounded-full w-full justify-between"
                    style={{
                        border: '1px solid rgba(148, 124, 255, 0.3)', // #947CFF4D equivalent
                    }}
                >
                    {tabs.map((tab) => {
                        const isActive = pathname === tab.href;

                        return (
                            <Link
                                key={tab.href}
                                href={tab.href}
                                className={`
                                    flex-1 text-center relative z-10 px-4 md:px-8 py-3 rounded-full text-sm md:text-base font-medium transition-all duration-300
                                    ${isActive
                                        ? 'bg-white text-[#070708]'
                                        : 'text-white/60 hover:text-white'
                                    }
                                `}
                                style={{ fontFamily: 'var(--font-geist-mono), monospace' }}
                            >
                                {tab.label}
                            </Link>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
