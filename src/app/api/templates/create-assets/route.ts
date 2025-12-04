import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/features/auth/auth';
import { createAsset } from '@/features/templates/repo';

interface AssetData {
    id: string;
    kind: 'preview' | 'download';
    r2_key: string;
    mime: string;
    bytes: number;
}

interface CreateAssetsBody {
    previewAsset: AssetData;
    thumbnailAsset: AssetData;
    downloadAsset: AssetData;
}

export async function POST(request: NextRequest) {
    const startTime = Date.now();

    try {
        const session = await auth();
        const userEmail = session?.user?.email || 'unknown';
        console.log(`[/api/templates/create-assets] [POST] Request started - User: ${userEmail}`);

        // @ts-ignore
        if (session?.user?.role !== 'admin') {
            console.log(`[/api/templates/create-assets] [POST] [401] Unauthorized access attempt - User: ${userEmail}`);
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await request.json() as CreateAssetsBody;
        const { previewAsset, thumbnailAsset, downloadAsset } = body;

        const previewSizeMB = (previewAsset.bytes / (1024 * 1024)).toFixed(2);
        const thumbnailSizeMB = (thumbnailAsset.bytes / (1024 * 1024)).toFixed(2);
        const downloadSizeMB = (downloadAsset.bytes / (1024 * 1024)).toFixed(2);

        console.log(`[/api/templates/create-assets] [POST] Creating assets - Preview: ${previewSizeMB}MB, Thumbnail: ${thumbnailSizeMB}MB, Download: ${downloadSizeMB}MB - User: ${userEmail}`);

        // Create all three assets
        await createAsset(previewAsset);
        await createAsset(thumbnailAsset);
        await createAsset(downloadAsset);

        const duration = Date.now() - startTime;
        console.log(`[/api/templates/create-assets] [POST] [200] Assets created successfully - IDs: ${previewAsset.id}, ${thumbnailAsset.id}, ${downloadAsset.id}, Duration: ${duration}ms`);

        return NextResponse.json({ success: true });

    } catch (error) {
        const duration = Date.now() - startTime;
        console.error(`[/api/templates/create-assets] [POST] [500] Asset creation error - Duration: ${duration}ms`, error);
        return NextResponse.json({ error: 'Failed to create assets' }, { status: 500 });
    }
}
