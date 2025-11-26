/**
 * Client-side utilities for R2 uploads and video processing
 */

export interface UploadProgress {
    loaded: number;
    total: number;
    percentage: number;
}

export interface UploadCredentials {
    assetId: string;
    r2Key: string;
    uploadEndpoint: string;
}

/**
 * Request upload credentials from the server
 */
export async function requestUploadCredentials(
    filename: string,
    contentType: string,
    kind: 'preview' | 'thumbnail' | 'download',
    existingR2Key?: string
): Promise<UploadCredentials> {
    const response = await fetch('/api/r2/presigned-url', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ filename, contentType, kind, existingR2Key })
    });

    if (!response.ok) {
        throw new Error('Failed to get upload credentials');
    }

    return response.json() as Promise<UploadCredentials>;
}

/**
 * Upload file to R2 via our API endpoint
 */
export async function uploadToR2(
    file: File,
    r2Key: string, // Kept for interface compatibility, but not used in PUT request
    onProgress?: (progress: UploadProgress) => void,
    uploadEndpoint?: string // Now required, but optional in signature to avoid breaking changes immediately
): Promise<void> {
    if (!uploadEndpoint) {
        throw new Error('Upload endpoint (presigned URL) is required');
    }

    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();

        xhr.upload.addEventListener('progress', (e) => {
            if (e.lengthComputable && onProgress) {
                onProgress({
                    loaded: e.loaded,
                    total: e.total,
                    percentage: Math.round((e.loaded / e.total) * 100)
                });
            }
        });

        xhr.addEventListener('load', () => {
            if (xhr.status >= 200 && xhr.status < 300) {
                resolve();
            } else {
                reject(new Error(`Upload failed with status ${xhr.status}`));
            }
        });

        xhr.addEventListener('error', () => reject(new Error('Upload failed')));
        xhr.addEventListener('abort', () => reject(new Error('Upload aborted')));

        xhr.open('PUT', uploadEndpoint);
        xhr.setRequestHeader('Content-Type', file.type);
        xhr.send(file);
    });
}

/**
 * Generate a low-quality (480p) version of a video file
 * Uses HTML5 Canvas and MediaRecorder APIs
 */
export async function generateLowQualityVideo(
    videoFile: File,
    targetHeight: number = 480
): Promise<Blob> {
    return new Promise((resolve, reject) => {
        const video = document.createElement('video');
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        if (!ctx) {
            reject(new Error('Could not get canvas context'));
            return;
        }

        video.src = URL.createObjectURL(videoFile);
        video.muted = true;

        video.onloadedmetadata = () => {
            // Calculate dimensions maintaining aspect ratio
            const aspectRatio = video.videoWidth / video.videoHeight;
            canvas.height = targetHeight;
            canvas.width = Math.round(targetHeight * aspectRatio);

            // Set up MediaRecorder to capture the canvas
            const stream = canvas.captureStream(30); // 30 FPS

            // Get audio from original video if it exists
            video.play();

            const chunks: Blob[] = [];
            const mediaRecorder = new MediaRecorder(stream, {
                mimeType: 'video/webm;codecs=vp9',
                videoBitsPerSecond: 500000 // 500 kbps for low quality
            });

            mediaRecorder.ondataavailable = (e) => {
                if (e.data.size > 0) {
                    chunks.push(e.data);
                }
            };

            mediaRecorder.onstop = () => {
                const blob = new Blob(chunks, { type: 'video/webm' });
                URL.revokeObjectURL(video.src);
                resolve(blob);
            };

            mediaRecorder.onerror = (e) => {
                URL.revokeObjectURL(video.src);
                reject(e);
            };

            // Start recording
            mediaRecorder.start();

            // Draw frames to canvas
            const drawFrame = () => {
                if (video.paused || video.ended) {
                    mediaRecorder.stop();
                    return;
                }
                ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
                requestAnimationFrame(drawFrame);
            };

            video.onplay = () => {
                drawFrame();
            };
        };

        video.onerror = () => {
            URL.revokeObjectURL(video.src);
            reject(new Error('Failed to load video'));
        };
    });
}

/**
 * Complete upload flow for a template
 */
