'use client';

import { useState } from 'react';
import { Button } from '@/src/components/ui/Button';
import { useSession } from 'next-auth/react';
import { useToast } from '@/src/components/layout/ToastProvider';
import Loading from '@/src/components/ui/Loading';

interface DownloadTemplateButtonProps {
    templateId: string;
    templateTitle: string;
    className?: string;
}

export default function DownloadTemplateButton({
    templateId,
    templateTitle,
    className = ''
}: DownloadTemplateButtonProps) {
    const { data: session } = useSession();
    const { showToast } = useToast();
    const [isDownloading, setIsDownloading] = useState(false);

    const handleDownload = async () => {
        if (!session?.user) {
            showToast('Please sign in to download templates', 'error');
            return;
        }

        setIsDownloading(true);

        try {
            const response = await fetch('/api/downloads', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ templateId }),
            });

            const data = await response.json() as {
                success?: boolean;
                downloadUrl?: string;
                error?: string;
            };

            if (!response.ok || !data.success) {
                showToast(data.error || 'Download failed', 'error');
                return;
            }

            // Start the actual download
            const link = document.createElement('a');
            link.href = data.downloadUrl || '';
            link.download = `${templateTitle}.zip`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            showToast('Download started!', 'success');

        } catch (error) {
            console.error('Download error:', error);
            showToast('Download failed. Please try again.', 'error');
        } finally {
            setIsDownloading(false);
        }
    };

    return (
        <Button
            variant="primary"
            onClick={handleDownload}
            disabled={isDownloading}
            className={`min-w-[320px] transition-transform hover:scale-105 active:scale-95 ${className}`}
            style={{
                fontFamily: 'var(--font-geist-mono), monospace',
                fontWeight: 500,
                fontSize: '16px',
                lineHeight: '100%'
            }}
        >
            <div className="w-7 h-7 flex items-center justify-center">
                {isDownloading ? (
                    <Loading size={24} showShadow={false} />
                ) : (
                    <img src="/custom-icons/download.svg" alt="" className="w-full h-full transition-all group-active:brightness-0 group-active:invert" />
                )}
            </div>
            {isDownloading ? 'Downloading...' : 'Download scene'}
        </Button>
    );
}
