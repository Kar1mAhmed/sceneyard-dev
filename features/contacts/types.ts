export interface ContactMessage {
    id: string;
    name: string;
    email: string;
    message: string;
    status: 'unread' | 'read' | 'replied';
    created_at: number;
    updated_at: number;
}

export interface ContactFormData {
    name: string;
    email: string;
    message: string;
}
