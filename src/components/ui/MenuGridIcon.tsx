"use client";

import React from "react";

interface MenuGridIconProps {
    className?: string;
    size?: number;
    onClick?: () => void;
}

export function MenuGridIcon({ className = "", size = 48, onClick }: MenuGridIconProps) {
    const [isHovered, setIsHovered] = React.useState(false);
    const dotSize = size * 0.15; // Smaller dots (15% of total size)

    return (
        <button
            onClick={onClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={`flex items-center justify-center transition-opacity hover:opacity-80 cursor-pointer group ${className}`}
            style={{
                width: size,
                height: size,
                background: 'transparent',
            }}
            aria-label="Open menu"
        >
            <div
                className="grid grid-cols-2 transition-all duration-300 ease-out"
                style={{
                    gap: isHovered ? size * 0.35 : size * 0.2,
                }}
            >
                {[0, 1, 2, 3].map((i) => (
                    <div
                        key={i}
                        className="rounded-full bg-white transition-all duration-300"
                        style={{
                            width: dotSize,
                            height: dotSize,
                        }}
                    />
                ))}
            </div>
        </button>
    );
}
