export default function GridBackground({ children }: { children?: React.ReactNode }) {
    return (
        <div className="relative w-full min-h-screen bg-[#070708] overflow-hidden">
            {/* Dot Grid Pattern */}
            <div
                className="absolute inset-0 z-0 pointer-events-none"
                style={{
                    backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.04) 3px, transparent 1px)',
                    backgroundSize: '40px 40px' // "Tight and small"
                }}
            />

            {/* Vertical Lines */}
            {/* Left Line */}
            <div
                className="absolute top-0 bottom-0 z-0 pointer-events-none"
                style={{
                    left: '5%',
                    width: '1px',
                    background: 'rgba(148, 124, 255, 0.3)'
                }}
            />
            {/* Right Line */}
            <div
                className="absolute top-0 bottom-0 z-0 pointer-events-none"
                style={{
                    right: '5%',
                    width: '1px',
                    background: 'rgba(148, 124, 255, 0.3)'
                }}
            />

            {/* Content Content Wrapper */}
            <div className="relative z-10 w-full">
                {children}
            </div>
        </div>
    );
}
