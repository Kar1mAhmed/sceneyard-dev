import SelectionBox from "./SelectionBox";

interface SectionHeaderProps {
    title: React.ReactNode;
    subtitle?: string;
    description?: string;
    className?: string;
}

export default function SectionHeader({ title, subtitle, description, className = "" }: SectionHeaderProps) {
    return (
        <div className={`relative w-full py-20 flex flex-col items-center justify-center text-center ${className}`}>
            {/* Top Horizontal Line */}
            <div
                className="absolute top-0 left-0 right-0 h-[1px]"
                style={{
                    background: 'var(--color-grid-line)',
                }}
            />

            {/* Content */}
            <div className="flex flex-col items-center gap-6 z-10 px-4">
                {/* Main Title - Font specs from Figma */}
                <h2
                    className="text-white font-light leading-none text-center"
                    style={{
                        fontFamily: 'var(--font-poppins), sans-serif',
                        fontSize: 'clamp(48px, 6vw, 88px)', // Scaling up to 96px
                        letterSpacing: '-1.12px',
                        fontWeight: 300,
                    }}
                >
                    {title}
                </h2>

                {/* Subtitle - Moved below title */}
                <span
                    className="tracking-widest text-primary-70 align-middle max-w-[600px]"
                    style={{
                        // Color moved to className
                        fontFamily: 'var(--font-geist-mono), monospace',
                        fontSize: '14px',
                        fontWeight: 500
                    }}
                >
                    {subtitle}
                </span>

                {description && (
                    <p
                        className="text-white/60 font-light max-w-[600px] mt-2"
                        style={{
                            fontFamily: 'var(--font-geist-mono), monospace',
                            fontSize: '16px',
                            fontWeight: 400,
                            lineHeight: '1.5'
                        }}
                    >
                        {description}
                    </p>
                )}
            </div>

            {/* Bottom Horizontal Line */}
            <div
                className="absolute bottom-0 left-0 right-0 h-[1px]"
                style={{
                    background: 'var(--color-grid-line)',
                }}
            />
        </div>
    );
}
