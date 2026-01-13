import { auth } from "@/features/auth/auth";
import { FaGoogle } from "react-icons/fa";
import { User, FileText, Trash2 } from "lucide-react";

export default async function AccountPage() {
    const session = await auth();
    const user = session?.user;

    return (
        <div className="w-full max-w-4xl mx-auto space-y-8">
            <div className="flex flex-col space-y-8">
                {/* Registered with Google Section */}
                <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-3">
                        <FaGoogle className="text-white text-2xl" />
                        <h2 className="text-[#CACACE] text-[20px] font-medium tracking-wide" style={{ fontFamily: 'var(--font-poppins)' }}>
                            Registered with Google
                        </h2>
                    </div>
                    <p className="text-[#CACACE] text-[14px] pl-[36px]" style={{ fontFamily: 'var(--font-geist-mono)' }}>
                        {user?.email}
                    </p>
                </div>

                {/* Divider */}
                <div className="h-[1px] w-full bg-white/10" />

                {/* User Details */}
                <div className="flex flex-col gap-6 pl-[6px]">
                    {/* Name */}
                    <div className="flex items-center gap-4">
                        <User className="text-[#CACACE] w-5 h-5" />
                        <span className="text-[#CACACE] text-[16px]" style={{ fontFamily: 'var(--font-geist-mono)' }}>
                            {user?.name || 'User'}
                        </span>
                    </div>

                    {/* Plan */}
                    <div className="flex items-center gap-4">
                        <FileText className="text-[#CACACE] w-5 h-5" />
                        <span className="text-[#CACACE] text-[16px]" style={{ fontFamily: 'var(--font-geist-mono)' }}>
                            Free Plan
                        </span>
                    </div>
                </div>

                {/* Divider */}
                <div className="h-[1px] w-full bg-white/10" />

                {/* Delete Account */}
                <div className="pl-[6px] mb-12">
                    <button className="flex items-center gap-4 group transition-colors cursor-pointer">
                        <div className="w-6 h-6 flex items-center justify-center bg-[#FF5B5B] rounded text-black group-hover:bg-[#ff7b7b] transition-colors">
                            <Trash2 size={14} strokeWidth={2.5} />
                        </div>
                        <span className="text-[#FF5B5B] text-[16px] font-medium group-hover:text-[#ff7b7b] transition-colors" style={{ fontFamily: 'var(--font-geist-mono)' }}>
                            Delete your account
                        </span>
                    </button>
                </div>
            </div>
        </div>
    );
}
