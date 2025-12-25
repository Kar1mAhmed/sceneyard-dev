'use client';

import { useState, useRef } from 'react';
import { replaceTemplateFile } from '@/lib/r2-upload';
import { useToast } from '@/src/components/ToastProvider';
import Loading from '@/src/components/ui/Loading';

interface FileReplacementProps {
    templateId: string;
    fileType: 'preview' | 'download';
    existingR2Key: string;
    existingThumbnailR2Key?: string; // Required for preview
    onSuccess: () => void;
}

export function FileReplacement({
    templateId,
    fileType,
    existingR2Key,
    existingThumbnailR2Key,
    onSuccess
}: FileReplacementProps) {
    const [uploading, setUploading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [stage, setStage] = useState('');
    const fileInputRef = useRef<HTMLInputElement>(null);
    const { showToast } = useToast();

    const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Validate file type
        if (fileType === 'preview' && !file.type.startsWith('video/')) {
            showToast('Please select a video file', 'error');
            return;
        }
        if (fileType === 'download' && !file.name.endsWith('.zip')) {
            showToast('Please select a ZIP file', 'error');
            return;
        }

        setUploading(true);
        setProgress(0);

        try {
            await replaceTemplateFile(
                file,
                fileType,
                existingR2Key,
                existingThumbnailR2Key,
                (stageName, progressValue) => {
                    setStage(stageName);
                    setProgress(progressValue);
                }
            );

            showToast(`${fileType === 'preview' ? 'Preview video' : 'Download file'} replaced successfully!`, 'success');
            onSuccess();
        } catch (error) {
            console.error('File replacement error:', error);
            showToast('Failed to replace file', 'error');
        } finally {
            setUploading(false);
            setProgress(0);
            setStage('');
            // Reset file input
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
        }
    };

    return (
        <div className="space-y-2">
            <input
                ref={fileInputRef}
                type="file"
                accept={fileType === 'preview' ? 'video/*' : '.zip'}
                onChange={handleFileSelect}
                disabled={uploading}
                className="hidden"
                id={`replace-${fileType}-${templateId}`}
            />
            <label
                htmlFor={`replace-${fileType}-${templateId}`}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-colors cursor-pointer ${uploading
                    ? 'bg-gray-500/20 text-gray-400 cursor-not-allowed'
                    : 'bg-purple-500/10 text-purple-400 border border-purple-500/20 hover:bg-purple-500/20'
                    }`}
            >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                </svg>
                {uploading ? (
                    <>
                        <Loading size={16} />
                        Uploading...
                    </>
                ) : `Replace ${fileType === 'preview' ? 'Video' : 'ZIP'}`}
            </label>

            {uploading && (
                <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-400">{stage}</span>
                        <span className="text-purple-400 font-medium">{Math.round(progress)}%</span>
                    </div>
                    <div className="h-2 bg-black rounded-full overflow-hidden">
                        <div
                            className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}
