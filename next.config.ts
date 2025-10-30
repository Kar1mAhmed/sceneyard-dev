import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Disable cacheComponents for Cloudflare Workers compatibility
  // Next.js 16 features may not be fully supported by @opennextjs/cloudflare yet
  cacheComponents: false,
  
  // Optimize for edge runtime
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },
};

export default nextConfig;

// added by create cloudflare to enable calling `getCloudflareContext()` in `next dev`
import { initOpenNextCloudflareForDev } from '@opennextjs/cloudflare';
initOpenNextCloudflareForDev();
