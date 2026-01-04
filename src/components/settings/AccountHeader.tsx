'use client';

import React from 'react';
import Image from 'next/image';
import { useSession } from 'next-auth/react';

export default function AccountHeader() {
    const { data: session } = useSession();

    const userName = session?.user?.name || 'Guest User';
    const userEmail = session?.user?.email || 'guest@example.com';
    const userImage = session?.user?.image || null;

    return (
        <div className="relative w-full py-8 md:py-12 mt-8 md:mt-16">
            {/* Top Horizontal Line */}
            <div
                className="absolute top-0 left-0 right-0 h-[1px]"
                style={{ background: 'var(--color-grid-line)' }}
            />

            {/* Content - Left aligned, matching nav width */}
            <div
                className="flex items-center gap-6 md:gap-8 mx-auto px-4"
                style={{ width: 'calc(100% - (var(--grid-margin) * 2))', maxWidth: '1200px' }}
            >
                {/* Avatar - Bigger, left most */}
                <div
                    className="relative w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden bg-white/20 flex-shrink-0 border-[3px] border-[#947CFF]"
                >
                    {userImage ? (
                        <Image
                            src={userImage}
                            alt={userName}
                            fill
                            className="object-cover"
                        />
                    ) : (
                        <div
                            className="w-full h-full flex items-center justify-center text-white text-2xl md:text-3xl font-bold"
                            style={{ fontFamily: 'var(--font-poppins)' }}
                        >
                            {userName.charAt(0).toUpperCase()}
                        </div>
                    )}
                </div>

                {/* Name and Email */}
                <div className="flex flex-col min-w-0">
                    <span
                        className="text-white font-semibold text-xl md:text-2xl leading-tight truncate"
                        style={{ fontFamily: 'var(--font-poppins), sans-serif' }}
                    >
                        {userName}
                    </span>
                    <span
                        className="font-semibold text-sm md:text-base leading-tight truncate mt-1"
                        style={{
                            fontFamily: 'var(--font-geist-mono), monospace',
                            color: '#D77BFF'
                        }}
                    >
                        {userEmail}
                    </span>
                </div>
            </div>

            {/* Bottom Horizontal Line */}
            <div
                className="absolute bottom-0 left-0 right-0 h-[1px]"
                style={{ background: 'var(--color-grid-line)' }}
            />
        </div>
    );
}
