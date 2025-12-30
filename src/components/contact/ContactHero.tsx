"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import ContactForm from "./ContactForm";

export default function ContactHero() {
    const [randomImage, setRandomImage] = useState<"AF1" | "AF2" | null>(null);

    useEffect(() => {
        // Randomly select between AF1 and AF2
        setRandomImage(Math.random() > 0.5 ? "AF1" : "AF2");
    }, []);

    if (!randomImage) return null;

    return (
        <section className="relative z-10 w-full min-h-screen pt-32 md:pt-64 pb-20">
            <div className="max-w-[1440px] mx-auto px-6 md:px-[var(--grid-margin)]">
                {/* Main Header */}
                <div className="flex flex-col items-center mb-12 md:mb-16">
                    <h1
                        className="text-white text-center uppercase tracking-tighter"
                        style={{
                            fontFamily: 'var(--font-poppins)',
                            fontWeight: 500,
                            fontSize: 'clamp(40px, 8vw, 100px)',
                            lineHeight: '0.9',
                        }}
                    >
                        GET IN TOUCH
                    </h1>
                </div>

                <div className="grid lg:grid-cols-2 gap-24 lg:gap-40 items-center">
                    {/* Left Side - Image Only (Hidden on Mobile) */}
                    <div className="hidden md:flex flex-col justify-center min-h-[400px]">
                        <div className="relative w-full aspect-square max-w-[600px] mx-auto lg:mx-0 2xl:-translate-x-32 xl:-translate-x-16 animate-in fade-in zoom-in duration-1000">
                            <Image
                                src={`/assets/${randomImage}.svg`}
                                alt="SceneYard After Effects Illustration"
                                fill
                                className="object-contain drop-shadow-[0_0_50px_rgba(67,37,246,0.3)]"
                                priority
                            />
                        </div>
                    </div>

                    {/* Right Side - Contact Form */}
                    <div className="animate-in fade-in slide-in-from-right-8 duration-1000">
                        <ContactForm />
                    </div>
                </div>
            </div>
        </section>
    );
}
