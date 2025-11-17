'use client';

/**
 * Hero Section Component
 * 
 * Landing page hero with Google sign-in
 */

import { GoogleSignInButton } from '@/components/auth/google-signin-button';

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-brand-black">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary-purple/10 to-secondary-cyan/10 animate-gradient" />
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-20 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-8 animate-fade-in">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
          </span>
          Premium Video Templates
        </div>

        {/* Main heading */}
        <h1 className="text-6xl md:text-8xl font-bold text-brand-white mb-6 animate-fade-in-up">
          Create Stunning
          <br />
          <span className="bg-gradient-to-r from-primary via-secondary-purple to-secondary-cyan bg-clip-text text-transparent animate-gradient-text">
            Video Content
          </span>
        </h1>

        {/* Subheading */}
        <p className="text-xl md:text-2xl text-brand-white/70 mb-12 max-w-3xl mx-auto animate-fade-in-up animation-delay-200">
          Access professional video templates for your project. Download, customize, and create amazing content in minutes.
        </p>

        {/* CTA Button */}
        <div className="animate-fade-in-up animation-delay-400">
          <GoogleSignInButton />
        </div>

        {/* Features */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 text-left animate-fade-in-up animation-delay-600">
          <div className="p-6 rounded-2xl bg-brand-white/5 backdrop-blur-sm border border-brand-white/10 hover:border-primary/50 transition-all duration-300 hover:scale-105">
            <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-brand-white mb-2">
              Premium Templates
            </h3>
            <p className="text-brand-white/60">
              High-quality video templates for every need
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-brand-white/5 backdrop-blur-sm border border-brand-white/10 hover:border-secondary-cyan/50 transition-all duration-300 hover:scale-105">
            <div className="w-12 h-12 rounded-xl bg-secondary-cyan/20 flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-secondary-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-brand-white mb-2">
              Instant Download
            </h3>
            <p className="text-brand-white/60">
              Get your templates immediately after purchase
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-brand-white/5 backdrop-blur-sm border border-brand-white/10 hover:border-secondary-purple/50 transition-all duration-300 hover:scale-105">
            <div className="w-12 h-12 rounded-xl bg-secondary-purple/20 flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-secondary-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-brand-white mb-2">
              Credit System
            </h3>
            <p className="text-brand-white/60">
              Flexible pricing with our credit-based system
            </p>
          </div>
        </div>
      </div>

      {/* Floating elements */}
      <div className="absolute top-20 left-10 w-20 h-20 rounded-full bg-primary/20 blur-3xl animate-float" />
      <div className="absolute bottom-20 right-10 w-32 h-32 rounded-full bg-secondary-cyan/20 blur-3xl animate-float animation-delay-1000" />
      <div className="absolute top-1/2 left-1/4 w-24 h-24 rounded-full bg-secondary-purple/20 blur-3xl animate-float animation-delay-2000" />
    </section>
  );
}
