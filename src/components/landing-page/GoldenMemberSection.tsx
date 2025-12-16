"use client";

import React from "react";
import Link from "next/link";
import SectionHeader from "../SectionHeader";
import SelectionBox from "../SelectionBox";

export default function GoldenMemberSection() {
    return (
        <section className="w-full relative py-24 flex flex-col items-center">
            {/* Header */}
            <div className="w-full relative z-20 mb-20 px-4">
                <SectionHeader
                    title={
                        <div className="flex flex-col items-center gap-2">
                            <div className="flex flex-row items-center justify-center gap-[0.2em] whitespace-nowrap w-full z-10">
                                <SelectionBox
                                    text="Golden Member"
                                    color="var(--accent-yellow)"
                                    boxColor="var(--accent-yellow)"
                                    bgOpacity={0.1}
                                />
                            </div>
                        </div>
                    }
                    subtitle={
                        <span style={{ color: 'var(--color-primary-70)' }}>Limited to 200 spots</span>
                    }
                />
            </div>

            {/* Main Content */}
            <div className="w-full px-4 md:px-[var(--grid-margin)] flex flex-col lg:flex-row items-center lg:items-start justify-between gap-12 lg:gap-24 mb-20">

                {/* Left Side: Promo Text */}
                <div className="flex-1 max-w-[600px] text-center lg:text-left ml-4">
                    <h2
                        className="text-white text-4xl lg:text-5xl font-semibold mb-6 leading-tight"
                        style={{ fontFamily: 'var(--font-poppins)' }}
                    >
                        +20% Credits for life on any plan you choose.
                    </h2>
                    <p
                        className="text-white/60 text-lg font-medium leading-relaxed"
                        style={{ fontFamily: 'var(--font-geist-mono)' }}
                    >
                        Early supporter perk.<br />
                        Once we hit 200 members, it's gone forever.
                    </p>
                </div>

                {/* Right Side: Counter Box */}
                <div
                    className="flex flex-col items-center justify-center w-full max-w-[400px] h-[250px] bg-[var(--accent-yellow)]"
                    style={{ borderRadius: 'none' }} // Assuming sharp corners like pricing cards
                >
                    <span
                        className="text-black leading-none mb-2"
                        style={{
                            fontFamily: 'var(--font-poppins)',
                            fontWeight: 700,
                            fontSize: '96px'
                        }}
                    >
                        20
                    </span>
                    <span
                        className="text-black text-lg font-bold uppercase tracking-wider"
                        style={{ fontFamily: 'var(--font-geist-mono)' }}
                    >
                        spots left
                    </span>
                </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-[13.46px] items-center justify-center w-full z-10">
                <Link
                    href="/login"
                    className="flex items-center justify-center w-[230px] h-[60px] bg-white text-black text-sm font-bold uppercase tracking-wider hover:bg-white/90 transition-colors rounded-[141px] border-[1.35px] border-white"
                    style={{
                        fontFamily: 'var(--font-geist-mono)',
                        paddingTop: '8.08px',
                        paddingBottom: '8.08px',
                        paddingLeft: '42px',
                        paddingRight: '42px',
                    }}
                >
                    Join now
                </Link>
                <Link
                    href="/pricing"
                    className="flex items-center justify-center w-[230px] h-[60px] bg-transparent border-[1.35px] border-white/20 text-white text-sm font-bold uppercase tracking-wider hover:bg-white/10 transition-colors rounded-[141px]"
                    style={{
                        fontFamily: 'var(--font-geist-mono)',
                        paddingTop: '6px',
                        paddingBottom: '6px',
                        paddingLeft: '22px',
                        paddingRight: '22px',
                    }}
                >
                    See All Plans
                </Link>
            </div>
        </section>
    );
}
