"use client";

import { useState } from "react";
import Navbar from "@/src/components/Navbar";
import Footer from "@/src/components/Footer";

interface LandingPageWrapperProps {
    children: React.ReactNode;
}

export default function LandingPageWrapper({ children }: LandingPageWrapperProps) {
    const [isFooterVisible, setIsFooterVisible] = useState(false);

    return (
        <main className="min-h-screen w-full overflow-x-hidden relative">
            <Navbar isHidden={isFooterVisible} />
            {children}
            <Footer onVisibilityChange={setIsFooterVisible} />
        </main>
    );
}
