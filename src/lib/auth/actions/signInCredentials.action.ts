'use server';

import { PROTECTED_ROUTES, AUTH_MESSAGES } from '../constants/auth.constants';

/**
 * Sign in with email and password using Better Auth
 * 
 * NOTE: For Better Auth, the actual sign-in logic happens on the client-side
 * using the authClient.signIn.email() method from auth-client.ts.
 * 
 * This server action is kept for backwards compatibility and redirects handling,
 * but the authentication itself is handled by Better Auth's built-in endpoints.
 * 
 * In Better Auth, you should use the client-side hooks directly:
 * ```tsx
 * import { authClient } from '@/lib/auth/config/auth-client';
 * 
 * const { data, error } = await authClient.signIn.email({
 *   email,
 *   password,
 * });
 * ```
 */
export async function signInCredentials(email: string, password: string, callbackUrl?: string) {
  // This is a placeholder for backwards compatibility
  // The actual sign-in should be done client-side with Better Auth
  return {
    success: false,
    message: 'Please use client-side signIn from authClient',
    redirectTo: callbackUrl || PROTECTED_ROUTES.USER_LANDING,
    error: 'use_client_side',
  };
}
