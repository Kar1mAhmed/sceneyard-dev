import SectionHeader from "../SectionHeader";
import SelectionBox from "../SelectionBox";

interface FeatureItem {
    icon: string;
    title: string;
    description: string;
}

const features: FeatureItem[] = [
    {
        icon: "T",
        title: "KINETIC TYPOGRAPHY THAT FITS YOUR EDIT",
        description: "Dynamic text animations designed to match modern editing styles. Easy to customize so you can adapt the pacing and layout instantly."
    },
    {
        icon: "box",
        title: "PRODUCT REVEALS THAT LOOK FRESH",
        description: "Clean, modern reveal animations that never feel outdated. Perfect for brands, promos, and commercial projects that need a premium look."
    },
    {
        icon: "sun",
        title: "TRANSITIONS YOU’D BUILD YOURSELF (IF YOU HAD TIME)",
        description: "Professional scene transitions crafted with editors’ needs in mind. Save hours while keeping the smooth, seamless style you love."
    },
    {
        icon: "fx",
        title: "VISUAL EFFECTS THAT BLEND WITH YOUR FOOTAGE",
        description: "Effects built to integrate naturally with real-world shots. No harsh edges or unrealistic lighting—everything feels part of the scene."
    },
    {
        icon: "key-frame",
        title: "ORGANIZED FOR REAL EDITING WORKFLOWS",
        description: "Clean project structures with clear labels and grouped controls. You’ll never get lost in “Comp 1, Comp 2, Comp 3” again."
    },
    {
        icon: "cpu",
        title: "PLUGIN-FREE (MOSTLY)",
        description: "All templates work out of the box inside After Effects. No extra plugins needed — unless it really adds value."
    }
];

export default function FeaturesSection() {
    return (


        <div className="w-full relative flex flex-col">
            {/* 1. Header Portion with "Motion Scenes" content */}
            {/* 1. Header Portion with "Motion Scenes" content */}
            {/* Wrapped to match RealitySection structure */}
            {/* Section Header */}
            <div className="mt-32 relative z-20">
                <SectionHeader
                    subtitle="We don't do logo reveals,lower thirds, or slideshow intros, We build motion scenes the actual shots you need"
                    title={
                        <div className="flex flex-col items-center gap-2">
                            <div className="flex flex-row items-center justify-center gap-[0.2em] whitespace-nowrap w-full z-10">
                                <SelectionBox text="MOTION SCENES," color="var(--color-primary-95)" />
                                <span>NOT TEMPLATES</span>
                            </div>
                        </div>
                    }
                />
            </div>

            {/* 2. Grid Portion */}
            <div className="w-full relative my-24">

                {/* Content Container - Constrained by Grid Margin */}
                {/* Top Line for the grid section */}
                <div className="absolute top-0 left-0 right-0 h-[1px]" style={{ background: 'var(--color-grid-line)' }} />

                {/* Content Container - Constrained by Grid Margin */}
                <div
                    className="mx-auto"
                    style={{
                        width: 'calc(100% - (var(--grid-margin) * 2))'
                    }}
                >
                    {/* Horizontal Center Divider (Between Rows) - Reduced width, solid, sharp */}
                    <div
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 h-[1px] z-0 hidden md:block"
                        style={{
                            width: '60%', // Reduced width
                            background: 'var(--color-grid-line)' // Solid color, no fade
                        }}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-3 relative py-8">
                        {/* Vertical Dividers - Split to avoid touching middle line */}

                        {/* Divider 1 Top Segment */}
                        <div
                            className="absolute left-1/3 top-12 bottom-[calc(55%+1rem)] w-[1px] hidden md:block z-0"
                            style={{ background: 'var(--color-grid-line)' }}
                        />
                        {/* Divider 1 Bottom Segment */}
                        <div
                            className="absolute left-1/3 top-[calc(55%+1rem)] bottom-12 w-[1px] hidden md:block z-0"
                            style={{ background: 'var(--color-grid-line)' }}
                        />

                        {/* Divider 2 Top Segment */}
                        <div
                            className="absolute left-2/3 top-12 bottom-[calc(55%+1rem)] w-[2px] hidden md:block z-0"
                            style={{ background: 'var(--color-grid-line)' }}
                        />
                        {/* Divider 2 Bottom Segment */}
                        <div
                            className="absolute left-2/3 top-[calc(55%+1rem)] bottom-12 w-[2px] hidden md:block z-0"
                            style={{ background: 'var(--color-grid-line)' }}
                        />

                        {features.map((feature, index) => (
                            <FeatureCard key={index} {...feature} />
                        ))}
                    </div>
                </div>

                {/* Bottom Line for the grid section */}
                <div className="absolute bottom-0 left-0 right-0 h-[1px]" style={{ background: 'var(--color-grid-line)' }} />
            </div>
        </div>
    );
}

function FeatureCard({ icon, title, description }: FeatureItem) {
    return (
        <div className="flex flex-col items-center text-center p-8 md:p-12 gap-6 group">
            {/* Icon Container - Increased size */}
            <div
                className="flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                style={{
                    width: '74px', // Increased from 62px
                    height: '74px', // Increased from 62px
                    borderRadius: '75px',
                    padding: '16px',
                    background: 'var(--color-dark-12)',
                    border: '6px solid var(--color-dark-15)',
                    boxShadow: 'inset 16px 12px 9px 2px rgba(255, 255, 255, 0.05)'
                }}
            >
                {/* Inner Icon - Increased size */}
                <div
                    style={{
                        width: '42px', // Increased from 30px
                        height: '42px', // Increased from 30px
                        backgroundColor: 'var(--color-primary-99)',
                        maskImage: `url('/icons/white/${icon}.svg')`,
                        WebkitMaskImage: `url('/icons/white/${icon}.svg')`,
                        maskSize: 'contain',
                        WebkitMaskSize: 'contain',
                        maskRepeat: 'no-repeat',
                        WebkitMaskRepeat: 'no-repeat',
                        maskPosition: 'center',
                        WebkitMaskPosition: 'center'
                    }}
                />
            </div>

            {/* Title */}
            <h3
                className="text-white uppercase"
                style={{
                    fontFamily: 'var(--font-poppins)',
                    fontWeight: 600,
                    fontSize: '24px',
                    lineHeight: '130%',
                    letterSpacing: '0%'
                }}
            >
                {title}
            </h3>

            {/* Description */}
            <p
                className="text-white/70"
                style={{
                    fontFamily: 'var(--font-geist-mono)',
                    fontWeight: 400,
                    fontSize: '16px',
                    lineHeight: '150%',
                    letterSpacing: '0%'
                }}
            >
                {description}
            </p>
        </div>
    );
}
