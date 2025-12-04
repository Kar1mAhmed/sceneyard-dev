'use client';

import { useRef } from 'react';

interface VideoThumbnailProps {
    videoUrl: string;
    title: string;
}

export function VideoThumbnail({ videoUrl, title }: VideoThumbnailProps) {
    const videoRef = useRef<HTMLVideoElement>(null);

    const handleMouseEnter = () => {
        if (videoRef.current) {
            videoRef.current.play().catch(err => {
                console.error('Error playing video:', err);
            });
        }
    };

    const handleMouseLeave = () => {
        if (videoRef.current) {
            videoRef.current.pause();
            videoRef.current.currentTime = 0;
        }
    };

    return (
        <div
            className="relative w-32 h-20 bg-black rounded-lg overflow-hidden cursor-pointer group"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <video
                ref={videoRef}
                src={videoUrl}
                className="w-full h-full object-cover"
                muted
                loop
                playsInline
                preload="metadata"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors flex items-center justify-center">
                <svg className="w-8 h-8 text-white/80 group-hover:opacity-0 transition-opacity" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                </svg>
            </div>
        </div>
    );
}
