"use client";

import React, { useState } from "react";
import SectionHeader from "../ui/SectionHeader";
import PricingCard from "./PricingCard";

import SelectionBox from "../ui/SelectionBox";
import { Button } from "../ui/Button";

// Mock functionality for the toggle
const PLANS = [
    {
        title: "PLUS",
        credits: 25,
        monthlyPrice: 15,
        annualPrice: 12, // $144 billed annually
        features: (credits: number) => [
            `Up to ${credits} templates downloads`,
            "Standard templates",
            "Rolls over 1 month",
            "Commercial license included",
        ],
        variant: "dark" as const,
        buttonLink: "/signup?plan=plus",
    },
    {
        title: "PRO",
        credits: 50,
        monthlyPrice: 25.99,
        annualPrice: 21, // $252 billed annually
        features: (credits: number) => [
            `Up to ${credits} templates downloads`,
            "Premium templates included",
            "Early access to templates",
            "Rolls over 2 months",
            "Commercial license included",
        ],
        variant: "purple" as const,
        buttonLink: "/signup?plan=pro",
        popular: true,
    },
    {
        title: "ULTIMATE",
        credits: 100,
        monthlyPrice: 39.99,
        annualPrice: 32, // $384 billed annually
        features: (credits: number) => [
            `Up to ${credits} templates downloads`,
            "Premium templates included",
            "Early access to templates",
            "Priority template requests",
            "Rolls over 3 months",
            "Commercial license included",
        ],
        variant: "dark" as const,
        buttonLink: "/signup?plan=ultimate",
    },
];

export default function PricingSection() {
    const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');

    return (
        <section className="w-full relative flex flex-col items-center">
            {/* Header */}
            <div className="w-full relative z-20 mb-20">
                <SectionHeader
                    title={
                        <div className="flex flex-col items-center gap-2">
                            <div className="flex flex-row items-center justify-center gap-[0.2em] whitespace-nowrap w-full z-10">
                                <SelectionBox text="PRICING" color="var(--color-primary-95)" />
                            </div>
                        </div>
                    }
                    subtitle={
                        <>
                            Flexible plans designed to match your workflow<br />
                            Simple credit-based plans
                        </>
                    }
                />
                <div className="absolute bottom-0 left-0 right-0 h-[1px]" style={{ background: 'var(--color-grid-line)' }} />
            </div>

            {/* Monthly / Annual Toggle */}
            <div className="mb-14 relative z-10 flex flex-col items-center gap-4">
                <div
                    className="relative flex items-center bg-[#1C1C21] p-1.5 rounded-full border border-white/10"
                    style={{
                        width: '300px',
                        height: '60px'
                    }}
                >
                    <div
                        className={`absolute top-1.5 bottom-1.5 w-[calc(50%-6px)] bg-[#E4E4E6] rounded-full transition-all duration-300 ease-out ${billingCycle === 'monthly' ? "left-1.5" : "left-[calc(50%+3px)]"
                            }`}
                    />

                    <button
                        onClick={() => setBillingCycle('monthly')}
                        className={`flex-1 relative z-10 text-lg font-medium transition-colors duration-300 ${billingCycle === 'monthly' ? "text-black" : "text-white/60 hover:text-white"
                            }`}
                        style={{ fontFamily: 'var(--font-geist-mono)' }}
                    >
                        Monthly
                    </button>
                    <button
                        onClick={() => setBillingCycle('annual')}
                        className={`flex-1 relative z-10 text-lg font-medium transition-colors duration-300 ${billingCycle === 'annual' ? "text-black" : "text-white/60 hover:text-white"
                            }`}
                        style={{ fontFamily: 'var(--font-geist-mono)' }}
                    >
                        Annual
                    </button>
                </div>
                {billingCycle === 'annual' && (
                    <span className="text-primary-95 text-sm font-medium " style={{ fontFamily: 'var(--font-geist-mono)' }}>
                        Save up to 20% with annual billing
                    </span>
                )}
            </div>

            {/* Unused Credits Roll Over Header */}
            <div className="text-center mb-12">
                <h2
                    className="text-white text-4xl md:text-5xl font-semibold mb-3 mx-10"
                    style={{ fontFamily: 'var(--font-poppins)' }}
                >
                    Unused Credits Roll Over
                </h2>
                <p
                    className="text-white/60 text-lg"
                    style={{ fontFamily: 'var(--font-geist-mono)' }}
                >
                    You never lose them
                </p>
            </div>

            {/* Pricing Cards Section */}
            <div className="w-full relative pb-12 md:pb-24">
                <div
                    className="flex justify-center pt-8 md:pt-12 xl:pt-24 mx-auto px-4"
                    style={{ width: 'calc(100% - (var(--grid-margin) * 2))', maxWidth: '1596px' }}
                >
                    <div
                        className="grid grid-cols-1 lg:grid-cols-3 gap-12 md:gap-6 xl:gap-[48px] w-full"
                    >
                        {PLANS.map((plan) => (
                            <PricingCard
                                key={plan.title}
                                title={plan.title}
                                credits={plan.credits}
                                price={billingCycle === 'monthly' ? plan.monthlyPrice : plan.annualPrice}
                                period={billingCycle}
                                features={plan.features(plan.credits)}
                                variant={plan.variant}
                                buttonLink={plan.buttonLink}
                                popular={plan.popular}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* For Teams CTA */}
            <div className="flex flex-col items-center gap-6 pt-16 md:pt-24 pb-12 md:pb-20 px-6 relative z-10 w-full max-w-4xl">
                <div className="flex flex-col items-center text-center gap-2">
                    <h3
                        className="text-white text-2xl md:text-3xl font-semibold mt-4"
                        style={{ fontFamily: 'var(--font-poppins)' }}
                    >
                        For teams
                    </h3>
                    <p
                        className="text-white/60 max-w-[600px] text-xs md:text-lg"
                        style={{ fontFamily: 'var(--font-geist-mono)' }}
                    >
                        Need more credits or custom features for your studio?
                    </p>
                </div>
                <Button
                    href="/contact"
                    variant="primary"
                    className="!w-fit !px-12 !h-[50px]"
                >
                    Contact Us
                </Button>
            </div>
        </section>
    );
}
