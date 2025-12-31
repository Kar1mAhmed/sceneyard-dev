import Image from 'next/image';
import { Calendar, Monitor } from 'lucide-react';
import { Button } from '@/src/components/ui/Button';

interface DownloadRowProps {
    template: {
        id: string;
        title: string;
        thumbnailUrl: string;
        aspectRatio: string;
        downloadDate: string;
        fileUrl?: string;
    };
}

export default function DownloadRow({ template }: DownloadRowProps) {
    const formattedDate = new Date(template.downloadDate).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    });

    return (
        <div className="relative w-full py-6">
            <div className="flex items-center justify-between gap-4">
                {/* Left: Thumbnail + Details */}
                <div className="flex items-center gap-4 md:gap-6 flex-1 min-w-0">
                    {/* Thumbnail */}
                    <div className="relative w-24 h-16 md:w-32 md:h-20 rounded-xl overflow-hidden flex-shrink-0 bg-[#1C1C21] border border-white/5">
                        <Image
                            src={template.thumbnailUrl}
                            alt={template.title}
                            fill
                            className="object-cover"
                        />
                    </div>

                    {/* Title + Aspect Ratio */}
                    <div className="flex flex-col gap-2 min-w-0">
                        <h3
                            className="text-white font-semibold text-base md:text-lg truncate"
                            style={{ fontFamily: 'var(--font-poppins), sans-serif' }}
                        >
                            {template.title}
                        </h3>
                        <div className="flex items-center gap-2 text-white/40">
                            <Monitor className="w-4 h-4" />
                            <span
                                className="text-sm"
                                style={{ fontFamily: 'var(--font-geist-mono), monospace' }}
                            >
                                {template.aspectRatio}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Right: Date + Button */}
                <div className="flex flex-col items-end gap-3 flex-shrink-0">
                    {/* Date */}
                    <div className="flex items-center gap-2 text-white/60">
                        <Calendar className="w-4 h-4" />
                        <span
                            className="text-sm"
                            style={{ fontFamily: 'var(--font-geist-mono), monospace' }}
                        >
                            {formattedDate}
                        </span>
                    </div>

                    {/* Download Again Button */}
                    <button
                        className="px-5 py-2 rounded-full border border-white/20 text-white/80 text-sm transition-all hover:bg-white/5 hover:border-white/30"
                        style={{ fontFamily: 'var(--font-geist-mono), monospace' }}
                    >
                        Download again
                    </button>
                </div>
            </div>

            {/* Bottom Line */}
            <div
                className="absolute bottom-0 left-0 right-0 h-[1px]"
                style={{ background: 'var(--color-grid-line)' }}
            />
        </div>
    );
}
