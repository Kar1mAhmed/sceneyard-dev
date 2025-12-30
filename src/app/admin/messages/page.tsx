import { auth } from "@/features/auth/auth";
import { redirect } from "next/navigation";
import { getContactMessages } from "@/features/contacts/repo";
import { MessagesTable } from "../components/MessagesTable";
import Link from "next/link";
import { FiChevronLeft, FiMail } from "react-icons/fi";

export default async function AdminMessagesPage() {
    const session = await auth();
    if (session?.user?.role !== "admin") redirect("/home");

    const messages = await getContactMessages(100);

    return (
        <div className="min-h-screen bg-black admin-bg-pattern text-white p-8 font-sans selection:bg-purple-500/30">
            <div className="max-w-7xl mx-auto space-y-12">
                {/* Header */}
                <div className="flex flex-col gap-8 border-b border-white/10 pb-8">
                    <Link
                        href="/admin"
                        className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors group text-sm font-geist-mono uppercase tracking-widest"
                    >
                        <FiChevronLeft className="group-hover:-translate-x-1 transition-transform" />
                        Back to Dashboard
                    </Link>

                    <div className="flex items-center justify-between">
                        <div>
                            <div className="flex items-center gap-4 mb-2">
                                <div className="p-3 bg-purple-500/20 rounded-2xl border border-purple-500/30">
                                    <FiMail className="w-6 h-6 text-purple-400" />
                                </div>
                                <h1 className="text-5xl font-bold text-white">
                                    Support Messages
                                </h1>
                            </div>
                            <p className="text-gray-400 text-lg">Manage user outreach and contact submissions.</p>
                        </div>
                    </div>
                </div>

                {/* Messages Content */}
                <MessagesTable messages={messages} />
            </div>
        </div>
    );
}
