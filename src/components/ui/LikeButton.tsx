'use client';

import React, { useState } from 'react';
import { Heart } from 'lucide-react';

interface LikeButtonProps {
    initialLikes: number;
    isInitiallyLiked?: boolean;
    className?: string;
}

export function LikeButton({ initialLikes, isInitiallyLiked = false, className = '' }: LikeButtonProps) {
    const [isLiked, setIsLiked] = useState(isInitiallyLiked);

    const toggleLike = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsLiked(!isLiked);
    };

    return (
        <button
            onClick={toggleLike}
            className={`flex items-center gap-2 px-4 py-1.5 rounded-full transition-all duration-300 text-white backdrop-blur-md shadow-lg hover:scale-105 active:scale-95 ${isLiked ? 'bg-[#D77BFF]' : 'bg-[#37383E]'
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
                className="text-white"
            />
            <span className="text-[16px] font-medium leading-[1.2]">
                {initialLikes + (isLiked ? 1 : 0)}
            </span>
        </button>
    );
}
