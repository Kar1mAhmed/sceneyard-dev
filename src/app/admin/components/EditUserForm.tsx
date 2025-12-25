'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { User } from '@/features/users/types';
import { updateUserRoleAction, deleteUserAction } from '../users/actions';
import { useToast } from '@/src/components/ToastProvider';
import Loading from '@/src/components/ui/Loading';

interface EditUserFormProps {
    user: User;
    currentUserId: string;
}

export function EditUserForm({ user, currentUserId }: EditUserFormProps) {
    const router = useRouter();
    const { showToast } = useToast();
    const [showRoleModal, setShowRoleModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [processing, setProcessing] = useState(false);

    const isCurrentUser = user.id === currentUserId;
    const newRole = user.role === 'admin' ? 'user' : 'admin';

    async function handleRoleChange() {
        setProcessing(true);
        try {
            await updateUserRoleAction(user.id, newRole);
            showToast(`User role updated to ${newRole}`, 'success');
            setShowRoleModal(false);
            router.refresh();
        } catch (error: any) {
            console.error('Failed to update user role:', error);
            showToast(error.message || 'Failed to update user role', 'error');
        } finally {
            setProcessing(false);
        }
    }

    async function handleDelete() {
        setProcessing(true);
        try {
            await deleteUserAction(user.id);
            showToast('User deleted successfully', 'success');
            router.push('/admin/users');
        } catch (error: any) {
            console.error('Failed to delete user:', error);
            showToast(error.message || 'Failed to delete user', 'error');
            setProcessing(false);
            setShowDeleteModal(false);
        }
    }

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            {/* Header */}
            <div className="border-b border-white/10 pb-8">
                <Link href="/admin/users" className="text-gray-400 hover:text-white transition-colors mb-4 inline-block flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Back to Users
                </Link>
                <div className="flex items-center justify-between">
                    <h1 className="text-4xl font-bold text-white">User Details</h1>
                    {!isCurrentUser && (
                        <button
                            onClick={() => setShowDeleteModal(true)}
                            className="px-4 py-2 bg-red-500/10 text-red-400 border border-red-500/20 rounded-xl font-medium hover:bg-red-500/20 transition-colors"
                        >
                            Delete User
                        </button>
                    )}
                </div>
            </div>

            {/* User Info Card */}
            <div className="bg-zinc-900 rounded-3xl border border-white/5 p-8 space-y-6">
                {/* Profile Picture and Basic Info */}
                <div className="flex items-center gap-6 pb-6 border-b border-white/10">
                    {user.image ? (
                        <img src={user.image} alt={user.name || ""} className="w-24 h-24 rounded-full" />
                    ) : (
                        <div className="w-24 h-24 rounded-full bg-purple-500/20 text-purple-400 border-2 border-purple-500/30 flex items-center justify-center text-3xl font-bold">
                            {user.email[0].toUpperCase()}
                        </div>
                    )}
                    <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                            <h2 className="text-2xl font-bold text-white">{user.name || "No Name"}</h2>
                            {isCurrentUser && (
                                <span className="text-sm text-purple-400 bg-purple-500/10 px-3 py-1 rounded-full border border-purple-500/20">
                                    You
                                </span>
                            )}
                        </div>
                        <p className="text-gray-400">{user.email}</p>
                    </div>
                </div>

                {/* User Details */}
                <div className="grid grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">User ID</label>
                        <div className="px-4 py-3 bg-black border border-white/10 rounded-xl text-white font-mono text-sm">
                            {user.id}
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">Email</label>
                        <div className="px-4 py-3 bg-black border border-white/10 rounded-xl text-white">
                            {user.email}
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">Name</label>
                        <div className="px-4 py-3 bg-black border border-white/10 rounded-xl text-white">
                            {user.name || "Not set"}
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">Role</label>
                        <div className="flex items-center gap-3">
                            <span className={`inline-flex items-center px-4 py-2 rounded-xl text-sm font-medium ${user.role === 'admin'
                                ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20'
                                : 'bg-zinc-800 text-gray-400 border border-white/10'
                                }`}>
                                {user.role}
                            </span>
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">Provider</label>
                        <div className="px-4 py-3 bg-black border border-white/10 rounded-xl text-white capitalize">
                            {user.provider || "N/A"}
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">Status</label>
                        <span className="inline-flex items-center px-4 py-2 rounded-xl text-sm font-medium bg-green-500/10 text-green-400 border border-green-500/20">
                            Active
                        </span>
                    </div>
                </div>

                {/* Timestamps */}
                <div className="pt-4 border-t border-white/10 grid grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">Joined</label>
                        <div className="text-white">
                            {user.created_at
                                ? new Date(user.created_at * 1000).toLocaleDateString(undefined, {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit'
                                })
                                : 'N/A'
                            }
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">Last Updated</label>
                        <div className="text-white">
                            {user.updated_at
                                ? new Date(user.updated_at * 1000).toLocaleDateString(undefined, {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit'
                                })
                                : 'N/A'
                            }
                        </div>
                    </div>
                </div>

                {/* Actions */}
                <div className="pt-6 border-t border-white/10 flex items-center justify-between">
                    <Link href="/admin/users" className="px-6 py-3 bg-zinc-800 text-white rounded-xl font-medium hover:bg-zinc-700 transition-colors">
                        Back to Users
                    </Link>
                    {!isCurrentUser && (
                        <button
                            onClick={() => setShowRoleModal(true)}
                            className="px-6 py-3 bg-purple-500 text-white rounded-xl font-bold hover:bg-purple-600 transition-colors flex items-center gap-2"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                            </svg>
                            {user.role === 'admin' ? 'Remove Admin' : 'Make Admin'}
                        </button>
                    )}
                </div>
            </div>

            {/* Role Change Confirmation Modal */}
            {showRoleModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                    <div className="bg-zinc-900 border border-white/10 rounded-3xl p-8 max-w-md w-full shadow-2xl transform transition-all">
                        <h3 className="text-2xl font-bold text-white mb-4">
                            {user.role === 'admin' ? 'Remove Admin Role?' : 'Make Admin?'}
                        </h3>
                        <p className="text-gray-400 mb-8">
                            {user.role === 'admin' ? (
                                <>
                                    Are you sure you want to remove admin privileges from <span className="text-white font-medium">"{user.name || user.email}"</span>?
                                </>
                            ) : (
                                <>
                                    Are you sure you want to grant admin privileges to <span className="text-white font-medium">"{user.name || user.email}"</span>?
                                </>
                            )}
                        </p>
                        <div className="flex items-center justify-end gap-4">
                            <button
                                onClick={() => setShowRoleModal(false)}
                                disabled={processing}
                                className="px-6 py-3 bg-zinc-800 text-white rounded-xl font-medium hover:bg-zinc-700 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleRoleChange}
                                disabled={processing}
                                className="px-6 py-3 bg-purple-500 text-white rounded-xl font-bold hover:bg-purple-600 transition-colors disabled:opacity-50 flex items-center gap-2"
                            >
                                {processing ? (
                                    <>
                                        <Loading size={16} />
                                        Processing...
                                    </>
                                ) : (
                                    'Confirm'
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {showDeleteModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                    <div className="bg-zinc-900 border border-white/10 rounded-3xl p-8 max-w-md w-full shadow-2xl transform transition-all">
                        <h3 className="text-2xl font-bold text-white mb-4">Delete User?</h3>
                        <p className="text-gray-400 mb-8">
                            Are you sure you want to delete <span className="text-white font-medium">"{user.name || user.email}"</span>? This action cannot be undone.
                        </p>
                        <div className="flex items-center justify-end gap-4">
                            <button
                                onClick={() => setShowDeleteModal(false)}
                                disabled={processing}
                                className="px-6 py-3 bg-zinc-800 text-white rounded-xl font-medium hover:bg-zinc-700 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDelete}
                                disabled={processing}
                                className="px-6 py-3 bg-red-500 text-white rounded-xl font-bold hover:bg-red-600 transition-colors disabled:opacity-50 flex items-center gap-2"
                            >
                                {processing ? (
                                    <>
                                        <Loading size={16} />
                                        Deleting...
                                    </>
                                ) : (
                                    'Delete'
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
