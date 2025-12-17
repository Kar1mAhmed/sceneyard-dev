'use server';

import { updateUser, deleteUser as deleteUserRepo, getUserById, getAllUsers } from "@/features/users/service";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth } from "@/features/auth/auth";
import { UserRole } from "@/features/users/types";

export async function updateUserRoleAction(userId: string, newRole: UserRole) {
    const session = await auth();
    if (session?.user?.role !== "admin") {
        throw new Error("Unauthorized");
    }

    // Prevent changing own role
    if (session.user.id === userId) {
        throw new Error("You cannot change your own role");
    }

    // If removing admin role, ensure there's at least one other admin
    if (newRole === "user") {
        const allUsers = await getAllUsers(1000); // Get all users to check admin count
        const adminCount = allUsers.filter(u => u.role === "admin").length;
        if (adminCount <= 1) {
            throw new Error("Cannot remove the last admin");
        }
    }

    await updateUser(userId, { role: newRole });
    revalidatePath('/admin/users');

    return { success: true };
}

export async function deleteUserAction(userId: string) {
    const session = await auth();
    if (session?.user?.role !== "admin") {
        throw new Error("Unauthorized");
    }

    // Prevent deleting own account
    if (session.user.id === userId) {
        throw new Error("You cannot delete your own account");
    }

    // Check if user exists and get their role
    const user = await getUserById(userId);
    if (!user) {
        throw new Error("User not found");
    }

    // If deleting an admin, ensure there's at least one other admin
    if (user.role === "admin") {
        const allUsers = await getAllUsers(1000);
        const adminCount = allUsers.filter(u => u.role === "admin").length;
        if (adminCount <= 1) {
            throw new Error("Cannot delete the last admin");
        }
    }

    await deleteUserRepo(userId);
    revalidatePath('/admin/users');

    return { success: true };
}
