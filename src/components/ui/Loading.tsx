"use client";

import React from "react";

interface LoadingProps {
    text?: string;
    fullScreen?: boolean;
    size?: number;
    showShadow?: boolean;
}

/**
 * Brand-accurate Loading component with CSS animation instead of SMIL.
 */
export default function Loading({ text, fullScreen = false, size = 64, showShadow = true }: LoadingProps) {
    // Static brand logo path
    const logoPath = "M118.708 86.0741L159 86.0741L159 71.0709L120.515 71.0709L113.422 55.2384L129.45 39.2L118.847 28.5901L102.778 44.6697L91.2175 37.1244L86.549 37.0935L86.549 0L71.5554 0L71.5554 36.9801L67.4429 36.9544L55.1104 44.7625L38.9432 28.5849L28.3401 39.1948L44.6411 55.5063L37.4094 71.0657L0 71.0657L0 86.069L39.3498 86.069L40.544 94.8093L45.969 101.16L28.335 118.805L38.938 129.415L55.7383 112.604L55.9853 112.892L71.54 117.579L71.54 158L86.5335 158L86.5335 117.523L101.599 113.207L102.083 112.656L118.832 129.415L129.435 118.805L112.002 101.361L117.293 95.3346L118.688 86.0638L118.708 86.0741Z M78.8438 107.536L62.6715 102.664L51.6978 89.8133L49.4124 73.0693L56.531 57.7467L70.7988 48.7077L87.6916 48.821L101.836 58.0557L108.749 73.4761L106.232 90.1893L95.083 102.885L78.8438 107.536Z";

    const content = (
        <div className="flex flex-col items-center justify-center gap-6 text-center">
            {/* Spinner Container with CSS animation */}
            <div
                className="relative flex items-center justify-center"
                style={{
                    width: size,
                    height: size,
                    animation: 'spin 3s linear infinite'
                }}
            >
                <svg
                    viewBox="0 0 160 160"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{
                        width: '100%',
                        height: '100%',
                        filter: showShadow ? 'drop-shadow(0 0 20px rgba(117, 88, 248, 0.7))' : 'none'
                    }}
                >
                    <path
                        d={logoPath}
                        fill="#7558F8"
                        fillRule="evenodd"
                        clipRule="evenodd"
                    />
                </svg>
            </div>

            {/* Text Label */}
            {text && (
                <div className="flex flex-col items-center gap-2">
                    <p
                        className="text-white/70 text-[12px] font-semibold tracking-[0.3em] uppercase"
                        style={{ fontFamily: 'var(--font-geist-mono), monospace' }}
                    >
                        {text}
                    </p>
                    <div className="w-20 h-[1px] bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />
                </div>
            )}
        </div>
    );

    if (fullScreen) {
        return (
            <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/98 backdrop-blur-xl">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(117,88,248,0.03)_0%,transparent_70%)] pointer-events-none" />
                {content}
            </div>
        );
    }

    return content;
}
