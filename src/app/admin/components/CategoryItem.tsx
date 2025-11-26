'use client';

import { useState } from 'react';

interface CategoryItemProps {
    category: {
        id: string;
        name: string;
        slug: string;
    };
    onEdit: (id: string, name: string) => Promise<void>;
    onDelete: (id: string) => Promise<void>;
}

export function CategoryItem({ category, onEdit, onDelete }: CategoryItemProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [editName, setEditName] = useState(category.name);
    const [isLoading, setIsLoading] = useState(false);

    const handleSave = async () => {
        if (!editName.trim() || editName === category.name) {
            setIsEditing(false);
            return;
        }

        setIsLoading(true);
        try {
            await onEdit(category.id, editName);
            setIsEditing(false);
        } catch (error) {
            console.error('Failed to update category:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleCancel = () => {
        setEditName(category.name);
        setIsEditing(false);
    };

    const handleDelete = async () => {
        if (!confirm(`Are you sure you want to delete "${category.name}"?`)) {
            return;
        }

        setIsLoading(true);
        try {
            await onDelete(category.id);
        } catch (error) {
            console.error('Failed to delete category:', error);
            setIsLoading(false);
        }
    };

    return (
        <div className="p-6 flex items-center justify-between hover:bg-white/5 transition-colors">
            {isEditing ? (
                <div className="flex-1 flex items-center gap-4">
                    <input
                        type="text"
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        className="flex-1 px-4 py-2 bg-black border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
                        disabled={isLoading}
                        autoFocus
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') handleSave();
                            if (e.key === 'Escape') handleCancel();
                        }}
                    />
                    <button
                        onClick={handleSave}
                        disabled={isLoading}
                        className="px-4 py-2 bg-purple-500 text-white rounded-xl font-medium hover:bg-purple-600 transition-colors disabled:opacity-50"
                    >
                        Save
                    </button>
                    <button
                        onClick={handleCancel}
                        disabled={isLoading}
                        className="px-4 py-2 bg-zinc-800 text-white rounded-xl font-medium hover:bg-zinc-700 transition-colors disabled:opacity-50"
                    >
                        Cancel
                    </button>
                </div>
            ) : (
                <>
                    <div>
                        <h3 className="text-lg font-semibold text-white">{category.name}</h3>
                        <p className="text-sm text-gray-400">Slug: {category.slug}</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setIsEditing(true)}
                            disabled={isLoading}
                            className="px-4 py-2 bg-purple-500/10 text-purple-400 border border-purple-500/20 rounded-xl font-medium hover:bg-purple-500/20 transition-colors disabled:opacity-50"
                        >
                            Edit
                        </button>
                        <button
                            onClick={handleDelete}
                            disabled={isLoading}
                            className="px-4 py-2 bg-red-500/10 text-red-400 border border-red-500/20 rounded-xl font-medium hover:bg-red-500/20 transition-colors disabled:opacity-50"
                        >
                            Delete
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}
