"use client";

import React from "react";
import SectionHeader from "../ui/SectionHeader";
import SelectionBox from "../ui/SelectionBox";

export default function FAQHero() {
    return (
        <div className="w-full relative z-20 mb-2 md:mb-4">
            <SectionHeader
                title={
                    <div className="flex flex-col items-center gap-2">
                        <div className="flex flex-row flex-wrap items-center justify-center gap-x-[0.3em] gap-y-2 w-full z-10 px-4">
                            <SelectionBox
                                text="Frequently"
                                color="var(--color-primary-95)"
                                className="!text-2xl sm:!text-3xl md:!text-4xl lg:!text-6xl uppercase"
                            />
                            <span className="text-2xl sm:!text-3xl md:!text-4xl lg:!text-6xl uppercase text-white font-medium">
                                Asked Questions
                            </span>
                        </div>
                    </div>
                }
                subtitle={
                    <>
                        Everything you need to know about SceneYard<br />
                        Clear answers to common questions
                    </>
                }
            />
            {/* Bottom Line for Header */}
            <div className="absolute bottom-0 left-0 right-0 h-[1px]" style={{ background: 'var(--color-grid-line)' }} />
        </div>
    );
}
