// src/lib/auth/config/auth-client.ts


import { createAuthClient } from "better-auth/react";
import { adminClient, emailOTPClient } from "better-auth/client/plugins";

export const authClient = createAuthClient({
  baseURL: process.env.BETTER_AUTH_BASE_URL as string,
  plugins: [
    adminClient(),
    emailOTPClient()
  ],

});

// Export commonly used hooks and methods
export const {
  admin,
  useSession, // data: {user, session} , error, isPending, refetch
  signIn,
  signOut,
  signUp,
} = authClient;

