import GridBackground from "@/src/components/layout/GridBackground";
import Navbar from "@/src/components/Navbar";
import Footer from "@/src/components/Footer";
import LibraryHeader from "@/src/components/library/LibraryHeader";
import SearchLibrary from "@/src/components/library/SearchLibrary";
import LibraryFilters from "@/src/components/library/LibraryFilters";

export default function LibraryPage() {
    return (
        <GridBackground>
            <Navbar />
            <main className="min-h-screen mt-48 ">
                <LibraryHeader />
                <SearchLibrary />
                <LibraryFilters />

                {/* Placeholder for future content */}
                <div className="py-20 text-center text-white/50">
                    <p>Template grid coming soon...</p>
                </div>
            </main>
            <Footer />
        </GridBackground>
    );
}
