import { auth } from "@/features/auth/auth";
import { getUserCount } from "@/features/users/service";
import { getTemplateStats } from "@/features/templates/service";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Suspense } from "react";
import { headers } from "next/headers";
import Loading from "@/src/components/ui/Loading";

async function AdminDashboardContent() {
    await headers();
    const session = await auth();
    if (session?.user?.role !== "admin") redirect("/home");

    const userCount = await getUserCount();
    const templateStats = await getTemplateStats();

    return (
        <div className="min-h-screen bg-black admin-bg-pattern text-white p-8 font-sans selection:bg-purple-500/30">
            <div className="max-w-7xl mx-auto space-y-12">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-white/10 pb-8">
                    <div>
                        <h1 className="text-5xl font-bold text-white pb-2">
                            Admin Dashboard
                        </h1>
                        <p className="text-gray-400 mt-2 text-lg">Platform Overview & Management</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="px-4 py-2 bg-white/5 rounded-full border border-white/10 text-sm text-gray-300 backdrop-blur-md">
                            {new Date().toLocaleDateString(undefined, { dateStyle: 'full' })}
                        </div>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Total Users Card with Action */}
                    <div className="group relative overflow-hidden bg-zinc-900 rounded-3xl border border-white/5 hover:border-purple-500/50 transition-all duration-300 p-8">
                        <div className="relative z-10 flex flex-col h-full justify-between">
                            <div>
                                <div className="flex justify-between items-start">
                                    <p className="text-sm font-medium text-gray-400 uppercase tracking-wider">Total Users</p>
                                    <span className="text-xs px-2 py-1 rounded-full font-medium bg-green-500/10 text-green-400">
                                        +12%
                                    </span>
                                </div>
                                <p className="text-4xl font-bold mt-4 text-white">
                                    {userCount.toLocaleString()}
                                </p>
                            </div>
                            <div className="mt-6">
                                <Link href="/admin/users" className="inline-flex items-center gap-2 text-sm font-medium text-purple-400 hover:text-purple-300 transition-colors">
                                    Manage Users
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Total Templates Card with Action */}
                    <div className="group relative overflow-hidden bg-zinc-900 rounded-3xl border border-white/5 hover:border-purple-500/50 transition-all duration-300 p-8">
                        <div className="relative z-10 flex flex-col h-full justify-between">
                            <div>
                                <div className="flex justify-between items-start">
                                    <p className="text-sm font-medium text-gray-400 uppercase tracking-wider">Total Templates</p>
                                    <span className="text-xs px-2 py-1 rounded-full font-medium bg-purple-500/10 text-purple-400">
                                        {templateStats.published} Published
                                    </span>
                                </div>
                                <p className="text-4xl font-bold mt-4 text-white">
                                    {templateStats.total.toLocaleString()}
                                </p>
                            </div>
                            <div className="mt-6">
                                <Link href="/admin/templates" className="inline-flex items-center gap-2 text-sm font-medium text-purple-400 hover:text-purple-300 transition-colors">
                                    Manage Templates
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Other Stats */}
                    {[
                        { label: "Active Subscriptions", value: "856", change: "+5%", trend: "up" },
                        { label: "Revenue (MTD)", value: "$12,450", change: "+18%", trend: "up" },
                    ].map((stat) => (
                        <div key={stat.label} className="group relative overflow-hidden bg-zinc-900 rounded-3xl border border-white/5 hover:border-purple-500/50 transition-all duration-300 p-8">
                            <div className="relative z-10">
                                <div className="flex justify-between items-start">
                                    <p className="text-sm font-medium text-gray-400 uppercase tracking-wider">{stat.label}</p>
                                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${stat.trend === 'up' ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
                                        {stat.change}
                                    </span>
                                </div>
                                <p className="text-4xl font-bold mt-4 text-white">
                                    {stat.value}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Charts Area */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="bg-zinc-900 p-8 rounded-3xl border border-white/5 min-h-[400px] flex flex-col hover:border-purple-500/30 transition-colors">
                        <h3 className="text-xl font-semibold text-gray-200 mb-8 flex items-center gap-2">
                            <span className="w-2 h-8 bg-purple-500 rounded-full"></span>
                            Revenue Growth
                        </h3>
                        <div className="flex-1 flex items-center justify-center border-2 border-dashed border-white/5 rounded-2xl bg-black/20">
                            <p className="text-gray-600 font-medium">Chart Visualization Placeholder</p>
                        </div>
                    </div>
                    <div className="bg-zinc-900 p-8 rounded-3xl border border-white/5 min-h-[400px] flex flex-col hover:border-purple-500/30 transition-colors">
                        <h3 className="text-xl font-semibold text-gray-200 mb-8 flex items-center gap-2">
                            <span className="w-2 h-8 bg-purple-500 rounded-full"></span>
                            User Acquisition
                        </h3>
                        <div className="flex-1 flex items-center justify-center border-2 border-dashed border-white/5 rounded-2xl bg-black/20">
                            <p className="text-gray-600 font-medium">Chart Visualization Placeholder</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function AdminLoading() {
    return (
        <div className="min-h-screen bg-black flex items-center justify-center">
            <Loading text="LOADING DASHBOARD" />
        </div>
    );
}

export default function AdminPage() {
    return (
        <Suspense fallback={<AdminLoading />}>
            <AdminDashboardContent />
        </Suspense>
    );
}
