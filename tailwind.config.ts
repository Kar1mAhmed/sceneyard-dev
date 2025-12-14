import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "var(--background)",
                foreground: "var(--foreground)",
                "primary-55": "var(--color-primary-55)",
                "primary-60": "var(--color-primary-60)",
                "primary-70": "var(--color-primary-70)",
                "primary-80": "var(--color-primary-80)",
                "primary-90": "var(--color-primary-90)",
                "primary-95": "var(--color-primary-95)",
                "primary-97": "var(--color-primary-97)",
                "primary-99": "var(--color-primary-99)",
                "dark-03": "var(--color-dark-03)",
                "dark-08": "var(--color-dark-08)",
                "dark-12": "var(--color-dark-12)",
                "dark-15": "var(--color-dark-15)",
                "dark-20": "var(--color-dark-20)",
                "dark-25": "var(--color-dark-25)",
                "dark-30": "var(--color-dark-30)",
                "grey-40": "var(--color-grey-40)",
                "grey-50": "var(--color-grey-50)",
                "grey-70": "var(--color-grey-70)",
                "grey-90": "var(--color-grey-90)",
                "grey-95": "var(--color-grey-95)",
                "grey-97": "var(--color-grey-97)",
                "grey-99": "var(--color-grey-99)",
            },
        },
    },
    plugins: [],
};
export default config;
