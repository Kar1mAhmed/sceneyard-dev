import React from 'react';

interface SelectionBoxProps {
    text: string;
    /**
     * Color to use for text, border, and handles.
     * Can be a hex code, rgba string, or CSS variable.
     * Note: If using CSS variable, the background transparency might not work unless
     * the variable is defined as RGB values or if we use color-mix().
     * For now, utilizing simple opacity for background.
     */
    color: string;
    className?: string;
}

export default function SelectionBox({ text, color, className = '' }: SelectionBoxProps) {
    const handleSize = 15;
    const halfHandle = handleSize / 2;

    return (
        <div className={`relative inline-block ${className}`}>
            {/* Background Overlay - Using opacity instead of calculated RGBA to support CSS vars */}
            <div
                className="absolute inset-0 pointer-events-none opacity-15"
                style={{ backgroundColor: color }}
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
                    className="absolute bg-current"
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
                    className="absolute bg-current"
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
