"use client";

import { useState } from "react";
import SectionHeader from "../SectionHeader";
import SelectionBox from "../ui/SelectionBox";

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
        title: "TRANSITIONS YOU'D BUILD YOURSELF (IF YOU HAD TIME)",
        description: "Professional scene transitions crafted with editors' needs in mind. Save hours while keeping the smooth, seamless style you love."
    },
    {
        icon: "fx",
        title: "VISUAL EFFECTS THAT BLEND WITH YOUR FOOTAGE",
        description: "Effects built to integrate naturally with real-world shots. No harsh edges or unrealistic lighting—everything feels part of the scene."
    },
    {
        icon: "key-frame",
        title: "ORGANIZED FOR REAL EDITING WORKFLOWS",
        description: "Clean project structures with clear labels and grouped controls. You'll never get lost in 'Comp 1, Comp 2, Comp 3' again."
    },
    {
        icon: "cpu",
        title: "PLUGIN-FREE (MOSTLY)",
        description: "All templates work out of the box inside After Effects. No extra plugins needed — unless it really adds value."
    }
];

export default function FeaturesSection() {
    const [showAll, setShowAll] = useState(false);

    // On mobile, show only 2 cards initially
    const visibleFeatures = showAll ? features : features.slice(0, 2);

    return (
        <div className="w-full relative flex flex-col">
            {/* Section Header */}
            <div className="relative z-20">
                <SectionHeader
                    subtitle="We don't do logo reveals, lower thirds, or slideshow intros. We build motion scenes—the actual shots you need."
                    title={
                        <div className="flex flex-col items-center gap-2">
                            <div className="flex flex-wrap md:flex-nowrap items-center justify-center gap-[0.2em] w-full z-10">
                                <SelectionBox text="MOTION SCENES," color="var(--color-primary-95)" />
                                <span>NOT TEMPLATES</span>
                            </div>
                        </div>
                    }
                />
            </div>

            {/* Grid Portion */}
            <div className="w-full relative mt-12 md:mt-24">
                {/* Top Line */}
                <div className="absolute top-0 left-0 right-0 h-[1px]" style={{ background: 'var(--color-grid-line)' }} />

                {/* Content Container */}
                <div
                    className="mx-auto"
                    style={{ width: 'calc(100% - (var(--grid-margin) * 2))' }}
                >
                    {/* Desktop Horizontal Divider */}
                    <div
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 h-[1px] z-0 hidden md:block"
                        style={{ width: '60%', background: 'var(--color-grid-line)' }}
                    />

                    {/* Cards Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 relative py-4 md:py-8">
                        {/* Desktop Vertical Dividers */}
                        <div className="absolute left-1/3 top-12 bottom-[calc(55%+1rem)] w-[1px] hidden md:block z-0" style={{ background: 'var(--color-grid-line)' }} />
                        <div className="absolute left-1/3 top-[calc(55%+1rem)] bottom-12 w-[1px] hidden md:block z-0" style={{ background: 'var(--color-grid-line)' }} />
                        <div className="absolute left-2/3 top-12 bottom-[calc(55%+1rem)] w-[1px] hidden md:block z-0" style={{ background: 'var(--color-grid-line)' }} />
                        <div className="absolute left-2/3 top-[calc(55%+1rem)] bottom-12 w-[1px] hidden md:block z-0" style={{ background: 'var(--color-grid-line)' }} />

                        {/* Mobile: Show limited cards with dividers */}
                        <div className="md:hidden flex flex-col">
                            {visibleFeatures.map((feature, index) => (
                                <div key={index}>
                                    <FeatureCard {...feature} />
                                    {index < visibleFeatures.length - 1 && (
                                        <div className="w-full h-[1px] my-2" style={{ background: 'var(--color-grid-line)' }} />
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* Desktop: Show all cards */}
                        <div className="hidden md:contents">
                            {features.map((feature, index) => (
                                <FeatureCard key={index} {...feature} />
                            ))}
                        </div>
                    </div>

                    {/* See More Button (Mobile Only) */}
                    {!showAll && (
                        <div className="md:hidden flex justify-center py-6">
                            <button
                                onClick={() => setShowAll(true)}
                                className="px-6 py-3 border border-[var(--color-grid-line)] text-white/70 rounded-full text-sm font-medium uppercase tracking-wider hover:bg-white/5 transition-colors"
                                style={{ fontFamily: 'var(--font-geist-mono)' }}
                            >
                                See More
                            </button>
                        </div>
                    )}
                </div>

                {/* Bottom Line */}
                <div className="absolute bottom-0 left-0 right-0 h-[1px]" style={{ background: 'var(--color-grid-line)' }} />
            </div>
        </div>
    );
}

function FeatureCard({ icon, title, description }: FeatureItem) {
    return (
        <div className="flex flex-col items-center text-center p-6 md:p-12 gap-4 md:gap-6 group">
            {/* Icon Container - Bigger on both mobile and desktop */}
            <div
                className="flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                style={{
                    width: '90px',
                    height: '90px',
                    borderRadius: '75px',
                    padding: '16px',
                    background: 'var(--color-dark-12)',
                    border: '6px solid var(--color-dark-15)',
                    boxShadow: 'inset 16px 12px 9px 2px rgba(255, 255, 255, 0.05)'
                }}
            >
                <div
                    style={{
                        width: '52px',
                        height: '52px',
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

            {/* Title - Smaller on mobile */}
            <h3
                className="text-white uppercase text-lg md:text-2xl"
                style={{
                    fontFamily: 'var(--font-poppins)',
                    fontWeight: 600,
                    lineHeight: '130%',
                    letterSpacing: '0%'
                }}
            >
                {title}
            </h3>

            {/* Description - Smaller on mobile */}
            <p
                className="text-white/70 text-sm md:text-base"
                style={{
                    fontFamily: 'var(--font-geist-mono)',
                    fontWeight: 400,
                    lineHeight: '150%',
                    letterSpacing: '0%'
                }}
            >
                {description}
            </p>
        </div>
    );
}
