'use server';

import { updateTemplate, deleteTemplate as deleteTemplateRepo } from "@/features/templates/repo";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth } from "@/features/auth/auth";

export async function updateTemplateAction(id: string, formData: FormData) {
    const session = await auth();
    // @ts-ignore
    if (session?.user?.role !== "admin") {
        throw new Error("Unauthorized");
    }

    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const credits_cost = parseInt(formData.get("credits_cost") as string);
    const ae_version_min = formData.get("ae_version_min") as string;
    const tags_text = formData.get("tags_text") as string;
    const published = formData.get("published") === "on";
    const categories = formData.getAll("categories") as string[];

    await updateTemplate(id, {
        title,
        description,
        credits_cost,
        ae_version_min: ae_version_min || null,
        tags_text,
        published_at: published ? Math.floor(Date.now() / 1000) : null,
        categories // Pass categories to repo update
    });

    revalidatePath('/admin/templates');
    revalidatePath(`/admin/templates/${id}`);

    // We don't redirect here to allow the client to show a success message or stay on the page
    return { success: true };
}

export async function deleteTemplateAction(id: string) {
    const session = await auth();
    // @ts-ignore
    if (session?.user?.role !== "admin") {
        throw new Error("Unauthorized");
    }

    await deleteTemplateRepo(id);
    revalidatePath('/admin/templates');
    redirect("/admin/templates");
}
