"use client";

import React from "react";

export default function ContactBackground() {
    // Generate column colors - Right (Black) to Left (Purple)
    // The user requested right to left purple to black, which means:
    // Right side = Purple
    // Left side = Black
    // Actually, looking at the image provided (uploaded_image_0_1767114465390.png):
    // The purple is on the left, and it fades to black on the right.

    const columnCount = 21;
    const columns = Array.from({ length: columnCount }, (_, i) => {
        // Calculate progress across columns (0 = left-most, 1 = right-most)
        const progress = i / (columnCount - 1);

        // Purple to Black
        // Purple components from BigColumnsHeader: { r: 110, g: 60, b: 255 }
        const purple = { r: 67, g: 37, b: 246 }; // Using SceneYard brand purple #4325f6
        const black = { r: 7, g: 7, b: 8 }; // Site background color

        const r = Math.round(purple.r + (black.r - purple.r) * progress);
        const g = Math.round(purple.g + (black.g - purple.g) * progress);
        const b = Math.round(purple.b + (black.b - purple.b) * progress);

        return `rgb(${r}, ${g}, ${b})`;
    });

    return (
        <div className="absolute inset-0 flex w-full h-full overflow-hidden">
            {/* Gradient Columns Background */}
            {columns.map((color, index) => (
                <div
                    key={index}
                    className="flex-1 h-full relative"
                    style={{
                        backgroundColor: color,
                        // Subtle vertical line dividers
                        borderRight: index < columnCount - 1 ? '1px solid rgba(255, 255, 255, 0.05)' : 'none',
                    }}
                />
            ))}

            {/* Spotlight Effect - Mid Left (White) */}
            <div
                className="absolute inset-0 pointer-events-none z-[5]"
                style={{
                    background: `
                        radial-gradient(circle at 20% 50%, rgba(255, 255, 255, 0.25) 0%, transparent 45%),
                        radial-gradient(circle at 10% 40%, rgba(255, 255, 255, 0.15) 0%, transparent 35%)
                    `
                }}
            />

            {/* Subtle Overlay */}
            <div
                className="absolute inset-0 pointer-events-none z-[5]"
                style={{
                    backgroundColor: 'rgba(0, 0, 0, 0.05)'
                }}
            />
        </div>
    );
}
