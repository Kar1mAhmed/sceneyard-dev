/**
 * Retry utility for database operations
 */

export async function retryDatabaseOperation<T>(
    operation: () => Promise<T>,
    options: {
        maxRetries?: number;
        delayMs?: number;
        operationName?: string;
    } = {}
): Promise<T> {
    const { maxRetries = 3, delayMs = 100, operationName = 'Database operation' } = options;

    let lastError: Error | null = null;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            console.log(`🔄 [${operationName}] Attempt ${attempt}/${maxRetries}`);
            const result = await operation();

            if (attempt > 1) {
                console.log(`✅ [${operationName}] Succeeded on attempt ${attempt}`);
            }

            return result;
        } catch (error: any) {
            lastError = error;

            // Check if it's a connection error that we should retry
            const isRetryable =
                error.message?.includes('Connection closed') ||
                error.message?.includes('SQLITE_BUSY') ||
                error.message?.includes('database is locked') ||
                error.message?.includes('timeout');

            if (!isRetryable || attempt === maxRetries) {
                console.error(`❌ [${operationName}] Failed after ${attempt} attempts:`, {
                    message: error.message,
                    isRetryable,
                });
                throw error;
            }

            console.warn(`⚠️  [${operationName}] Attempt ${attempt} failed, retrying in ${delayMs}ms...`, error.message);

            // Wait before retrying
            await new Promise(resolve => setTimeout(resolve, delayMs * attempt));
        }
    }

    throw lastError || new Error(`${operationName} failed after ${maxRetries} attempts`);
}
