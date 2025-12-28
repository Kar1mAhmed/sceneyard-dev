"use client";

import React, { useState } from "react";
import Link from "next/link";
import SectionHeader from "../SectionHeader";
import { ChevronDown, ChevronUp, ArrowUp } from "lucide-react"; // Or custom icon
import { Button } from "../ui/Button";

interface FAQItemProps {
    question: string;
    answer: string;
    isOpen: boolean;
    onClick: () => void;
}

function FAQItem({ question, answer, isOpen, onClick }: FAQItemProps) {
    return (
        <div
            className="w-full border-b transition-colors duration-300"
            style={{
                borderColor: 'var(--color-grid-line)',
                backgroundColor: 'transparent'
            }}
        >
            <button
                onClick={onClick}
                className="w-full flex items-center justify-between px-4 md:px-6 py-6 md:py-8 text-left group transition-colors duration-300 bg-transparent"
            >
                <span
                    className="uppercase transition-colors duration-300 text-lg md:text-2xl lg:text-[32px]"
                    style={{
                        fontFamily: 'var(--font-poppins)',
                        fontWeight: 600,
                        lineHeight: '100%',
                        color: isOpen ? 'rgba(228, 228, 230, 1)' : 'rgba(98, 100, 108, 1)'
                    }}
                >
                    {question}
                </span>

                {/* Icon Circle */}
                <div
                    className={`flex items-center justify-center rounded-full transition-all duration-300 w-10 h-10 md:w-[52px] md:h-[52px] flex-shrink-0 ${isOpen ? 'bg-[var(--color-primary-95)] text-white border-transparent' : 'bg-transparent text-[rgba(98,100,108,1)] border border-[rgba(59,59,69,1)]'}`}
                    style={{
                        transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)'
                    }}
                >
                    <ChevronDown size={20} className="md:w-6 md:h-6" />
                </div>
            </button>

            {/* Answer Content Wrapper */}
            <div
                className={`grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
            >
                <div className="overflow-hidden">
                    <div className="px-4 md:px-6 pb-6 md:pb-8">
                        <p
                            className="text-white/80 text-sm md:text-lg"
                            style={{
                                fontFamily: 'var(--font-geist-mono)',
                                fontWeight: 400,
                                lineHeight: '130%',
                                color: 'rgba(228, 228, 230, 0.8)'
                            }}
                        >
                            {answer}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function FAQSection() {
    const [openIndex, setOpenIndex] = useState<number | null>(0); // First one open by default? Or null? usually null or 0.

    const questions = [
        { q: "ARE THESE ORIGINAL OR RESOLD?", a: "100% original. Built by our team." },
        { q: "DO I NEED PLUGINS?", a: "No plugins required. Everything works natively in After Effects." },
        { q: "CAN I USE THESE FOR CLIENT WORK?", a: "Yes! Logic allows for both personal and commercial use in client projects." },
        { q: "WHAT AE VERSION DO I NEED?", a: "Compatible with After Effects CC 2020 and newer." },
        { q: "HOW DO I RECEIVE THE FILES?", a: "Instant download link sent to your email immediately after purchase." },
    ];

    return (
        <section className="w-full relative py-10 md:py-20 flex flex-col items-center">
            {/* Header */}
            <div className="w-full relative z-20 mb-8 md:mb-16 px-4">
                <SectionHeader
                    title="Frequently Asked Questions"
                    subtitle={
                        <span style={{ color: 'var(--color-primary-50)' }}>FAQ's</span>
                    }
                />
            </div>

            {/* Accordion List - Constrained to grid margins */}
            <div
                className="flex flex-col mb-8 md:mb-16 mx-auto px-4"
                style={{ width: 'calc(100% - (var(--grid-margin) * 2))', maxWidth: '1596px' }}
            >
                {questions.map((item, index) => (
                    <FAQItem
                        key={index}
                        question={item.q}
                        answer={item.a}
                        isOpen={openIndex === index}
                        onClick={() => setOpenIndex(openIndex === index ? null : index)}
                    />
                ))}
            </div>

            {/* CTA */}
            <Button
                href="/faq"
                variant="secondary"
            >
                See All FAQ's
            </Button>
        </section>
    );
}
