import Image from "next/image";
import Link from "next/link";
import SelectionBox from "../ui/SelectionBox";
import { Button } from "../ui/Button";

export default function HeroSection() {
    return (
        <div className="min-h-screen relative overflow-hidden flex items-center justify-center rounded-bl-[90px] rounded-br-[90px] w-full">
            {/* Background Image */}
            <Image
                src="/BG.webp"
                alt=""
                fill
                className="object-cover object-center -z-20 pointer-events-none"
                priority
            />

            {/* Bottom Purple Gradient Overlay */}
            <div
                className="absolute bottom-0 left-0 right-0 h-[40%] pointer-events-none z-0"
                style={{
                    background: 'linear-gradient(180deg, rgba(117, 88, 248, 0) 0%, #7558F8 100%)',
                }}
            />

            {/* Floating Icons - Pushed further to corners */}

            {/* Icon 1: Cursor */}
            <div
                className="absolute pointer-events-none z-0 animate-float icon-glow"
                style={{
                    width: 'clamp(32px, 6vw, 88px)',
                    height: 'clamp(28px, 5vw, 81px)',
                    top: '20%',  /* Pushed further up */
                    left: '5%',  /* Pushed further left */
                    '--rotation': '22deg'
                } as React.CSSProperties}
            >
                <Image src="/icons/white/cursor.svg" alt="" fill className="object-contain" />
            </div>

            {/* Icon 2: Box */}
            <div
                className="absolute pointer-events-none z-0 animate-float-delayed-1 icon-glow"
                style={{
                    width: 'clamp(32px, 6vw, 72px)',
                    height: 'clamp(40px, 8vw, 91px)',
                    top: '15%',  /* Pushed further up */
                    right: '8%', /* Pushed further right */
                    '--rotation': '-25deg'
                } as React.CSSProperties}
            >
                <Image src="/icons/white/box.svg" alt="" fill className="object-contain" />
            </div>

            {/* Icon 3: Hourglass */}
            <div
                className="absolute pointer-events-none z-0 animate-float icon-glow"
                style={{
                    width: 'clamp(32px, 6vw, 89px)',
                    height: 'clamp(28px, 5vw, 82px)',
                    top: '52%',  /* Adjusted height */
                    right: '2%',  /* Pushed further right */
                    '--rotation': '12deg'
                } as React.CSSProperties}
            >
                <Image src="/icons/white/hour-glass.svg" alt="" fill className="object-contain" />
            </div>

            {/* Icon 4: Sun */}
            <div
                className="absolute pointer-events-none z-0 animate-float-delayed-2 icon-glow"
                style={{
                    width: 'clamp(40px, 8vw, 100px)',
                    height: 'clamp(40px, 8vw, 100px)',
                    bottom: '10%', /* Pushed further down */
                    left: '30%',
                    '--rotation': '-15deg'
                } as React.CSSProperties}
            >
                <Image src="/icons/white/sun.svg" alt="" fill className="object-contain" />
            </div>

            {/* Icon 5: FX */}
            <div
                className="absolute pointer-events-none z-0 animate-float-delayed-1 icon-glow"
                style={{
                    width: 'clamp(36px, 7vw, 100px)',
                    height: 'clamp(36px, 7vw, 100px)',
                    bottom: '5%',  /* Pushed further down */
                    left: '2%',   /* Pushed further left */
                    '--rotation': '28deg'
                } as React.CSSProperties}
            >
                <Image src="/icons/white/fx.svg" alt="" fill className="object-contain" />
            </div>

            {/* Icon 6: Hand */}
            <div
                className="absolute pointer-events-none z-0 animate-float-delayed-2 icon-glow"
                style={{
                    width: 'clamp(36px, 7vw, 79px)',
                    height: 'clamp(44px, 9vw, 100px)',
                    bottom: '18%',
                    right: '12%', /* Pushed further right */
                    '--rotation': '-18deg'
                } as React.CSSProperties}
            >
                <Image src="/icons/white/hand.svg" alt="" fill className="object-contain" />
            </div>

            {/* Main Content */}
            <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 w-full mt-[120px] md:mt-[50px]">
                <h1
                    className="text-white font-extrabold tracking-[-0.02em] flex flex-col items-center justify-center w-full relative mb-6 uppercase"
                    style={{
                        fontFamily: 'var(--font-poppins), sans-serif',
                        fontSize: 'clamp(32px, 8vw, 100px)',
                        lineHeight: '130%',
                        letterSpacing: '-0.02em',
                        fontWeight: 800
                    }}
                >
                    {/* Line 1 */}
                    <div className="flex flex-wrap items-center justify-center gap-[0.2em] w-full z-10">
                        <span>A CURATED</span>
                        <SelectionBox text="AFTER EFFECTS" color="#00FFF0" className="mx-0 align-middle translate-y-[-2px]" />
                        <span>LIBRARY</span>
                    </div>

                    {/* Line 2 */}
                    <div className="flex flex-wrap items-center justify-center gap-[0.2em] w-full z-10">
                        <span>BUILT FOR REAL</span>
                        <SelectionBox text="PROJECTS" color="#00FFF0" className="mx-0 align-middle translate-y-[-2px]" />
                    </div>
                </h1>

                {/* Subtitle */}
                <p
                    className="text-grey-90 max-w-[800px] z-10 mb-10 text-[16px] md:text-[24px]"
                    style={{
                        fontFamily: 'var(--font-geist-mono), monospace',
                        fontWeight: 500,
                        lineHeight: '135%',
                        letterSpacing: '0%',
                        textAlign: 'center'
                    }}
                >
                    Professional motion scenes you can download, customize, and use today.
                </p>

                {/* CTA Buttons Section */}
                <div className="flex flex-col md:flex-row items-center justify-center gap-6 mt-16 w-full">
                    {/* Start 7-Day Free Trial */}
                    <Button
                        href="/pricing"
                        variant="hero-primary"
                        className="max-w-[348px]"
                    >
                        Start 7-Day Free Trial
                    </Button>

                    {/* Browse Library */}
                    <Button
                        href="/library"
                        variant="hero-secondary"
                        className="max-w-[348px]"
                    >
                        Browse Library
                    </Button>
                </div>
            </div>
        </div >
    );
}
