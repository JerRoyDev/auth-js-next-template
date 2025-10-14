/**
 * Next.js Middleware (REMOVED for Better Auth)
 * 
 * NOTE: This file is kept for potential future use but is currently disabled.
 * 
 * Better Auth Philosophy:
 * Instead of using middleware for route protection, we use Server Components
 * with the `requireAuth()` helper. This approach:
 * 
 * ✅ Better Performance: Session checks only on page renders, not every request
 * ✅ Fewer DB Queries: No session lookup for static files, API calls, etc.
 * ✅ Better Caching: Works seamlessly with Next.js RSC caching
 * ✅ More Explicit: Clear authentication requirements in each protected page
 * 
 * Route Protection Strategy:
 * - Use `requireAuth()` in protected Server Components (see utils/require-auth.ts)
 * - Use `requireAdmin()` for admin-only pages
 * - Use `getSession()` for optional authentication
 * 
 * Example:
 * ```tsx
 * // app/(protected)/dashboard/page.tsx
 * import { requireAuth } from '@/lib/auth/utils/require-auth';
 * 
 * export default async function DashboardPage() {
 *   const session = await requireAuth();
 *   return <div>Welcome {session.user.name}</div>;
 * }
 * ```
 * 
 * If you need middleware for other purposes (rate limiting, logging, etc.),
 * you can re-enable it here, but authentication should remain in Server Components.
 */

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Middleware is currently disabled for authentication.
  // Add other middleware logic here if needed (rate limiting, logging, etc.)
  return NextResponse.next();
}

// Only run middleware on specific paths if needed in the future
export const config = {
  matcher: [
    // Skip all internal paths (_next, api, static files)
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};