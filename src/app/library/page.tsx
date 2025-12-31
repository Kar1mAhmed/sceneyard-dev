import GridBackground from "@/src/components/layout/GridBackground";
import Navbar from "@/src/components/layout/Navbar";
import Footer from "@/src/components/layout/Footer";
import SmallColumnsHeader from "@/src/components/ui/SmallColumnsHeader";
import SearchLibrary from "@/src/components/library/SearchLibrary";
import LibraryFilters from "@/src/components/library/LibraryFilters";

import { Suspense } from "react";
import { getTemplatesWithThumbnails } from "@/features/templates/service";
import TemplateGrid from "@/src/components/library/TemplateGrid";
import Loading from "@/src/components/ui/Loading";

import { auth } from "@/features/auth/auth";
import { getLikedTemplateIds } from "@/features/likes/service";

async function TemplatesLoader() {
    // Debug delay - remove after fixing
    await new Promise(resolve => setTimeout(resolve, 500));

    const [templates, session] = await Promise.all([
        getTemplatesWithThumbnails(100, 0, 'recent'),
        auth()
    ]);

    let likedTemplateIds: string[] = [];
    if (session?.user?.id) {
        likedTemplateIds = await getLikedTemplateIds(session.user.id);
    }

    return <TemplateGrid templates={templates} likedTemplateIds={likedTemplateIds} />;
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
                    <div className="w-full flex justify-center py-24 px-4 relative z-[100] bg-[#070708]">
                        <Loading text="Loading scenes" size={90} />
                    </div>
                }>
                    <TemplatesLoader />
                </Suspense>
            </main>
            <Footer />
        </GridBackground>
    );
}
