import { auth } from "@/features/auth/auth";
import { getAllCategories } from "@/features/categories/service";
import { redirect } from "next/navigation";
import Link from "next/link";
import { CreateTemplateForm } from "../../components/CreateTemplateForm";
import { Suspense } from "react";
import { connection } from 'next/server';
import Loading from "@/src/components/ui/Loading";

async function NewTemplateContent() {
    await connection();
    const session = await auth();

    if (session?.user?.role !== "admin") {
        redirect("/home");
    }

    const categories = await getAllCategories();

    return <CreateTemplateForm categories={categories} />;
}

export default function NewTemplatePage() {
    return (
        <div className="min-h-screen bg-black admin-bg-pattern text-white p-8 font-sans selection:bg-purple-500/30">
            <div className="max-w-4xl mx-auto space-y-8">
                {/* Header */}
                <div className="border-b border-white/10 pb-8">
                    <Link href="/admin/templates" className="text-gray-400 hover:text-white transition-colors mb-4 inline-block flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Back to Templates
                    </Link>
                    <h1 className="text-4xl font-bold text-white">Add New Template</h1>
                </div>

                <Suspense fallback={
                    <div className="flex items-center justify-center p-12">
                        <Loading text="PREPARING EDITOR" />
                    </div>
                }>
                    <NewTemplateContent />
                </Suspense>
            </div>
        </div>
    );
}
