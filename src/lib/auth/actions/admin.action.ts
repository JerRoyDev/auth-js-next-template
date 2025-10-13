'use server';

import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { PROTECTED_ROUTES } from '@/lib/auth/constants/auth.constants';
import { Role } from '@prisma/client';
import { revalidatePath } from 'next/cache';

export async function updateUserRole(userId: string, newRole: string) {
  try {
    const session = await auth();

    // Only allow ADMIN users to update roles
    if (session?.user?.role !== Role.ADMIN) {
      return {
        success: false,
        error: 'Unauthorized: Only administrators can update user roles',
      };
    }

    // Prevent admins from changing their own role
    if (session.user.id === userId) {
      return {
        success: false,
        error: 'You cannot change your own role',
      };
    }

    // Validate the new role
    if (!Object.values(Role).includes(newRole as Role)) {
      return {
        success: false,
        error: 'Invalid role specified',
      };
    }

    // Update the user's role
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { role: newRole as Role },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    });

    // Revalidate the admin pages to show updated data

    revalidatePath(PROTECTED_ROUTES.ADMIN_DASHBOARD);
    revalidatePath(PROTECTED_ROUTES.ADMIN_USERS);

    return {
      success: true,
      user: updatedUser,
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

export async function deleteUser(userId: string) {
  try {
    const session = await auth();

    // Only allow ADMIN users to delete users
    if (session?.user?.role !== Role.ADMIN) {
      return {
        success: false,
        error: 'Unauthorized: Only administrators can delete users',
      };
    }

    // Prevent admins from deleting themselves
    if (session.user.id === userId) {
      return {
        success: false,
        error: 'You cannot delete your own account',
      };
    }

    // Get user info before deletion for the response
    const userToDelete = await prisma.user.findUnique({
      where: { id: userId },
      select: { email: true, name: true },
    });

    if (!userToDelete) {
      return {
        success: false,
        error: 'User not found',
      };
    }

    // Delete the user (this will cascade delete related records)
    await prisma.user.delete({
      where: { id: userId },
    });

    // Revalidate the admin pages to show updated data
    revalidatePath(PROTECTED_ROUTES.ADMIN_DASHBOARD);
    revalidatePath(PROTECTED_ROUTES.ADMIN_USERS);

    return {
      success: true,
      message: `User ${userToDelete.email} has been deleted`,
    };
  } catch (error) {
    console.error('Error deleting user:', error);
    return {
      success: false,
      error: 'Failed to delete user. Please try again.',
    };
  }
}