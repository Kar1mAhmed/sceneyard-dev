---
trigger: always_on
---

- Always use MCP of Next.js 16 to find best practices
- **Name**: SceneYard
- **Stack**: Next.js 16 + Cloudflare Workers + D1 + R2
- **Pattern**: Feature-based architecture with Service/Repository layers
- **Language**: TypeScript (strict mode)
- All database changes must go inside the `db/` folder. Every time the database is updated, the `Schema.md` file in `db/` must be updated as well. This file is the single source of truth for our database structure.
- The root-level `Legend.md` file must always be kept up to date. Any new changes or shifts in the project's development state must be added to the legend file so it always reflects the latest progress and current dev stage.
- Always make sure types are defined and everything follows TypeScript rules.
- Always add logs to API endpoints.