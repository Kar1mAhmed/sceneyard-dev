'use client';

import React from 'react';
import { Button } from '@/src/components/ui/Button';

export default function ButtonTestPage() {
    return (
        <div className="min-h-screen bg-black text-white p-20 flex flex-col items-center gap-10">
            <h1 className="text-3xl font-bold mb-10">Button Component Test</h1>

            {/* Primary Section */}
            <section className="flex flex-col gap-6 items-center w-full">
                <h2 className="text-xl text-[var(--color-primary-70)]">Primary Buttons</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl place-items-center">
                    <div className="flex flex-col items-center gap-2 w-full">
                        <span className="text-sm text-gray-400">Active (Default)</span>
                        <Button>Active Button</Button>
                    </div>

                    <div className="flex flex-col items-center gap-2 w-full">
                        <span className="text-sm text-gray-400">Inactive (Disabled)</span>
                        <Button disabled>Inactive Button</Button>
                    </div>
                </div>
            </section>

            {/* Secondary Section */}
            <section className="flex flex-col gap-6 items-center w-full mt-10">
                <h2 className="text-xl text-[var(--color-primary-95)]">Secondary Buttons</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl place-items-center">
                    <div className="flex flex-col items-center gap-2 w-full">
                        <span className="text-sm text-gray-400">Active (Default)</span>
                        <Button variant="secondary">Active Button</Button>
                    </div>

                    <div className="flex flex-col items-center gap-2 w-full">
                        <span className="text-sm text-gray-400">Inactive (Disabled)</span>
                        <Button variant="secondary" disabled>Inactive Button</Button>
                    </div>
                </div>
            </section>

            {/* Link Test */}
            <section className="mt-10">
                <Button href="/">Link to Home</Button>
            </section>
        </div>
    );
}
