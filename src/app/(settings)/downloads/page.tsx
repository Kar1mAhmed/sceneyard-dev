'use client';

import { useEffect, useState } from 'react';
import DownloadEmptyState from '@/src/components/settings/DownloadEmptyState';
import DownloadRow from '@/src/components/settings/DownloadRow';
import Loading from '@/src/components/ui/Loading';

interface Download {
    id: string;
    templateId: string;
    title: string;
    aspectRatio: string;
    thumbnailUrl: string | null;
    downloadDate: string;
    fileUrl?: string;
}

export default function DownloadsPage() {
    const [downloads, setDownloads] = useState<Download[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchDownloads() {
            try {
                const response = await fetch('/api/downloads');
                const data = await response.json() as { downloads?: Download[] };

                if (data.downloads) {
                    setDownloads(data.downloads);
                }
            } catch (error) {
                console.error('Failed to fetch downloads:', error);
            } finally {
                setIsLoading(false);
            }
        }

        fetchDownloads();
    }, []);

    if (isLoading) {
        return (
            <div className="w-full py-24 flex items-center justify-center">
                <Loading text="Loading Downloads" size={90} />
            </div>
        );
    }

    if (downloads.length === 0) {
        return <DownloadEmptyState />;
    }

    return (
        <div
            className="w-full rounded-2xl p-6"
            style={{ background: 'var(--Dark-3, #131316)' }}
        >
            {/* Table Header */}
            <div className="flex items-center justify-between pb-4 mb-2">
                <span
                    className="text-white text-base md:text-lg font-medium"
                    style={{ fontFamily: 'var(--font-poppins), sans-serif' }}
                >
                    Details
                </span>
                <span
                    className="text-white text-base md:text-lg font-medium"
                    style={{ fontFamily: 'var(--font-poppins), sans-serif' }}
                >
                    Download date
                </span>
            </div>

            {/* Header Line */}
            <div
                className="w-full h-[1px] mb-2"
                style={{ background: 'var(--color-grid-line)' }}
            />

            {/* Download Rows */}
            <div className="flex flex-col">
                {downloads.map((download) => (
                    <DownloadRow
                        key={download.id}
                        template={{
                            id: download.templateId,
                            title: download.title,
                            thumbnailUrl: download.thumbnailUrl || '/placeholder-thumbnail.jpg',
                            aspectRatio: download.aspectRatio,
                            downloadDate: download.downloadDate,
                        }}
                    />
                ))}
            </div>
        </div>
    );
}
