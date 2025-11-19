export type UserRole = 'user' | 'admin';

export interface User {
    id: string;
    email: string;
    name: string | null;
    image: string | null;
    role: UserRole;
    provider: string | null;
    provider_id: string | null;
    created_at: number;
    updated_at: number;
}
