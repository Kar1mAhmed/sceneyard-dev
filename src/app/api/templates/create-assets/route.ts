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
    try {
        const session = await auth();
        // @ts-ignore
        if (session?.user?.role !== 'admin') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await request.json() as CreateAssetsBody;
        const { previewAsset, thumbnailAsset, downloadAsset } = body;

        // Create all three assets
        await createAsset(previewAsset);
        await createAsset(thumbnailAsset);
        await createAsset(downloadAsset);

        return NextResponse.json({ success: true });

    } catch (error) {
        console.error('Asset creation error:', error);
        return NextResponse.json({ error: 'Failed to create assets' }, { status: 500 });
    }
}
