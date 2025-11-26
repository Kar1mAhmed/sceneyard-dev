'use client';

import { useEffect, useRef, useState } from 'react';

interface VideoThumbnailProps {
    r2Key: string;
    title: string;
}

export function VideoThumbnail({ r2Key, title }: VideoThumbnailProps) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [videoUrl, setVideoUrl] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        // Fetch the public URL for the video thumbnail
        const fetchVideoUrl = async () => {
            try {
                const response = await fetch(`/api/r2/public-url?r2_key=${encodeURIComponent(r2Key)}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch video URL');
                }
                const data = await response.json() as { url: string };
                setVideoUrl(data.url);
                setIsLoading(false);
            } catch (err) {
                console.error('Error fetching video URL:', err);
                setError(true);
                setIsLoading(false);
            }
        };

        fetchVideoUrl();
    }, [r2Key]);

    const handleMouseEnter = () => {
        if (videoRef.current && videoUrl) {
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

    if (isLoading) {
        return (
            <div className="w-32 h-20 bg-zinc-800 rounded-lg flex items-center justify-center">
                <div className="w-4 h-4 border-2 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (error || !videoUrl) {
        return (
            <div className="w-32 h-20 bg-zinc-800 rounded-lg flex items-center justify-center">
                <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
            </div>
        );
    }

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
