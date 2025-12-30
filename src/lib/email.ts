import { getCloudflareEnv } from '@/lib/env';

interface SendEmailParams {
    to: string | string[];
    subject: string;
    html: string;
    from?: string;
    reply_to?: string;
}

export async function sendEmail({
    to,
    subject,
    html,
    from = 'onboarding@resend.dev', // Use Resend's onboarding address for unverified domains
    reply_to
}: SendEmailParams) {
    const env = getCloudflareEnv();
    const apiKey = env.RESEND_API_KEY;

    console.log(`[Email] Attempting to send email to: ${to}`);
    console.log(`[Email] API Key present: ${!!apiKey}`);

    if (!apiKey) {
        console.warn('[Email] RESEND_API_KEY not found. Skipping email send.');
        return null;
    }

    try {
        console.log('[Email] Sending request to Resend API...');
        const response = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                from,
                to: Array.isArray(to) ? to : [to],
                subject,
                html,
                reply_to
            }),
        });

        const data = await response.json();
        console.log('[Email] Resend API Response Status:', response.status);
        console.log('[Email] Resend API Response Data:', JSON.stringify(data));

        if (!response.ok) {
            throw new Error(`Resend API error: ${JSON.stringify(data)}`);
        }

        console.log(`[Email] Dispatch successful: ${subject}`);
        return data;
    } catch (error) {
        console.error('[Email] Dispatch failed:', error);
        throw error;
    }
}
