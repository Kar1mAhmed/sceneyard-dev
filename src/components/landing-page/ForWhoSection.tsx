"use client";

import SectionHeader from "../SectionHeader";
import SelectionBox from "../ui/SelectionBox";
import Image from "next/image";

interface Persona {
    id: string;
    title: string;
    description: string;
    faceImage: string;
    backgroundColor: string;
    avatarColor: string;
}

const personas: Persona[] = [
    {
        id: "youtube",
        title: "YouTube Video Editors",
        description: "Meet tight deadlines while keeping your videos polished and engaging.",
        faceImage: "/faces/1.svg",
        backgroundColor: "linear-gradient(135deg, #7C3AED 0%, #6366F1 100%)",
        avatarColor: "#FFD53E"
    },
    {
        id: "social-media",
        title: "Social Media Editors",
        description: "Create daily, fast-paced content without rebuilding animations from scratch.",
        faceImage: "/faces/2.svg",
        backgroundColor: "linear-gradient(135deg, #A855F7 0%, #7C3AED 100%)",
        avatarColor: "#00FFF0"
    },
    {
        id: "freelance",
        title: "Freelance Motion Designers",
        description: "Deliver high-quality work to clients with less time spent on repetitive tasks.",
        faceImage: "/faces/3.svg",
        backgroundColor: "linear-gradient(135deg, #06B6D4 0%, #00FFF0 100%)",
        avatarColor: "#D77BFF"
    },
    {
        id: "content-creators",
        title: "Content Creators",
        description: "Focus on storytelling while motion work gets done faster.",
        faceImage: "/faces/4.svg",
        backgroundColor: "linear-gradient(135deg, #FCD34D 0%, #FFD53E 100%)",
        avatarColor: "#7C3AED"
    }
];

export default function ForWhoSection() {
    return (
        <div className="w-full relative flex flex-col">
            {/* Section Header */}
            <div className="relative z-20">
                <SectionHeader
                    subtitle="If you use After Effects, this is for you."
                    title={
                        <div className="flex flex-col items-center gap-2">
                            <div className="flex flex-row items-center justify-center gap-[0.2em] whitespace-nowrap w-full z-10">
                                <span>BUILT FOR ANYONE WHO</span>
                            </div>
                            <div className="flex flex-row items-center justify-center gap-[0.2em] whitespace-nowrap w-full z-10">
                                <SelectionBox text="KNOWS AE" color="var(--color-primary-95)" />
                            </div>
                        </div>
                    }
                />
            </div>

            {/* Scrolling Cards Container */}
            <div className="w-full relative mt-24">
                {/* Top Line */}
                <div className="absolute top-0 left-0 right-0 h-[1px]" style={{ background: 'var(--color-grid-line)' }} />

                {/* Infinite Scroll Area - Marquee style */}
                <div className="w-full overflow-hidden py-16">
                    <div
                        className="flex animate-persona-marquee hover:[animation-play-state:paused]"
                        style={{ width: 'max-content' }}
                    >
                        {/* Duplicate personas array for seamless infinite scroll */}
                        {[...personas, ...personas, ...personas, ...personas].map((persona, index) => (
                            <PersonaCard key={`${persona.id}-${index}`} {...persona} />
                        ))}
                    </div>
                </div>

                {/* Bottom Line */}
                <div className="absolute bottom-0 left-0 right-0 h-[1px]" style={{ background: 'var(--color-grid-line)' }} />
            </div>

            <style jsx>{`
                @keyframes persona-marquee {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                .animate-persona-marquee {
                    animation: persona-marquee 30s linear infinite;
                }
            `}</style>
        </div>
    );
}

function PersonaCard({ title, description, faceImage, backgroundColor, avatarColor }: Persona) {
    return (
        <div
            className="flex flex-col gap-2 p-6 transition-transform duration-300 hover:scale-105 mx-3"
            style={{
                width: '500px',
                minHeight: '220px',
                borderRadius: '42px',
                background: backgroundColor,
                border: '1px solid rgba(148, 124, 255, 0.3)',
                flexShrink: 0
            }}
        >
            {/* Top Row: Avatar + Title */}
            <div className="flex items-center gap-5">
                {/* Dual Avatar Circles - Both with images and borders */}
                <div className="relative flex-shrink-0" style={{ width: '86px', height: '86px' }}>
                    {/* Back Circle (with image and border) */}
                    <div
                        className="absolute"
                        style={{
                            width: '70px',
                            height: '70px',
                            borderRadius: '50%',
                            backgroundColor: avatarColor,
                            border: '3px solid rgba(255, 255, 255, 0.2)',
                            overflow: 'hidden',
                            top: '8px',
                            left: '8px',
                            zIndex: 1
                        }}
                    >
                        <Image
                            src={faceImage}
                            alt={`${title} background`}
                            width={70}
                            height={70}
                            className="object-cover opacity-50"
                        />
                    </div>
                    {/* Front Circle (with image and border) */}
                    <div
                        className="absolute"
                        style={{
                            width: '70px',
                            height: '70px',
                            borderRadius: '50%',
                            overflow: 'hidden',
                            border: '3px solid rgba(255, 255, 255, 0.2)',
                            top: '0px',
                            left: '0px',
                            zIndex: 2
                        }}
                    >
                        <Image
                            src={faceImage}
                            alt={title}
                            width={70}
                            height={70}
                            className="object-cover"
                        />
                    </div>
                </div>

                {/* Title */}
                <h3
                    className="text-white flex-1 max-w-[250px]"
                    style={{
                        fontFamily: 'var(--font-poppins)',
                        fontWeight: 500,
                        fontSize: '25px',
                        lineHeight: '130%'
                    }}
                >
                    {title}
                </h3>
            </div>

            {/* Description */}
            <p
                className="text-white/90"
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
