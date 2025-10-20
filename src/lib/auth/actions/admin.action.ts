'use server';

import { requireAdmin } from '@/lib/auth/utils/require-auth';
import { auth } from '@/auth';
import { PROTECTED_ROUTES } from '@/lib/auth/constants/auth.constants';
import { Role } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { headers } from 'next/headers';

/**
 * Update a user's role using Better Auth Admin Plugin API
 * 
 * @see https://better-auth.com/docs/plugins/admin - setRole API
 * Date: October 14, 2025
 */
export async function updateUserRole(userId: string, newRole: string) {
  try {
    // Better Auth: Use requireAdmin() helper - automatically checks and redirects if not admin
    const session = await requireAdmin();

    // Prevent admins from changing their own role
    if (session?.user?.id === userId) {
      return {
        success: false,
        error: 'You cannot change your own role',
      };
    }

    // Validate the new role against Prisma Role enum
    if (!Object.values(Role).includes(newRole as Role)) {
      return {
        success: false,
        error: 'Invalid role specified',
      };
    }

    // Use Better Auth Admin Plugin API to set user role
    await auth.api.setRole({
      body: {
        userId,
        role: newRole as Role,
      },
      headers: await headers(),
    });

    // Revalidate the admin pages to show updated data
    revalidatePath(PROTECTED_ROUTES.ADMIN_DASHBOARD);
    revalidatePath(PROTECTED_ROUTES.ADMIN_USERS);

    return {
      success: true,
      message: `User role updated to ${newRole}`,
    };
  } catch (error) {
    console.error('Error updating user role:', error);
    return {
      success: false,
      error: 'Failed to update user role. Please try again.',
    };
  }
}

/**
 * Delete a user using Better Auth Admin Plugin API
 * 
 * @see https://better-auth.com/docs/plugins/admin.mdx - removeUser API
 * Date: October 14, 2025
 */
export async function deleteUser(userId: string) {
  try {
    // Better Auth: Use requireAdmin() helper
    const session = await requireAdmin();

    // Prevent admins from deleting themselves
    if (session?.user?.id === userId) {
      return {
        success: false,
        error: 'You cannot delete your own account',
      };
    }

    // Use Better Auth Admin Plugin API to remove user
    await auth.api.removeUser({
      body: {
        userId,
      },
      headers: await headers(),
    });

    // Revalidate the admin pages to show updated data
    revalidatePath(PROTECTED_ROUTES.ADMIN_DASHBOARD);
    revalidatePath(PROTECTED_ROUTES.ADMIN_USERS);

    return {
      success: true,
      message: `User has been deleted successfully`,
    };
  } catch (error) {
    console.error('Error deleting user:', error);
    return {
      success: false,
      error: 'Failed to delete user. Please try again.',
    };
  }
}