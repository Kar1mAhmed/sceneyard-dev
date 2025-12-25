"use client";

import React from "react";

interface LoadingProps {
    text?: string;
    fullScreen?: boolean;
    size?: number;
    showShadow?: boolean;
}

/**
 * Brand-accurate Loading component using path morphing between the two original frames.
 * Features:
 * - SMIL Morphing between brand frames (1.svg/2.svg).
 * - Cutout effect (empty space) using even-odd fill rule.
 * - Rhythmic "Leg" scaling for a living, mechanical feel.
 * - Brand-standard Geist Mono typography.
 * - Optional high-fidelity pulsing shadow.
 */
export default function Loading({ text, fullScreen = false, size = 64, showShadow = true }: LoadingProps) {
    // Frame 1 Paths
    const frame1Outer = "M118.708 86.0741L159 86.0741L159 71.0709L120.515 71.0709L113.422 55.2384L129.45 39.2L118.847 28.5901L102.778 44.6697L91.2175 37.1244L86.549 37.0935L86.549 0L71.5554 0L71.5554 36.9801L67.4429 36.9544L55.1104 44.7625L38.9432 28.5849L28.3401 39.1948L44.6411 55.5063L37.4094 71.0657L0 71.0657L0 86.069L39.3498 86.069L40.544 94.8093L45.969 101.16L28.335 118.805L38.938 129.415L55.7383 112.604L55.9853 112.892L71.54 117.579L71.54 158L86.5335 158L86.5335 117.523L101.599 113.207L102.083 112.656L118.832 129.415L129.435 118.805L112.002 101.361L117.293 95.3346L118.688 86.0638L118.708 86.0741Z";
    const frame1Inner = "M78.8438 107.536L62.6715 102.664L51.6978 89.8133L49.4124 73.0693L56.531 57.7467L70.7988 48.7077L87.6916 48.821L101.836 58.0557L108.749 73.4761L106.232 90.1893L95.083 102.885L78.8438 107.536Z";

    // Frame 2 Paths
    const frame2Outer = "M112.215 55.8099L140.753 27.2744L130.126 16.6488L102.868 43.9048L86.6305 37.7151L86.6231 15.0048L71.5983 15L71.6056 37.7686L58.0733 40.6122L54.7448 43.8966L28.4722 17.6262L17.8525 28.245L44.0449 54.4352L41.1138 57.3295L37.9092 71.5935L15 71.5862L15.0048 86.6097L38.1037 86.6171L44.0021 102.758L17.5056 129.253L28.1322 139.878L56.003 112.01L63.0394 117.354L71.3798 118.009L71.3878 142.995L86.4126 143L86.405 119.196L86.7842 119.225L101.121 111.528L129.75 140.155L140.37 129.536L111.701 100.869L119.314 87.1428L119.267 86.4098L143 86.4175L142.995 71.3939L118.292 71.386L117.771 63.3709L112.193 55.8172L112.215 55.8099Z";
    const frame2Inner = "M99.1806 99.2426L84.2751 107.246L67.4009 105.916L53.9227 95.6764L48.1119 79.7832L51.8154 63.2767L63.8606 51.3931L80.4196 47.916L96.2376 53.9414L106.293 67.5606L107.388 84.4478L99.1806 99.2426Z";

    const content = (
        <div className="flex flex-col items-center justify-center gap-6 text-center">
            {/* Leg Animation Container */}
            <div
                className="relative flex items-center justify-center animate-[spin_10s_linear_infinite]"
                style={{ width: size, height: size }}
            >
                {/* Brandmark Wrapper with secondary "Breathing" animation */}
                <div className="w-full h-full animate-[spin_10s_linear_infinite]">
                    <svg
                        viewBox="0 0 160 160"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className={`w-full h-full ${showShadow ? "drop-shadow-[0_0_20px_rgba(117,88,248,0.7)]" : ""}`}
                    >
                        {/* Unified Path with cutout and morphing */}
                        <path fill="#7558F8" fillRule="evenodd" clipRule="evenodd">
                            <animate
                                attributeName="d"
                                values={`${frame1Outer}${frame1Inner};${frame2Outer}${frame2Inner};${frame1Outer}${frame1Inner}`}
                                dur="1.2s"
                                repeatCount="indefinite"
                                calcMode="spline"
                                keySplines="0.42, 0, 0.58, 1; 0.42, 0, 0.58, 1"
                            />
                        </path>
                    </svg>

                    {/* Pulsing Glow Shadow Layer */}
                    {showShadow && (
                        <div className="absolute inset-0 animate-pulse opacity-40 blur-[8px] pointer-events-none">
                            <svg viewBox="0 0 160 160" fill="none" className="w-full h-full">
                                <path d={`${frame1Outer}${frame1Inner}`} fill="#7558F8" fillRule="evenodd" />
                            </svg>
                        </div>
                    )}
                </div>

                {/* Ambient Background Glow - Expanded and Breathing */}
                {showShadow && (
                    <div className="absolute inset-[-100%] bg-purple-500/20 blur-[60px] rounded-full scale-50 animate-pulse opacity-40 pointer-events-none" />
                )}
            </div>

            {text && (
                <div className="flex flex-col items-center gap-2">
                    <p className="text-white/70 font-geist-mono text-[11px] tracking-[0.5em]">
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
