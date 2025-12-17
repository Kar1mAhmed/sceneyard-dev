"use client";

import React, { useState } from "react";
import { RxChevronDown, RxCross2, RxCheck } from "react-icons/rx";

interface FilterButtonProps {
    label: string;
    activeValue?: string; // Display string (e.g. "3 selected" or "Popular")
    isActive?: boolean;   // Controls the purple styling of the button
    onClick?: () => void;
    isOpen?: boolean;
    onToggle?: () => void;
    options?: string[];
    selectedOptions?: string[];
    onOptionClick?: (option: string) => void;
    isMultiSelect?: boolean;
}

function FilterButton({
    label,
    activeValue,
    isActive,
    isOpen,
    onToggle,
    options,
    selectedOptions = [],
    onOptionClick,
    isMultiSelect
}: FilterButtonProps) {
    return (
        <div className="relative w-full group">
            <button
                onClick={onToggle}
                className={`flex items-center justify-between gap-2 rounded-full border transition-all duration-300 w-full font-mono ${isActive
                    ? "bg-[rgba(117,88,248,1)] border-[rgba(148,124,255,0.3)] text-white"
                    : "bg-transparent border-[rgba(148,124,255,0.3)] text-white/70 hover:bg-white/5"
                    }`}
                style={{
                    height: "48px",
                    padding: "0 18px",
                    fontSize: "13px",
                    fontWeight: 400,
                    lineHeight: "100%",
                    borderWidth: "1.5px",
                    fontFamily: 'var(--font-geist-mono), monospace',
                }}
            >
                <span className="truncate">
                    {activeValue ? `${label}: ${activeValue}` : label}
                </span>

                <div className="flex-shrink-0 ml-2">
                    {/* Icon rotation based on isOpen state */}
                    <div className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}>
                        <RxChevronDown size={22} color="var()" />
                    </div>
                </div>
            </button>

            {/* Dropdown Menu */}
            {isOpen && options && (
                <div
                    className="absolute top-full left-0 right-0 mt-3 z-50 overflow-hidden"
                    style={{
                        backgroundColor: 'rgba(28, 28, 33, 1)', // Dark-4
                        borderRadius: '24px',
                        border: '1px solid rgba(148, 124, 255, 0.1)',
                        boxShadow: '0 20px 40px -10px rgba(0,0,0,0.5)',
                        padding: '16px 0'
                    }}
                >
                    <div className="flex flex-col max-h-[400px] overflow-y-auto custom-scrollbar pr-2">
                        {options.map((option, index) => {
                            const isSelected = selectedOptions.includes(option);
                            return (
                                <React.Fragment key={option}>
                                    <div
                                        onClick={() => onOptionClick && onOptionClick(option)}
                                        className="flex items-center justify-between px-6 py-4 cursor-pointer hover:bg-white/5 transition-colors group"
                                    >
                                        <span
                                            className="transition-colors"
                                            style={{
                                                fontFamily: 'var(--font-poppins), sans-serif',
                                                fontSize: '12px',
                                                fontWeight: 400,
                                                lineHeight: '120%',
                                                color: isSelected ? 'rgba(117, 88, 248, 1)' : 'rgba(175, 176, 182, 1)'
                                            }}
                                        >
                                            {option}
                                        </span>

                                        {/* Custom Checkbox */}
                                        <div
                                            className={`w-5 h-5 rounded flex items-center justify-center transition-all duration-200 ${isSelected
                                                ? "bg-[rgba(117,88,248,1)] border border-[rgba(117,88,248,1)] text-white"
                                                : "bg-transparent border border-white"
                                                }`}
                                        >
                                            {isSelected && <RxCheck size={14} />}
                                        </div>
                                    </div>
                                    {/* Separator Line */}
                                    {index < options.length - 1 && (
                                        <div className="h-[1px] bg-white/5 mx-6" />
                                    )}
                                </React.Fragment>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}


interface FilterState {
    sort: string;
    categories: string[];
    resolution: string;
    aspectRatio: string | null;
}

export default function LibraryFilters() {
    // State to simulate active filters matching the design requirements
    // In a real app, this would be connected to URL params or global state
    const [filters, setFilters] = useState<FilterState>({
        sort: "Popular",
        categories: [],
        resolution: "1080p (FHD)",
        aspectRatio: null
    });

    // Track which dropdown is currently open
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);

    const toggleDropdown = (dropdown: string) => {
        if (openDropdown === dropdown) {
            setOpenDropdown(null);
        } else {
            setOpenDropdown(dropdown);
        }
    };

    // Category Options
    const categoryOptions = [
        "After Effects",
        "Broadcast Packages",
        "Elements",
        "Infographics",
        "LUTs",
        "Openers",
        "Product Promo",
        "Titles"
    ];

    const sortOptions = ["Popular", "Newest", "Oldest", "Trending"];
    const resolutionOptions = ["1080p (FHD)", "4K (UHD)", "720p (HD)"];
    const ratioOptions = ["16:9", "9:16", "1:1", "4:5"];

    const handleCategoryClick = (option: string) => {
        setFilters(prev => {
            const exists = prev.categories.includes(option);
            if (exists) {
                return { ...prev, categories: prev.categories.filter(c => c !== option) };
            } else {
                return { ...prev, categories: [...prev.categories, option] };
            }
        });
    };

    return (
        <div className="w-full flex justify-center px-4 mb-12">
            <div className="w-full max-w-6xl grid grid-cols-4 gap-4">
                <FilterButton
                    label="Sort by"
                    activeValue={filters.sort}
                    isActive={!!filters.sort}
                    isOpen={openDropdown === "sort"}
                    onToggle={() => toggleDropdown("sort")}
                    options={sortOptions}
                    selectedOptions={filters.sort ? [filters.sort] : []}
                    onOptionClick={(opt) => setFilters(prev => ({ ...prev, sort: opt }))}
                />

                <FilterButton
                    label="Categories"
                    activeValue={filters.categories.length > 0 ? `${filters.categories.length}` : ""}
                    isActive={filters.categories.length > 0}
                    isOpen={openDropdown === "categories"}
                    onToggle={() => toggleDropdown("categories")}
                    options={categoryOptions}
                    selectedOptions={filters.categories}
                    onOptionClick={handleCategoryClick}
                    isMultiSelect={true}
                />

                <FilterButton
                    label="Resolution"
                    activeValue={filters.resolution}
                    isActive={!!filters.resolution}
                    isOpen={openDropdown === "resolution"}
                    onToggle={() => toggleDropdown("resolution")}
                    options={resolutionOptions}
                    selectedOptions={filters.resolution ? [filters.resolution] : []}
                    onOptionClick={(opt) => setFilters(prev => ({ ...prev, resolution: opt }))}
                />

                <FilterButton
                    label="Aspect ratio"
                    activeValue={filters.aspectRatio || ""}
                    isActive={!!filters.aspectRatio}
                    isOpen={openDropdown === "aspectRatio"}
                    onToggle={() => toggleDropdown("aspectRatio")}
                    options={ratioOptions}
                    selectedOptions={filters.aspectRatio ? [filters.aspectRatio] : []}
                    onOptionClick={(opt) => setFilters(prev => ({ ...prev, aspectRatio: opt }))}
                />
            </div>
        </div>
    );
}
