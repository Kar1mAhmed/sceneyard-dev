import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/features/auth/auth';
import { updateCategory, deleteCategory } from '@/features/categories/repo';

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const startTime = Date.now();

    try {
        const session = await auth();
        const userEmail = session?.user?.email || 'unknown';
        const { id } = await params;
        console.log(`[/api/categories/${id}] [PUT] Request started - User: ${userEmail}`);

        // @ts-ignore
        if (session?.user?.role !== 'admin') {
            console.log(`[/api/categories/${id}] [PUT] [401] Unauthorized access attempt - User: ${userEmail}`);
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await request.json() as { name: string };
        const { name } = body;

        if (!name) {
            console.log(`[/api/categories/${id}] [PUT] [400] Validation error: Missing category name - User: ${userEmail}`);
            return NextResponse.json({ error: 'Name is required' }, { status: 400 });
        }

        console.log(`[/api/categories/${id}] [PUT] Updating category to: "${name}" - User: ${userEmail}`);
        await updateCategory(id, name);
        const duration = Date.now() - startTime;
        console.log(`[/api/categories/${id}] [PUT] [200] Category updated successfully - Duration: ${duration}ms`);
        return NextResponse.json({ success: true });

    } catch (error) {
        const duration = Date.now() - startTime;
        console.error(`[/api/categories] [PUT] [500] Error updating category - Duration: ${duration}ms`, error);
        return NextResponse.json({ error: 'Failed to update category' }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const startTime = Date.now();

    try {
        const session = await auth();
        const userEmail = session?.user?.email || 'unknown';
        const { id } = await params;
        console.log(`[/api/categories/${id}] [DELETE] Request started - User: ${userEmail}`);

        // @ts-ignore
        if (session?.user?.role !== 'admin') {
            console.log(`[/api/categories/${id}] [DELETE] [401] Unauthorized access attempt - User: ${userEmail}`);
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        console.log(`[/api/categories/${id}] [DELETE] Deleting category - User: ${userEmail}`);
        await deleteCategory(id);
        const duration = Date.now() - startTime;
        console.log(`[/api/categories/${id}] [DELETE] [200] Category deleted successfully - Duration: ${duration}ms`);
        return NextResponse.json({ success: true });

    } catch (error) {
        const duration = Date.now() - startTime;
        console.error(`[/api/categories] [DELETE] [500] Error deleting category - Duration: ${duration}ms`, error);
        return NextResponse.json({ error: 'Failed to delete category' }, { status: 500 });
    }
}
