'use client';

import React from 'react';
import TemplateCard from './TemplateCard';

interface Template {
    id: string;
    title: string;
    thumbnail_r2_key?: string;
    orientation: 'horizontal' | 'vertical';
    likes_count: number;
    downloads_count: number;
    credits_cost: number;
}

interface TemplateGridProps {
    templates: Template[];
}

export default function TemplateGrid({ templates }: TemplateGridProps) {
    if (!templates || templates.length === 0) {
        return (
            <div className="w-full flex justify-center py-20 px-4">
                <div className="w-full max-w-6xl text-center py-20 border border-white/5 rounded-[40px] bg-white/[0.02] backdrop-blur-sm">
                    <p className="text-white/40 font-medium text-lg">No templates found in the library yet.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full flex justify-center px-[calc(var(--grid-margin)+1.5%)] pb-20">
            <div className="w-full">
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6 grid-flow-row-dense auto-rows-[140px] sm:auto-rows-[200px] md:auto-rows-[240px]">
                    {templates.map((template) => (
                        <TemplateCard key={template.id} template={template} />
                    ))}
                </div>
            </div>
        </div>
    );
}
