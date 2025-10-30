---
trigger: model_decision
---

**Applies to**: `lib/providers/**/*.provider.ts`

### Structure Template
```typescript
export class ExternalServiceProvider {
  private apiKey: string;
  private baseUrl: string;

  constructor() {
    this.apiKey = process.env.SERVICE_API_KEY!;
    this.baseUrl = process.env.SERVICE_BASE_URL!;
  }

  async callExternalAPI(params: any) {
    const response = await fetch(`${this.baseUrl}/endpoint`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    });

    if (!response.ok) {
      throw new ExternalServiceError('API call failed');
    }

    return response.json();
  }

  async verifyWebhook(signature: string, body: string): boolean {
    // Verify HMAC signature
    const computed = await this.computeSignature(body);
    return computed === signature;
  }

  private async computeSignature(data: string): Promise {
    // HMAC signature logic
  }
}
```

### Rules
- One provider per external service
- Handle authentication/credentials
- Provide clean interfaces for external APIs
- Handle errors and retries
- Verify webhook signatures
- Don't store sensitive data in code
- Use environment variables for config

---