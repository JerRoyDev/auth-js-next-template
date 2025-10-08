// filepath: src/middleware.ts
import NextAuth from 'next-auth';
import { auth } from '@/auth';
import {
  AUTH_ROUTES,
  PROTECTED_ROUTES,
  DEFAULT_AUTHENTICATED_ROUTE,
} from '@/lib/auth/constants/auth.constants';

// const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl } = req;
  const isAuthenticated = !!req.auth;


  // * --- Route Protection Strategy ---
  // This middleware is the primary mechanism for protecting routes.
  // For added security ("defense in depth"), individual protected pages also
  // contain a server-side check. This ensures that pages remain secure
  // even if this middleware is disabled or misconfigured in a project
  // that uses this template.

  const isAuthRoute = Object.values(AUTH_ROUTES).includes(nextUrl.pathname);
  const isProtectedRoute = PROTECTED_ROUTES.includes(nextUrl.pathname);

  // 1. Redirect authenticated users from auth pages (e.g., /signin)
  if (isAuthRoute && isAuthenticated) {
    return Response.redirect(new URL(DEFAULT_AUTHENTICATED_ROUTE, nextUrl));
  }

  // 2. Redirect unauthenticated users from protected pages
  if (isProtectedRoute && !isAuthenticated) {
    // Redirect to the primary sign-in page
    return Response.redirect(new URL(AUTH_ROUTES.LOGIN, nextUrl));
  }

  return; // Allow the request to proceed
});

// * --- Runtime Configuration ---
// By default, Prisma Client is not compatible with the Edge runtime because it
// requires Node.js APIs for database connections. To make it work on the Edge,
// you need to use either Prisma Accelerate or a Driver Adapter.
//
// - Prisma Accelerate: https://pris.ly/d/accelerate
// - Driver Adapters: https://pris.ly/d/driver-adapters
//
// For this template, we use the 'nodejs' runtime to ensure out-of-the-box
// compatibility with the default Prisma Client setup.
export const runtime = 'nodejs';

// Optionally, don't invoke Middleware on some paths
// This matcher will apply the middleware to all routes except for static files and internal Next.js paths.
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};