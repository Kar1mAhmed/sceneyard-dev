'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { VideoThumbnail } from './VideoThumbnail';

interface Category {
    id: string;
    name: string;
}

interface Template {
    id: string;
    title: string;
    description: string;
    credits_cost: number;
    published_at: number | null;
    downloads_count: number;
    likes_count: number;
    thumbnail_r2_key?: string;
    orientation: 'horizontal' | 'vertical';
    categories?: Category[];
}

interface TemplatesTableProps {
    initialTemplates: Template[];
    categories: Category[];
}

type SortOption = 'recent' | 'likes' | 'downloads' | 'title';
type StatusFilter = 'all' | 'published' | 'drafts';
type OrientationFilter = 'all' | 'horizontal' | 'vertical';

export function TemplatesTable({ initialTemplates, categories }: TemplatesTableProps) {
    const [sortBy, setSortBy] = useState<SortOption>('recent');
    const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
    const [categoryFilter, setCategoryFilter] = useState<string>('all');
    const [orientationFilter, setOrientationFilter] = useState<OrientationFilter>('all');
    const [searchQuery, setSearchQuery] = useState('');

    // Filter and sort templates
    const filteredAndSortedTemplates = useMemo(() => {
        let filtered = [...initialTemplates];

        // Apply status filter
        if (statusFilter === 'published') {
            filtered = filtered.filter(t => t.published_at !== null);
        } else if (statusFilter === 'drafts') {
            filtered = filtered.filter(t => t.published_at === null);
        }

        // Apply category filter
        if (categoryFilter !== 'all') {
            filtered = filtered.filter(t =>
                t.categories?.some(c => c.id === categoryFilter)
            );
        }

        // Apply orientation filter
        if (orientationFilter !== 'all') {
            filtered = filtered.filter(t => t.orientation === orientationFilter);
        }

        // Apply search filter
        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase();
            filtered = filtered.filter(t =>
                t.title.toLowerCase().includes(query) ||
                t.description?.toLowerCase().includes(query)
            );
        }

        // Apply sorting
        filtered.sort((a, b) => {
            switch (sortBy) {
                case 'likes':
                    return b.likes_count - a.likes_count || b.id.localeCompare(a.id);
                case 'downloads':
                    return b.downloads_count - a.downloads_count || b.id.localeCompare(a.id);
                case 'title':
                    return a.title.localeCompare(b.title);
                case 'recent':
                default:
                    return b.id.localeCompare(a.id);
            }
        });

        return filtered;
    }, [initialTemplates, statusFilter, categoryFilter, orientationFilter, searchQuery, sortBy]);

    return (
        <>
            {/* Search and Filters */}
            <div className="bg-zinc-900 rounded-3xl border border-white/5 p-6 space-y-4">
                {/* Search */}
                <div className="relative">
                    <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <input
                        type="text"
                        placeholder="Search templates by title or description..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 bg-black border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
                    />
                </div>

                {/* Filters and Sort */}
                <div className="flex items-center justify-between gap-4 flex-wrap">
                    {/* Status Filter */}
                    <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-400">Status:</span>
                        <button
                            onClick={() => setStatusFilter('all')}
                            className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${statusFilter === 'all'
                                ? 'bg-purple-500 text-white'
                                : 'bg-black text-gray-400 hover:text-white border border-white/10'
                                }`}
                        >
                            All
                        </button>
                        <button
                            onClick={() => setStatusFilter('published')}
                            className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${statusFilter === 'published'
                                ? 'bg-purple-500 text-white'
                                : 'bg-black text-gray-400 hover:text-white border border-white/10'
                                }`}
                        >
                            Published
                        </button>
                        <button
                            onClick={() => setStatusFilter('drafts')}
                            className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${statusFilter === 'drafts'
                                ? 'bg-purple-500 text-white'
                                : 'bg-black text-gray-400 hover:text-white border border-white/10'
                                }`}
                        >
                            Drafts
                        </button>
                    </div>

                    {/* Category Filter */}
                    {categories.length > 0 && (
                        <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-400">Category:</span>
                            <select
                                value={categoryFilter}
                                onChange={(e) => setCategoryFilter(e.target.value)}
                                className="px-4 py-2 bg-black border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-purple-500 transition-colors"
                            >
                                <option value="all">All Categories</option>
                                {categories.map(cat => (
                                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                                ))}
                            </select>
                        </div>
                    )}

                    {/* Orientation Filter */}
                    <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-400">Orientation:</span>
                        <button
                            onClick={() => setOrientationFilter('all')}
                            className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${orientationFilter === 'all'
                                ? 'bg-purple-500 text-white'
                                : 'bg-black text-gray-400 hover:text-white border border-white/10'
                                }`}
                        >
                            All
                        </button>
                        <button
                            onClick={() => setOrientationFilter('horizontal')}
                            className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${orientationFilter === 'horizontal'
                                ? 'bg-purple-500 text-white'
                                : 'bg-black text-gray-400 hover:text-white border border-white/10'
                                }`}
                        >
                            Horizontal
                        </button>
                        <button
                            onClick={() => setOrientationFilter('vertical')}
                            className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${orientationFilter === 'vertical'
                                ? 'bg-purple-500 text-white'
                                : 'bg-black text-gray-400 hover:text-white border border-white/10'
                                }`}
                        >
                            Vertical
                        </button>
                    </div>

                    {/* Sort Controls */}
                    <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-400">Sort:</span>
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

                {/* Results count */}
                <div className="text-sm text-gray-400">
                    Showing {filteredAndSortedTemplates.length} of {initialTemplates.length} templates
                </div>
            </div>

            {/* Templates Table */}
            <div className="bg-zinc-900 rounded-3xl border border-white/5 overflow-hidden">

                {filteredAndSortedTemplates.length === 0 ? (
                    <div className="p-12 text-center">
                        <p className="text-gray-400 text-lg">
                            {initialTemplates.length === 0
                                ? 'No templates yet. Create your first one!'
                                : 'No templates match your filters.'
                            }
                        </p>
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
                                {filteredAndSortedTemplates.map((template) => (
                                    <tr key={template.id} className="group hover:bg-white/5 transition-colors">
                                        <td className="p-6">
                                            {template.thumbnail_r2_key ? (
                                                <VideoThumbnail
                                                    videoUrl={`https://media.sceneyard.com/${template.thumbnail_r2_key}`}
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
        </>
    );
}
