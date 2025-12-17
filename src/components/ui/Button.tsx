'use client';

import React from 'react';
import Link from 'next/link';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'hero-primary' | 'hero-secondary';
    size?: 'default' | 'sm' | 'lg' | 'custom';
    href?: string;
    className?: string;
}

export const Button = ({
    variant = 'primary',
    size = 'default',
    href,
    className = '',
    disabled,
    children,
    ...props
}: ButtonProps) => {
    // Base styles
    const baseStyles = `
    relative
    flex items-center justify-center
    font-medium transition-all duration-200 ease-out
    disabled:cursor-not-allowed
    cursor-pointer
    whitespace-nowrap
  `;

    // Size styles
    const sizes = {
        default: 'w-full max-w-[300px] h-[60px] rounded-[141px] px-[42px] py-[8.08px] text-[16px] gap-[13.46px]',
        sm: 'w-auto h-[50px] rounded-full px-6 text-sm gap-2',
        lg: 'w-full max-w-[300px] h-[60px] rounded-[141px] px-[42px] py-[8.08px] text-[16px] gap-[13.46px]',
        custom: ''
    };

    // Variant-specific styles
    const variants = {
        primary: `
      bg-white text-black
      hover:bg-[rgba(202,202,206,1)]
      active:bg-[var(--color-primary-70)]
      disabled:bg-[rgba(121,124,134,1)] disabled:text-white/50
    `,
        secondary: `
      bg-transparent
      border border-[rgba(121,124,134,1)]
      text-white
      hover:border-[var(--color-primary-70)] hover:bg-[rgba(148,124,255,0.3)]
      active:bg-[var(--color-primary-95)] active:border-transparent active:text-black
      disabled:border-[rgba(98,100,108,1)] disabled:text-[rgba(98,100,108,1)]
    `,
        'hero-primary': `
      bg-white text-black
      border-[1.35px] border-white
      shadow-[0px_0px_0px_5.39px_rgba(255,255,255,0.1),0px_5.39px_40.39px_0px_rgba(255,255,255,0.6)]
      hover:scale-105 hover:shadow-[0px_0px_0px_5.39px_rgba(255,255,255,0.2),0px_8px_50px_0px_rgba(255,255,255,0.7)]
      active:scale-95
    `,
        'hero-secondary': '' // Special handling below
    };

    let variantPadding = '';
    if (variant === 'secondary' && size === 'default') variantPadding = 'px-[21.54px]';
    if (variant === 'hero-secondary') variantPadding = 'px-[21.54px]';

    // Special rendering for hero-secondary - simple transparent with white border
    if (variant === 'hero-secondary') {
        const combinedStyles = `
            ${baseStyles}
            w-full max-w-[300px] h-[60px] rounded-[134.64px] px-[21.54px] py-[8.08px] text-[16px]
            bg-transparent
            border-[2px] border-white
            text-white
            hover:scale-105 hover:bg-white/10
            active:scale-95
            ${className}
        `.trim();

        if (href && !disabled) {
            return <Link href={href} className={combinedStyles}>{children}</Link>;
        }
        return <button disabled={disabled} className={combinedStyles} {...props}>{children}</button>;
    }

    const combinedStyles = `
    ${baseStyles} 
    ${sizes[size]} 
    ${variants[variant]} 
    ${variantPadding}
    ${className}
  `.trim();

    if (href && !disabled) {
        return (
            <Link href={href} className={combinedStyles}>
                {children}
            </Link>
        );
    }

    return (
        <button
            disabled={disabled}
            className={combinedStyles}
            {...props}
        >
            {children}
        </button>
    );
};
