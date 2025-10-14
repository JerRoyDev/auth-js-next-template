"use server"

import { requireAuth } from "@/lib/auth/utils/require-auth"

/**
 * Example of a protected server action using Better Auth
 * 
 * Usage: Any action that requires authentication should call requireAuth()
 * which automatically redirects to login if not authenticated.
 */
export const protectedAction = async () => {
  // Better Auth: Use requireAuth() helper
  const session = await requireAuth()

  // Your protected logic here
  // Session is guaranteed to exist at this point (requireAuth redirects if null)

  return {
    success: true,
    user: session?.user,
    message: "This is a protected action",
  }
}