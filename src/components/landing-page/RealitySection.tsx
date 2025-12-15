import SectionHeader from "../SectionHeader";
import SelectionBox from "../SelectionBox";

interface RealityCardProps {
    text: string;
    subText?: string;
    icon: string;
    className?: string; // For layout specific touches if needed
    iconStyle?: React.CSSProperties; // For specific dimensions/rotation
}

function RealityCard({ text, subText, icon, className = "", iconStyle = {} }: RealityCardProps) {
    return (
        <div className={`group relative flex flex-row items-center justify-between gap-2 hover:bg-[#7558F8] transition-colors duration-300 ${className} min-h-[280px] 2xl:min-h-[353px]`}
            style={{
                // User requested specific settings - making responsive
                // padding: '64px', // Moving to className for responsiveness
            }}
        >
            {/* Text Content - Reduced space as requested */}
            <div className="flex flex-col gap-2 w-[65%] z-10 pl-8 py-8 2xl:pl-[64px] 2xl:py-[64px]">
                <p className="text-white"
                    style={{
                        fontFamily: 'var(--font-poppins)',
                        fontWeight: 500, // Medium
                        fontStyle: 'normal',
                        fontSize: '2vw', // User spec
                        lineHeight: '120%',
                        letterSpacing: '0%'
                    }}>
                    {text}
                </p>
                {subText && (
                    <p className="text-white/60 text-sm font-light mt-2" style={{ fontFamily: 'var(--font-geist-mono)' }}>
                        {subText}
                    </p>
                )}
            </div>

            {/* Icon - Bigger side, bigger icon */}
            <div className="flex-1 flex items-center justify-center z-10">
                <div
                    className="bg-[#7558F8] group-hover:bg-[#00FFF0] transition-colors duration-300 scale-125 origin-center"
                    style={{
                        ...iconStyle, // Width, height, rotation from props
                        maskImage: `url('${icon}')`,
                        WebkitMaskImage: `url('${icon}')`,
                        maskSize: 'contain',
                        WebkitMaskSize: 'contain',
                        maskRepeat: 'no-repeat',
                        WebkitMaskRepeat: 'no-repeat',
                        maskPosition: 'center',
                        WebkitMaskPosition: 'center'
                    }}
                />
            </div>
        </div>
    );
}

export default function RealitySection() {
    const borderColor = 'rgba(148, 124, 255, 0.3)';

    return (
        <div className="flex flex-col w-full relative">
            {/* Section Header */}
            <div className="mt-32 relative z-20">
                <SectionHeader
                    subtitle="here's the reality"
                    title={
                        <div className="flex flex-col items-center gap-2">
                            <div className="flex flex-row items-center justify-center gap-[0.2em] whitespace-nowrap w-full z-10">
                                <SelectionBox text="YOU KNOW HOW" color="var(--color-primary-95)" />
                                <span>TO BUILD IT</span>
                            </div>
                            <div className="flex flex-row items-center justify-center gap-[0.2em] whitespace-nowrap w-full z-10">
                                <span>BUT DO YOU</span>
                                <SelectionBox text="HAVE THE TIME?" color="var(--color-primary-95)" />
                            </div>
                        </div>
                    }
                />
            </div>

            {/* 
                THE GRID CONTAINER
                - Bounded width (90% mx-auto) to fit vertical lines.
                - Relative pos for internal dividers.
            */}
            <div className="w-full relative my-24">

                {/* 
                   FULL WIDTH HORIZONTAL LINES 
                   They sit outside the grid content flow but visually divide it.
                   Positioning:
                   1. Top: Aligned with top of grid.
                   2. Middle: Aligned with center of grid.
                   3. Bottom: Aligned with bottom of grid.
                */}

                {/* Top Horizontal Line (Full Screen Width) - Actually SectionHeader bottom line might cover this, but user asked for lines between cards above/under.
                    Let's add explicit full width lines.
                */}
                <div className="absolute top-0 left-0 right-0 h-[1px]" style={{ background: borderColor }} />
                <div className="absolute top-1/2 left-0 right-0 h-[1px] -translate-y-1/2 hidden md:block" style={{ background: borderColor }} />
                <div className="absolute bottom-0 left-0 right-0 h-[1px]" style={{ background: borderColor }} />


                {/* CONTENT CONTAINER (Dynamic Width based on Grid Lines) */}
                <div
                    className="mx-auto grid grid-cols-1 md:grid-cols-2 relative"
                    style={{
                        width: 'calc(100% - (var(--grid-margin) * 2))'
                    }}
                >

                    {/* Vertical Center Divider (Restricted to Grid Height) */}
                    <div className="hidden md:block absolute top-0 bottom-0 left-1/2 w-[1px] -translate-x-1/2 z-0" style={{ background: borderColor }} />

                    {/* Card 1 */}
                    <RealityCard
                        text="You spend 3-8 hours rebuilding the same motion scenes for every project"
                        icon="/icons/white/hour-glass.svg"
                        iconStyle={{ width: '160px', height: '147px', transform: 'rotate(8.74deg)' }}
                        // Mobile border bottom needed? Yes.
                        className="border-b md:border-b-0 border-[rgba(148,124,255,0.3)] md:border-none"
                    />

                    {/* Card 2 */}
                    <RealityCard
                        text="Your project folder looks like:"
                        subText="(Comp 45 final ACTUAL final v2)"
                        icon="/icons/white/T.svg"
                        iconStyle={{ width: '137px', height: '134px', transform: 'rotate(-11.96deg)' }}
                        className="border-b md:border-b-0 border-[rgba(148,124,255,0.3)] md:border-none"
                    />

                    {/* Card 3 */}
                    <RealityCard
                        text="You lose great ideas because execution takes too long"
                        icon="/icons/white/sun.svg"
                        iconStyle={{ width: '126px', height: '160px', transform: 'rotate(-9.56deg)' }}
                        className="border-b md:border-b-0 border-[rgba(148,124,255,0.3)] md:border-none"
                    />

                    {/* Card 4 */}
                    <RealityCard
                        text="You're editing fast, but building slow"
                        icon="/icons/white/hand.svg"
                        iconStyle={{ width: '159px', height: '158px', transform: 'rotate(8.05deg)' }}
                    />
                </div>
            </div>
        </div>
    );
}
