import * as repo from './repo';
import { CreateTemplateData, Template } from './types';

export async function createTemplate(data: CreateTemplateData): Promise<Template> {
    // Future business logic: validation, billing checks, etc.
    return repo.createTemplate(data);
}

export async function createAsset(data: {
    id: string;
    kind: 'preview' | 'download' | 'thumbnail';
    r2_key: string;
    mime: string;
    bytes: number;
}): Promise<void> {
    return repo.createAsset(data);
}

export const updateTemplate = repo.updateTemplate;
export const getTemplateById = repo.getTemplateById;
export const deleteTemplate = repo.deleteTemplate;
export const getTemplatesWithThumbnails = repo.getTemplatesWithThumbnails;
export const getTemplateStats = repo.getTemplateStats;
export const getTemplates = repo.getTemplates;
export const getFeaturedTemplates = repo.getFeaturedTemplates;
