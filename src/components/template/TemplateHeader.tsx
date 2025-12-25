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

        // Spread the brightness more evenly across the center columns
        const brightness = Math.pow(1 - distanceFromCenter, 1.4);

        // More vibrant "Electric Purple" palette from the image
        const brightPurple = { r: 110, g: 60, b: 255 };
        const darkPurple = { r: 35, g: 15, b: 110 };

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
                    // Precise mask to match image's visibility of background grid
                    maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.9) 30%, rgba(0,0,0,0.4) 60%, rgba(0,0,0,0) 100%)',
                    WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.9) 30%, rgba(0,0,0,0.4) 60%, rgba(0,0,0,0) 100%)',
                }}
            >
                {/* Center Glow Effect - "Spotlight" feel from the image */}
                <div
                    className="absolute inset-0 pointer-events-none z-[5]"
                    style={{
                        background: `
                            radial-gradient(circle at center 40%, rgba(140, 80, 255, 0.5) 0%, transparent 60%),
                            radial-gradient(ellipse at center 30%, rgba(200, 160, 255, 0.3) 0%, transparent 50%)
                        `
                    }}
                />

                {columns.map((color, index) => (
                    <div
                        key={index}
                        className="flex-1 h-full relative"
                        style={{
                            backgroundColor: color,
                            // Subtle brightening of the vertical lines to match the image's "highlight" effect
                            borderRight: index < columnCount - 1 ? '1px solid rgba(255, 255, 255, 0.05)' : 'none',
                            borderLeft: index > 0 ? '1px solid rgba(255, 255, 255, 0.03)' : 'none'
                        }}
                    />
                ))}
            </div>

            {/* Content Container - Remove horizontal padding wrapper to allow Ribbon to be full width */}
            <div className="relative z-10 flex flex-col items-center pt-24 md:pt-32 lg:pt-40">
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
