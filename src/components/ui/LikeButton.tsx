'use client';

import React, { useState, useTransition } from 'react';
import { Heart } from 'lucide-react';
import { useToast } from '@/src/components/layout/ToastProvider';

interface LikeButtonProps {
    templateId: string;
    initialLikes: number;
    isInitiallyLiked?: boolean;
    className?: string;
}

export function LikeButton({ templateId, initialLikes, isInitiallyLiked = false, className = '' }: LikeButtonProps) {
    const [isLiked, setIsLiked] = useState(isInitiallyLiked);
    const [likesCount, setLikesCount] = useState(initialLikes);
    const [isPending, startTransition] = useTransition();
    const { showToast } = useToast();

    const toggleLike = async (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        // Optimistic update
        const wasLiked = isLiked;
        setIsLiked(!wasLiked);
        setLikesCount(prev => wasLiked ? prev - 1 : prev + 1);

        startTransition(async () => {
            try {
                const response = await fetch('/api/likes', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ templateId })
                });

                if (!response.ok) {
                    // Revert optimistic update
                    setIsLiked(wasLiked);
                    setLikesCount(prev => wasLiked ? prev + 1 : prev - 1);

                    if (response.status === 401) {
                        showToast('Please sign in to save favorites', 'warning', 'Sign In Required');
                    } else {
                        showToast('Failed to update favorite', 'error');
                    }
                    return;
                }

                const data = await response.json() as { liked: boolean; likesCount: number };

                // Sync with server state
                setIsLiked(data.liked);
                setLikesCount(data.likesCount);

                showToast(
                    data.liked ? 'Added to favorites' : 'Removed from favorites',
                    data.liked ? 'success' : 'info',
                    data.liked ? 'Saved!' : 'Removed'
                );
            } catch {
                // Revert optimistic update
                setIsLiked(wasLiked);
                setLikesCount(prev => wasLiked ? prev + 1 : prev - 1);
                showToast('Something went wrong', 'error');
            }
        });
    };

    return (
        <button
            onClick={toggleLike}
            disabled={isPending}
            className={`flex items-center gap-2 px-4 py-1.5 rounded-full transition-all duration-300 text-white backdrop-blur-md shadow-lg hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed ${isLiked ? 'bg-[#D77BFF]' : 'bg-[#37383E]'
                } ${className}`}
            style={{
                boxShadow: isLiked
                    ? '0 4px 15px rgba(215, 123, 255, 0.4)'
                    : '0 4px 15px rgba(0, 0, 0, 0.2)'
            }}
        >
            <Heart
                size={16}
                fill={isLiked ? "white" : "none"}
                strokeWidth={2.5}
                className={`text-white ${isPending ? 'animate-pulse' : ''}`}
            />
            <span className="text-[16px] font-medium leading-[1.2]">
                {likesCount}
            </span>
        </button>
    );
}

