import { auth } from "@/features/auth/auth";
import { getAllUsers } from "@/features/users/repo";
import { redirect } from "next/navigation";
import Link from "next/link";
import { headers } from "next/headers";
import { Suspense } from "react";

async function UsersList() {
    await headers();
    const session = await auth();
    // @ts-ignore
    if (session?.user?.role !== "admin") redirect("/home");

    const users = await getAllUsers();

    return (
        <div className="min-h-screen bg-black text-white p-8 font-sans selection:bg-purple-500/30">
            <div className="max-w-7xl mx-auto space-y-8">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-white/10 pb-8">
                    <div>
                        <Link href="/admin" className="text-gray-400 hover:text-white transition-colors mb-4 inline-block">
                            ← Back to Dashboard
                        </Link>
                        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                            Manage Users
                        </h1>
                    </div>
                </div>

                {/* Users Table */}
                <div className="bg-zinc-900/40 backdrop-blur-md rounded-3xl border border-white/5 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b border-white/5 bg-white/5">
                                    <th className="p-6 text-sm font-medium text-gray-400 uppercase tracking-wider">User</th>
                                    <th className="p-6 text-sm font-medium text-gray-400 uppercase tracking-wider">Role</th>
                                    <th className="p-6 text-sm font-medium text-gray-400 uppercase tracking-wider">Provider</th>
                                    <th className="p-6 text-sm font-medium text-gray-400 uppercase tracking-wider">Joined</th>
                                    <th className="p-6 text-sm font-medium text-gray-400 uppercase tracking-wider">Actions</th>
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
                                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-sm font-bold">
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
                                                : 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                                                }`}>
                                                {user.role}
                                            </span>
                                        </td>
                                        <td className="p-6 text-gray-400 capitalize">
                                            {user.provider}
                                        </td>
                                        <td className="p-6 text-gray-400">
                                            {new Date(user.created_at * 1000).toLocaleDateString()}
                                        </td>
                                        <td className="p-6">
                                            <button className="text-gray-400 hover:text-white transition-colors">
                                                Edit
                                            </button>
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
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
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
