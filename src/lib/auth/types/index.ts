/**
 * Centralized type exports from Prisma and Better Auth
 * 
 * This file re-exports commonly used types to make imports cleaner
 * and provide a single source of truth for types used across the app.
 */

// Prisma types
export { Role } from '@prisma/client';
export type { User, Account, Session } from '@prisma/client';

// Better Auth session type
import type { auth } from '@/auth';
export type AuthSession = Awaited<ReturnType<typeof auth.api.getSession>>;

// Helper type for user with session context
export type SessionUser = NonNullable<AuthSession>['user'];

// Auth-related types
export type { BetterAuthError } from '@/lib/auth/types/auth.types';
export type { AuthFormProps } from '@/lib/auth/types/auth.types';
export type { CredentialsFormProps } from '@/lib/auth/types/auth.types';