"use client";

import { useState } from 'react';
import { FiCopy, FiCheck, FiChevronDown } from 'react-icons/fi';
import { Button } from '../ui/Button';
import { useToast } from '../layout/ToastProvider';

export default function ContactForm() {
    const { showToast } = useToast();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isEmailCopied, setIsEmailCopied] = useState(false);

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const copyEmailToClipboard = async () => {
        try {
            await navigator.clipboard.writeText('support@sceneyard.com');
            setIsEmailCopied(true);
            showToast('Email copied to clipboard!', 'success');
            setTimeout(() => setIsEmailCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy email:', err);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const result = await response.json() as any;

            if (!response.ok) {
                throw new Error(result.error || 'Failed to send message');
            }

            console.log('Form submitted successfully:', result);
            setFormData({ name: '', email: '', message: '' });
            showToast('Your message has been received! We will get back to you soon.', 'success');
        } catch (error: any) {
            console.error('Submission error:', error);
            showToast(`Error: ${error.message}`, 'error');
        } finally {
            setIsSubmitting(false);
        }
    };

    const labelStyle = {
        fontFamily: 'var(--font-geist-mono)',
        fontWeight: 400,
        fontSize: '11px',
        lineHeight: '14.35px',
        letterSpacing: '0.64px',
        textTransform: 'uppercase' as const,
    };

    return (
        <div className="w-full">
            {/* Header with Email and Actions */}
            <div className="mb-8">
                <div className="flex justify-between items-start mb-4">
                    <p
                        className="text-white/60"
                        style={labelStyle}
                    >
                        DROP A LINE
                    </p>
                    <button
                        onClick={copyEmailToClipboard}
                        className={`flex items-center gap-2 transition-colors ${isEmailCopied ? 'text-green-400' : 'text-white/60 hover:text-white'
                            }`}
                        style={labelStyle}
                    >
                        COPY EMAIL
                        {isEmailCopied ? <FiCheck className="w-3 h-3" /> : <FiCopy className="w-3 h-3" />}
                    </button>
                </div>
                <h3
                    className="text-[#F9D423] break-all"
                    style={{
                        fontFamily: 'var(--font-poppins)',
                        fontWeight: 400,
                        fontSize: 'clamp(20px, 4vw, 42px)',
                        lineHeight: '1.1',
                        letterSpacing: '0%',
                        whiteSpace: 'nowrap',
                    }}
                >
                    support@sceneyard.com
                </h3>
            </div>

            {/* Form Fields */}
            <form onSubmit={handleSubmit} className="space-y-8">
                <div className="flex flex-col gap-8">
                    {/* Name Field */}
                    <div className="relative group">
                        <label
                            className="block text-white/50 mb-1"
                            style={labelStyle}
                        >
                            NAME *
                        </label>
                        <input
                            type="text"
                            required
                            value={formData.name}
                            onChange={(e) => handleInputChange('name', e.target.value)}
                            className="w-full bg-transparent border-b border-white/20 text-white py-2 focus:outline-none focus:border-white transition-colors font-medium"
                        />
                    </div>

                    {/* Email Field */}
                    <div className="relative group">
                        <label
                            className="block text-white/50 mb-1"
                            style={labelStyle}
                        >
                            EMAIL *
                        </label>
                        <input
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e) => handleInputChange('email', e.target.value)}
                            className="w-full bg-transparent border-b border-white/20 text-white py-2 focus:outline-none focus:border-white transition-colors font-medium"
                        />
                    </div>

                    {/* Message Field */}
                    <div className="relative group">
                        <label
                            className="block text-white/50 mb-1"
                            style={labelStyle}
                        >
                            MESSAGE
                        </label>
                        <input
                            type="text"
                            value={formData.message}
                            onChange={(e) => handleInputChange('message', e.target.value)}
                            className="w-full bg-transparent border-b border-white/20 text-white py-2 focus:outline-none focus:border-white transition-colors font-medium"
                        />
                    </div>
                </div>

                {/* Submit Button */}
                <Button
                    type="submit"
                    variant="primary"
                    disabled={isSubmitting}
                    className="!w-full !max-w-none mt-6 uppercase tracking-widest font-bold"
                >
                    {isSubmitting ? 'SENDING...' : 'hit us up'}
                </Button>
            </form>
        </div>
    );
}
