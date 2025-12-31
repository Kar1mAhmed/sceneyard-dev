import {
    createDownload,
    getDownloadsByUser,
    hasUserDownloaded,
    DownloadWithTemplate
} from './repo';
import { getTemplateById } from '@/features/templates/service';
import { getPublicR2Url } from '@/lib/r2';

export interface DownloadResult {
    success: boolean;
    downloadUrl?: string;
    alreadyDownloaded?: boolean;
    error?: string;
}

export interface UserDownload {
    id: string;
    templateId: string;
    title: string;
    aspectRatio: string;
    thumbnailUrl: string | null;
    downloadDate: string;
}

/**
 * Record a download and return the file URL
 * For now, no credit checks - just stores the operation
 */
export async function recordDownload(
    userId: string,
    templateId: string
): Promise<DownloadResult> {
    try {
        console.log(`[downloads/service] Recording download for user ${userId}, template ${templateId}`);

        // Get template details
        const template = await getTemplateById(templateId);
        if (!template) {
            return { success: false, error: 'Template not found' };
        }

        // Check if file asset exists
        if (!template.file_asset?.r2_key) {
            return { success: false, error: 'Template file not available' };
        }

        // Check if already downloaded (optional - for now we allow re-downloads)
        const alreadyDownloaded = await hasUserDownloaded(userId, templateId);

        // Create download record (even for re-downloads to track history)
        await createDownload(userId, templateId, template.credits_cost);

        // Generate download URL (using the secure download API)
        const downloadUrl = `/api/r2/download?r2_key=${encodeURIComponent(template.file_asset.r2_key)}`;

        console.log(`[downloads/service] Download recorded successfully`);

        return {
            success: true,
            downloadUrl,
            alreadyDownloaded,
        };
    } catch (error) {
        console.error('[downloads/service] Error recording download:', error);
        return { success: false, error: 'Failed to record download' };
    }
}

/**
 * Get user's download history formatted for UI
 */
export async function getUserDownloads(userId: string): Promise<UserDownload[]> {
    try {
        const downloads = await getDownloadsByUser(userId);

        return downloads.map((d: DownloadWithTemplate) => ({
            id: d.id,
            templateId: d.template_id,
            title: d.template_title,
            aspectRatio: d.template_orientation === 'horizontal' ? '16:9' : '9:16',
            thumbnailUrl: d.thumbnail_r2_key ? getPublicR2Url(d.thumbnail_r2_key) : null,
            downloadDate: new Date(d.created_at * 1000).toISOString(),
        }));
    } catch (error) {
        console.error('[downloads/service] Error fetching downloads:', error);
        return [];
    }
}
