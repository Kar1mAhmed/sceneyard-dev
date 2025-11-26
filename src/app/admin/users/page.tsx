import { auth } from "@/features/auth/auth";
import { getAllUsers } from "@/features/users/repo";
import { redirect } from "next/navigation";
import Link from "next/link";
import { headers } from "next/headers";
import { Suspense } from "react";

import { connection } from 'next/server';

async function UsersList() {
    await connection();
    await headers();
    const session = await auth();
    // @ts-ignore
    if (session?.user?.role !== "admin") redirect("/home");

    const users = await getAllUsers();

    return (
        <div className="min-h-screen bg-black admin-bg-pattern text-white p-8 font-sans selection:bg-purple-500/30">
            <div className="max-w-7xl mx-auto space-y-8">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-white/10 pb-8">
                    <div>
                        <Link href="/admin" className="text-gray-400 hover:text-white transition-colors mb-4 inline-block flex items-center gap-2">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            Back to Dashboard
                        </Link>
                        <h1 className="text-4xl font-bold text-white">
                            Manage Users
                        </h1>
                    </div>
                </div>

                {/* Users Table */}
                <div className="bg-zinc-900 rounded-3xl border border-white/5 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-white/5 bg-white/5">
                                    <th className="p-6 text-sm font-medium text-gray-400 uppercase tracking-wider">User</th>
                                    <th className="p-6 text-sm font-medium text-gray-400 uppercase tracking-wider">Role</th>
                                    <th className="p-6 text-sm font-medium text-gray-400 uppercase tracking-wider">Status</th>
                                    <th className="p-6 text-sm font-medium text-gray-400 uppercase tracking-wider">Subscription</th>
                                    <th className="p-6 text-sm font-medium text-gray-400 uppercase tracking-wider">Joined</th>
                                    <th className="p-6 text-sm font-medium text-gray-400 uppercase tracking-wider text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {users.map((user) => (
                                    <tr key={user.id} className="group hover:bg-white/5 transition-colors">
                                        <td className="p-6">
                                            <div className="flex items-center gap-4">
                                                {user.image ? (
                                                    <img src={user.image} alt={user.name || ""} className="w-10 h-10 rounded-full" />
                                                ) : (
                                                    <div className="w-10 h-10 rounded-full bg-purple-500/20 text-purple-400 border border-purple-500/30 flex items-center justify-center text-sm font-bold">
                                                        {user.email[0].toUpperCase()}
                                                    </div>
                                                )}
                                                <div>
                                                    <div className="font-medium text-white">{user.name || "No Name"}</div>
                                                    <div className="text-sm text-gray-400">{user.email}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-6">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${user.role === 'admin'
                                                ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20'
                                                : 'bg-zinc-800 text-gray-400 border border-white/10'
                                                }`}>
                                                {user.role}
                                            </span>
                                        </td>
                                        <td className="p-6">
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-500/10 text-green-400 border border-green-500/20">
                                                Active
                                            </span>
                                        </td>
                                        <td className="p-6">
                                            <span className="text-gray-300">Free Plan</span>
                                        </td>
                                        <td className="p-6 text-gray-400">
                                            {user.created_at
                                                ? new Date(user.created_at * 1000).toLocaleDateString(undefined, {
                                                    year: 'numeric',
                                                    month: 'short',
                                                    day: 'numeric'
                                                })
                                                : 'N/A'
                                            }
                                        </td>
                                        <td className="p-6 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <button className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors" title="Edit User">
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                                    </svg>
                                                </button>
                                                <button className="p-2 text-gray-400 hover:text-purple-400 hover:bg-purple-500/10 rounded-lg transition-colors" title="Make Admin">
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                                    </svg>
                                                </button>
                                                <button className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors" title="Delete User">
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

function UsersLoading() {
    return (
        <div className="min-h-screen bg-black flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
        </div>
    );
}

export default function UsersPage() {
    return (
        <Suspense fallback={<UsersLoading />}>
            <UsersList />
        </Suspense>
    );
}
