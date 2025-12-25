"use client";

import React from "react";

interface TemplateHeaderProps {
    title: string;
    children?: React.ReactNode;
}

export default function TemplateHeader({ title, children }: TemplateHeaderProps) {
    // Generate column colors - darker edges, brighter center (matching LibraryHeader but darker)
    const columnCount = 21;
    const columns = Array.from({ length: columnCount }, (_, i) => {
        // Calculate distance from center (0 = center, 1 = edge)
        const center = (columnCount - 1) / 2;
        const distanceFromCenter = Math.abs(i - center) / center;

        // Dynamic brightness curve: sharper drop-off to make center distinct
        const brightness = Math.pow(1 - distanceFromCenter, 1.5);

        // Darker purple palette compared to LibraryHeader
        const brightPurple = { r: 100, g: 70, b: 200 }; // Darker bright purple for center
        const darkPurple = { r: 30, g: 25, b: 120 }; // Even darker purple for edges

        const r = Math.round(darkPurple.r + (brightPurple.r - darkPurple.r) * brightness);
        const g = Math.round(darkPurple.g + (brightPurple.g - darkPurple.g) * brightness);
        const b = Math.round(darkPurple.b + (brightPurple.b - darkPurple.b) * brightness);

        return `rgb(${r}, ${g}, ${b})`;
    });

    return (
        <div className="relative w-full" style={{ minHeight: '100vh' }}>
            {/* Gradient Columns Background - 100vh with vertical fade */}
            <div
                className="absolute inset-0 flex"
                style={{
                    height: '100vh',
                    // Mask to fade columns from top to bottom
                    maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.6) 50%, rgba(0,0,0,0) 100%)',
                    WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.6) 50%, rgba(0,0,0,0) 100%)',
                }}
            >
                {/* Center Glow Effect - matching LibraryHeader */}
                <div
                    className="absolute inset-0 pointer-events-none z-[5]"
                    style={{
                        background: `
                            radial-gradient(circle at center, rgba(130, 100, 200, 0.4) 0%, transparent 80%),
                            radial-gradient(circle at top center, rgba(140, 110, 220, 0.5) 0%, transparent 60%)
                        `
                    }}
                />

                {columns.map((color, index) => (
                    <div
                        key={index}
                        className="flex-1 h-full relative"
                        style={{
                            backgroundColor: color,
                            borderRight: index < columnCount - 1 ? '1px solid rgba(255, 255, 255, 0.06)' : 'none',
                            borderLeft: index > 0 ? '1px solid rgba(255, 255, 255, 0.08)' : 'none'
                        }}
                    />
                ))}
            </div>

            {/* Content Container */}
            <div className="relative z-10 flex flex-col items-center pt-24 md:pt-32 lg:pt-40 px-4">
                {/* Template Title - Figma specs: Poppins 500, 64px, line-height 67px - Solid White */}
                <h1
                    className="text-center max-w-5xl px-4"
                    style={{
                        fontFamily: 'var(--font-poppins), Poppins, sans-serif',
                        fontWeight: 500,
                        fontSize: 'clamp(32px, 5vw, 64px)',
                        lineHeight: '1.05', // 67px / 64px ≈ 1.05
                        letterSpacing: '0%',
                        textAlign: 'center',
                        color: '#FFFFFF', // Solid white as requested
                    }}
                >
                    {title}
                </h1>

                {/* Children content (Ribbon, video player, buttons, etc.) */}
                {children && (
                    <div className="mt-8 md:mt-12 w-full flex flex-col items-center">
                        {children}
                    </div>
                )}
            </div>
        </div>
    );
}
