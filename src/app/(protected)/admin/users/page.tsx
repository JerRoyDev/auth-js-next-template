import { requireAdmin } from '@/lib/auth/utils/require-auth';
import { PROTECTED_ROUTES } from '@/lib/auth/constants/auth.constants';
import { Role } from '@prisma/client';
import { prisma } from '@/lib/prisma';
import { AdminCard } from '@/components/admin/AdminCard';
import { UserActions } from '@/components/admin/UserActions';
import Link from 'next/link';

interface User {
  id: string;
  name: string | null;
  email: string;
  role: string;
  createdAt: Date;
  accounts: {
    provider: string;
  }[];
}

const AdminUsersPage = async () => {
  // Better Auth: requireAdmin() automatically checks role and redirects if not admin
  const session = await requireAdmin();

  // Get all users with their accounts for provider info
  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
      accounts: {
        select: {
          provider: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  const userCount = users.length;
  const adminCount = users.filter((user) => user.role === Role.admin).length;
  // Count recently created users (within the last 7 days)
  const recentUsers = users.filter((user) => {
    const daysSinceCreated = Math.floor(
      (Date.now() - new Date(user.createdAt).getTime()) / (1000 * 60 * 60 * 24)
    );
    return daysSinceCreated <= 7;
  }).length;

  return (
    <div className='min-h-screen bg-background text-foreground py-12 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-7xl mx-auto'>
        {/* Header */}
        <div className='mb-8'>
          <div className='flex items-center justify-between'>
            <div>
              <Link
                href={PROTECTED_ROUTES.ADMIN_DASHBOARD}
                className='text-sm text-muted-foreground hover:text-foreground mb-2 inline-block'
              >
                ← Back to Admin Dashboard
              </Link>
              <h1 className='text-3xl font-bold text-foreground mb-2'>
                User Management
              </h1>
              <p className='text-muted-foreground'>
                Manage user accounts, roles, and permissions.
              </p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-8'>
          <div className='bg-card rounded-xl p-6 shadow-sm border border-border'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-sm font-medium text-muted-foreground'>
                  Total Users
                </p>
                <p className='text-2xl font-bold text-foreground'>
                  {userCount}
                </p>
              </div>
              <div className='h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center'>
                <svg
                  className='h-6 w-6 text-primary'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z'
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className='bg-card rounded-xl p-6 shadow-sm border border-border'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-sm font-medium text-muted-foreground'>
                  Administrators
                </p>
                <p className='text-2xl font-bold text-foreground'>
                  {adminCount}
                </p>
              </div>
              <div className='h-12 w-12 bg-destructive/10 rounded-lg flex items-center justify-center'>
                <svg
                  className='h-6 w-6 text-destructive'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z'
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className='bg-card rounded-xl p-6 shadow-sm border border-border'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-sm font-medium text-muted-foreground'>
                  New This Week
                </p>
                <p className='text-2xl font-bold text-foreground'>
                  {recentUsers}
                </p>
              </div>
              <div className='h-12 w-12 bg-secondary/10 rounded-lg flex items-center justify-center'>
                <svg
                  className='h-6 w-6 text-secondary-foreground'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z'
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Users Table */}
        <AdminCard
          title='All Users'
          description='Manage user accounts and roles'
        >
          <div className='overflow-x-auto'>
            <table className='w-full'>
              <thead>
                <tr className='border-b border-border'>
                  <th className='text-left py-3 px-4 font-medium text-muted-foreground'>
                    User
                  </th>
                  <th className='text-left py-3 px-4 font-medium text-muted-foreground'>
                    Email
                  </th>
                  <th className='text-left py-3 px-4 font-medium text-muted-foreground'>
                    Role
                  </th>
                  <th className='text-left py-3 px-4 font-medium text-muted-foreground'>
                    Provider
                  </th>
                  <th className='text-left py-3 px-4 font-medium text-muted-foreground'>
                    Joined
                  </th>
                  <th className='text-left py-3 px-4 font-medium text-muted-foreground'>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <UserRow
                    key={user.id}
                    user={user}
                    currentUserId={session.user?.id}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </AdminCard>
      </div>
    </div>
  );
};

function UserRow({
  user,
  currentUserId,
}: {
  user: User;
  currentUserId?: string;
}) {
  const isCurrentUser = user.id === currentUserId;
  const provider = user.accounts[0]?.provider || 'credentials';

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(new Date(date));
  };

  const getProviderIcon = (provider: string) => {
    switch (provider) {
      case 'google':
        return '🟢';
      case 'github':
        return '⚫';
      case 'credentials':
        return '🔑';
      default:
        return '❓';
    }
  };

  return (
    <tr className='border-b border-border/50 hover:bg-muted/30 transition-colors'>
      <td className='py-4 px-4'>
        <div className='flex items-center space-x-3'>
          <div className='h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center'>
            <span className='text-sm font-medium text-primary'>
              {user.name
                ? user.name.charAt(0).toUpperCase()
                : user.email.charAt(0).toUpperCase()}
            </span>
          </div>
          <div>
            <div className='font-medium text-foreground'>
              {user.name || 'No name'}
              {isCurrentUser && (
                <span className='ml-2 text-xs bg-primary/10 text-primary px-2 py-1 rounded-full'>
                  You
                </span>
              )}
            </div>
          </div>
        </div>
      </td>
      <td className='py-4 px-4 text-sm text-muted-foreground'>{user.email}</td>
      <td className='py-4 px-4'>
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            user.role === Role.admin
              ? 'bg-destructive/10 text-destructive'
              : 'bg-secondary/10 text-secondary-foreground'
          }`}
        >
          {user.role}
        </span>
      </td>
      <td className='py-4 px-4 text-sm text-muted-foreground'>
        <span className='flex items-center space-x-1'>
          <span>{getProviderIcon(provider)}</span>
          <span className='capitalize'>{provider}</span>
        </span>
      </td>
      <td className='py-4 px-4 text-sm text-muted-foreground'>
        {formatDate(user.createdAt)}
      </td>
      <td className='py-4 px-4'>
        <UserActions
          userId={user.id}
          currentRole={user.role as Role}
          userEmail={user.email}
          isCurrentUser={isCurrentUser}
        />
      </td>
    </tr>
  );
}

export default AdminUsersPage;
