'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { User } from '@/features/users/types';

type SortOption = 'recent' | 'name' | 'role';
type FilterOption = 'all' | 'admins' | 'users';

interface UsersTableProps {
    users: User[];
    currentUserId: string;
}

export function UsersTable({ users, currentUserId }: UsersTableProps) {
    const [sortBy, setSortBy] = useState<SortOption>('recent');
    const [filterBy, setFilterBy] = useState<FilterOption>('all');
    const [searchQuery, setSearchQuery] = useState('');

    // Filter and sort users
    const filteredAndSortedUsers = useMemo(() => {
        let filtered = [...users];

        // Apply role filter
        if (filterBy === 'admins') {
            filtered = filtered.filter(u => u.role === 'admin');
        } else if (filterBy === 'users') {
            filtered = filtered.filter(u => u.role === 'user');
        }

        // Apply search filter
        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase();
            filtered = filtered.filter(u =>
                u.name?.toLowerCase().includes(query) ||
                u.email.toLowerCase().includes(query)
            );
        }

        // Apply sorting
        filtered.sort((a, b) => {
            if (sortBy === 'recent') {
                return b.created_at - a.created_at;
            } else if (sortBy === 'name') {
                const nameA = (a.name || a.email).toLowerCase();
                const nameB = (b.name || b.email).toLowerCase();
                return nameA.localeCompare(nameB);
            } else if (sortBy === 'role') {
                if (a.role === b.role) return 0;
                return a.role === 'admin' ? -1 : 1;
            }
            return 0;
        });

        return filtered;
    }, [users, filterBy, searchQuery, sortBy]);

    return (
        <>
            {/* Search and Filters */}
            <div className="bg-zinc-900 rounded-3xl border border-white/5 p-6 space-y-4">
                {/* Search */}
                <div className="relative">
                    <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <input
                        type="text"
                        placeholder="Search by name or email..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 bg-black border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
                    />
                </div>

                {/* Filters and Sort */}
                <div className="flex items-center justify-between gap-4 flex-wrap">
                    {/* Role Filter */}
                    <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-400">Filter:</span>
                        <button
                            onClick={() => setFilterBy('all')}
                            className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${filterBy === 'all'
                                ? 'bg-purple-500 text-white'
                                : 'bg-black text-gray-400 hover:text-white border border-white/10'
                                }`}
                        >
                            All
                        </button>
                        <button
                            onClick={() => setFilterBy('admins')}
                            className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${filterBy === 'admins'
                                ? 'bg-purple-500 text-white'
                                : 'bg-black text-gray-400 hover:text-white border border-white/10'
                                }`}
                        >
                            Admins
                        </button>
                        <button
                            onClick={() => setFilterBy('users')}
                            className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${filterBy === 'users'
                                ? 'bg-purple-500 text-white'
                                : 'bg-black text-gray-400 hover:text-white border border-white/10'
                                }`}
                        >
                            Users
                        </button>
                    </div>

                    {/* Sort Controls */}
                    <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-400">Sort:</span>
                        <button
                            onClick={() => setSortBy('recent')}
                            className={`p-2 rounded-lg transition-all ${sortBy === 'recent'
                                ? 'bg-purple-500/20 text-purple-400 shadow-lg shadow-purple-500/20'
                                : 'text-gray-400 hover:text-white hover:bg-white/5'
                                }`}
                            title="Recent"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </button>
                        <button
                            onClick={() => setSortBy('name')}
                            className={`p-2 rounded-lg transition-all ${sortBy === 'name'
                                ? 'bg-purple-500/20 text-purple-400 shadow-lg shadow-purple-500/20'
                                : 'text-gray-400 hover:text-white hover:bg-white/5'
                                }`}
                            title="Name (A-Z)"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
                            </svg>
                        </button>
                        <button
                            onClick={() => setSortBy('role')}
                            className={`p-2 rounded-lg transition-all ${sortBy === 'role'
                                ? 'bg-purple-500/20 text-purple-400 shadow-lg shadow-purple-500/20'
                                : 'text-gray-400 hover:text-white hover:bg-white/5'
                                }`}
                            title="Role"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Results count */}
                <div className="text-sm text-gray-400">
                    Showing {filteredAndSortedUsers.length} of {users.length} users
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
                            {filteredAndSortedUsers.map((user) => {
                                const isCurrentUser = user.id === currentUserId;
                                return (
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
                                                    <div className="font-medium text-white flex items-center gap-2">
                                                        {user.name || "No Name"}
                                                        {isCurrentUser && (
                                                            <span className="text-xs text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded-full border border-purple-500/20">
                                                                You
                                                            </span>
                                                        )}
                                                    </div>
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
                                            <Link
                                                href={`/admin/users/${user.id}`}
                                                className="text-purple-400 hover:text-purple-300 transition-colors font-medium inline-flex items-center gap-2"
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                </svg>
                                                View/Edit
                                            </Link>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

