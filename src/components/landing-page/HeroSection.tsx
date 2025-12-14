import Image from "next/image";
import Link from "next/link";
import SelectionBox from "../SelectionBox";

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
                className="absolute pointer-events-none z-0 hidden md:block animate-float icon-glow"
                style={{
                    width: '88px',
                    height: '81px',
                    top: '12%',
                    left: '5%',
                    '--rotation': '8.7deg'
                } as React.CSSProperties}
            >
                <Image src="/icons/white/cursor.svg" alt="" fill className="object-contain" />
            </div>

            {/* Icon 6: FX - Middle Left */}
            <div
                className="absolute pointer-events-none z-0 hidden lg:block animate-float-delayed-1 icon-glow"
                style={{
                    width: '100px',
                    height: '100px',
                    top: '60%',
                    left: '16%',
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
                    width: '72px',
                    height: '91px',
                    top: '8%',
                    right: '18%',
                    '--rotation': '-9.5deg'
                } as React.CSSProperties}
            >
                <Image src="/icons/white/box.svg" alt="" fill className="object-contain" />
            </div>

            {/* Icon 4: Hourglass - Middle Right */}
            <div
                className="absolute pointer-events-none z-0 hidden md:block animate-float icon-glow"
                style={{
                    width: '89px',
                    height: '82px',
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
            <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 w-full mt-[50px]">
                <h1
                    className="text-white font-bold tracking-[-0.02em] flex flex-col items-center justify-center w-full relative mb-6"
                    style={{
                        fontFamily: 'var(--font-poppins), sans-serif',
                        fontSize: 'clamp(32px, 3.5vw, 84px)',
                        lineHeight: '135%',
                        letterSpacing: '0%'
                    }}
                >
                    {/* Line 1 */}
                    <div className="flex flex-row items-center justify-center gap-[0.2em] whitespace-nowrap w-full z-10">
                        <span>a curated</span>
                        <SelectionBox text="After Effects" color="#00FFF0" className="mx-0 align-middle translate-y-[-2px]" />
                        <span>library</span>
                    </div>

                    {/* Line 2 */}
                    <div className="flex flex-row items-center justify-center gap-[0.2em] whitespace-nowrap w-full z-10">
                        <span>built for real</span>
                        <SelectionBox text="projects" color="#00FFF0" className="mx-0 align-middle translate-y-[-2px]" />
                    </div>
                </h1>

                {/* Subtitle */}
                <p
                    className="text-grey-90 max-w-[800px] z-10 mb-10"
                    style={{
                        fontFamily: 'var(--font-geist-mono), monospace',
                        fontWeight: 500,
                        fontSize: '24px',
                        lineHeight: '120%',
                        letterSpacing: '0%',
                        textAlign: 'center'
                    }}
                >
                    Professional motion scenes you can download, customize, and use today.
                </p>

                {/* CTA Buttons */}
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
            </div>
        </div>
    );
}
