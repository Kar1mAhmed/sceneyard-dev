'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { TemplateWithAssets } from '@/features/templates/types';
import { TemplateMediaViewer } from './TemplateMediaViewer';
import TagInput from '@/src/components/ui/TagInput';
import { updateTemplateAction, deleteTemplateAction } from '../templates/actions';
import { useToast } from '@/src/components/layout/ToastProvider';
import Loading from '@/src/components/ui/Loading';

interface Category {
    id: string;
    name: string;
    slug: string;
}

interface EditTemplateFormProps {
    template: TemplateWithAssets;
    categories: Category[];
}

export function EditTemplateForm({ template, categories }: EditTemplateFormProps) {
    const router = useRouter();
    const { showToast } = useToast();
    const [saving, setSaving] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [tags, setTags] = useState<string[]>(
        template.tags_text ? template.tags_text.split(',').map(t => t.trim()).filter(Boolean) : []
    );
    const [selectedCategories, setSelectedCategories] = useState<string[]>(
        template.categories?.map(c => c.id) || []
    );

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setSaving(true);
        try {
            const formData = new FormData(e.currentTarget);
            // Append tags and categories to formData
            formData.set('tags_text', tags.join(', '));
            // Clear existing categories from formData to avoid duplicates if any
            formData.delete('categories');
            selectedCategories.forEach(catId => formData.append('categories', catId));

            await updateTemplateAction(template.id, formData);
            showToast('Template updated successfully!', 'success');
            router.refresh(); // Refresh server components
        } catch (error) {
            console.error('Failed to update template:', error);
            showToast('Failed to update template', 'error');
        } finally {
            setSaving(false);
        }
    }

    async function handleDelete() {
        setDeleting(true);
        try {
            await deleteTemplateAction(template.id);
            // deleteTemplateAction calls redirect(), which throws a NEXT_REDIRECT error
            // This is expected Next.js behavior - don't catch it, let it propagate
        } catch (error) {
            // Check if this is a Next.js redirect (expected behavior)
            if (error && typeof error === 'object' && 'digest' in error) {
                // This is a Next.js redirect, let it propagate
                throw error;
            }
            // Only handle actual errors
            console.error('Failed to delete template:', error);
            showToast(error instanceof Error ? error.message : 'Failed to delete template', 'error');
            setDeleting(false);
            setShowDeleteModal(false);
        }
    }

    return (
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
                    <button
                        onClick={() => setShowDeleteModal(true)}
                        className="px-4 py-2 bg-red-500/10 text-red-400 border border-red-500/20 rounded-xl font-medium hover:bg-red-500/20 transition-colors"
                    >
                        Delete Template
                    </button>
                </div>
            </div>

            {/* Media Viewer */}
            <TemplateMediaViewer
                templateId={template.id}
                previewR2Key={template.preview_asset?.r2_key}
                thumbnailR2Key={template.preview_thumbnail?.r2_key}
                downloadR2Key={template.file_asset?.r2_key}
                title={template.title}
            />

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
                        <select
                            id="ae_version_min"
                            name="ae_version_min"
                            defaultValue={template.ae_version_min || ''}
                            className="w-full px-4 py-3 bg-black border border-white/10 rounded-xl text-white focus:outline-none focus:border-purple-500 transition-colors"
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
                                />
                                {category.name}
                            </label>
                        ))}
                    </div>
                    {categories.length === 0 && (
                        <p className="text-sm text-gray-500">No categories available.</p>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                        Tags
                    </label>
                    <TagInput value={tags} onChange={setTags} placeholder="Add tags (e.g., motion, intro, logo)" />
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
                    <div className="text-sm text-gray-400 space-y-1">
                        <p>Created: <span className="text-gray-300">{new Date(template.created_at * 1000).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</span></p>
                        <p>Updated: <span className="text-gray-300">{new Date(template.updated_at * 1000).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</span></p>
                    </div>
                    <div className="flex items-center gap-4">
                        <Link href="/admin/templates" className="px-6 py-3 bg-zinc-800 text-white rounded-xl font-medium hover:bg-zinc-700 transition-colors">
                            Cancel
                        </Link>
                        <button
                            type="submit"
                            disabled={saving}
                            className="px-6 py-3 bg-purple-500 text-white rounded-xl font-bold hover:bg-purple-600 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                        >
                            {saving ? (
                                <>
                                    <Loading size={20} />
                                    Saving...
                                </>
                            ) : 'Save Changes'}
                        </button>
                    </div>
                </div>
            </form>

            {/* Delete Confirmation Modal */}
            {showDeleteModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" style={{ left: 0, right: 0, margin: 'auto' }}>
                    <div className="bg-zinc-900 border border-white/10 rounded-3xl p-8 shadow-2xl" style={{ minWidth: '400px', maxWidth: '500px' }}>
                        <h3 className="text-2xl font-bold text-white mb-4">Delete Template?</h3>
                        <p className="text-gray-400 mb-8">
                            Are you sure you want to delete <span className="text-white font-medium">"{template.title}"</span>? This action cannot be undone.
                        </p>
                        <div className="flex items-center justify-end gap-4">
                            <button
                                onClick={() => setShowDeleteModal(false)}
                                disabled={deleting}
                                className="px-6 py-3 bg-zinc-800 text-white rounded-xl font-medium hover:bg-zinc-700 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDelete}
                                disabled={deleting}
                                className="px-6 py-3 bg-red-500 text-white rounded-xl font-bold hover:bg-red-600 transition-colors disabled:opacity-50 flex items-center gap-2"
                            >
                                {deleting ? (
                                    <>
                                        <Loading size={16} />
                                        Deleting...
                                    </>
                                ) : (
                                    'Delete'
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
