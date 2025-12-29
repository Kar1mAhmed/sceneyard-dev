"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

interface FeaturedSectionProps {
    videos: {
        id: string;
        thumbnailUrl: string; // R2 Public URL for thumbnail/preview
        title: string;
    }[];
}

export default function FeaturedSection({ videos }: FeaturedSectionProps) {
    // If no videos, render nothing or a fallback. For now, we assume distinct videos will be passed.
    if (!videos || videos.length === 0) return null;

    // Duplicate videos to create infinite scroll effect
    // Ensure we have enough items to fill the screen width multiple times
    const repeatedVideos = Array(10).fill(videos).flat();

    return (
        <div className="relative w-full overflow-hidden bg-primary-95" >
            <div className="flex animate-marquee hover:[animation-play-state:paused]" style={{ width: "max-content" }}>
                {repeatedVideos.map((video, index) => (
                    <div
                        key={`${video.id}-${index}`}
                        className="relative w-[400px] h-[225px] flex-shrink-0 mx-4 overflow-hidden border border-white/10 group"
                    >
                        {/* 
                   Video Element 
                   - muted, loop, playsInline, autoPlay logic 
                   - src: The low-quality preview (thumbnail) which is actually a video? 
                */}
                        <video
                            src={video.thumbnailUrl}
                            className="w-full h-full object-cover transition-opacity"
                            autoPlay
                            muted
                            loop
                            playsInline
                        />
                        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <p className="text-white font-medium text-sm truncate">{video.title}</p>
                        </div>
                    </div>
                ))}
            </div>

            <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 100s linear infinite;
        }
      `}</style>
        </div>
    );
}
