import React from 'react';

interface SelectionBoxProps {
    text: string;
    /**
     * Color to use for text.
     * Can be a hex code, rgba string, or CSS variable.
     */
    color: string;
    /**
     * Color to use for the box (border, handles, background base).
     * Defaults to #6725F6.
     */
    boxColor?: string;
    /**
     * Opacity of the background overlay.
     * Defaults to 0.15.
     */
    bgOpacity?: number;
    className?: string;
}

export default function SelectionBox({
    text,
    color,
    boxColor = '#6725F6', // rgb(103, 37, 246)
    bgOpacity = 0.15,
    className = ''
}: SelectionBoxProps) {
    const handleSize = 15;
    const halfHandle = handleSize / 2;

    return (
        <div className={`relative inline-block ${className}`}>
            {/* Background Overlay - Using opacity instead of calculated RGBA to support CSS vars */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{ backgroundColor: boxColor, opacity: bgOpacity }}
            />

            {/* Main Text */}
            <span
                className="relative z-10 block px-3 py-1 leading-tight"
                style={{ color: color }}
            >
                {text}
            </span>

            {/* Border Box */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{ border: `1.5px solid ${color}` }}
            >
                {/* Top Left Handle */}
                <div
                    className="absolute"
                    style={{
                        width: handleSize,
                        height: handleSize,
                        backgroundColor: color,
                        top: -halfHandle,
                        left: -halfHandle
                    }}
                />
                {/* Top Right Handle */}
                <div
                    className="absolute"
                    style={{
                        width: handleSize,
                        height: handleSize,
                        backgroundColor: color,
                        top: -halfHandle,
                        right: -halfHandle
                    }}
                />
                {/* Bottom Left Handle */}
                <div
                    className="absolute bg-current"
                    style={{
                        width: handleSize,
                        height: handleSize,
                        backgroundColor: color,
                        bottom: -halfHandle,
                        left: -halfHandle
                    }}
                />
                {/* Bottom Right Handle */}
                <div
                    className="absolute bg-current"
                    style={{
                        width: handleSize,
                        height: handleSize,
                        backgroundColor: color,
                        bottom: -halfHandle,
                        right: -halfHandle
                    }}
                />
            </div>
        </div>
    );
}
