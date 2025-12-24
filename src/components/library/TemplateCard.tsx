'use client';

import React, { useState, useRef } from 'react';
import { Heart, ArrowDownToLine, CreditCard, Play } from 'lucide-react';
import { getPublicR2Url } from '@/lib/r2';

interface TemplateCardProps {
    template: {
        id: string;
        title: string;
        thumbnail_r2_key?: string;
        orientation: 'horizontal' | 'vertical';
        likes_count: number;
        downloads_count: number;
        credits_cost: number;
    };
}

export default function TemplateCard({ template }: TemplateCardProps) {
    const [isHovered, setIsHovered] = useState(false);
    const [isLiked, setIsLiked] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);

    const handleMouseEnter = () => {
        setIsHovered(true);
        if (videoRef.current) {
            videoRef.current.play().catch(err => console.error('Video play error:', err));
        }
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        if (videoRef.current) {
            videoRef.current.pause();
            videoRef.current.currentTime = 0;
        }
    };

    const toggleLike = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsLiked(!isLiked);
    };

    const thumbnailUrl = template.thumbnail_r2_key
        ? getPublicR2Url(template.thumbnail_r2_key)
        : null;

    return (
        <div
            className={`relative rounded-[24px] overflow-hidden group cursor-pointer bg-dark-08 transition-all duration-500 ${template.orientation === 'vertical' ? 'row-span-2' : 'row-span-1'
                }`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{
                // Horizontal: 387/288 ≈ 1.34375
                // Vertical: 387/591 ≈ 0.6548
                aspectRatio: template.orientation === 'vertical' ? '387/591' : '387/288',
            }}
        >
            {/* Media Content */}
            <div className="absolute inset-0 z-0">
                {thumbnailUrl ? (
                    <>
                        {/* Video for hover */}
                        <video
                            ref={videoRef}
                            src={thumbnailUrl}
                            className={`w-full h-full object-cover transition-opacity duration-700 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
                            muted
                            loop
                            playsInline
                            preload="auto"
                        />
                        {/* Static first frame (paused video) */}
                        <video
                            src={`${thumbnailUrl}#t=0.001`}
                            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${isHovered ? 'opacity-0' : 'opacity-100'}`}
                            muted
                            playsInline
                            preload="auto"
                        />
                    </>
                ) : (
                    <div className="w-full h-full bg-zinc-900 flex items-center justify-center">
                        <Play size={40} className="text-white/10" />
                    </div>
                )}
            </div>

            {/* Hover Overlay */}
            <div
                className={`absolute inset-0 z-10 flex flex-col justify-between p-4 transition-all duration-500 bg-gradient-to-b from-black/50 via-transparent to-black/70 ${isHovered ? 'opacity-100' : 'opacity-0'
                    }`}
            >
                {/* Top Section */}
                <div className="flex justify-between items-start">
                    <h3 className="text-white font-medium text-[16px] leading-[1.2] max-w-[65%] drop-shadow-lg line-clamp-2 uppercase">
                        {template.title}
                    </h3>

                    <button
                        onClick={toggleLike}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-full transition-all duration-300 bg-[#D77BFF] text-white backdrop-blur-md shadow-lg hover:scale-105 active:scale-95`}
                        style={{
                            boxShadow: '0 4px 15px rgba(215, 123, 255, 0.4)'
                        }}
                    >
                        <Heart
                            size={16}
                            fill={isLiked ? "white" : "none"}
                            strokeWidth={2.5}
                            className="text-white"
                        />
                        <span className="text-[16px] font-medium leading-[1.2]">
                            {template.likes_count + (isLiked ? 1 : 0)}
                        </span>
                    </button>
                </div>

                {/* Bottom Section */}
                <div className="flex justify-between items-center text-white drop-shadow-lg">
                    <div className="flex items-center gap-2.5 group/info">
                        <div className="w-8 h-8 flex items-center justify-center rounded-full bg-white text-dark-08 shadow-xl transition-transform duration-300 group-hover/info:scale-110">
                            <ArrowDownToLine size={16} strokeWidth={3} />
                        </div>
                        <span className="text-[16px] font-medium leading-[1.2] whitespace-nowrap">{template.downloads_count} Downloads</span>
                    </div>

                    <div className="flex items-center gap-2.5 group/info">
                        <span className="text-[16px] font-medium leading-[1.2]">{template.credits_cost}</span>
                        <div className="w-8 h-8 flex items-center justify-center rounded-full bg-white text-dark-08 shadow-xl transition-transform duration-300 group-hover/info:scale-110">
                            <CreditCard size={16} strokeWidth={3} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
