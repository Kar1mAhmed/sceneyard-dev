import SelectionBox from "./SelectionBox";

interface SectionHeaderProps {
    title: React.ReactNode;
    subtitle?: React.ReactNode;
    description?: React.ReactNode;
    className?: string;
}

export default function SectionHeader({ title, subtitle, description, className = "" }: SectionHeaderProps) {
    return (
        <div className={`relative w-full py-10 md:py-20 flex flex-col items-center justify-center text-center ${className}`}>
            {/* Top Horizontal Line */}
            <div
                className="absolute top-0 left-0 right-0 h-[1px]"
                style={{
                    background: 'var(--color-grid-line)',
                }}
            />

            {/* Content - Constrained to grid margins */}
            <div
                className="flex flex-col items-center gap-4 md:gap-6 z-10 px-4 mx-auto text-center"
                style={{ width: 'calc(100% - (var(--grid-margin) * 2))', maxWidth: '100%' }}
            >
                {/* Main Title - Font specs from Figma / User feedback */}
                <h2
                    className="text-white leading-tight text-center mx-auto w-full break-words"
                    style={{
                        fontFamily: 'var(--font-poppins), sans-serif',
                        fontSize: 'clamp(32px, 5vw, 80px)',
                        letterSpacing: '-1.12px',
                        fontWeight: 500,
                    }}
                >
                    {title}
                </h2>

                {/* Subtitle - Smaller on mobile */}
                <span
                    className="tracking-widest text-primary-70 align-middle max-w-[600px] text-xs md:text-lg"
                    style={{
                        fontFamily: 'var(--font-geist-mono), monospace',
                        fontWeight: 500
                    }}
                >
                    {subtitle}
                </span>

                {description && (
                    <p
                        className="text-white/60 font-light max-w-[600px] mt-2 text-xs md:text-base"
                        style={{
                            fontFamily: 'var(--font-geist-mono), monospace',
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
