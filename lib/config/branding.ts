/**
 * SceneYard Branding Configuration
 * 
 * This file contains all brand colors, fonts, and design tokens
 * used throughout the application.
 */

export const brandColors = {
    primary: {
        DEFAULT: '#7558f8',
        rgb: '117, 88, 248',
    },
    secondary: {
        cyan: '#00fff0',
        yellow: '#ffd53e',
        purple: '#d77bff',
    },
    neutral: {
        white: '#e8eaf6',
        black: '#0f111a',
    },
} as const;

export const brandFonts = {
    family: {
        brSonoma: 'BR Sonoma, system-ui, -apple-system, sans-serif',
    },
    weights: {
        light: 300,
        regular: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
    },
} as const;

// Tailwind CSS compatible color palette
export const tailwindColors = {
    primary: brandColors.primary.DEFAULT,
    'secondary-cyan': brandColors.secondary.cyan,
    'secondary-yellow': brandColors.secondary.yellow,
    'secondary-purple': brandColors.secondary.purple,
    'brand-white': brandColors.neutral.white,
    'brand-black': brandColors.neutral.black,
} as const;

// Export type for TypeScript autocomplete
export type BrandColor = keyof typeof tailwindColors;
