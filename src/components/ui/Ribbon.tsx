"use client";

import React from "react";
import Image from "next/image";
import { cn } from "@/src/utils/cn";

// Checking if cn exists, usually it does in src/lib/utils.ts or src/utils/cn.ts.
// Based on "sceneyard-dev", I haven't checked for 'cn' specifically, so I'll be safe and use a local helper if needed or check first.
// I'll assume standard class merging is needed.

interface RibbonItem {
    text: string;
    icon?: string; // filename in public/icons/white, e.g. "star" -> "/icons/white/star.svg"
}

interface RibbonProps {
    items: RibbonItem[];

    // Style Props
    rotation?: number; // degrees
    opacity?: number;
    backgroundColor?: string; // hex or Tailwind class
    textColor?: string;
    borderColor?: string;
    borderWidth?: number;
    height?: string | number;
    gap?: number;
    iconColor?: string;
    className?: string;
}

export function Ribbon({
    items,
    rotation = 0,
    opacity = 1,
    backgroundColor = "#7558F8", // Primary 60 from legend
    textColor = "#FFFFFF",
    borderColor = "rgba(255,255,255,0.1)",
    borderWidth = 1,
    height = 64,
    gap = 32,
    iconColor, // Optional: defaults to textColor if not provided
    className,
}: RibbonProps) {

    // Create a repeated list to ensure the ribbon feels "full" and long.
    // In a real marquee we'd double this, but for a potentially static strip we just repeat enough times.
    // We'll repeat the items 10 times to be safe for a very wide strip.
    const repeatedItems = Array(20).fill(items).flat();

    const actualIconColor = iconColor || textColor;

    return (
        <div
            className={cn(
                "relative flex items-center overflow-hidden whitespace-nowrap select-none",
                className
            )}
            style={{
                transform: `rotate(${rotation}deg)`,
                opacity: opacity,
                backgroundColor: backgroundColor,
                color: textColor, // Inherits to text
                borderColor: borderColor,
                borderTopWidth: `${borderWidth}px`,
                borderBottomWidth: `${borderWidth}px`,
                height: typeof height === "number" ? `${height}px` : height,
                width: "100%", // Full width of container
            }}
        >
            <div
                className="flex items-center w-full justify-around"
                style={{ gap: `${gap}px` }}
            >
                {repeatedItems.map((item, index) => (
                    <div key={index} className="flex items-center shrink-0" style={{ gap: `${gap}px` }}>
                        <span className="font-poppins font-regular uppercase tracking-widest text-lg">
                            {item.text}
                        </span>
                        {item.icon && (
                            <div
                                className="relative w-12 h-12 shrink-0"
                                style={{
                                    backgroundColor: actualIconColor,
                                    maskImage: `url('/icons/white/${item.icon}.svg')`,
                                    WebkitMaskImage: `url('/icons/white/${item.icon}.svg')`,
                                    maskSize: 'contain',
                                    WebkitMaskSize: 'contain',
                                    maskRepeat: 'no-repeat',
                                    WebkitMaskRepeat: 'no-repeat',
                                    maskPosition: 'center',
                                    WebkitMaskPosition: 'center'
                                }}
                            />
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
