// src/lib/auth/config/auth-client.ts

/**
 * Better Auth Client Configuration
 * 
 * This exports the client-side hooks and methods for authentication.
 * Used in React components for:
 * - useSession() - Get current session data
 * - signIn() - Sign in methods
 * - signOut() - Sign out method
 * - signUp() - Registration method
 * - admin - Admin operations (user management, etc.)
 */

import { createAuthClient } from "better-auth/react";
import { adminClient, emailOTPClient } from "better-auth/client/plugins";

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  plugins: [
    adminClient(),
    emailOTPClient()
  ],

});

// Export commonly used hooks and methods
export const {
  useSession, // data: {user, session} , error, isPending, refetch
  signIn,
  signOut,
  signUp,
} = authClient;

