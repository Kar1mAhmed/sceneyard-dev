"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

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
                className="w-full flex items-center justify-between px-4 md:px-6 py-10 text-left group transition-colors duration-300 bg-transparent"
            >
                <span
                    className="uppercase transition-colors duration-300 text-lg md:text-2xl lg:text-[28px]"
                    style={{
                        fontFamily: 'var(--font-poppins)',
                        fontWeight: 600,
                        lineHeight: '120%',
                        color: isOpen ? 'rgba(228, 228, 230, 1)' : 'rgba(98, 100, 108, 1)'
                    }}
                >
                    {question}
                </span>

                <div
                    className={`flex items-center justify-center rounded-full transition-all duration-300 w-10 h-10 md:w-[52px] md:h-[52px] flex-shrink-0 ${isOpen ? 'bg-[var(--color-primary-95)] text-white border-transparent' : 'bg-transparent text-[rgba(98,100,108,1)] border border-[rgba(59,59,69,1)]'}`}
                    style={{
                        transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)'
                    }}
                >
                    <ChevronDown size={20} className="md:w-6 md:h-6" />
                </div>
            </button>

            <div
                className={`grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
            >
                <div className="overflow-hidden">
                    <div className="px-4 md:px-6 pb-6 md:pb-8">
                        <p
                            className="text-white/80 text-sm md:text-lg max-w-[1200px]"
                            style={{
                                fontFamily: 'var(--font-geist-mono)',
                                fontWeight: 400,
                                lineHeight: '150%',
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

export default function FAQList() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const questions = [
        {
            q: "ARE THESE ORIGINAL OR RESOLD?",
            a: "100% original. Every template in our library is handcrafted, tested, and organized by our internal team of motion designers to ensure the highest quality and performance."
        },
        {
            q: "DO I NEED PLUGINS?",
            a: "Most of our templates are built to be completely plugin-free. If a specific template requires a plugin, it will be clearly mentioned in the template details. We prioritize clean, native After Effects workflows."
        },
        {
            q: "CAN I USE THESE FOR CLIENT WORK?",
            a: "Yes! Every subscription includes a commercial license that allows you to use our templates for both personal and client projects, including social media, broadcast, and digital ads."
        },
        {
            q: "WHAT AE VERSION DO I NEED?",
            a: "Our templates are generally compatible with After Effects CC 2020 and newer. We always recommend using the latest version of After Effects for the best experience and performance."
        },
        {
            q: "HOW DO CREDITS WORK?",
            a: "SceneYard operates on a credit-based system. Each template costs between 1 to 4 credits based on its complexity. You receive a monthly allotment of credits based on your subscription tier."
        },
        {
            q: "DO UNUSED CREDITS ROLL OVER?",
            a: "Yes! Depending on your plan, unused credits roll over for 1 to 3 months. This ensures you never lose the value you've paid for if you haven't found the perfect template yet."
        },
        {
            q: "IS THERE A QUALITY GUARANTEE?",
            a: "Absolutely. Every template is tested for render performance and clean organization. If you encounter any technical issues with a project file, our support team is ready to help."
        },
        {
            q: "HOW DO I REQUEST A TEMPLATE?",
            a: "We love hearing from our community! You can submit template requests via our feedback form. Pro and Ultimate members get priority on these requests."
        },
        {
            q: "WHAT IS THE GOLDEN MEMBERSHIP?",
            a: "Golden Membership is an exclusive program for our early supporters. Golden Members receive extra perks, including +15% credits for life and early access to new releases."
        },
        {
            q: "CAN I UPGRADE OR DOWNGRADE ANYTIME?",
            a: "Yes, you can manage your subscription from your account dashboard. Upgrades take effect immediately, while downgrades will apply at the start of your next billing cycle."
        },
        {
            q: "WHAT HAPPENS IF I CANCEL?",
            a: "If you cancel, you'll still have access to your credits and downloads until the end of your current billing period. After that, your account will revert to the free trial status."
        },
        {
            q: "HOW DO REFERRALS WORK?",
            a: "Share SceneYard with your friends! When someone signs up using your referral link and subscribes, both you and your friend receive bonus credits added to your balance."
        },
    ];

    return (
        <div
            className="flex flex-col mb-20 mx-auto"
            style={{ width: 'calc(100% - (var(--grid-margin) * 2))' }}
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
    );
}
