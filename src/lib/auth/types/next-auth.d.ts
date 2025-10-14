/**
 * Better Auth Type Definitions
 * 
 * Extend Better Auth's types to include custom user fields (role, username, etc.)
 * 
 * IMPORTANT: We use module augmentation here to EXTEND (not replace) Better Auth's types.
 * This allows TypeScript to still see all the original exports like betterAuth, etc.
 */

import type { Role } from "@prisma/client";

declare module "better-auth/types" {
  interface User {
    role: Role;
    username?: string | null;
  }
}

// Extend the core better-auth types without blocking exports
export { };