import TemplateHeader from "@/src/components/template/TemplateHeader";
import { Ribbon } from "@/src/components/ui/Ribbon";

// Mock template data for testing - will be replaced with actual data fetching
const mockTemplate = {
    id: "1",
    title: "Match Cut Intro Creator | Text & Logo Opener",
    description: "Create stunning match cut intros with sharp headings and professional typography.",
    previewUrl: "/api/r2/stream?key=preview.mp4",
    credits: 2,
    likes: 115,
};

// Ribbon items for template page
const ribbonItems = [
    { text: "NO PLUGINS", icon: "x" },
    { text: "TUTORIAL INCLUDED", icon: "star" },
];

interface ScenePageProps {
    params: Promise<{ id: string }>;
}

export default async function ScenePage({ params }: ScenePageProps) {
    const { id } = await params;

    // TODO: Fetch template data from service
    // const template = await templateService.getById(id);
    const template = mockTemplate;

    return (
        <main className="min-h-screen bg-[var(--color-dark-03)]">
            <TemplateHeader title={template.title}>
                {/* Ribbon - matching landing page style */}
                <div className="w-full mt-8">


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

                {/* Video Preview Placeholder */}
                <div className="mt-8 w-full max-w-5xl relative rounded-2xl overflow-hidden bg-black/50 backdrop-blur-sm border border-white/10">
                    <div className="aspect-video w-full flex items-center justify-center">
                        <div className="text-center">
                            <div className="w-20 h-20 rounded-full bg-cyan-400/20 flex items-center justify-center mx-auto mb-4">
                                <svg className="w-10 h-10 text-cyan-400" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M8 5v14l11-7z" />
                                </svg>
                            </div>
                            <p className="text-white/60 text-sm">Video Preview - Template ID: {id}</p>
                        </div>
                    </div>

                    {/* Like Buttons */}
                    <div className="absolute top-4 right-4 flex gap-2">
                        <button className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-sm text-white text-sm border border-white/10">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                            {template.likes}
                        </button>
                        <button className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 text-white text-sm">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                            </svg>
                            {template.likes}
                        </button>
                    </div>
                </div>
            </TemplateHeader>
        </main>
    );
}
