// src/components/admin/UserTable.tsx

'use client';
import { ListUsersParams } from '@/lib/auth/actions/admin.action';
import React, { useEffect, useState } from 'react';

export type User = {
  id: string;
  email: string;
  name?: string;
  role: string;
};

export type ListUsersResponse = {
  success: boolean;
  error?: string;
  users: User[];
  total: number;
  limit: number;
  offset: number;
};

export type UserTableProps = {
  initialUsers: User[];
  total: number;
  fetchUsers: (params: ListUsersParams) => Promise<ListUsersResponse>;
};

const PAGE_SIZE = 20;

export const UserTable: React.FC<UserTableProps> = ({
  initialUsers,
  total,
  fetchUsers,
}) => {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [totalUsers, setTotal] = useState(total);
  const [loading, setLoading] = useState(false);

  // Debounce live search
  useEffect(() => {
    const timeout = setTimeout(async () => {
      setLoading(true);
      const res = await fetchUsers({
        searchValue: search,
        limit: PAGE_SIZE,
        offset: 0,
      });
      if (res.success) {
        setUsers(res.users);
        setTotal(res.total);
        setPage(1);
      }
      setLoading(false);
    }, 350); // 350ms debounce
    return () => clearTimeout(timeout);
  }, [search]);

  // * Handle page change

  const handlePageChange = async (newPage: number) => {
    setLoading(true);
    const newOffset = (newPage - 1) * PAGE_SIZE;

    const res = await fetchUsers({
      limit: PAGE_SIZE,
      offset: newOffset,
      searchValue: search,
    });

    if (res.success) {
      setUsers(res.users);
      setPage(newPage);
    } else {
      // Visa felmeddelande
    }
    setLoading(false);
  };

  const totalPages = Math.ceil(totalUsers / PAGE_SIZE);

  return (
    <div>
      <div className='mb-4 flex gap-2'>
        <input
          type='text'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder='Search users...'
          className='border rounded px-2 py-1'
        />
      </div>
      <ul className='divide-y divide-border'>
        {users.map((user) => (
          <li key={user.id} className='py-2 flex justify-between items-center'>
            <span>{user.name || user.email}</span>
            <span className='text-xs px-2 py-1 rounded bg-secondary text-secondary-foreground'>
              {user.role}
            </span>
          </li>
        ))}
      </ul>
      <div className='flex justify-between items-center mt-4'>
        <span>
          Page {page} of {totalPages}
        </span>
        <div className='flex gap-2'>
          <button
            disabled={page === 1 || loading}
            onClick={() => handlePageChange(page - 1)}
            className='px-2 py-1 rounded border'
          >
            Prev
          </button>
          <button
            disabled={page === totalPages || loading}
            onClick={() => handlePageChange(page + 1)}
            className='px-2 py-1 rounded border'
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserTable;