export async function uploadTemplateAssets(
    previewVideo: File,
    downloadFile: File,
    onProgress?: (stage: string, progress: number) => void
) {
    try {
        // 1. Request credentials for preview
        onProgress?.('Preparing preview upload...', 0);
        const previewCreds = await requestUploadCredentials(
            previewVideo.name,
            previewVideo.type,
            'preview'
        );

        // 2. Upload preview video
        onProgress?.('Uploading preview...', 10);
        await uploadToR2(previewVideo, previewCreds.r2Key, (p) => {
            onProgress?.('Uploading preview...', 10 + (p.percentage * 0.3));
        }, previewCreds.uploadEndpoint);

        // 3. Generate thumbnail
        onProgress?.('Generating thumbnail...', 40);
        const thumbnailBlob = await generateLowQualityVideo(previewVideo, 480);
        const thumbnailFile = new File([thumbnailBlob], `thumbnail_${previewVideo.name}`, {
            type: 'video/webm'
        });

        // 4. Request credentials for thumbnail
        const thumbnailCreds = await requestUploadCredentials(
            thumbnailFile.name,
            thumbnailFile.type,
            'thumbnail'
        );

        // 5. Upload thumbnail
        onProgress?.('Uploading thumbnail...', 50);
        await uploadToR2(thumbnailFile, thumbnailCreds.r2Key, (p) => {
            onProgress?.('Uploading thumbnail...', 50 + (p.percentage * 0.2));
        }, thumbnailCreds.uploadEndpoint);

        // 6. Request credentials for download file
        onProgress?.('Preparing download file...', 70);
        const downloadCreds = await requestUploadCredentials(
            downloadFile.name,
            downloadFile.type,
            'download'
        );

        // 7. Upload download file
        onProgress?.('Uploading download file...', 75);
        await uploadToR2(downloadFile, downloadCreds.r2Key, (p) => {
            onProgress?.('Uploading download file...', 75 + (p.percentage * 0.25));
        }, downloadCreds.uploadEndpoint);

        onProgress?.('Complete!', 100);

        return {
            previewAssetId: previewCreds.assetId,
            previewR2Key: previewCreds.r2Key,
            thumbnailAssetId: thumbnailCreds.assetId,
            thumbnailR2Key: thumbnailCreds.r2Key,
            downloadAssetId: downloadCreds.assetId,
            downloadR2Key: downloadCreds.r2Key,
            previewSize: previewVideo.size,
            thumbnailSize: thumbnailBlob.size,
            downloadSize: downloadFile.size
        };

    } catch (error) {
        console.error('Upload error:', error);
        throw error;
    }
}

/**
 * Replace a single template file (preview, thumbnail, or download)
 * Overwrites the existing R2 key instead of creating a new one
 */
export async function replaceTemplateFile(
    file: File,
    kind: 'preview' | 'download',
    existingR2Key: string,
    existingThumbnailR2Key?: string, // Required if kind is 'preview'
    onProgress?: (stage: string, progress: number) => void
) {
    try {
        if (kind === 'preview') {
            // 1. Request credentials for preview (reusing existing key)
            onProgress?.('Preparing preview upload...', 0);
            const previewCreds = await requestUploadCredentials(
                file.name,
                file.type,
                'preview',
                existingR2Key
            );

            // 2. Upload preview video
            onProgress?.('Uploading preview...', 10);
            await uploadToR2(file, previewCreds.r2Key, (p) => {
                onProgress?.('Uploading preview...', 10 + (p.percentage * 0.4));
            }, previewCreds.uploadEndpoint);

            // 3. Generate new thumbnail
            onProgress?.('Generating thumbnail...', 50);
            const thumbnailBlob = await generateLowQualityVideo(file, 480);
            const thumbnailFile = new File([thumbnailBlob], `thumbnail_${file.name}`, {
                type: 'video/webm'
            });

            // 4. Request credentials for thumbnail (reusing existing key if provided)
            const thumbnailCreds = await requestUploadCredentials(
                thumbnailFile.name,
                thumbnailFile.type,
                'thumbnail',
                existingThumbnailR2Key
            );

            // 5. Upload thumbnail
            onProgress?.('Uploading thumbnail...', 60);
            await uploadToR2(thumbnailFile, thumbnailCreds.r2Key, (p) => {
                onProgress?.('Uploading thumbnail...', 60 + (p.percentage * 0.4));
            }, thumbnailCreds.uploadEndpoint);

            onProgress?.('Complete!', 100);

            return {
                previewAssetId: previewCreds.assetId,
                previewR2Key: previewCreds.r2Key,
                thumbnailAssetId: thumbnailCreds.assetId,
                thumbnailR2Key: thumbnailCreds.r2Key,
                previewSize: file.size,
                thumbnailSize: thumbnailBlob.size
            };
        } else {
            // Replace download file
            onProgress?.('Preparing download file...', 0);
            const downloadCreds = await requestUploadCredentials(
                file.name,
                file.type,
                'download',
                existingR2Key
            );

            onProgress?.('Uploading download file...', 10);
            await uploadToR2(file, downloadCreds.r2Key, (p) => {
                onProgress?.('Uploading download file...', 10 + (p.percentage * 0.9));
            }, downloadCreds.uploadEndpoint);

            onProgress?.('Complete!', 100);

            return {
                downloadAssetId: downloadCreds.assetId,
                downloadR2Key: downloadCreds.r2Key,
                downloadSize: file.size
            };
        }
    } catch (error) {
        console.error('Replace file error:', error);
        throw error;
    }
}

