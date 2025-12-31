import { Download } from 'lucide-react';

export default function DownloadEmptyState() {
    return (
        <div className="relative w-full py-16 md:py-24">
            {/* Top Horizontal Line - Full Width */}
            <div
                className="absolute top-0 left-[50%] right-[50%] ml-[-50vw] mr-[-50vw] w-[100vw] h-[1px]"
                style={{ background: 'var(--color-grid-line)' }}
            />

            {/* Content */}
            <div className="flex flex-col items-center justify-center gap-8">
                {/* Download Icon with Line Through - More Polished */}
                <div className="relative w-20 h-20 md:w-24 md:h-24">
                    {/* Circle background */}
                    <div className="absolute inset-0 rounded-full border border-white/10 flex items-center justify-center bg-white/[0.02]">
                        <Download className="w-10 h-10 md:w-12 md:h-12 text-white/20" />
                    </div>
                    {/* Diagonal line through */}
                    <div
                        className="absolute inset-0 flex items-center justify-center"
                        style={{
                            transform: 'rotate(-45deg)'
                        }}
                    >
                        <div className="w-[120%] h-[1px] bg-white/20" />
                    </div>
                </div>

                {/* Text */}
                <p
                    className="text-white/60 text-xl md:text-2xl text-center"
                    style={{
                        fontFamily: 'var(--font-poppins), sans-serif',
                        fontWeight: 300,
                        letterSpacing: '-1.12px',
                        lineHeight: '100%',
                    }}
                >
                    You have no download yet
                </p>
            </div>

            {/* Bottom Horizontal Line - Full Width */}
            <div
                className="absolute bottom-0 left-[50%] right-[50%] ml-[-50vw] mr-[-50vw] w-[100vw] h-[1px]"
                style={{ background: 'var(--color-grid-line)' }}
            />
        </div>
    );
}
