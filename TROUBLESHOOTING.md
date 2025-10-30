# Troubleshooting Guide

## Common Errors and Solutions

### 1. "Connection closed" Error

**Error Message:**
```
Dashboard error: Error: Connection closed.
```

**What it means:**
The database connection was closed unexpectedly during a query.

**Common Causes:**
1. **Database not running** - The D1 database isn't started
2. **Connection timeout** - Query took too long
3. **Database file locked** - Another process is using the database
4. **Dev server restart needed** - Stale connection

**Solutions:**

#### Solution 1: Restart Dev Server
```bash
# Stop the dev server (Ctrl+C)
# Then restart
npm run dev
```

#### Solution 2: Check Database File
```bash
# Check if database file exists
ls .wrangler/state/v3/d1/

# If missing, run migrations
npm run migrations-local
```

#### Solution 3: Clear Wrangler State
```bash
# Stop dev server
# Delete wrangler state
rm -rf .wrangler

# Run migrations again
npm run migrations-local

# Restart dev server
npm run dev
```

#### Solution 4: Check for Multiple Processes
```bash
# On Windows
tasklist | findstr node

# Kill any stale node processes
taskkill /F /PID <process_id>

# Then restart
npm run dev
```

---

### 2. "Database not available" Error

**Error Message:**
```
Database not available - Check wrangler.jsonc configuration
```

**Solutions:**

#### Check wrangler.jsonc
```jsonc
{
  "d1_databases": [
    {
      "database_name": "sceneyard",
      "binding": "SCENEYARD_DB",
      "database_id": "your-database-id",
      "migrations_dir": "lib/db/migrations"
    }
  ]
}
```

#### Verify Environment Variables
```bash
# Check .dev.vars exists
cat .dev.vars

# Should contain:
# AUTH_SECRET="..."
# AUTH_GOOGLE_ID="..."
# AUTH_GOOGLE_SECRET="..."
# AUTH_URL="http://localhost:3000"
```

---

### 3. "no such column" or "no such table" Error

**Error Message:**
```
Database schema error: no such column: balance
```

**Solution:**
```bash
# Run migrations
npm run migrations-local

# Verify migrations applied
npx wrangler d1 execute sceneyard --local --command "SELECT * FROM schema_migrations"
```

---

### 4. "Admin access denied" Error

**Error Message:**
```
⚠️ Non-admin user attempted to access dashboard
```

**Solution:**
```bash
# Make your user an admin
npx wrangler d1 execute sceneyard --local --command "UPDATE users SET role = 'admin' WHERE email = 'your-email@gmail.com'"

# Verify
npx wrangler d1 execute sceneyard --local --command "SELECT email, role FROM users WHERE email = 'your-email@gmail.com'"
```

---

### 5. OAuth Errors

**Error: "client_id=undefined"**

**Solution:**
Create `.env.local`:
```env
AUTH_SECRET="your-secret"
AUTH_GOOGLE_ID="your-google-client-id"
AUTH_GOOGLE_SECRET="your-google-client-secret"
AUTH_URL="http://localhost:3000"
```

**Error: "AccessDenied"**

**Solutions:**
1. Check redirect URIs in Google Cloud Console:
   - `http://localhost:3000/api/auth/callback/google`
   - `https://your-domain.workers.dev/api/auth/callback/google`

2. Verify OAuth credentials are correct

---

## Debugging Tips

### Enable Verbose Logging

The app already logs detailed errors. Check:

**Browser Console:**
- Open DevTools (F12)
- Check Console tab for errors
- Look for emoji indicators: ✅ ❌ ⚠️

**Server Logs:**
- Watch terminal where `npm run dev` is running
- Look for detailed error objects with stack traces

### Check Database State

```bash
# List all tables
npx wrangler d1 execute sceneyard --local --command "SELECT name FROM sqlite_master WHERE type='table'"

# Check users table
npx wrangler d1 execute sceneyard --local --command "SELECT * FROM users LIMIT 5"

# Check migrations
npx wrangler d1 execute sceneyard --local --command "SELECT * FROM schema_migrations ORDER BY version"
```

### Test Database Connection

```bash
# Simple query
npx wrangler d1 execute sceneyard --local --command "SELECT 1"

# If this fails, database isn't working
```

---

## Fresh Start

If all else fails, start fresh:

```bash
# 1. Stop dev server (Ctrl+C)

# 2. Clear everything
rm -rf .wrangler
rm -rf .next
rm -rf node_modules/.cache

# 3. Reinstall (optional)
npm install

# 4. Run migrations
npm run migrations-local

# 5. Make yourself admin
npx wrangler d1 execute sceneyard --local --command "UPDATE users SET role = 'admin' WHERE email = 'your-email@gmail.com'"

# 6. Restart
npm run dev
```

---

## Production Issues

### Deploy Errors

```bash
# Check deployment logs
npx wrangler tail

# Verify environment variables
npx wrangler secret list

# Run migrations on production
npm run migrations
```

### Database Issues in Production

```bash
# Check production database
npx wrangler d1 execute sceneyard --remote --command "SELECT * FROM users LIMIT 5"

# Run migrations
npx wrangler d1 migrations apply sceneyard --remote

# Make user admin in production
npx wrangler d1 execute sceneyard --remote --command "UPDATE users SET role = 'admin' WHERE email = 'your-email@gmail.com'"
```

---

## Getting Help

When asking for help, provide:

1. **Error message** (full text from browser console)
2. **Server logs** (from terminal)
3. **Steps to reproduce**
4. **Environment** (local dev or production)
5. **What you've tried**

### Useful Commands for Diagnostics

```bash
# Check Node version
node --version

# Check npm version
npm --version

# Check wrangler version
npx wrangler --version

# List running processes
# Windows:
tasklist | findstr node
# Mac/Linux:
ps aux | grep node

# Check database file size
# Windows:
dir .wrangler\state\v3\d1
# Mac/Linux:
ls -lh .wrangler/state/v3/d1/
```
