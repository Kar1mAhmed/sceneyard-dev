'use client';

import { useState, useMemo } from 'react';
import { ContactMessage } from '@/features/contacts/types';
import { FiMail, FiCheck, FiTrash2, FiClock, FiUser, FiArrowRight } from 'react-icons/fi';

import { markMessageAsRead, deleteMessage } from '../actions';
import { useToast } from '@/src/components/layout/ToastProvider';

interface MessagesTableProps {
    messages: ContactMessage[];
}

export function MessagesTable({ messages }: MessagesTableProps) {
    const { showToast } = useToast();
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState<'all' | 'unread' | 'read'>('all');
    const [isActionLoading, setIsActionLoading] = useState<string | null>(null);

    const handleMarkAsRead = async (id: string) => {
        setIsActionLoading(id);
        try {
            await markMessageAsRead(id);
            showToast('Message marked as read', 'success');
        } catch (error) {
            showToast('Failed to update message', 'error');
        } finally {
            setIsActionLoading(null);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this message?')) return;
        setIsActionLoading(id);
        try {
            await deleteMessage(id);
            showToast('Message deleted', 'success');
        } catch (error) {
            showToast('Failed to delete message', 'error');
        } finally {
            setIsActionLoading(null);
        }
    };

    const filteredMessages = useMemo(() => {
        return messages.filter(m => {
            const matchesSearch =
                m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                m.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                m.message.toLowerCase().includes(searchQuery.toLowerCase());

            const matchesStatus = statusFilter === 'all' || m.status === statusFilter;

            return matchesSearch && matchesStatus;
        });
    }, [messages, searchQuery, statusFilter]);

    const formatDate = (timestamp: number) => {
        return new Date(timestamp * 1000).toLocaleDateString(undefined, {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <div className="space-y-6">
            {/* Filters */}
            <div className="bg-zinc-900 rounded-3xl border border-white/5 p-6 flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="relative w-full md:w-96">
                    <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search messages..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 bg-black border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
                    />
                </div>

                <div className="flex items-center gap-2">
                    {(['all', 'unread', 'read'] as const).map((status) => (
                        <button
                            key={status}
                            onClick={() => setStatusFilter(status)}
                            className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors capitalize ${statusFilter === status
                                ? 'bg-purple-500 text-white'
                                : 'bg-black text-gray-400 hover:text-white border border-white/10'
                                }`}
                        >
                            {status}
                        </button>
                    ))}
                </div>
            </div>

            {/* Grid of Messages */}
            <div className="grid grid-cols-1 gap-4">
                {filteredMessages.length === 0 ? (
                    <div className="bg-zinc-900 rounded-3xl border border-white/5 p-12 text-center">
                        <p className="text-gray-500">No messages found.</p>
                    </div>
                ) : (
                    filteredMessages.map((msg) => (
                        <div
                            key={msg.id}
                            className={`bg-zinc-900 rounded-3xl border transition-all p-8 relative overflow-hidden group ${msg.status === 'unread' ? 'border-purple-500/30' : 'border-white/5'
                                }`}
                        >
                            {msg.status === 'unread' && (
                                <div className="absolute top-0 left-0 w-1 h-full bg-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.5)]" />
                            )}

                            <div className="flex flex-col md:flex-row justify-between gap-6">
                                <div className="flex-1 space-y-4">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-purple-400 border border-white/10">
                                            <FiUser />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-white text-lg">{msg.name}</h4>
                                            <p className="text-purple-400 text-sm font-geist-mono uppercase tracking-wider">{msg.email}</p>
                                        </div>
                                    </div>

                                    <div className="bg-black/40 rounded-2xl p-6 border border-white/5">
                                        <p className="text-gray-300 leading-relaxed font-poppins">
                                            {msg.message}
                                        </p>
                                    </div>

                                    <div className="flex items-center gap-4 text-xs text-gray-500 font-geist-mono">
                                        <span className="flex items-center gap-1.5 uppercase">
                                            <FiClock className="text-purple-500" />
                                            {formatDate(msg.created_at)}
                                        </span>
                                        <span className={`px-2 py-0.5 rounded-full border uppercase ${msg.status === 'unread'
                                            ? 'bg-purple-500/10 border-purple-500/20 text-purple-400'
                                            : 'bg-zinc-800 border-white/10 text-gray-500'
                                            }`}>
                                            {msg.status}
                                        </span>
                                    </div>
                                </div>

                                <div className="flex flex-row md:flex-col gap-2 justify-end">
                                    <button
                                        onClick={() => handleMarkAsRead(msg.id)}
                                        disabled={isActionLoading === msg.id || msg.status === 'read'}
                                        className={`p-3 rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 transition-all group disabled:opacity-50`}
                                        title="Mark as Read"
                                    >
                                        <FiCheck className="w-5 h-5 group-hover:scale-110 transition-transform" />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(msg.id)}
                                        disabled={isActionLoading === msg.id}
                                        className="p-3 rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-all group disabled:opacity-50"
                                        title="Delete"
                                    >
                                        <FiTrash2 className="w-5 h-5 group-hover:scale-110 transition-transform" />
                                    </button>
                                    <a
                                        href={`mailto:${msg.email}`}
                                        className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 hover:bg-purple-500 hover:text-white transition-all group"
                                        title="Reply via Email"
                                    >
                                        <FiArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
