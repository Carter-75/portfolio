/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        // Apply security headers to all routes
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          },
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.credly.com https://*.vercel.app https://*.cloudflare.dev https://ai-vibez.com",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' https://fonts.gstatic.com",
              "img-src 'self' data: https: blob:",
              "frame-src 'self' https://*.vercel.app https://*.cloudflare.dev https://ai-vibez.com https://carter-portfolio.fyi https://www.carter-portfolio.fyi",
              "connect-src 'self' https://*.vercel.app https://*.cloudflare.dev https://ai-vibez.com",
              "media-src 'self'",
              "object-src 'none'",
              "base-uri 'self'",
              "form-action 'self'"
            ].join('; ')
          }
        ]
      }
    ];
  },
  // Optimize for iframe embedding
  poweredByHeader: false,
  compress: true,
  // Enable static optimization where possible
  experimental: {
    optimizeCss: true
  }
};

export default nextConfig; 