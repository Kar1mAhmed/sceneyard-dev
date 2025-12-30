import { NextResponse } from 'next/server';
import { submitContactMessage } from '@/features/contacts/service';
import { ContactFormData } from '@/features/contacts/types';

export async function POST(req: Request) {
    try {
        const body = await req.json() as ContactFormData;

        // Validation (Zod could be used here if complex, but service handles basics)
        if (!body.name || !body.email || !body.message) {
            return NextResponse.json(
                { error: 'All fields are required' },
                { status: 400 }
            );
        }

        const message = await submitContactMessage(body);

        console.log(`[API] submitContactMessage completed successfully. Message ID: ${message.id}`);

        return NextResponse.json(
            { success: true, message: 'Message received!', data: message },
            { status: 201 }
        );
    } catch (error: any) {
        console.error('[API] Contact submission error:', error);
        return NextResponse.json(
            { error: error.message || 'Internal Server Error' },
            { status: 500 }
        );
    }
}
