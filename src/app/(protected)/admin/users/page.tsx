// src/app/(protected)/admin/users/page.tsx

// UserTable: List users

import { requireAdmin } from '@/lib/auth/utils/require-auth';

import UserTable from '@/components/admin/UserTable';
import { listUsers } from '@/lib/auth/actions/admin.action';
import { UserTableProps } from '@/components/admin/UserTable';

const UsersPage = async () => {
  await requireAdmin();
  // Hämta initiala användare
  const { success, users, total, error } = await listUsers({
    limit: 20,
    offset: 0,
  });

  if (!success) {
    console.error('Failed to load initial users:', error);
  }

  return (
    <div>
      <h1 className='text-2xl font-bold mb-4'>User Management</h1>
      <UserTable
        {...({
          initialUsers: users,
          total: total,
          fetchUsers: listUsers,
        } as UserTableProps)}
      />
    </div>
  );
};
export default UsersPage;
