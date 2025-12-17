"use client";

import React from "react";
import { Search } from "lucide-react";

export default function SearchLibrary() {
    return (
        <div className="w-full flex justify-center px-4 relative z-20 -mt-8 mb-12 mt-20 ">
            <div
                className="w-full max-w-6xl flex items-center gap-4 px-6 h-16 rounded-full transition-all duration-300"
                style={{
                    backgroundColor: 'rgba(28, 28, 33, 1)', // --Dark-4
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
                }}
            >
                <div>
                    <Search
                        size={24}
                        style={{ color: 'rgba(98, 100, 108, 1)' }} // --Gry-1
                    />
                </div>
                <input
                    type="text"
                    placeholder="Search Templates.."
                    className="flex-1 bg-transparent border-none outline-none text-lg font-medium placeholder-[rgba(98,100,108,1)] text-white font-mono"
                />
            </div>
        </div>
    );
}
