import { auth } from "@/features/auth/auth";
import { getUserById } from "@/features/users/service";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { Suspense } from "react";
import { EditUserForm } from "@/src/app/admin/components/EditUserForm";

import { connection } from 'next/server';

async function UserEdit({ params }: { params: Promise<{ id: string }> }) {
    await connection();
    await headers();
    const { id } = await params;
    const session = await auth();
    if (session?.user?.role !== "admin") redirect("/home");

    const user = await getUserById(id);
    if (!user) {
        redirect("/admin/users");
    }

    return (
        <div className="min-h-screen bg-black admin-bg-pattern text-white p-8 font-sans selection:bg-purple-500/30">
            <EditUserForm user={user} currentUserId={session.user.id || ''} />
        </div>
    );
}

function UserEditLoading() {
    return (
        <div className="min-h-screen bg-black flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
        </div>
    );
}

export default function UserEditPage({ params }: { params: Promise<{ id: string }> }) {
    return (
        <Suspense fallback={<UserEditLoading />}>
            <UserEdit params={params} />
        </Suspense>
    );
}
