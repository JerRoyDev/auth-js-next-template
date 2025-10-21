// Header.tsx
'use client';

import SignOutButton from '@/components/auth/SignOutButton';
import { useSession } from '@/lib/auth/config/auth-client';
import {
  AUTH_ROUTES,
  PROTECTED_ROUTES,
  PUBLIC_ROUTES,
} from '@/lib/auth/constants/auth.constants';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Header = () => {
  // Exclude header on auth pages
  const excludedPaths = [AUTH_ROUTES.LOGIN, AUTH_ROUTES.REGISTER];
  const pathname = usePathname();
  if (excludedPaths.includes(pathname)) return null;

  // const session = await auth();
  const { data, error, isPending } = useSession();

  return (
    <header className='bg-card text-foreground shadow-sm border-b border-border'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between items-center h-16'>
          {/* Logo/App Name */}
          <div className='flex items-center'>
            <Link
              href={PUBLIC_ROUTES.HOME}
              className='text-xl font-bold hover:opacity-80 transition-colors'
            >
              Auth App
            </Link>
          </div>

          {/* Navigation */}
          <div className='flex items-center space-x-4'>
            {data ? (
              <>
                {/* Dashboard Link - Show for all authenticated users */}
                <Link
                  href={PROTECTED_ROUTES.USER_LANDING}
                  className='inline-flex items-center px-3 py-2 text-sm font-medium rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors'
                >
                  Dashboard
                </Link>

                {/* Admin Link - Only show for ADMIN users */}
                {data.user?.role === 'ADMIN' && (
                  <Link
                    href={PROTECTED_ROUTES.ADMIN_DASHBOARD}
                    className='inline-flex items-center px-3 py-2 text-sm font-medium rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors'
                  >
                    <svg
                      className='w-4 h-4 mr-2'
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
                    Admin
                  </Link>
                )}

                {/* User Info */}
                <div className='flex items-center space-x-3'>
                  <span className='text-sm text-muted-foreground font-medium'>
                    {data.user?.name
                      ? data.user.name
                          .split(' ')
                          .map(
                            (part) =>
                              part.charAt(0).toUpperCase() +
                              part.slice(1).toLowerCase()
                          )
                          .join(' ')
                      : data.user?.email}
                  </span>
                  {/* Logout Button */}
                  <SignOutButton />
                </div>
              </>
            ) : (
              <div className='flex items-center space-x-3'>
                {/* Login Link */}
                <Link
                  href={AUTH_ROUTES.LOGIN}
                  className='inline-flex items-center px-4 py-2 border border-border text-sm font-medium rounded-lg text-foreground bg-card hover:bg-muted focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ring transition-colors shadow-sm'
                >
                  Sign In
                </Link>
                {/* Register Link  */}
                <Link
                  href={AUTH_ROUTES.REGISTER}
                  className='inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-primary-foreground bg-primary hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ring transition-colors shadow-sm'
                >
                  Create Account
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
