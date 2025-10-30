#!/bin/bash

# Test Cloudflare Workers deployment

echo "🧪 Testing SceneYard deployment..."
echo ""

# Test main page
echo "📄 Testing main page..."
curl -s -o /dev/null -w "Status: %{http_code}\n" https://sceneyard-dev.karim77645.workers.dev/

echo ""

# Test auth endpoint
echo "🔐 Testing auth endpoint..."
curl -s -o /dev/null -w "Status: %{http_code}\n" https://sceneyard-dev.karim77645.workers.dev/api/auth/providers

echo ""

# Test with verbose output
echo "📊 Detailed response:"
curl -v https://sceneyard-dev.karim77645.workers.dev/ 2>&1 | grep -E "(HTTP|Server|Content-Type)"

echo ""
echo "✅ Test complete"
