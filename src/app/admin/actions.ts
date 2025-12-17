'use server';

import { updateTemplate, getTemplateById } from "@/features/templates/service";
import { revalidatePath, revalidateTag } from "next/cache";

export async function toggleFeaturedTemplate(id: string) {
    const template = await getTemplateById(id);
    if (!template) throw new Error("Template not found");

    const newFeaturedStatus = !template.is_featured;

    await updateTemplate(id, {
        is_featured: newFeaturedStatus
    });

    revalidatePath('/admin/templates');
    revalidatePath('/');
    revalidateTag('featured-templates', 'max');

    return { success: true, is_featured: newFeaturedStatus };
}
