import { auth } from "@/features/auth/auth";
import { getTemplateById, updateTemplate, deleteTemplate } from "@/features/templates/repo";
import { redirect } from "next/navigation";
import Link from "next/link";
import { headers } from "next/headers";
import { Suspense } from "react";
import { revalidatePath } from "next/cache";
import { TemplateMediaViewer } from "../../components/TemplateMediaViewer";

async function EditTemplateForm({ params }: { params: Promise<{ id: string }> }) {
    await headers();
    const session = await auth();
    // @ts-ignore
    if (session?.user?.role !== "admin") redirect("/home");

    const { id } = await params;
    const template = await getTemplateById(id);
    if (!template) redirect("/admin/templates");

    async function handleUpdate(formData: FormData) {
        "use server";

        const title = formData.get("title") as string;
        const description = formData.get("description") as string;
        const credits_cost = parseInt(formData.get("credits_cost") as string);
        const ae_version_min = formData.get("ae_version_min") as string;
        const tags_text = formData.get("tags_text") as string;
        const published = formData.get("published") === "on";

        await updateTemplate(id, {
            title,
            description,
            credits_cost,
            ae_version_min: ae_version_min || null,
            tags_text,
            published_at: published ? Math.floor(Date.now() / 1000) : null
        });

        revalidatePath('/admin/templates');
        revalidatePath(`/admin/templates/${id}`);
        redirect("/admin/templates");
    }

    async function handleDelete() {
        "use server";
        await deleteTemplate(id);
        revalidatePath('/admin/templates');
        redirect("/admin/templates");
    }

    return (
        <div className="min-h-screen bg-black admin-bg-pattern text-white p-8 font-sans selection:bg-purple-500/30">
            <div className="max-w-4xl mx-auto space-y-8">
                {/* Header */}
                <div className="border-b border-white/10 pb-8">
                    <Link href="/admin/templates" className="text-gray-400 hover:text-white transition-colors mb-4 inline-block flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Back to Templates
                    </Link>
                    <div className="flex items-center justify-between">
                        <h1 className="text-4xl font-bold text-white">Edit Template</h1>
                        <form action={handleDelete}>
                            <button type="submit" className="px-4 py-2 bg-red-500/10 text-red-400 border border-red-500/20 rounded-xl font-medium hover:bg-red-500/20 transition-colors">
                                Delete Template
                            </button>
                        </form>
                    </div>
                </div>

                {/* Media Viewer */}
                <TemplateMediaViewer
                    previewR2Key={template.preview_asset?.r2_key}
                    downloadR2Key={template.file_asset?.r2_key}
                    title={template.title}
                />

                {/* Form */}
                <form action={handleUpdate} className="bg-zinc-900 rounded-3xl border border-white/5 p-8 space-y-6">
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-2">
                            Title *
                        </label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            required
                            defaultValue={template.title}
                            className="w-full px-4 py-3 bg-black border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
                        />
                    </div>

                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-2">
                            Description
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            rows={4}
                            defaultValue={template.description}
                            className="w-full px-4 py-3 bg-black border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors resize-none"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="credits_cost" className="block text-sm font-medium text-gray-300 mb-2">
                                Credits Cost * (1-4)
                            </label>
                            <input
                                type="number"
                                id="credits_cost"
                                name="credits_cost"
                                required
                                min="1"
                                max="4"
                                defaultValue={template.credits_cost}
                                className="w-full px-4 py-3 bg-black border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
                            />
                        </div>

                        <div>
                            <label htmlFor="ae_version_min" className="block text-sm font-medium text-gray-300 mb-2">
                                Min AE Version
                            </label>
                            <input
                                type="text"
                                id="ae_version_min"
                                name="ae_version_min"
                                placeholder="e.g., 2023"
                                defaultValue={template.ae_version_min || ''}
                                className="w-full px-4 py-3 bg-black border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="tags_text" className="block text-sm font-medium text-gray-300 mb-2">
                            Tags (comma-separated)
                        </label>
                        <input
                            type="text"
                            id="tags_text"
                            name="tags_text"
                            placeholder="logo, intro, corporate"
                            defaultValue={template.tags_text}
                            className="w-full px-4 py-3 bg-black border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
                        />
                    </div>

                    <div className="flex items-center gap-3">
                        <input
                            type="checkbox"
                            id="published"
                            name="published"
                            defaultChecked={!!template.published_at}
                            className="w-5 h-5 bg-black border border-white/10 rounded text-purple-500 focus:ring-purple-500 focus:ring-offset-0"
                        />
                        <label htmlFor="published" className="text-sm font-medium text-gray-300">
                            Published (visible to users)
                        </label>
                    </div>

                    <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                        <div className="text-sm text-gray-400">
                            <p>Created: {new Date(template.created_at * 1000).toLocaleDateString()}</p>
                            <p>Updated: {new Date(template.updated_at * 1000).toLocaleDateString()}</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <Link href="/admin/templates" className="px-6 py-3 bg-zinc-800 text-white rounded-xl font-medium hover:bg-zinc-700 transition-colors">
                                Cancel
                            </Link>
                            <button type="submit" className="px-6 py-3 bg-purple-500 text-white rounded-xl font-bold hover:bg-purple-600 transition-colors">
                                Save Changes
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

function EditTemplateLoading() {
    return (
        <div className="min-h-screen bg-black flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
        </div>
    );
}

export default async function EditTemplatePage({ params }: { params: Promise<{ id: string }> }) {
    return (
        <Suspense fallback={<EditTemplateLoading />}>
            <EditTemplateForm params={params} />
        </Suspense>
    );
}
