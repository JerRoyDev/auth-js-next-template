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
 * Require authentication for a page/route
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
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    // Build redirect URL with callback
    const redirectUrl = callbackUrl
      ? `${AUTH_ROUTES.LOGIN}?callbackUrl=${encodeURIComponent(callbackUrl)}`
      : AUTH_ROUTES.LOGIN;

    redirect(redirectUrl);
  }

  return session;
}

/**
 * Require admin role for a page/route
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
export async function requireAdmin(): Promise<AuthSession> {
  const session = await requireAuth();

  if (!session?.user || (session.user as any).role !== Role.ADMIN) {
    redirect(PUBLIC_ROUTES.UNAUTHORIZED);
  }

  return session;
}

/**
 * Get the current session (optional authentication)
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
export async function getSession(): Promise<AuthSession | null> {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });
    return session;
  } catch {
    return null;
  }
}

/**
 * Check if user is authenticated (boolean check)
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
export async function isAdmin(): Promise<boolean> {
  const session = await getSession();
  return (session?.user as any)?.role === Role.ADMIN;
}

/**
 * Check if user has a specific role
 * 
 * Usage:
 * ```tsx
 * const hasRole = await hasRole(Role.admin);
 * ```
 */
export async function hasRole(role: Role): Promise<boolean> {
  const session = await getSession();
  return (session?.user as any)?.role === role;
}

/**
 * Require a specific role for a page/route
 * 
 * Usage:
 * ```tsx
 * export default async function ModeratorPage() {
 *   const session = await requireRole(Role.MODERATOR);
 *   return <div>Moderator Panel</div>;
 * }
 * ```
 */
export async function requireRole(role: Role): Promise<AuthSession> {
  const session = await requireAuth();

  if ((session?.user as any)?.role !== role) {
    redirect(PUBLIC_ROUTES.UNAUTHORIZED);
  }

  return session;
}
