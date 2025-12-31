import BigColumnHeader from "@/src/components/ui/BigColumnsHeader";
import { Ribbon } from "@/src/components/ui/Ribbon";
import Navbar from "@/src/components/layout/Navbar";
import GridBackground from "@/src/components/layout/GridBackground";
import { getTemplateById } from "@/features/templates/service";
import { notFound } from "next/navigation";
import { LikeButton } from "@/src/components/ui/LikeButton";
import { getPublicR2Url } from "@/lib/r2";
import Footer from "@/src/components/layout/Footer";
import { Button } from "@/src/components/ui/Button";
import SectionHeader from "@/src/components/ui/SectionHeader";
import TemplateGrid from "@/src/components/library/TemplateGrid";
import { getTemplatesWithThumbnails } from "@/features/templates/service";
import SelectionBox from "@/src/components/ui/SelectionBox";
import DownloadTemplateButton from "@/src/components/scene/DownloadTemplateButton";

interface ScenePageProps {
    params: Promise<{ id: string }>;
}

export default async function ScenePage({ params }: ScenePageProps) {
    const { id } = await params;
    const template = await getTemplateById(id);

    if (!template) {
        notFound();
    }

    const previewUrl = template.preview_asset?.r2_key
        ? getPublicR2Url(template.preview_asset.r2_key)
        : null;

    // Fetch "suggestions" (just first 20 recent templates for now)
    const suggestedTemplates = await getTemplatesWithThumbnails(20, 0, 'recent');

    return (
        <GridBackground>
            <Navbar />
            <main className="min-h-screen mb-24">
                <BigColumnHeader title={template.title}>
                    <Ribbon
                        items={[
                            { text: "FEATURED TEMPLATES", icon: "box" },
                            { text: "HIGH QUALITY", icon: "T" },
                            { text: "SCENEYARD EXCLUSIVE", icon: "camera" },
                        ]}
                        backgroundColor="var(--color-primary-95)"
                        textColor="#FFFFFF"
                        className="border-t border-b border-white/10"
                    />

                    {/* Video Preview Container */}
                    <div className="mt-8 md:mt-16 w-full max-w-7xl px-4 relative">
                        <div className="relative rounded-[32px] overflow-hidden bg-black/50 backdrop-blur-sm border border-white/10 shadow-2xl group">
                            <div className="aspect-video w-full flex items-center justify-center">
                                {previewUrl ? (
                                    <video
                                        src={previewUrl}
                                        className="w-full h-full object-contain"
                                        controls
                                        autoPlay
                                        muted
                                        loop
                                        playsInline
                                    />
                                ) : (
                                    <div className="text-center">
                                        <div className="w-20 h-20 rounded-full bg-cyan-400/20 flex items-center justify-center mx-auto mb-4">
                                            <svg className="w-10 h-10 text-cyan-400" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M8 5v14l11-7z" />
                                            </svg>
                                        </div>
                                        <p className="text-white/60 text-sm">Video Preview Unavailable</p>
                                    </div>
                                )}
                            </div>

                            {/* Like Button Overlay - Top Right */}
                            <div className="absolute top-6 right-6 z-20">
                                <LikeButton
                                    templateId={template.id}
                                    initialLikes={template.likes_count}
                                    className="scale-110"
                                />
                            </div>
                        </div>

                        {/* Categories and Tags Section */}
                        <div className="mt-8 flex flex-wrap gap-3 justify-center">
                            {/* Categories */}
                            {template.categories?.map((cat) => (
                                <div
                                    key={cat.id}
                                    className="px-6 py-2 rounded-full bg-[#1A1B1E] border border-white/5 text-white/90"
                                    style={{
                                        fontFamily: 'var(--font-geist-mono), monospace',
                                        fontSize: '14px',
                                        fontWeight: 500,
                                        lineHeight: '100%'
                                    }}
                                >
                                    {cat.name}
                                </div>
                            ))}

                            {/* Tags */}
                            {template.tags_text?.split(',').map((tag, index) => {
                                const trimmedTag = tag.trim();
                                if (!trimmedTag) return null;
                                return (
                                    <div
                                        key={index}
                                        className="px-6 py-2 rounded-full bg-[#1A1B1E] border border-white/5 text-white/60"
                                        style={{
                                            fontFamily: 'var(--font-geist-mono), monospace',
                                            fontSize: '14px',
                                            fontWeight: 500,
                                            lineHeight: '100%'
                                        }}
                                    >
                                        {trimmedTag}
                                    </div>
                                );
                            })}
                        </div>

                        {/* Description Section */}
                        <div className="mt-20 w-full max-w-4xl px-4 text-left">
                            <h2 className="text-white/40 text-[20px] font-semibold tracking-wider mb-6" style={{ fontFamily: 'var(--font-poppins)' }}>Description</h2>
                            <p className="text-white/80 text-[18px] leading-[1.6] font-regular" style={{ fontFamily: 'var(--font-poppins)' }}>
                                {template.description}
                            </p>
                        </div>

                        {/* Metadata Grid */}
                        <div className="mt-20 w-full max-w-5xl px-4 grid grid-cols-2 md:grid-cols-4 gap-12 text-center mx-auto">
                            {/* File Size */}
                            <div className="flex flex-col items-center gap-2">
                                <span className="text-white/40 text-sm font-medium  tracking-wider" style={{ fontFamily: 'var(--font-poppins)' }}>File Size</span>
                                <span className="text-white text-[18px] font-medium" style={{ fontFamily: 'var(--font-poppins)' }}>
                                    {template.file_asset?.bytes ? `${(template.file_asset.bytes / (1024 * 1024)).toFixed(1)} MB` : 'N/A'}
                                </span>
                            </div>

                            {/* Category */}
                            <div className="flex flex-col items-center gap-2">
                                <span className="text-white/40 text-sm font-medium  tracking-wider" style={{ fontFamily: 'var(--font-poppins)' }}>Category</span>
                                <span className="text-white text-[18px] font-medium" style={{ fontFamily: 'var(--font-poppins)' }}>
                                    {template.categories?.[0]?.name || 'After Effects'}
                                </span>
                            </div>

                            {/* AE Version */}
                            <div className="flex flex-col items-center gap-2">
                                <span className="text-white/40 text-sm font-medium  tracking-wider" style={{ fontFamily: 'var(--font-poppins)' }}>After Effects Version</span>
                                <span className="text-white text-[18px] font-medium" style={{ fontFamily: 'var(--font-poppins)' }}>
                                    {template.ae_version_min || 'CC'}
                                </span>
                            </div>

                            {/* Aspect Ratio */}
                            <div className="flex flex-col items-center gap-2">
                                <span className="text-white/40 text-sm font-medium   tracking-wider" style={{ fontFamily: 'var(--font-poppins)' }}>Aspect ratio</span>
                                <span className="text-white text-[18px] font-medium" style={{ fontFamily: 'var(--font-poppins)' }}>
                                    {template.orientation === 'horizontal' ? '16:9 (1920x1080 FHD)' : '9:16 (1080x1920 Vertical)'}
                                </span>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="mt-24 mb-32 flex flex-col md:flex-row items-center justify-center gap-6">
                            {/* Download Template Button */}
                            <DownloadTemplateButton
                                templateId={template.id}
                                templateTitle={template.title}
                            />

                            <Button
                                variant="secondary"
                                className="min-w-[320px] transition-all hover:scale-105 active:scale-95"
                                style={{
                                    fontFamily: 'var(--font-geist-mono), monospace',
                                    fontWeight: 500,
                                    fontSize: '16px',
                                    lineHeight: '100%'
                                }}
                            >
                                <div className="w-6 h-6 flex items-center justify-center">
                                    <img src="/custom-icons/share.svg" alt="" className="w-full h-full transition-all group-active:brightness-0 group-active:invert" />
                                </div>
                                Share
                            </Button>
                        </div>
                    </div>
                </BigColumnHeader>

                {/* Suggestions Section */}
                <div className="mt-32 w-full">
                    <SectionHeader
                        title={<SelectionBox text="SUGGESTIONS" color="var(--color-primary-95)" />}
                        subtitle="You may also like"
                    />
                    <div className="mt-12">
                        <TemplateGrid templates={suggestedTemplates} />
                    </div>

                    {/* Back to Library Button */}
                    <div className="mt-24 mb-32 flex justify-center">
                        <Button
                            href="/library"
                            variant="secondary"
                            className="min-w-[320px] transition-all hover:scale-105 active:scale-95"
                            style={{
                                fontFamily: 'var(--font-geist-mono), monospace',
                                fontWeight: 500,
                                fontSize: '16px',
                                lineHeight: '100%'
                            }}
                        >
                            Back to Library
                        </Button>
                    </div>
                </div>
            </main>
            <Footer />
        </GridBackground>
    );
}
