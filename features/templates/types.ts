export interface Asset {
    id: string;
    kind: 'preview' | 'download';
    r2_key: string;
    mime: string;
    bytes: number;
    created_at: number;
}

export interface Template {
    id: string;
    title: string;
    description: string;
    preview_asset_id: string;
    preview_thumbnail_id: string | null;
    file_asset_id: string;
    ae_version_min: string | null;
    credits_cost: number;
    orientation: 'horizontal' | 'vertical';
    likes_count: number;
    downloads_count: number;
    tags_text: string;
    published_at: number | null;
    early_access_until: number | null;
    is_featured?: boolean;
    deleted_at: number | null;
    created_at: number;
    updated_at: number;
}

export interface TemplateWithAssets extends Template {
    preview_asset?: Asset;
    preview_thumbnail?: Asset;
    file_asset?: Asset;
    categories?: { id: string; name: string; slug: string; }[];
}

