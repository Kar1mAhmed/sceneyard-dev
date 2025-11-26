'use client';

import { useEffect, useState } from 'react';
import { FileReplacement } from './FileReplacement';
import { useRouter } from 'next/navigation';

interface TemplateMediaViewerProps {
    templateId: string;
    previewR2Key?: string;
    thumbnailR2Key?: string;
    downloadR2Key?: string;
    title: string;
}

export function TemplateMediaViewer({ templateId, previewR2Key, thumbnailR2Key, downloadR2Key, title }: TemplateMediaViewerProps) {
    const router = useRouter();
    const [videoUrl, setVideoUrl] = useState<string | null>(null);
    const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
    const [isLoadingVideo, setIsLoadingVideo] = useState(true);
    const [isLoadingDownload, setIsLoadingDownload] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleRefresh = () => {
        router.refresh();
        // Reload video URL
        if (previewR2Key) {
            setIsLoadingVideo(true);
            setVideoUrl(null);
        }
    };

    useEffect(() => {
        if (!previewR2Key) {
            setIsLoadingVideo(false);
            return;
        }

        // Fetch the public URL for the high-quality preview video
        const fetchVideoUrl = async () => {
            try {
                const response = await fetch(`/api/r2/public-url?r2_key=${encodeURIComponent(previewR2Key)}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch video URL');
                }
                const data = await response.json() as { url: string };
                setVideoUrl(data.url);
                setIsLoadingVideo(false);
            } catch (err) {
                console.error('Error fetching video URL:', err);
                setError('Failed to load video');
                setIsLoadingVideo(false);
            }
        };

        fetchVideoUrl();
    }, [previewR2Key]);

    const handleDownload = async () => {
        if (!downloadR2Key) return;

        setIsLoadingDownload(true);
        try {
            // First get the download URL
            const response = await fetch('/api/r2/download-url', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ r2_key: downloadR2Key })
            });

            if (!response.ok) {
                throw new Error('Failed to get download URL');
            }

            const data = await response.json() as { url: string };

            // Open the download URL in a new window
            window.open(data.url, '_blank');
            setIsLoadingDownload(false);
        } catch (err) {
            console.error('Error downloading file:', err);
            setError('Failed to download file');
            setIsLoadingDownload(false);
        }
    };

    return (
        <div className="bg-zinc-900 rounded-3xl border border-white/5 p-8 space-y-6">
            <h2 className="text-xl font-bold text-white">Preview & Download</h2>

            {/* Video Preview */}
            <div>
                <label className="block text-sm font-medium text-gray-300 mb-3">
                    High-Quality Preview Video
                </label>
                {isLoadingVideo ? (
                    <div className="w-full aspect-video bg-zinc-800 rounded-xl flex items-center justify-center">
                        <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                ) : error ? (
                    <div className="w-full aspect-video bg-zinc-800 rounded-xl flex items-center justify-center">
                        <p className="text-red-400">{error}</p>
                    </div>
                ) : videoUrl ? (
                    <video
                        src={videoUrl}
                        controls
                        className="w-full aspect-video bg-black rounded-xl"
                        preload="metadata"
                    >
                        Your browser does not support the video tag.
                    </video>
                ) : (
                    <div className="w-full aspect-video bg-zinc-800 rounded-xl flex items-center justify-center">
                        <svg className="w-16 h-16 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                    </div>
                )}

                {/* Replace Video Button */}
                {previewR2Key && thumbnailR2Key && (
                    <div className="mt-4">
                        <FileReplacement
                            templateId={templateId}
                            fileType="preview"
                            existingR2Key={previewR2Key}
                            existingThumbnailR2Key={thumbnailR2Key}
                            onSuccess={handleRefresh}
                        />
                    </div>
                )}
            </div>

            {/* Download Section */}
            {downloadR2Key && (
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-3">
                        Template Download File
                    </label>
                    <div className="flex items-center gap-4 p-4 bg-zinc-800 rounded-xl">
                        <div className="flex-1">
                            <p className="text-white font-medium">{title}.zip</p>
                            <p className="text-sm text-gray-400">After Effects Project File</p>
                        </div>
                        <button
                            onClick={handleDownload}
                            disabled={isLoadingDownload}
                            className="px-6 py-3 bg-purple-500 text-white rounded-xl font-bold hover:bg-purple-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                        >
                            {isLoadingDownload ? (
                                <>
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    Preparing...
                                </>
                            ) : (
                                <>
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                    </svg>
                                    Download
                                </>
                            )}
                        </button>
                    </div>

                    {/* Replace Download File Button */}
                    <div className="mt-4">
                        <FileReplacement
                            templateId={templateId}
                            fileType="download"
                            existingR2Key={downloadR2Key}
                            onSuccess={handleRefresh}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}
