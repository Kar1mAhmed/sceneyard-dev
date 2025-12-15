'use server';

import { updateTemplate, getTemplateById } from "@/features/templates/repo";
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
    // @ts-ignore
    revalidateTag('featured-templates');

    return { success: true, is_featured: newFeaturedStatus };
}
