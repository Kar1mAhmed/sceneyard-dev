import GridBackground from "@/src/components/layout/GridBackground";
import Navbar from "@/src/components/layout/Navbar";
import Footer from "@/src/components/layout/Footer";
import SmallColumnsHeader from "@/src/components/ui/SmallColumnsHeader";
import SearchLibrary from "@/src/components/library/SearchLibrary";
import LibraryFilters from "@/src/components/library/LibraryFilters";

import { Suspense } from "react";
import { getTemplatesWithThumbnails } from "@/features/templates/service";
import TemplateGrid from "@/src/components/library/TemplateGrid";

async function TemplatesLoader() {
    const templates = await getTemplatesWithThumbnails(100, 0, 'recent');
    return <TemplateGrid templates={templates} />;
}

export default function LibraryPage() {
    return (
        <GridBackground>
            <Navbar />
            <main className="min-h-screen pt-32 md:pt-48">
                <SmallColumnsHeader />
                <SearchLibrary />
                <LibraryFilters />

                <Suspense fallback={
                    <div className="w-full flex justify-center py-20 px-4">
                        <div className="w-full max-w-6xl text-center py-20 animate-pulse bg-white/[0.02] rounded-[40px]">
                            <p className="text-white/20">Loading amazing templates...</p>
                        </div>
                    </div>
                }>
                    <TemplatesLoader />
                </Suspense>
            </main>
            <Footer />
        </GridBackground>
    );
}
