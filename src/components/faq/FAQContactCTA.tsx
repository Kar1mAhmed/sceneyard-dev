"use client";

import React from "react";
import { Button } from "../ui/Button";

export default function FAQContactCTA() {
    return (
        <div className="flex flex-col items-center gap-6 pt-16 md:pt-24 pb-12 md:pb-20 px-6 relative z-10 w-full max-w-4xl mx-auto mb-20">
            <div className="flex flex-col items-center text-center gap-2">
                <h3
                    className="text-white text-2xl md:text-3xl font-semibold"
                    style={{ fontFamily: 'var(--font-poppins)' }}
                >
                    Still have questions?
                </h3>
                <p
                    className="text-white/60 max-w-[280px] md:max-w-[600px] text-xs md:text-lg px-4"
                    style={{ fontFamily: 'var(--font-geist-mono)' }}
                >
                    Can't find what you're looking for? Reach out and we'll help you out in no time.
                </p>
            </div>
            <Button
                href="/contact"
                variant="primary"
                className="!w-fit !px-12 !h-[50px]"
            >
                Contact Support
            </Button>
        </div>
    );
}
