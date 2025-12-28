import Image from "next/image";
import Link from "next/link";
import SelectionBox from "../ui/SelectionBox";
import { Button } from "../ui/Button";

export default function HeroSection() {
    return (
        <div className="min-h-screen relative overflow-hidden flex items-center justify-center rounded-bl-[90px] rounded-br-[90px]">
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

            {/* Floating Icons - Randomized Distribution to break symmetry */}

            {/* LEFT SIDE */}
            {/* Icon 3: Cursor - Top Left */}
            <div
                className="absolute pointer-events-none z-0 animate-float icon-glow"
                style={{
                    width: 'clamp(40px, 8vw, 88px)',
                    height: 'clamp(36px, 7vw, 81px)',
                    top: '12%',
                    left: '5%',
                    '--rotation': '8.7deg'
                } as React.CSSProperties}
            >
                <Image src="/icons/white/cursor.svg" alt="" fill className="object-contain" />
            </div>

            {/* Icon 6: FX - Middle Left */}
            <div
                className="absolute pointer-events-none z-0 hidden sm:block animate-float-delayed-1 icon-glow"
                style={{
                    width: 'clamp(50px, 10vw, 100px)',
                    height: 'clamp(50px, 10vw, 100px)',
                    top: '60%',
                    left: '10%',
                    '--rotation': '8deg'
                } as React.CSSProperties}
            >
                <Image src="/icons/white/fx.svg" alt="" fill className="object-contain" />
            </div>

            {/* Icon 2: Sun - Bottom Left */}
            <div
                className="absolute pointer-events-none z-0 hidden lg:block animate-float-delayed-2 icon-glow"
                style={{
                    width: '100px',
                    height: '100px',
                    bottom: '15%',
                    left: '2%',
                    '--rotation': '8deg'
                } as React.CSSProperties}
            >
                <Image src="/icons/white/sun.svg" alt="" fill className="object-contain" />
            </div>

            {/* RIGHT SIDE */}
            {/* Icon 5: Box - Top Right */}
            <div
                className="absolute pointer-events-none z-0 animate-float-delayed-1 icon-glow"
                style={{
                    width: 'clamp(40px, 8vw, 72px)',
                    height: 'clamp(50px, 10vw, 91px)',
                    top: '8%',
                    right: '10%',
                    '--rotation': '-9.5deg'
                } as React.CSSProperties}
            >
                <Image src="/icons/white/box.svg" alt="" fill className="object-contain" />
            </div>

            {/* Icon 4: Hourglass - Middle Right */}
            <div
                className="absolute pointer-events-none z-0 animate-float icon-glow"
                style={{
                    width: 'clamp(40px, 8vw, 89px)',
                    height: 'clamp(36px, 7vw, 82px)',
                    top: '35%',
                    right: '2%',
                    '--rotation': '8.7deg'
                } as React.CSSProperties}
            >
                <Image src="/icons/white/hour-glass.svg" alt="" fill className="object-contain" />
            </div>

            {/* Icon 1: Hand - Bottom Right */}
            <div
                className="absolute pointer-events-none z-0 hidden lg:block animate-float-delayed-2 icon-glow"
                style={{
                    width: '79px',
                    height: '100px',
                    bottom: '10%',
                    right: '20%',
                    '--rotation': '-9.5deg'
                } as React.CSSProperties}
            >
                <Image src="/icons/white/hand.svg" alt="" fill className="object-contain" />
            </div>

            {/* Main Content */}
            <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 w-full mt-[120px] md:mt-[50px]">
                <h1
                    className="text-white font-bold tracking-[-0.02em] flex flex-col items-center justify-center w-full relative mb-6"
                    style={{
                        fontFamily: 'var(--font-poppins), sans-serif',
                        fontSize: 'clamp(28px, 6vw, 72px)',
                        lineHeight: '115%',
                        letterSpacing: '-0.02em'
                    }}
                >
                    {/* Line 1 */}
                    <div className="flex flex-wrap items-center justify-center gap-[0.2em] w-full z-10">
                        <span>A curated</span>
                        <SelectionBox text="After Effects" color="#00FFF0" className="mx-0 align-middle translate-y-[-2px]" />
                        <span>library</span>
                    </div>

                    {/* Line 2 */}
                    <div className="flex flex-wrap items-center justify-center gap-[0.2em] w-full z-10">
                        <span>built for real</span>
                        <SelectionBox text="projects" color="#00FFF0" className="mx-0 align-middle translate-y-[-2px]" />
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
