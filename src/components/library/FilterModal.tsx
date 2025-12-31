"use client";

import React from "react";
import { RxCheck } from "react-icons/rx";
import { Button } from "@/src/components/ui/Button";

interface FilterModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    options: string[];
    selectedOptions: string[];
    onOptionClick: (option: string) => void;
    onApply: () => void;
}

export default function FilterModal({
    isOpen,
    onClose,
    title,
    options,
    selectedOptions,
    onOptionClick,
    onApply
}: FilterModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-40 flex items-center justify-center p-6 sm:p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/40 backdrop-blur-[2px] transition-opacity duration-300 animate-fade-in"
                onClick={onClose}
            />

            {/* Modal Content */}
            <div
                className="relative z-50 w-full max-w-[400px] rounded-[32px] overflow-hidden flex flex-col bg-[#0A0A0C] border border-white/[0.06] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.8)] animate-fade-in-up"
                style={{
                    animation: 'modalSlideIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards',
                }}
            >
                {/* Header with subtle gradient line */}
                <div className="pt-10 pb-6 text-center relative">
                    <h2 className="text-white text-[22px] font-bold tracking-[0.1em] uppercase opacity-90" style={{ fontFamily: 'var(--font-poppins)' }}>
                        {title}
                    </h2>
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-[1px] bg-white/[0.1]" />
                </div>

                {/* Options List */}
                <div className="flex-1 overflow-y-auto max-h-[50vh] custom-scrollbar px-3 py-6">
                    <div className="space-y-1">
                        {options.map((option, index) => {
                            const isSelected = selectedOptions.includes(option);
                            return (
                                <div
                                    key={option}
                                    onClick={() => onOptionClick(option)}
                                    className={`flex items-center justify-between px-8 py-4 cursor-pointer rounded-2xl transition-all duration-200 group ${isSelected ? 'bg-white/[0.03]' : 'hover:bg-white/[0.02]'
                                        }`}
                                >
                                    <span
                                        className="transition-colors text-[16px] font-medium"
                                        style={{
                                            color: isSelected ? '#BEAFFF' : '#7F7C83', // Primary-80 or Grey-50
                                            fontFamily: 'var(--font-poppins)'
                                        }}
                                    >
                                        {option}
                                    </span>

                                    {/* Custom Checkbox matching original design */}
                                    <div
                                        className={`w-5 h-5 rounded-[4px] flex items-center justify-center transition-all duration-300 ${isSelected
                                                ? "bg-[rgba(148,124,255,1)] border-[2px] border-[#BEAFFF] shadow-[0_0_12px_rgba(117,88,248,0.4)]"
                                                : "bg-[#1C1C21] border-[1.5px] border-[#3B3B45]"
                                            }`}
                                    >
                                        {isSelected && <RxCheck size={14} className="text-white" />}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Footer Buttons with separation */}
                <div className="p-8 pt-4 flex gap-3 bg-white/[0.01]">
                    <Button
                        variant="primary"
                        size="sm"
                        className="flex-1 h-12 text-[15px] rounded-2xl font-semibold transition-transform active:scale-95"
                        onClick={onApply}
                    >
                        Apply
                    </Button>
                    <Button
                        variant="secondary"
                        size="sm"
                        className="flex-1 h-12 text-[15px] rounded-2xl border-white/[0.08] text-white/50 hover:text-white transition-all active:scale-95"
                        onClick={onClose}
                    >
                        Cancel
                    </Button>
                </div>
            </div>

            <style jsx>{`
                @keyframes modalSlideIn {
                    from {
                        opacity: 0;
                        transform: translateY(20px) scale(0.98);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0) scale(1);
                    }
                }
            `}</style>
        </div>
    );
}
