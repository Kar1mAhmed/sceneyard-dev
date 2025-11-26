import { auth } from "@/features/auth/auth";
import { getTemplatesWithThumbnails, getTemplateStats } from "@/features/templates/repo";
import { redirect } from "next/navigation";
import Link from "next/link";
import { headers } from "next/headers";
import { Suspense } from "react";
import { VideoThumbnail } from "../components/VideoThumbnail";

async function TemplatesList() {
    await headers();
    const session = await auth();
    // @ts-ignore
    if (session?.user?.role !== "admin") redirect("/home");

    const templates = await getTemplatesWithThumbnails();
    const stats = await getTemplateStats();

    return (
        <div className="min-h-screen bg-black admin-bg-pattern text-white p-8 font-sans selection:bg-purple-500/30">
            <div className="max-w-7xl mx-auto space-y-8">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-white/10 pb-8">
                    <div>
                        <Link href="/admin" className="text-gray-400 hover:text-white transition-colors mb-4 inline-block flex items-center gap-2">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            Back to Dashboard
                        </Link>
                        <h1 className="text-4xl font-bold text-white">
                            Manage Templates
                        </h1>
                    </div>
                    <div className="flex items-center gap-4">
                        <Link href="/admin/categories" className="px-6 py-3 bg-zinc-800 text-white rounded-2xl font-medium hover:bg-zinc-700 transition-colors flex items-center gap-2">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                            </svg>
                            Manage Categories
                        </Link>
                        <Link href="/admin/templates/new" className="px-6 py-3 bg-purple-500 text-white rounded-2xl font-bold hover:bg-purple-600 transition-colors flex items-center gap-2">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                            Add Template
                        </Link>
                    </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-zinc-900 rounded-2xl border border-white/5 p-6">
                        <p className="text-sm text-gray-400 uppercase tracking-wider mb-2">Total Templates</p>
                        <p className="text-3xl font-bold text-white">{stats.total}</p>
                    </div>
                    <div className="bg-zinc-900 rounded-2xl border border-white/5 p-6">
                        <p className="text-sm text-gray-400 uppercase tracking-wider mb-2">Published</p>
                        <p className="text-3xl font-bold text-purple-400">{stats.published}</p>
                    </div>
                    <div className="bg-zinc-900 rounded-2xl border border-white/5 p-6">
                        <p className="text-sm text-gray-400 uppercase tracking-wider mb-2">Drafts</p>
                        <p className="text-3xl font-bold text-gray-400">{stats.total - stats.published}</p>
                    </div>
                </div>

                {/* Templates Grid */}
                <div className="bg-zinc-900 rounded-3xl border border-white/5 overflow-hidden">
                    {templates.length === 0 ? (
                        <div className="p-12 text-center">
                            <p className="text-gray-400 text-lg">No templates yet. Create your first one!</p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="border-b border-white/5 bg-white/5">
                                        <th className="p-6 text-sm font-medium text-gray-400 uppercase tracking-wider">Preview</th>
                                        <th className="p-6 text-sm font-medium text-gray-400 uppercase tracking-wider">Template</th>
                                        <th className="p-6 text-sm font-medium text-gray-400 uppercase tracking-wider">Cost</th>
                                        <th className="p-6 text-sm font-medium text-gray-400 uppercase tracking-wider">Status</th>
                                        <th className="p-6 text-sm font-medium text-gray-400 uppercase tracking-wider">Downloads</th>
                                        <th className="p-6 text-sm font-medium text-gray-400 uppercase tracking-wider">Likes</th>
                                        <th className="p-6 text-sm font-medium text-gray-400 uppercase tracking-wider">Published</th>
                                        <th className="p-6 text-sm font-medium text-gray-400 uppercase tracking-wider text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    {templates.map((template) => (
                                        <tr key={template.id} className="group hover:bg-white/5 transition-colors">
                                            <td className="p-6">
                                                {template.thumbnail_r2_key ? (
                                                    <VideoThumbnail
                                                        r2Key={template.thumbnail_r2_key}
                                                        title={template.title}
                                                    />
                                                ) : (
                                                    <div className="w-32 h-20 bg-zinc-800 rounded-lg flex items-center justify-center">
                                                        <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                                        </svg>
                                                    </div>
                                                )}
                                            </td>
                                            <td className="p-6">
                                                <div>
                                                    <div className="font-medium text-white">{template.title}</div>
                                                    <div className="text-sm text-gray-400 line-clamp-1">{template.description || 'No description'}</div>
                                                </div>
                                            </td>
                                            <td className="p-6">
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-500/10 text-purple-400 border border-purple-500/20">
                                                    {template.credits_cost} Credits
                                                </span>
                                            </td>
                                            <td className="p-6">
                                                {template.published_at ? (
                                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-500/10 text-green-400 border border-green-500/20">
                                                        Published
                                                    </span>
                                                ) : (
                                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-500/10 text-gray-400 border border-gray-500/20">
                                                        Draft
                                                    </span>
                                                )}
                                            </td>
                                            <td className="p-6 text-gray-300">{template.downloads_count}</td>
                                            <td className="p-6 text-gray-300">{template.likes_count}</td>
                                            <td className="p-6 text-gray-400 text-sm">
                                                {template.published_at
                                                    ? new Date(template.published_at * 1000).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })
                                                    : '-'
                                                }
                                            </td>
                                            <td className="p-6 text-right">
                                                <Link href={`/admin/templates/${template.id}`} className="text-purple-400 hover:text-purple-300 transition-colors font-medium">
                                                    View/Edit
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

function TemplatesLoading() {
    return (
        <div className="min-h-screen bg-black flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
        </div>
    );
}

export default function TemplatesPage() {
    return (
        <Suspense fallback={<TemplatesLoading />}>
            <TemplatesList />
        </Suspense>
    );
}
