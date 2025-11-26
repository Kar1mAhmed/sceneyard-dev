import { auth } from "@/features/auth/auth";
import { getTemplateById } from "@/features/templates/repo";
import { getAllCategories } from "@/features/categories/repo";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { Suspense } from "react";
import { EditTemplateForm } from "../../components/EditTemplateForm";

async function EditTemplateContent({ params }: { params: Promise<{ id: string }> }) {
    await headers();
    const session = await auth();
    // @ts-ignore
    if (session?.user?.role !== "admin") redirect("/home");

    const { id } = await params;
    const [template, categories] = await Promise.all([
        getTemplateById(id),
        getAllCategories()
    ]);

    if (!template) redirect("/admin/templates");

    return (
        <div className="min-h-screen bg-black admin-bg-pattern text-white p-8 font-sans selection:bg-purple-500/30">
            <EditTemplateForm template={template} categories={categories} />
        </div>
    );
}

function EditTemplateLoading() {
    return (
        <div className="min-h-screen bg-black flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
        </div>
    );
}

export default async function EditTemplatePage({ params }: { params: Promise<{ id: string }> }) {
    return (
        <Suspense fallback={<EditTemplateLoading />}>
            <EditTemplateContent params={params} />
        </Suspense>
    );
}
