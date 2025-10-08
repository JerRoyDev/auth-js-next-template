'use client';

import { useState } from 'react';
import { updateUserRole, deleteUser } from '@/lib/auth/actions/admin.action';
import { USER_ROLES } from '@/lib/auth/constants/auth.constants';

interface UserActionsProps {
  userId: string;
  currentRole: string;
  userEmail: string;
  isCurrentUser: boolean;
}

export function UserActions({
  userId,
  currentRole,
  userEmail: _userEmail,
  isCurrentUser,
}: UserActionsProps) {
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

  const handleRoleChange = async (newRole: string) => {
    if (newRole === currentRole) return;

    setIsUpdating(true);
    try {
      const result = await updateUserRole(userId, newRole);
      if (!result.success) {
        alert(result.error);
      }
    } catch (_error) {
      alert('Failed to update role');
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const result = await deleteUser(userId);
      if (result.success) {
        setShowConfirmDelete(false);
      } else {
        alert(result.error);
      }
    } catch (_error) {
      alert('Failed to delete user');
    } finally {
      setIsDeleting(false);
    }
  };

  if (isCurrentUser) {
    return <span className='text-xs text-muted-foreground'>Current User</span>;
  }

  return (
    <div className='flex items-center space-x-2'>
      {/* Role Selector */}
      <select
        value={currentRole}
        onChange={(e) => handleRoleChange(e.target.value)}
        disabled={isUpdating}
        className='text-xs bg-background border border-border rounded px-2 py-1 text-foreground disabled:opacity-50'
      >
        {Object.values(USER_ROLES).map((role) => (
          <option key={role} value={role}>
            {role}
          </option>
        ))}
      </select>

      {/* Delete Button */}
      {!showConfirmDelete ? (
        <button
          onClick={() => setShowConfirmDelete(true)}
          disabled={isDeleting}
          className='text-xs bg-destructive/10 hover:bg-destructive/20 text-destructive px-3 py-1 rounded-md transition-colors disabled:opacity-50'
        >
          Delete
        </button>
      ) : (
        <div className='flex items-center space-x-1'>
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className='text-xs bg-destructive text-destructive-foreground px-2 py-1 rounded transition-colors disabled:opacity-50'
          >
            {isDeleting ? '...' : 'Confirm'}
          </button>
          <button
            onClick={() => setShowConfirmDelete(false)}
            disabled={isDeleting}
            className='text-xs bg-muted text-muted-foreground px-2 py-1 rounded transition-colors'
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
}
