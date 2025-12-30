"use client";

import React from "react";
import SectionHeader from "../ui/SectionHeader";
import SelectionBox from "../ui/SelectionBox";

interface LegalHeroProps {
    title: string;
    subtitle: string;
}

export default function LegalHero({ title, subtitle }: LegalHeroProps) {
    return (
        <div className="w-full relative z-20 mb-20">
            <SectionHeader
                title={
                    <div className="flex flex-col items-center gap-2">
                        <div className="flex flex-row items-center justify-center gap-[0.2em] whitespace-nowrap w-full z-10">
                            <SelectionBox text={title} color="#E4E4E6" />
                        </div>
                    </div>
                }
                subtitle={
                    <span
                        className="block mt-4 text-center mx-auto max-w-[800px]"
                        style={{
                            fontFamily: 'var(--font-geist-mono), monospace',
                            fontWeight: 400,
                            lineHeight: '130%',
                            color: '#797C86',
                        }}
                    >
                        {subtitle}
                    </span>
                }
            />
            <div className="absolute bottom-0 left-0 right-0 h-[1px]" style={{ background: 'var(--color-grid-line)' }} />
        </div>
    );
}

// Note: SectionHeader already uses Poppins 500 for its h2 container,
// and absolute lines at top/bottom.
