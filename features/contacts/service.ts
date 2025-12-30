import { ContactFormData, ContactMessage } from './types';
import * as repo from './repo';
import { sendEmail } from '@/src/lib/email';

export async function submitContactMessage(data: ContactFormData): Promise<ContactMessage> {
    // Basic validation
    if (!data.name || !data.email || !data.message) {
        throw new Error('All fields are required');
    }

    if (!data.email.includes('@')) {
        throw new Error('Invalid email address');
    }

    // Store in database
    const message = await repo.createContactMessage(data);

    // Trigger email notification to admin
    console.log('[ContactService] Starting email notification process...');
    try {
        const emailResult = await sendEmail({
            to: 'karim113322445@gmail.com',
            subject: `New Contact Message from ${data.name}`,
            reply_to: data.email,
            html: `
                <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
                    <h2 style="color: #4325F6;">New Contact Submission</h2>
                    <p><strong>From:</strong> ${data.name} (&lt;${data.email}&gt;)</p>
                    <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
                    <p style="white-space: pre-wrap; line-height: 1.6;">${data.message}</p>
                    <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
                    <p style="font-size: 12px; color: #666;">View in admin panel: <a href="https://sceneyard.com/admin/messages">Manage Messages</a></p>
                </div>
            `
        });
        console.log('[ContactService] Email notification result:', !!emailResult);
    } catch (emailError) {
        // Log but don't fail the submission if email fails
        console.error('[ContactService] Email notification failed:', emailError);
    }

    console.log(`[ContactService] New message from ${data.email}: ${message.id}`);

    return message;
}
