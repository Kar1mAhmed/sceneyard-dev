import React from "react";
import Link from "next/link";
import { Button } from "../ui/Button";

interface PricingCardProps {
    title: string;
    credits: number;
    price: number;
    originalPrice?: number;
    period: 'monthly' | 'annual';
    features: string[];
    variant?: 'dark' | 'purple';
    popular?: boolean;
    buttonLink?: string;
}

export default function PricingCard({
    title,
    credits,
    price,
    originalPrice,
    period,
    features,
    variant = 'dark',
    popular = false,
    buttonLink = "/signup"
}: PricingCardProps) {
    const isPurple = variant === 'purple';

    return (
        <div
            className={`relative flex flex-col w-full max-w-[512px] h-auto min-h-[450px] xl:min-h-[615px] justify-between p-6 xl:pt-[40px] xl:pr-[32px] xl:pb-[40px] xl:pl-[32px] transition-transform duration-300 hover:scale-[1.02] rounded-2xl ${isPurple ? "bg-[#5D18EB]" : "bg-[#131316]"
                }`}
        >
            {/* Header */}
            <div className="flex justify-between items-start mb-6">
                <h3
                    className="text-white uppercase leading-none text-2xl xl:text-[32px]"
                    style={{
                        fontFamily: 'var(--font-poppins)',
                        fontWeight: 600,
                    }}
                >
                    {title}
                </h3>
                <div
                    className={`px-3 py-1.5 xl:px-4 xl:py-2 rounded-full text-xs xl:text-sm font-semibold ${isPurple
                        ? "bg-transparent border border-white text-white"
                        : "bg-[#FFD53E] text-black"
                        }`}
                    style={{
                        fontFamily: 'var(--font-poppins)',
                    }}
                >
                    {credits} credits
                </div>
            </div>

            {/* Price */}
            <div className="mb-6 xl:mb-8">
                {originalPrice && (
                    <div
                        className="text-white/40 line-through text-base xl:text-3xl font-medium mb-1"
                        style={{ fontFamily: 'var(--font-poppins)' }}
                    >
                        ${originalPrice.toFixed(2)}
                    </div>
                )}
                <div className="flex items-baseline gap-2">
                    <span
                        className="text-white leading-none text-[48px] xl:text-[64px]"
                        style={{
                            fontFamily: 'var(--font-poppins)',
                            fontWeight: 600,
                        }}
                    >
                        ${price}
                    </span>
                    <span
                        className="text-white/60 uppercase text-xs xl:text-sm tracking-wider"
                        style={{ fontFamily: 'var(--font-geist-mono)' }}
                    >
                        PER MONTH
                    </span>
                </div>
            </div>

            {/* Divider */}
            <div className="w-full h-[1px] bg-white/20 mb-8" />

            {/* Features */}
            <ul className="flex flex-col gap-4 mb-12 flex-grow">
                {features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-4">
                        <svg
                            className="w-5 h-5 text-white flex-shrink-0 mt-0.5"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <polyline points="20 6 9 17 4 12" />
                        </svg>
                        <span
                            className="text-white font-medium"
                            style={{
                                fontFamily: 'var(--font-geist-mono)',
                                fontSize: '15px'
                            }}
                        >
                            {feature}
                        </span>
                    </li>
                ))}
            </ul>

            {/* CTA Button */}
            <div className="w-full flex justify-center mt-auto">
                <Button
                    href={buttonLink}
                    variant="primary"
                    className="!w-full !max-w-none !h-[50px]" // Full width, no max-width, shorter height
                >
                    Get Started
                </Button>
            </div>
        </div>
    );
}
