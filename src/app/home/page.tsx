import { auth, signOut } from "@/features/auth/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { headers } from "next/headers";
import { Suspense } from "react";

async function HomeContent() {
    await headers();
    const session = await auth();
    if (!session?.user) redirect("/");

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-4xl mx-auto space-y-8">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold text-gray-900">Welcome Home</h1>
                    <form
                        action={async () => {
                            "use server";
                            await signOut({ redirectTo: "/" });
                        }}
                    >
                        <button className="px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md">
                            Sign Out
                        </button>
                    </form>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-4">
                    <div className="flex items-center gap-4">
                        {session.user.image && (
                            <img
                                src={session.user.image}
                                alt={session.user.name || "User"}
                                className="w-16 h-16 rounded-full"
                            />
                        )}
                        <div>
                            <h2 className="text-xl font-semibold">{session.user.name}</h2>
                            <p className="text-gray-500">{session.user.email}</p>
                            <span className="inline-block mt-2 px-2 py-1 text-xs font-medium bg-blue-100 text-blue-700 rounded-full">
                                {/* @ts-ignore */}
                                {session.user.role}
                            </span>
                        </div>
                    </div>
                </div>

                {/* @ts-ignore */}
                {session.user.role === "admin" && (
                    <Link
                        href="/admin"
                        className="block p-6 bg-gradient-to-r from-gray-900 to-gray-800 text-white rounded-xl shadow-lg hover:scale-[1.02] transition-transform"
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-xl font-bold">Admin Dashboard</h3>
                                <p className="text-gray-400">Manage users, view stats, and more</p>
                            </div>
                            <span className="text-2xl">→</span>
                        </div>
                    </Link>
                )}
            </div>
        </div>
    );
}

function HomeLoading() {
    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
    );
}

export default function HomePage() {
    return (
        <Suspense fallback={<HomeLoading />}>
            <HomeContent />
        </Suspense>
    );
}
