'use client';

import { useEffect, useState } from 'react';
import FavoriteEmptyState from '@/src/components/settings/FavoriteEmptyState';
import Loading from '@/src/components/ui/Loading';
import TemplateGrid from '@/src/components/library/TemplateGrid';

interface LikedTemplate {
    id: string;
    template_id: string;
    template_title: string;
    template_orientation: string;
    thumbnail_r2_key: string | null;
    credits_cost: number;
    likes_count: number;
    downloads_count: number;
    created_at: number;
}

export default function FavoritesPage() {
    const [likes, setLikes] = useState<LikedTemplate[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchLikes() {
            try {
                const response = await fetch('/api/likes?full=true');
                const data = await response.json() as { likes?: LikedTemplate[] };

                if (data.likes) {
                    setLikes(data.likes);
                }
            } catch (error) {
                console.error('Failed to fetch likes:', error);
            } finally {
                setIsLoading(false);
            }
        }

        fetchLikes();
    }, []);

    if (isLoading) {
        return (
            <div className="w-full py-24 flex items-center justify-center">
                <Loading text="Loading Favorites" size={90} />
            </div>
        );
    }

    if (likes.length === 0) {
        return <FavoriteEmptyState />;
    }

    // Map LikedTemplate to the Template interface expected by TemplateGrid
    const templates = likes.map(like => ({
        id: like.template_id,
        title: like.template_title,
        thumbnail_r2_key: like.thumbnail_r2_key || undefined,
        orientation: like.template_orientation as 'horizontal' | 'vertical',
        likes_count: like.likes_count,
        downloads_count: like.downloads_count,
        credits_cost: like.credits_cost
    }));

    return (
        <div className="w-full">
            {/* Simple label to show count, without the box background */}
            <div className="flex justify-between items-center mb-10 px-4 md:px-0">
                <h2
                    className="text-white text-2xl md:text-3xl font-medium"
                    style={{ fontFamily: 'var(--font-poppins), sans-serif', letterSpacing: '-0.02em' }}
                >
                    Your Favorites
                </h2>
                <div
                    className="px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-white/60 text-xs md:text-sm font-medium"
                    style={{ fontFamily: 'var(--font-geist-mono), monospace' }}
                >
                    {likes.length} {likes.length === 1 ? 'TEMPLATE' : 'TEMPLATES'}
                </div>
            </div>

            {/* Template Grid - Reduced heights for favorites view */}
            <div className="-mx-[calc(var(--grid-margin)+1.5%)]">
                <TemplateGrid
                    templates={templates}
                    likedTemplateIds={likes.map(l => l.template_id)}
                    rowHeight={{
                        mobile: '120px',
                        sm: '160px',
                        md: '190px'
                    }}
                />
            </div>
        </div>
    );
}
