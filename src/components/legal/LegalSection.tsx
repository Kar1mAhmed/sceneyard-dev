"use client";

import React from "react";

interface LegalSectionProps {
    number: string;
    title: string;
    content: React.ReactNode;
}

export default function LegalSection({ number, title, content }: LegalSectionProps) {
    return (
        <div className="w-full flex flex-col gap-4 mb-12 md:mb-16">
            <h2
                className="text-white text-xl md:text-3xl flex items-center gap-4"
                style={{
                    fontFamily: 'var(--font-poppins), sans-serif',
                    fontWeight: 500,
                    lineHeight: '100%',
                    color: '#E4E4E6'
                }}
            >
                <span className="text-white">{number}.</span> {title}
            </h2>
            <div
                className="text-sm md:text-lg flex flex-col gap-4"
                style={{
                    fontFamily: 'var(--font-geist-mono), monospace',
                    fontWeight: 400,
                    lineHeight: '130%',
                    color: '#797C86'
                }}
            >
                {content}
            </div>
        </div>
    );
}
