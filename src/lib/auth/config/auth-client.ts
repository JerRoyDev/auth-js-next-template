// src/lib/auth/config/auth-client.ts


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
  admin,
  useSession, // data: {user, session} , error, isPending, refetch
  signIn,
  signOut,
  signUp,
} = authClient;

