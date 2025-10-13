import { auth } from '@/auth';
import {
  PROTECTED_ROUTES,
  PUBLIC_ROUTES,
} from '@/lib/auth/constants/auth.constants';
import { Role } from '@prisma/client';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';

const AdminPage = async () => {
  const session = await auth();

  // Only allow users with ADMIN role
  if (session?.user?.role !== Role.ADMIN) {
    redirect(PUBLIC_ROUTES.UNAUTHORIZED);
  }

  // Get basic statistics for the dashboard
  const [userCount, adminCount, totalSessions] = await Promise.all([
    prisma.user.count(),
  prisma.user.count({ where: { role: Role.ADMIN } }),
    prisma.session.count(),
  ]);

  return (
    <div className='min-h-screen bg-background text-foreground py-12 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-7xl mx-auto'>
        {/* Header */}
        <div className='mb-8'>
          <h1 className='text-3xl font-bold text-foreground mb-2'>
            Admin Dashboard
          </h1>
          <p className='text-muted-foreground'>
            Welcome back, {session.user?.name || session.user?.email}! Manage
            your application and users from here.
          </p>
        </div>

        {/* Stats Cards */}
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
                  Active Sessions
                </p>
                <p className='text-2xl font-bold text-foreground'>
                  {totalSessions}
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
                    d='M13 10V3L4 14h7v7l9-11h-7z'
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          <Link
            href={PROTECTED_ROUTES.ADMIN_USERS}
            className='group bg-card rounded-xl p-6 shadow-sm border border-border hover:shadow-md transition-all duration-200 hover:border-primary/20'
          >
            <div className='flex items-center space-x-4'>
              <div className='h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors'>
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
              <div>
                <h3 className='text-lg font-semibold text-foreground group-hover:text-primary transition-colors'>
                  User Management
                </h3>
                <p className='text-sm text-muted-foreground'>
                  Manage users, roles, and permissions
                </p>
              </div>
            </div>
          </Link>

          <div className='bg-card rounded-xl p-6 shadow-sm border border-border opacity-50'>
            <div className='flex items-center space-x-4'>
              <div className='h-12 w-12 bg-muted/50 rounded-lg flex items-center justify-center'>
                <svg
                  className='h-6 w-6 text-muted-foreground'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z'
                  />
                </svg>
              </div>
              <div>
                <h3 className='text-lg font-semibold text-muted-foreground'>
                  Analytics
                </h3>
                <p className='text-sm text-muted-foreground'>
                  Coming soon - View app statistics
                </p>
              </div>
            </div>
          </div>

          <div className='bg-card rounded-xl p-6 shadow-sm border border-border opacity-50'>
            <div className='flex items-center space-x-4'>
              <div className='h-12 w-12 bg-muted/50 rounded-lg flex items-center justify-center'>
                <svg
                  className='h-6 w-6 text-muted-foreground'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z'
                  />
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
                  />
                </svg>
              </div>
              <div>
                <h3 className='text-lg font-semibold text-muted-foreground'>
                  Settings
                </h3>
                <p className='text-sm text-muted-foreground'>
                  Coming soon - System configuration
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
