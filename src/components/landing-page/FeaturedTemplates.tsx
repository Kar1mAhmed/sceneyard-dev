import { getFeaturedTemplates } from "@/features/templates/repo";
import FeaturedSection from "./FeaturedSection";
import { Ribbon } from "../ui/Ribbon";

export default async function FeaturedTemplates() {
    const featuredTemplates = await getFeaturedTemplates(10);

    const featuredVideos = featuredTemplates.map(t => ({
        id: t.id,
        title: t.title,
        thumbnailUrl: t.thumbnail_r2_key ? `https://media.sceneyard.com/${t.thumbnail_r2_key}` : ""
    })).filter(v => v.thumbnailUrl); // Only show ones with thumbnails/videos

    return (
        <section className="relative w-full overflow-hidden bg-black py-24">
            {/* Top Ribbon */}
            <div className="mb-[-2px] z-10 relative">
                <Ribbon
                    items={[
                        { text: "FEATURED TEMPLATES", icon: "box" },
                        { text: "HIGH QUALITY", icon: "T" },
                        { text: "SCENEYARD EXCLUSIVE", icon: "camera" },
                    ]}
                    backgroundColor="var(--color-primary-95)"
                    textColor="#FFFFFF"
                    // borderColor="rgba(255,255,255,0.2)"
                    className="border-t border-b border-white/10"
                />
            </div>

            <FeaturedSection videos={featuredVideos} />

            {/* Bottom Ribbon */}
            <div className="mt-[-2px] z-10 relative">
                <Ribbon
                    items={[
                        { text: "DISCOVER MORE", icon: "fx" },
                        { text: "UNLIMITED DOWNLOADS", icon: "timer" },
                        { text: "CREATIVE FREEDOM", icon: "home" },
                    ]}
                    backgroundColor="var(--color-primary-95)"
                    textColor="#FFFFFF"
                // borderColor="rgba(255,255,255,0.2)"
                />
            </div>
        </section>
    );
}
