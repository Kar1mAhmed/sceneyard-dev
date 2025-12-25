import { auth } from "@/features/auth/auth";
import { getAllUsers } from "@/features/users/service";
import { redirect } from "next/navigation";
import Link from "next/link";
import { headers } from "next/headers";
import { Suspense } from "react";
import { UsersTable } from "../components/UsersTable";
import { connection } from 'next/server';
import Loading from "@/src/components/ui/Loading";

async function UsersList() {
    await connection();
    await headers();
    const session = await auth();
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
                <UsersTable users={users} currentUserId={session.user.id || ''} />
            </div>
        </div>
    );
}

function UsersLoading() {
    return (
        <div className="min-h-screen bg-black flex items-center justify-center">
            <Loading text="LOADING USERS" />
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
