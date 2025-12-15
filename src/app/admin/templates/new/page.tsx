'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { uploadTemplateAssets } from '@/lib/r2-upload';
import TagInput from '@/src/components/TagInput';

interface Category {
    id: string;
    name: string;
    slug: string;
}

import { useToast } from '@/src/components/ToastProvider';

// ... imports

export default function NewTemplatePage() {
    const router = useRouter();
    const { showToast } = useToast();
    const [uploading, setUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState({ stage: '', progress: 0 });
    const [categories, setCategories] = useState<Category[]>([]);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

    // Fetch categories on mount
    useEffect(() => {
        fetch('/api/categories')
            .then(res => res.json())
            .then((data: unknown) => {
                const typedData = data as { categories: Category[] };
                setCategories(typedData.categories || []);
            })
            .catch(console.error);
    }, []);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setUploading(true);

        try {
            const formData = new FormData(e.currentTarget);

            const title = formData.get('title') as string;
            const description = formData.get('description') as string;
            const credits_cost = parseInt(formData.get('credits_cost') as string);
            const orientation = formData.get('orientation') as 'horizontal' | 'vertical';
            const ae_version_min = formData.get('ae_version_min') as string;
            const previewVideo = formData.get('preview_video') as File;
            const downloadFile = formData.get('download_file') as File;

            if (!previewVideo || !downloadFile) {
                showToast('Please select both preview video and download file', 'error');
                setUploading(false);
                return;
            }

            // ... upload logic ...

            showToast("Template created successfully!", "success");
            router.push('/admin/templates');

        } catch (err: any) {
            console.error(err);
            showToast(err.message || 'Upload failed', 'error');
            setUploading(false);
        }
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
                    <h1 className="text-4xl font-bold text-white">Add New Template</h1>
                </div>

                {/* Error Message */}
                {error && (
                    <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 text-red-400">
                        {error}
                    </div>
                )}

                {/* Upload Progress */}
                {uploading && (
                    <div className="bg-purple-500/10 border border-purple-500/20 rounded-xl p-6">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-purple-300">{uploadProgress.stage}</span>
                            <span className="text-purple-400 font-bold">{uploadProgress.progress.toFixed(0)}%</span>
                        </div>
                        <div className="w-full bg-black rounded-full h-2">
                            <div
                                className="bg-purple-500 h-2 rounded-full transition-all duration-300"
                                style={{ width: `${uploadProgress.progress}%` }}
                            />
                        </div>
                    </div>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit} className="bg-zinc-900 rounded-3xl border border-white/5 p-8 space-y-6">
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-2">
                            Title *
                        </label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            required
                            disabled={uploading}
                            className="w-full px-4 py-3 bg-black border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors disabled:opacity-50"
                            placeholder="Enter template title"
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
                            disabled={uploading}
                            className="w-full px-4 py-3 bg-black border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors disabled:opacity-50"
                            placeholder="Enter template description"
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
                                defaultValue="1"
                                disabled={uploading}
                                className="w-full px-4 py-3 bg-black border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors disabled:opacity-50"
                            />
                        </div>

                        <div>
                            <label htmlFor="orientation" className="block text-sm font-medium text-gray-300 mb-2">
                                Orientation *
                            </label>
                            <select
                                id="orientation"
                                name="orientation"
                                required
                                disabled={uploading}
                                className="w-full px-4 py-3 bg-black border border-white/10 rounded-xl text-white focus:outline-none focus:border-purple-500 transition-colors disabled:opacity-50"
                            >
                                <option value="horizontal">Horizontal (16:9)</option>
                                <option value="vertical">Vertical (9:16)</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label htmlFor="ae_version_min" className="block text-sm font-medium text-gray-300 mb-2">
                            Min AE Version
                        </label>
                        <select
                            id="ae_version_min"
                            name="ae_version_min"
                            disabled={uploading}
                            className="w-full px-4 py-3 bg-black border border-white/10 rounded-xl text-white focus:outline-none focus:border-purple-500 transition-colors disabled:opacity-50"
                        >
                            <option value="">Any Version</option>
                            <option value="2024">2024</option>
                            <option value="2023">2023</option>
                            <option value="2022">2022</option>
                            <option value="2021">2021</option>
                            <option value="2020">2020</option>
                            <option value="CC 2019">CC 2019</option>
                            <option value="CC 2018">CC 2018</option>
                            <option value="CC 2017">CC 2017</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            Categories
                        </label>
                        <div className="flex flex-wrap gap-2">
                            {categories.map((category) => (
                                <label
                                    key={category.id}
                                    className={`px-4 py-2 rounded-xl border cursor-pointer transition-colors ${selectedCategories.includes(category.id)
                                        ? 'bg-purple-500/20 border-purple-500 text-purple-300'
                                        : 'bg-black border-white/10 text-gray-400 hover:border-purple-500/50'
                                        }`}
                                >
                                    <input
                                        type="checkbox"
                                        className="hidden"
                                        checked={selectedCategories.includes(category.id)}
                                        onChange={(e) => {
                                            if (e.target.checked) {
                                                setSelectedCategories([...selectedCategories, category.id]);
                                            } else {
                                                setSelectedCategories(selectedCategories.filter(id => id !== category.id));
                                            }
                                        }}
                                        disabled={uploading}
                                    />
                                    {category.name}
                                </label>
                            ))}
                        </div>
                        {categories.length === 0 && (
                            <p className="text-sm text-gray-500">No categories available. <Link href="/admin/categories" className="text-purple-400 hover:text-purple-300">Create one</Link></p>
                        )}
                    </div>

                    <div>
                        <label htmlFor="preview_video" className="block text-sm font-medium text-gray-300 mb-2">
                            Preview Video * (High Quality)
                        </label>
                        <input
                            type="file"
                            id="preview_video"
                            name="preview_video"
                            accept="video/*"
                            required
                            disabled={uploading}
                            className="w-full px-4 py-3 bg-black border border-white/10 rounded-xl text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-purple-500 file:text-white file:cursor-pointer hover:file:bg-purple-600 disabled:opacity-50"
                        />
                        <p className="text-xs text-gray-500 mt-1">A 480p thumbnail will be generated automatically</p>
                    </div>

                    <div>
                        <label htmlFor="download_file" className="block text-sm font-medium text-gray-300 mb-2">
                            Download File * (.zip)
                        </label>
                        <input
                            type="file"
                            id="download_file"
                            name="download_file"
                            accept=".zip"
                            required
                            disabled={uploading}
                            className="w-full px-4 py-3 bg-black border border-white/10 rounded-xl text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-purple-500 file:text-white file:cursor-pointer hover:file:bg-purple-600 disabled:opacity-50"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            Tags
                        </label>
                        <TagInput value={tags} onChange={setTags} placeholder="Add tags (e.g., motion, intro, logo)" />
                    </div>

                    <div className="flex justify-end gap-4 pt-4">
                        <Link href="/admin/templates" className={`px-6 py-3 bg-zinc-800 text-white rounded-xl font-medium hover:bg-zinc-700 transition-colors ${uploading ? 'pointer-events-none opacity-50' : ''}`}>
                            Cancel
                        </Link>
                        <button
                            type="submit"
                            disabled={uploading}
                            className="px-6 py-3 bg-purple-500 text-white rounded-xl font-bold hover:bg-purple-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {uploading ? 'Uploading...' : 'Create Template'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
