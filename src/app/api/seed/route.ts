import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/features/auth/auth';
import { getTemplatesWithThumbnails, createTemplate } from '@/features/templates/service';
import { CreateTemplateData, TemplateWithAssets } from '@/features/templates/types';



export async function GET(request: NextRequest) {
    try {
        const session = await auth();
        if (session?.user?.role !== 'admin') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        // 1. Fetch existing templates to use as source
        const templates = await getTemplatesWithThumbnails();

        if (templates.length === 0) {
            return NextResponse.json({ error: 'No templates found to duplicate. Please create at least one template manually first.' }, { status: 400 });
        }

        // 2. Separate by orientation
        const horizontal = templates.filter(t => t.orientation === 'horizontal');
        const vertical = templates.filter(t => t.orientation === 'vertical');

        if (horizontal.length === 0 && vertical.length === 0) {
            return NextResponse.json({ error: 'No templates found.' }, { status: 400 });
        }

        // 3. Generate 100 dummy templates
        const createdCount = 0;
        const TARGET_COUNT = 100;
        const results = [];

        for (let i = 0; i < TARGET_COUNT; i++) {
            // Randomly decide orientation (50/50 chance if both exist)
            let orientation: 'horizontal' | 'vertical';
            let sourcePool: TemplateWithAssets[];

            if (horizontal.length > 0 && vertical.length > 0) {
                orientation = Math.random() > 0.5 ? 'horizontal' : 'vertical';
                sourcePool = orientation === 'horizontal' ? horizontal : vertical;
            } else if (horizontal.length > 0) {
                orientation = 'horizontal';
                sourcePool = horizontal;
            } else {
                orientation = 'vertical';
                sourcePool = vertical;
            }

            // Pick random source template
            const source = sourcePool[Math.floor(Math.random() * sourcePool.length)];

            // Create new template data
            const newData: CreateTemplateData = {
                title: `[Dev] ${source.title} (Copy ${i + 1})`,
                description: source.description,
                credits_cost: source.credits_cost,
                preview_asset_id: source.preview_asset_id,
                preview_thumbnail_id: source.preview_thumbnail_id,
                file_asset_id: source.file_asset_id,
                orientation: source.orientation, // Keep numeric orientation from source? 
                // Wait, orientation in type is 'horizontal' | 'vertical', ensure source matches
                ae_version_min: source.ae_version_min || undefined,
                tags: source.tags_text,
                is_featured: Math.random() > 0.8, // 20% chance to be featured
                // Categories? We can't get categories easily from getTemplatesWithThumbnails result 
                // unless we fetching them. For simplicity, we skip categories or we need to fetch them.
                // The prompt didn't strictly require categories duplication but it's good practice.
            };

            // Call service
            const newTemplate = await createTemplate(newData);
            results.push(newTemplate.id);
        }

        return NextResponse.json({
            success: true,
            message: `Created ${results.length} dummy templates.`,
            ids: results
        });

    } catch (error: any) {
        console.error('Seed error:', error);
        return NextResponse.json({ error: error.message || 'Seed failed' }, { status: 500 });
    }
}
