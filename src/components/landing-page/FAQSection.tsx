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
                className="w-full flex items-center justify-between px-6 py-8 text-left group transition-colors duration-300 bg-transparent"
            >
                <span
                    className="uppercase transition-colors duration-300"
                    style={{
                        fontFamily: 'var(--font-poppins)',
                        fontWeight: 600,
                        fontSize: '32px',
                        lineHeight: '100%',
                        color: isOpen ? 'rgba(228, 228, 230, 1)' : 'rgba(98, 100, 108, 1)'
                    }}
                >
                    {question}
                </span>

                {/* Icon Circle */}
                <div
                    className={`flex items-center justify-center rounded-full transition-all duration-300 ${isOpen ? 'bg-[var(--color-primary-95)] text-white border-transparent' : 'bg-transparent text-[rgba(98,100,108,1)] border border-[rgba(59,59,69,1)]'}`}
                    style={{
                        width: '52px',
                        height: '52px',
                        transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)'
                    }}
                >
                    <ChevronDown size={24} />
                </div>
            </button>

            {/* Answer Content Wrapper - Grid Transition for smoothness */}
            <div
                className={`grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
            >
                <div className="overflow-hidden">
                    <div className="px-6 pb-8">
                        <p
                            className="text-white/80"
                            style={{
                                fontFamily: 'var(--font-geist-mono)',
                                fontWeight: 400,
                                fontSize: '18px',
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
        <section className="w-full relative py-20 flex flex-col items-center">
            {/* Header */}
            <div className="w-full relative z-20 mb-16 px-4">
                <SectionHeader
                    title="Frequently Asked Questions"
                    subtitle={
                        <span style={{ color: 'var(--color-primary-50)' }}>FAQ's</span>
                    }
                />
            </div>

            {/* Accordion List */}
            <div className="w-full px-4 md:px-[var(--grid-margin)] flex flex-col mb-16">
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
