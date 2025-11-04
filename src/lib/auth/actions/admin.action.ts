// src/lib/auth/actions/admin.action.ts

'use server';

import { requireAdmin } from '@/lib/auth/utils/require-auth';
import { auth } from '@/auth';
import { PROTECTED_ROUTES } from '@/lib/auth/constants/auth.constants';
import { Role } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { headers } from 'next/headers';

/**
 * * Update a user's role using Better Auth Admin Plugin API
 * 
 * @see https://www.better-auth.com/docs/plugins/admin#set-user-role - setRole API
 * Date: October 14, 2025
 */
const updateUserRole = async (userId: string, newRole: string) => {
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
    revalidatePath(PROTECTED_ROUTES.ADMIN_LANDING);
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
 * * Delete a user using Better Auth Admin Plugin API
 * 
 * @see https://www.better-auth.com/docs/plugins/admin#remove-user - removeUser API
 * Date: October 14, 2025
 */
const deleteUser = async (userId: string) => {
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
    revalidatePath(PROTECTED_ROUTES.ADMIN_LANDING);
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


/**
 * List users using Better Auth Admin Plugin API
 * Supports query filtering and pagination
 * @see https://www.better-auth.com/docs/plugins/admin#list-users
 * @see https://www.better-auth.com/docs/plugins/admin#query-filtering
 * @see https://www.better-auth.com/docs/plugins/admin#pagination
 */
export type ListUsersParams = {
  limit?: number;
  offset?: number;
  searchValue?: string;
  searchField?: 'email' | 'name';
  searchOperator?: 'contains' | 'starts_with' | 'ends_with';
  sortBy?: string;
  sortDirection?: 'asc' | 'desc';
  filterField?: string;
  filterValue?: string | number | boolean;
  filterOperator?: 'eq' | 'ne' | 'lt' | 'lte' | 'gt' | 'gte';
};

const listUsers = async (params: ListUsersParams = {}) => {
  try {
    await requireAdmin();
    const result = await auth.api.listUsers({
      query: {
        limit: params.limit ?? 20,
        offset: params.offset ?? 0,
        searchValue: params.searchValue,
        searchField: params.searchField,
        searchOperator: params.searchOperator,
        sortBy: params.sortBy,
        sortDirection: params.sortDirection,
        filterField: params.filterField,
        filterValue: params.filterValue,
        filterOperator: params.filterOperator,
      },
      headers: await headers(),
    });
    if (!result || !('users' in result)) {
      return {
        success: false,
        error: 'Failed to fetch users. Please try again.',
      };
    }
    return {
      success: true,
      users: result.users,
      total: result.total ?? 0,
      limit: 'limit' in result ? result.limit : params.limit ?? 20,
      offset: 'offset' in result ? result.offset : params.offset ?? 0,
    };
  } catch (error) {
    console.error('Error listing users:', error);
    return {
      success: false,
      error: 'Failed to list users. Please try again.',
    };
  }
};


export {
  updateUserRole,
  deleteUser,
  listUsers,
};
