'use client';

import { useState } from 'react';
import Link from 'next/link';
import { VideoThumbnail } from './VideoThumbnail';

interface Template {
    id: string;
    title: string;
    description: string;
    credits_cost: number;
    published_at: number | null;
    downloads_count: number;
    likes_count: number;
    thumbnail_r2_key?: string;
}

interface TemplatesTableProps {
    initialTemplates: Template[];
}

type SortOption = 'recent' | 'likes' | 'downloads' | 'title';

export function TemplatesTable({ initialTemplates }: TemplatesTableProps) {
    const [sortBy, setSortBy] = useState<SortOption>('recent');

    const sortedTemplates = [...initialTemplates].sort((a, b) => {
        switch (sortBy) {
            case 'likes':
                return b.likes_count - a.likes_count || b.id.localeCompare(a.id);
            case 'downloads':
                return b.downloads_count - a.downloads_count || b.id.localeCompare(a.id);
            case 'title':
                return a.title.localeCompare(b.title);
            case 'recent':
            default:
                return b.id.localeCompare(a.id); // Assuming newer IDs are greater
        }
    });

    return (
        <div className="bg-zinc-900 rounded-3xl border border-white/5 overflow-hidden">
            {/* Sort Controls */}
            <div className="p-6 border-b border-white/5 flex items-center justify-between">
                <p className="text-sm text-gray-400">
                    {initialTemplates.length} template{initialTemplates.length !== 1 ? 's' : ''}
                </p>
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => setSortBy('recent')}
                        className={`px-4 py-2 rounded-xl font-medium transition-all flex items-center gap-2 ${sortBy === 'recent'
                                ? 'bg-purple-500 text-white shadow-lg shadow-purple-500/20'
                                : 'bg-black/50 text-gray-400 hover:text-white hover:bg-black/70 border border-white/10'
                            }`}
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Recent
                    </button>
                    <button
                        onClick={() => setSortBy('likes')}
                        className={`px-4 py-2 rounded-xl font-medium transition-all flex items-center gap-2 ${sortBy === 'likes'
                                ? 'bg-purple-500 text-white shadow-lg shadow-purple-500/20'
                                : 'bg-black/50 text-gray-400 hover:text-white hover:bg-black/70 border border-white/10'
                            }`}
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                        Likes
                    </button>
                    <button
                        onClick={() => setSortBy('downloads')}
                        className={`px-4 py-2 rounded-xl font-medium transition-all flex items-center gap-2 ${sortBy === 'downloads'
                                ? 'bg-purple-500 text-white shadow-lg shadow-purple-500/20'
                                : 'bg-black/50 text-gray-400 hover:text-white hover:bg-black/70 border border-white/10'
                            }`}
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                        Downloads
                    </button>
                    <button
                        onClick={() => setSortBy('title')}
                        className={`px-4 py-2 rounded-xl font-medium transition-all flex items-center gap-2 ${sortBy === 'title'
                                ? 'bg-purple-500 text-white shadow-lg shadow-purple-500/20'
                                : 'bg-black/50 text-gray-400 hover:text-white hover:bg-black/70 border border-white/10'
                            }`}
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
                        </svg>
                        A-Z
                    </button>
                </div>
            </div>

            {initialTemplates.length === 0 ? (
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
                            {sortedTemplates.map((template) => (
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
    );
}
