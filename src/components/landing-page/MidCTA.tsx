import Link from "next/link";
import { Ribbon } from "@/src/components/ui/Ribbon";

export default function MidCTA() {
    return (
        <div className="mb-32 flex flex-col items-center gap-24">
            {/* CTA Buttons - Copied from HeroSection style */}
            <div className="flex flex-col md:flex-row items-center gap-6 z-10">
                {/* Start 7-Day Free Trial */}
                <Link
                    href="/pricing"
                    className="bg-white text-black rounded-full hover:scale-105 transition-transform duration-200 flex items-center justify-center"
                    style={{
                        padding: '16px 32px',
                        fontFamily: 'var(--font-geist-mono), monospace',
                        fontSize: '18px',
                        fontWeight: 600,
                        boxShadow: '0 0 30px rgba(255, 255, 255, 0.4)'  
                    }}
                >
                    Start 7-Day Free Trial
                </Link>

                {/* Browse Library */}
                <Link
                    href="/library"
                    className="rounded-full hover:bg-white/10 transition-colors duration-200 flex items-center justify-center"
                    style={{
                        padding: '16px 32px',
                        fontFamily: 'var(--font-geist-mono), monospace',
                        fontSize: '18px',
                        fontWeight: 500,
                        border: '1px solid rgba(255, 255, 255, 0.5)',
                        background: 'rgba(255, 255, 255, 0.05)',
                        backdropFilter: 'blur(10px)'
                    }}
                >
                    Browse Library
                </Link>
            </div>

            <Ribbon 
                items={[
                    { text: "CREATIVE FREEDOM", icon: "sun" },
                    { text: "FAST WORKFLOW", icon: "timer" },
                    { text: "NO PLUGINS", icon: "cpu" },
                    { text: "DRAG & DROP", icon: "cursor" },
                    { text: "SAVE TIME", icon: "hour-glass" },
                    { text: "HANDLE MORE PROJECTS", icon: "box" }
                ]}
                backgroundColor="transparent"
                textColor="var(--color-grid-line)"
                borderColor="var(--color-grid-line)"
                iconColor="var(--color-grid-line)"
                className="opacity-80 my-32"
            />
        </div>
    );
}
