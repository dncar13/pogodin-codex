import type { NextConfig } from "next";

const ContentSecurityPolicy = "default-src 'self'; script-src 'self' https://www.googletagmanager.com https://www.google-analytics.com https://analytics.umami.is 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self' data:; connect-src 'self' https://www.google-analytics.com https://analytics.umami.is; frame-ancestors 'none';";

const securityHeaders = [
  {
    key: "Content-Security-Policy",
    value: ContentSecurityPolicy,
  },
  { key: "Referrer-Policy", value: "no-referrer" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
];

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
  // Removed redirects to avoid conflict with Netlify's domain redirect
};

export default nextConfig;
