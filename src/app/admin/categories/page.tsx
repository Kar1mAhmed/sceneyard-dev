import { auth } from "@/features/auth/auth";
import { getCategories, getCategoryStats, createCategory, deleteCategory, updateCategory } from "@/features/categories/service";
import { redirect } from "next/navigation";
import Link from "next/link";
import { headers } from "next/headers";
import { revalidatePath, unstable_noStore } from "next/cache";
import { CategoryItem } from "../components/CategoryItem";

export default async function CategoriesPage() {
    unstable_noStore();
    await headers();
    const session = await auth();
    if (session?.user?.role !== "admin") redirect("/home");

    const categories = await getCategories();
    const stats = await getCategoryStats();

    async function handleCreate(formData: FormData) {
        "use server";
        const name = formData.get("name") as string;
        if (name) {
            await createCategory(name);
            revalidatePath('/admin/categories');
        }
    }

    async function handleEdit(id: string, name: string) {
        "use server";
        await updateCategory(id, name);
        revalidatePath('/admin/categories');
    }

    async function handleDelete(id: string) {
        "use server";
        await deleteCategory(id);
        revalidatePath('/admin/categories');
    }

    return (
        <div className="min-h-screen bg-black admin-bg-pattern text-white p-8 font-sans selection:bg-purple-500/30">
            <div className="max-w-5xl mx-auto space-y-8">
                {/* Header */}
                <div className="border-b border-white/10 pb-8">
                    <Link href="/admin" className="text-gray-400 hover:text-white transition-colors mb-4 inline-block flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Back to Dashboard
                    </Link>
                    <h1 className="text-4xl font-bold text-white">Manage Categories</h1>
                    <p className="text-gray-400 mt-2">Organize templates by category for better discoverability</p>
                </div>

                {/* Stats */}
                <div className="bg-zinc-900 rounded-2xl border border-white/5 p-6">
                    <p className="text-sm text-gray-400 uppercase tracking-wider mb-2">Total Categories</p>
                    <p className="text-3xl font-bold text-purple-400">{stats.total}</p>
                </div>

                {/* Add Category Form */}
                <div className="bg-zinc-900 rounded-3xl border border-white/5 p-8">
                    <h2 className="text-xl font-bold text-white mb-4">Add New Category</h2>
                    <form action={handleCreate} className="flex gap-4">
                        <input
                            type="text"
                            name="name"
                            required
                            placeholder="Category name (e.g., Logo Reveals)"
                            className="flex-1 px-4 py-3 bg-black border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
                        />
                        <button
                            type="submit"
                            className="px-6 py-3 bg-purple-500 text-white rounded-xl font-bold hover:bg-purple-600 transition-colors"
                        >
                            Add Category
                        </button>
                    </form>
                </div>

                {/* Categories List */}
                <div className="bg-zinc-900 rounded-3xl border border-white/5 overflow-hidden">
                    {categories.length === 0 ? (
                        <div className="p-12 text-center">
                            <p className="text-gray-400 text-lg">No categories yet. Create your first one!</p>
                        </div>
                    ) : (
                        <div className="divide-y divide-white/5">
                            {categories.map((category) => (
                                <CategoryItem
                                    key={category.id}
                                    category={category}
                                    onEdit={handleEdit}
                                    onDelete={handleDelete}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
