import { auth } from "@/features/auth/auth";
import { getUserCount } from "@/features/users/repo";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Suspense } from "react";
import { headers } from "next/headers";

async function AdminDashboardContent() {
    await headers();
    const session = await auth();
    // @ts-ignore
    if (session?.user?.role !== "admin") redirect("/home");

    const userCount = await getUserCount();

    return (
        <div className="min-h-screen bg-black text-white p-8 font-sans selection:bg-purple-500/30">
            <div className="max-w-7xl mx-auto space-y-12">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-white/10 pb-8">
                    <div>
                        <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent pb-2">
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
                    {[
                        { label: "Total Users", value: userCount.toLocaleString(), change: "+12%", trend: "up", color: "from-blue-500/20 to-blue-600/5" },
                        { label: "Active Subscriptions", value: "856", change: "+5%", trend: "up", color: "from-purple-500/20 to-purple-600/5" },
                        { label: "Revenue (MTD)", value: "$12,450", change: "+18%", trend: "up", color: "from-pink-500/20 to-pink-600/5" },
                    ].map((stat) => (
                        <div key={stat.label} className={`group relative overflow-hidden bg-gradient-to-br ${stat.color} backdrop-blur-sm p-8 rounded-3xl border border-white/5 hover:border-white/10 transition-all duration-300`}>
                            <div className="relative z-10">
                                <div className="flex justify-between items-start">
                                    <p className="text-sm font-medium text-gray-400 uppercase tracking-wider">{stat.label}</p>
                                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${stat.trend === 'up' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                                        {stat.change}
                                    </span>
                                </div>
                                <p className="text-4xl font-bold mt-4 text-white group-hover:scale-105 transition-transform origin-left">
                                    {stat.value}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Charts Area */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="bg-zinc-900/40 backdrop-blur-md p-8 rounded-3xl border border-white/5 min-h-[400px] flex flex-col">
                        <h3 className="text-xl font-semibold text-gray-200 mb-8 flex items-center gap-2">
                            <span className="w-2 h-8 bg-blue-500 rounded-full"></span>
                            Revenue Growth
                        </h3>
                        <div className="flex-1 flex items-center justify-center border-2 border-dashed border-white/5 rounded-2xl bg-black/20 group hover:border-blue-500/30 transition-colors">
                            <p className="text-gray-600 font-medium group-hover:text-blue-400 transition-colors">Chart Visualization Placeholder</p>
                        </div>
                    </div>
                    <div className="bg-zinc-900/40 backdrop-blur-md p-8 rounded-3xl border border-white/5 min-h-[400px] flex flex-col">
                        <h3 className="text-xl font-semibold text-gray-200 mb-8 flex items-center gap-2">
                            <span className="w-2 h-8 bg-purple-500 rounded-full"></span>
                            User Acquisition
                        </h3>
                        <div className="flex-1 flex items-center justify-center border-2 border-dashed border-white/5 rounded-2xl bg-black/20 group hover:border-purple-500/30 transition-colors">
                            <p className="text-gray-600 font-medium group-hover:text-purple-400 transition-colors">Chart Visualization Placeholder</p>
                        </div>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex justify-end pt-8 border-t border-white/10">
                    <Link href="/admin/users" className="px-8 py-4 bg-white text-black rounded-2xl font-bold hover:bg-gray-200 transition-all transform hover:-translate-y-1 shadow-lg shadow-white/5 flex items-center gap-3">
                        <span>Manage All Users</span>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </Link>
                </div>
            </div>
        </div>
    );
}

function AdminLoading() {
    return (
        <div className="min-h-screen bg-black flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
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
