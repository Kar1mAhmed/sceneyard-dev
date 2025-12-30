"use client";

import React from "react";
import SectionHeader from "../ui/SectionHeader";
import SelectionBox from "../ui/SelectionBox";
import {
    Lock,
    XCircle,
    CreditCard
} from "lucide-react";
import {
    FaPaypal,
    FaCcVisa,
    FaCcMastercard,
    FaApplePay
} from "react-icons/fa";
import {
    SiGooglepay,
    SiSamsungpay
} from "react-icons/si";

interface PaymentFeatureProps {
    icon: React.ElementType;
    title: string;
    description?: string;
    brandIcons?: React.ReactNode;
}

function PaymentFeature({ icon: Icon, title, description, brandIcons }: PaymentFeatureProps) {
    return (
        <div className="flex flex-col items-center text-center p-6 md:p-12 gap-8 group">
            {/* Icon Container - Matching FeaturesSection style */}
            <div
                className="flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '50px',
                    padding: '12px',
                    background: 'var(--color-dark-12)',
                    border: '4px solid var(--color-dark-15)',
                    boxShadow: 'inset 8px 6px 6px 1px rgba(255, 255, 255, 0.05)'
                }}
            >
                <Icon size={28} className="text-white" />
            </div>

            <div className="flex flex-col items-center gap-4">
                {/* Big Text */}
                <h3
                    className="text-white"
                    style={{
                        fontFamily: 'var(--font-poppins)',
                        fontWeight: 600,
                        fontSize: 'clamp(20px, 2.5vw, 24px)',
                        lineHeight: '120%',
                        letterSpacing: '-1.12px',
                    }}
                >
                    {title}
                </h3>

                {/* Sub Text or Brand Icons */}
                {description && (
                    <p
                        className="text-white/60 max-w-[280px]"
                        style={{
                            fontFamily: 'var(--font-geist-mono)',
                            fontWeight: 400,
                            fontSize: '14px',
                            lineHeight: '120%',
                            letterSpacing: '0.6px',
                        }}
                    >
                        {description}
                    </p>
                )}

                {brandIcons && (
                    <div className="flex items-center justify-center gap-4 mt-2">
                        {brandIcons}
                    </div>
                )}
            </div>
        </div>
    );
}

export default function SecureCheckoutSection() {
    return (
        <section className="w-full relative flex flex-col items-center py-10 overflow-visible">
            {/* Section Header */}
            <div className="w-full relative z-20 mb-8 px-4">
                <SectionHeader
                    title={
                        <div className="flex flex-col items-center gap-2">
                            <div className="flex flex-row flex-wrap items-center justify-center gap-x-[0.3em] gap-y-2 w-full z-10 px-4">
                                <span className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl uppercase text-white font-medium whitespace-nowrap">
                                    EASY AND
                                </span>
                                <SelectionBox
                                    text="SECURE PAYMENT"
                                    color="var(--color-primary-95)"
                                    className="!text-2xl sm:!text-3xl md:!text-4xl lg:!text-6xl uppercase"
                                />
                            </div>
                        </div>
                    }
                />
            </div>

            {/* Content Container - Grid without lines */}
            <div className="w-full relative">
                <div
                    className="mx-auto grid grid-cols-1 md:grid-cols-3 relative"
                    style={{ width: 'calc(100% - (var(--grid-margin) * 2))' }}
                >
                    <PaymentFeature
                        icon={CreditCard}
                        title="Trusted payment methods"
                        brandIcons={
                            <>
                                <FaPaypal size={18} className="text-white/60 hover:text-white transition-colors" title="PayPal" />
                                <SiGooglepay size={24} className="text-white/60 hover:text-white transition-colors" title="Google Pay" />
                                <FaCcVisa size={20} className="text-white/60 hover:text-white transition-colors" title="Visa" />
                                <FaCcMastercard size={20} className="text-white/60 hover:text-white transition-colors" title="Mastercard" />
                                <SiSamsungpay size={24} className="text-white/60 hover:text-white transition-colors" title="Samsung Pay" />
                                <FaApplePay size={24} className="text-white/60 hover:text-white transition-colors" title="Apple Pay" />
                            </>
                        }
                    />

                    <PaymentFeature
                        icon={Lock}
                        title="Secure payments"
                        description="Processed in a Level 1 PCI-compliant environment."
                    />

                    <PaymentFeature
                        icon={XCircle}
                        title="Easy cancellation"
                        description="No strings attached! It's quick, easy, and there are no cancellation fees."
                    />
                </div>
            </div>
        </section>
    );
}
