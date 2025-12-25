"use client";

import Loading from "@/src/components/ui/Loading";
import { useState } from "react";

export default function TestLoadingPage() {
    const [isLoading, setIsLoading] = useState(true);

    return (
        <div className="min-h-screen bg-black flex flex-col items-center justify-center gap-8 p-12">
            <h1 className="text-4xl font-bold text-white mb-8">Loading Component Test</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
                {/* Inline Demo */}
                <div className="bg-zinc-900/50 p-12 rounded-3xl border border-white/5 flex flex-col items-center gap-6">
                    <h2 className="text-xl font-medium text-white/40">Inline Loader</h2>
                    <Loading size={80} text="Loading assets..." />
                </div>

                {/* Button Demo */}
                <div className="bg-zinc-900/50 p-12 rounded-3xl border border-white/5 flex flex-col items-center gap-6">
                    <h2 className="text-xl font-medium text-white/40">Inside Button</h2>
                    <button
                        className="px-8 py-4 bg-purple-500 text-white rounded-2xl font-bold hover:bg-purple-600 transition-all flex items-center gap-3"
                        onClick={() => {
                            setIsLoading(true);
                            setTimeout(() => setIsLoading(false), 3000);
                        }}
                    >
                        <Loading size={24} />
                        Trigger Global Loader (3s)
                    </button>
                    <p className="text-sm text-white/20">Click to see fullscreen mode</p>
                </div>
            </div>

            {/* Scale Demos */}
            <div className="flex flex-wrap gap-12 mt-12 items-end">
                <div className="flex flex-col items-center gap-2">
                    <Loading size={32} />
                    <span className="text-xs text-white/20">32px</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                    <Loading size={64} />
                    <span className="text-xs text-white/20">64px</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                    <Loading size={128} />
                    <span className="text-xs text-white/20">128px</span>
                </div>
            </div>

            {isLoading && (
                <Loading
                    fullScreen
                    text="EXPERIENCING THE FUTURE"
                    size={100}
                />
            )}

            <button
                onClick={() => setIsLoading(false)}
                className="fixed bottom-8 right-8 z-[10000] text-white/20 hover:text-white transition-colors text-sm"
            >
                [Force Close Loader]
            </button>
        </div>
    );
}
