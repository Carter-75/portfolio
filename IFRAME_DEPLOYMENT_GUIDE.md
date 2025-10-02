# Portfolio Iframe Deployment Guide

## Overview
This portfolio showcases interactive projects using secure iframe embedding. Each project needs proper iframe support to display correctly.

## Current Project Status

### ✅ Ready for Iframe Embedding
- **Animation Studio**: `https://animation-studio.vercel.app/`
- **Element Box**: `https://element-box.vercel.app/`  
- **Lottery Analytics**: `https://lottery-three.vercel.app/`

### 🔧 Needs Iframe Support
- **AI Vibez**: Has iframe support, needs deployment URL update
- **Doomlings**: Needs iframe headers implementation

## Deployment Steps

### 1. Update AI Vibez URL
After AI Vibez is deployed, update the URL in `/src/app/projects/page.tsx`:

```typescript
{
    title: "AI Vibez",
    // Update this URL with your actual deployed domain:
    url: "https://your-actual-ai-vibez-domain.com/?embed=portfolio",
    // ...rest of config
}
```

### 2. Fix Doomlings Iframe Support
The Doomlings project needs iframe embedding headers. Copy the iframe implementation from AI Vibez:

**Required files to copy:**
- `worker/middleware/iframe.ts`
- `worker/config/security.ts` (iframe-related parts)
- Update `worker/app.ts` to include iframe middleware

**Or use Next.js middleware approach:**
```javascript
// middleware.ts (for Doomlings Next.js project)
import { NextResponse } from 'next/server';

export function middleware(request) {
    const response = NextResponse.next();
    
    // Allow embedding on portfolio domain
    response.headers.set('X-Frame-Options', 'SAMEORIGIN');
    response.headers.set('Content-Security-Policy', 
        'frame-ancestors \'self\' https://carter-portfolio.fyi https://www.carter-portfolio.fyi;'
    );
    
    return response;
}

export const config = {
    matcher: '/((?!api|_next/static|_next/image|favicon.ico).*)',
};
```

### 3. Test Other Projects
Verify that existing projects still work with the enhanced iframe setup:

- **Animation Studio** - Should work (Vercel default allows iframe)
- **Element Box** - Should work (Vercel default allows iframe)
- **Lottery Tool** - Should work (Vercel default allows iframe)

If any project shows iframe blocking errors, add the middleware above.

## Security Configuration

The portfolio now includes enhanced security headers in `next.config.mjs`:

- **CSP**: Allows embedding from trusted domains
- **Frame-src**: Permits iframes from project domains  
- **X-Frame-Options**: Prevents clickjacking
- **Enhanced sandbox**: Supports modern web features

## Iframe Features

### Enhanced Loading
- Loading spinner while iframe loads
- Smooth fade-in when loaded
- Error handling for failed loads
- Lazy loading for performance

### Responsive Design  
- 16:9 aspect ratio containers
- Mobile-optimized layouts
- Proper scaling on all devices

### Security
- Sandbox attributes for safe embedding
- Referrer policy for privacy
- Content Security Policy enforcement

## Troubleshooting

### Iframe Not Loading
1. Check browser console for CSP errors
2. Verify the target site allows iframe embedding
3. Check network tab for request failures
4. Test URL directly in new tab

### Iframe Shows "Refused to Connect"
The target site blocks iframe embedding. Need to:
1. Add iframe middleware to the target project
2. Set proper X-Frame-Options headers  
3. Configure Content Security Policy

### Blank Iframe
1. Check if target site requires authentication
2. Verify URL is correct and accessible
3. Check for JavaScript errors in iframe
4. Test with `?embed=portfolio` parameter

## Next Steps

1. **Deploy AI Vibez** with iframe support
2. **Update AI Vibez URL** in projects array  
3. **Fix Doomlings** iframe support
4. **Test all projects** in portfolio
5. **Monitor for any CSP violations**

## URL Update Template

```typescript
// In /src/app/projects/page.tsx
{
    title: "Your Project",
    url: "https://your-domain.com/?embed=portfolio", // Add embed parameter
    isInteractive: true,
    // ... other config
}
```

The `?embed=portfolio` parameter tells the embedded project it's being displayed in portfolio context for optimal styling and behavior.