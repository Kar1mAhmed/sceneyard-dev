"use client";

import React from "react";

interface LibraryHeaderProps {
    title?: string;
    subtitle?: string;
}

export default function SmallColumnHeader({
    title = "Explore Templates",
    subtitle = "Discover and download professional video templates for your projects"
}: LibraryHeaderProps) {
    // Generate column colors - darker edges, distinct bright center
    const columnCount = 21; // Odd number to ensure a distinct center column
    const columns = Array.from({ length: columnCount }, (_, i) => {
        // Calculate distance from center (0 = center, 1 = edge)
        const center = (columnCount - 1) / 2;
        const distanceFromCenter = Math.abs(i - center) / center;

        // Dynamic brightness curve: sharper drop-off to make center distinct and bright
        // Using a power curve to keep the center brighter for longer, then dropping off
        const brightness = Math.pow(1 - distanceFromCenter, 1.5);

        const brightPurple = { r: 130, g: 100, b: 255 }; // Brighter purple for center
        const darkPurple = { r: 50, g: 40, b: 180 }; // Darker purple for edges

        // Ensure center columns are distinct by ensuring they don't blend perfectly
        const r = Math.round(darkPurple.r + (brightPurple.r - darkPurple.r) * brightness);
        const g = Math.round(darkPurple.g + (brightPurple.g - darkPurple.g) * brightness);
        const b = Math.round(darkPurple.b + (brightPurple.b - darkPurple.b) * brightness);

        return `rgb(${r}, ${g}, ${b})`;
    });

    return (
        <div className="relative w-full overflow-hidden" style={{ marginTop: '100px' }}>
            {/* Gradient Columns Background */}
            <div
                className="absolute inset-0 flex"
                style={{
                    boxShadow: 'inset 0 -30px 10px -20px rgba(0, 0, 0, 0.4)'
                }}
            >
                {/* Center Glow Effect */}
                <div
                    className="absolute inset-0 pointer-events-none z-[5]"
                    style={{
                        background: `
                            radial-gradient(circle at center, rgba(160, 130, 255, 0.4) 0%, transparent 80%),
                            radial-gradient(circle at top center, rgba(180, 160, 255, 0.6) 0%, transparent 60%)
                        `
                    }}
                />

                {columns.map((color, index) => (
                    <div
                        key={index}
                        className="flex-1 h-full relative"
                        style={{
                            backgroundColor: color,
                            borderRight: index < columnCount - 1 ? '1px solid rgba(255, 255, 255, 0.08)' : 'none',
                            borderLeft: index > 0 ? '1px solid rgba(255, 255, 255, 0.12)' : 'none'
                        }}
                    />
                ))}
            </div>

            {/* Content Container */}
            <div
                className="relative z-10 flex flex-col items-center justify-center py-12 md:py-16 lg:py-20"
            >
                {/* Main Title with Gradient Text */}
                <h1
                    className="font-bold text-center  px-4"
                    style={{
                        fontFamily: 'var(--font-poppins), sans-serif',
                        fontWeight: 700,
                        fontSize: 'clamp(48px, 10vw, 128px)',
                        lineHeight: '0.84',
                        letterSpacing: '0%',
                        background: 'linear-gradient(91.59deg, rgba(255, 255, 255, 0.64) 14.72%, #FFFFFF 30.35%, #FFFFFF 60.15%, rgba(255, 255, 255, 0.62) 90.31%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                        textShadow: '-10px 0 20px rgba(0, 0, 0, 0.01), 10px 0 20px rgba(0, 0, 0, 0.01)',
                        filter: 'drop-shadow(-10px 0 15px rgba(0,0,0,0.05)) drop-shadow(10px 0 15px rgba(0,0,0,0.05))',
                        paddingRight: '0.2em', // Fix for italic 's' cropping
                    }}
                >
                    {title}
                </h1>

                {/* Subtitle */}
                <p
                    className="mt-4 md:mt-6 text-center text-white w-full max-w-5xl px-4"
                    style={{
                        fontFamily: 'var(--font-geist-mono), monospace',
                        fontWeight: 300,
                        fontSize: 'clamp(14px, 2vw, 18px)',
                        lineHeight: '120%',
                        letterSpacing: '0%',
                        color: 'var(--color-grey-97)',
                        opacity: 0.6
                    }}
                >
                    {subtitle}
                </p>
            </div>

            {/* Bottom Shadow Overlay */}
            <div
                className="absolute bottom-0 left-0 right-0 h-8 pointer-events-none"
                style={{
                    background: 'linear-gradient(to top, rgba(7, 7, 8, 0.2), transparent)'
                }}
            />
        </div>
    );
}
