'use server';

import { updateTemplate, getTemplateById } from "@/features/templates/service";
import { updateContactStatus } from "@/features/contacts/repo";
import { revalidatePath, revalidateTag } from "next/cache";
import { getDb } from "@/lib/env";

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
export async function markMessageAsRead(id: string) {
    await updateContactStatus(id, 'read');
    revalidatePath('/admin/messages');
    return { success: true };
}

export async function deleteMessage(id: string) {
    const db = getDb();
    await db.prepare('DELETE FROM contacts WHERE id = ?').bind(id).run();
    revalidatePath('/admin/messages');
    return { success: true };
}
