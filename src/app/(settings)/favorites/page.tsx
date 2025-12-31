export default function FavoritesPage() {
    return (
        <>
           

            {/* Placeholder for favorite templates */}
            <div className="w-full py-16 text-center border border-white/5 rounded-[24px] bg-white/[0.02]">
                <p className="text-white/40 text-base" style={{ fontFamily: 'var(--font-poppins)' }}>
                    You haven&apos;t added any favorites yet.
                </p>
                <p className="text-white/20 text-sm mt-2" style={{ fontFamily: 'var(--font-geist-mono), monospace' }}>
                    Browse the library and tap the heart icon to save templates.
                </p>
            </div>
        </>
    );
}
