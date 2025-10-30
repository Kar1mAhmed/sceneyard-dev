---
trigger: manual
---

**Applies to**: Download system implementation

### Download Flow
1. Check if already downloaded (idempotency)
2. Get video details
3. Check credits balance
4. Deduct credits atomically
5. Create download record
6. Generate signed R2 URL
7. Return URL

### Rules
- Never generate URL before deducting credits
- Always use idempotency keys
- Signed URLs expire in 15 minutes
- Include video title in download filename
- Track all downloads for analytics