/**
 * Database health check utility
 */

export async function testDatabaseConnection(db: D1Database): Promise<{ healthy: boolean; error?: string }> {
    try {
        // Simple query to test connection
        const result = await db.prepare('SELECT 1 as test').first();

        if (result && result.test === 1) {
            return { healthy: true };
        }

        return { healthy: false, error: 'Query returned unexpected result' };
    } catch (error: any) {
        return {
            healthy: false,
            error: error.message || 'Unknown database error'
        };
    }
}

export async function logDatabaseInfo(db: D1Database, context: string) {
    console.log(`🔍 [${context}] Testing database connection...`);

    const health = await testDatabaseConnection(db);

    if (health.healthy) {
        console.log(`✅ [${context}] Database connection healthy`);
    } else {
        console.error(`❌ [${context}] Database connection failed:`, health.error);
    }

    return health;
}
