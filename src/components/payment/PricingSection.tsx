"use client";

import React, { useState } from "react";
import SectionHeader from "../ui/SectionHeader";
import PricingCard from "./PricingCard";

import SelectionBox from "../ui/SelectionBox";

// Mock functionality for the toggle
export default function PricingSection() {
    const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');

    return (
        <section className="w-full relative flex flex-col items-center">
            {/* Top Line */}

            {/* Header - Copied from RealitySection structure with full width framing */}
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
                {/* Bottom Line for Header */}
                <div className="absolute bottom-0 left-0 right-0 h-[1px]" style={{ background: 'var(--color-grid-line)' }} />
            </div>

            {/* Monthly / Annual Toggle - Egg Shape */}
            <div className="mb-14 relative z-10">
                <div
                    className="relative flex items-center bg-[#1C1C21] p-1.5 rounded-full border border-white/10"
                    style={{
                        width: '300px', // Adjust width as needed
                        height: '60px'
                    }}
                >
                    {/* Sliding Background */}
                    <div
                        className={`absolute top-1.5 bottom-1.5 w-[calc(50%-6px)] bg-[#E4E4E6] rounded-full transition-all duration-300 ease-out ${billingCycle === 'monthly' ? "left-1.5" : "left-[calc(50%+3px)]"
                            }`}
                    />

                    {/* Buttons */}
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
            </div>

            {/* Unused Credits Roll Over Header */}
            <div className="text-center">
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

            {/* Pricing Cards Section with Full Width Lines */}
            <div className="w-full relative pb-12 md:pb-24">
                {/* Cards Container - Constrained to grid margins */}
                <div
                    className="flex justify-center pt-8 md:pt-12 xl:pt-24 mx-auto px-4"
                    style={{ width: 'calc(100% - (var(--grid-margin) * 2))', maxWidth: '1596px' }}
                >
                    <div
                        className="grid grid-cols-1 lg:grid-cols-3 gap-12 md:gap-6 xl:gap-[48px] w-full"
                    >
                        {/* PLUS Plan - Dark */}
                        <PricingCard
                            title="PLUS"
                            credits={25}
                            price={15}
                            originalPrice={25.99}
                            period={billingCycle}
                            features={[
                                "Rolls over 1 month",
                            ]}
                            variant="dark"
                            buttonLink="/signup?plan=plus"
                        />

                        {/* PRO Plan - Purple (Main) */}
                        <PricingCard
                            title="PRO"
                            credits={50}
                            price={25.99}
                            originalPrice={55.99}
                            period={billingCycle}
                            features={[
                                "Rolls over 2 months",
                                "Early access"
                            ]}
                            variant="purple"
                            buttonLink="/signup?plan=pro"
                            popular={true}
                        />

                        {/* ULTIMATE Plan - Dark */}
                        <PricingCard
                            title="ULTIMATE"
                            credits={100}
                            price={39.99}
                            originalPrice={85.99}
                            period={billingCycle}
                            features={[
                                "Rolls over 3 months",
                                "Full perks"
                            ]}
                            variant="dark"
                            buttonLink="/signup?plan=ultimate"
                        />
                    </div>
                </div>

                {/* Bottom Line */}
                <div className="absolute bottom-0 left-0 right-0 h-[1px]" style={{ background: 'var(--color-grid-line)' }} />
            </div>

        </section>
    );
}
