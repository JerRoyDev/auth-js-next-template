/**
 * Authentication Helper Utilities
 * 
 * These helpers replace the old middleware-based route protection.
 * They provide a cleaner, more performant way to protect routes using
 * Server Components instead of middleware.
 * 
 * Better Auth Philosophy:
 * - Session checks happen only when pages render (not on every request)
 * - Fewer database queries
 * - Better caching with Next.js RSC
 * - More explicit and easier to test
 */

import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { headers } from 'next/headers';
import { AUTH_ROUTES, PUBLIC_ROUTES } from '../constants/auth.constants';
import { Role, type AuthSession } from '../types';


/**
 * * Get the current session (optional authentication)
 * 
 * Use this for pages that work both authenticated and unauthenticated.
 * 
 * Usage:
 * ```tsx
 * export default async function HomePage() {
 *   const session = await getSession();
 *   return <div>{session ? `Hello ${session.user.name}` : 'Welcome Guest'}</div>;
 * }
 * ```
 * 
 * @returns The session if authenticated, null otherwise
 */
export const getSession = async (): Promise<AuthSession | null> => {
  try {
    console.log('getSession(): Fetching current session...');
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    return session;
  } catch {
    console.error('getSession(): Error fetching session');
    return null;
  }
}


/**
 * * Require authentication for a page/route
 * 
 * Usage in Server Components:
 * ```tsx
 * export default async function ProtectedPage() {
 *   const session = await requireAuth();
 *   return <div>Welcome {session.user.name}</div>;
 * }
 * ```
 * 
 * @param callbackUrl - Optional URL to redirect back to after login
 * @returns The authenticated session
 */
export const requireAuth = async (callbackUrl?: string): Promise<AuthSession> => {
  console.log('requireAuth(): Checking for authenticated session...');
  const session = await getSession();
  console.log('requireAuth(): Current session:', session);

  if (!session?.user) {
    // Build redirect URL with callback
    const redirectUrl = callbackUrl
      ? `${AUTH_ROUTES.LOGIN}?callbackUrl=${encodeURIComponent(callbackUrl)}`
      : AUTH_ROUTES.LOGIN;


    console.log('requireAuth(): No session found, redirecting to:', redirectUrl);
    redirect(redirectUrl);
  }

  return session;
}

/**
 * * Require admin role for a page/route
 * 
 * Usage in Server Components:
 * ```tsx
 * export default async function AdminPage() {
 *   const session = await requireAdmin();
 *   return <div>Admin Panel</div>;
 * }
 * ```
 * 
 * @returns The authenticated admin session
 */
export const requireAdmin = async (): Promise<AuthSession> => {
  console.log('requireAdmin(): Checking for admin session...');
  const session = await requireAuth();
  console.log('requireAdmin(): Current session user role:', (session?.user as any)?.role);

  if (!session?.user || (session.user as any).role !== Role.admin) {

    console.log('requireAdmin(): User is not admin, redirecting to:', PUBLIC_ROUTES.UNAUTHORIZED);
    redirect(PUBLIC_ROUTES.UNAUTHORIZED);
  }

  return session;
}


/**
 * * Check if user is authenticated (boolean check)
 * 
 * Usage:
 * ```tsx
 * const isAuthenticated = await isAuth();
 * ```
 */
export const isAuth = async (redirectUrl?: string): Promise<boolean> => {

  const session = await getSession();

  if (session?.user && redirectUrl) {

    console.log('isAuth(): Session found, redirecting to:', redirectUrl);
    redirect(redirectUrl);
  }

  return !!session?.user;
}

/**
 * Check if user is admin (boolean check)
 */
export const isAdmin = async (): Promise<boolean> => {
  const session = await getSession();

  console.log('isAdmin(): Session user role:', (session?.user as any)?.role);
  return (session?.user as any)?.role === Role.admin;
}

/**
 * * Check if user has a specific role
 * 
 * Usage:
 * ```tsx
 * const hasRole = await hasRole(Role.admin);
 * ```
 */
export const hasRole = async (role: Role): Promise<boolean> => {
  const session = await getSession();

  console.log('hasRole(): Session user role:', (session?.user as any)?.role);
  return (session?.user as any)?.role === role;
}

/**
 * * Require a specific role for a page/route
 * 
 * Usage:
 * ```tsx
 * export default async function ModeratorPage() {
 *   const session = await requireRole(Role.MODERATOR);
 *   return <div>Moderator Panel</div>;
 * }
 * ```
 */
export const requireRole = async (role: Role): Promise<AuthSession> => {
  const session = await requireAuth();

  if ((session?.user as any)?.role !== role) {

    console.log('requireRole(): User does not have required role, redirecting to:', PUBLIC_ROUTES.UNAUTHORIZED);
    redirect(PUBLIC_ROUTES.UNAUTHORIZED);
  }

  return session;
}
