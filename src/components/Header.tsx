import { auth } from '@/lib/auth/config/auth.config';
import SignOutButton from '@/components/auth/SignOutButton';
import { PUBLIC_ROUTES } from '@/lib/auth/constants/auth.constants';
import Link from 'next/link';

export default async function Header() {
  const session = await auth();

  return (
    <header className='bg-card text-foreground shadow-sm border-b border-border'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between items-center h-16'>
          {/* Logo/App Name */}
          <div className='flex items-center'>
            <Link
              href='/'
              className='text-xl font-bold hover:opacity-80 transition-colors'
            >
              Auth App
            </Link>
          </div>

          {/* Navigation */}
          <div className='flex items-center space-x-4'>
            {session ? (
              <>
                {/* User Info */}
                <div className='flex items-center space-x-3'>
                  <span className='text-sm text-muted-foreground font-medium'>
                    {session.user?.name
                      ? session.user.name
                          .split(' ')
                          .map(
                            (part) =>
                              part.charAt(0).toUpperCase() +
                              part.slice(1).toLowerCase()
                          )
                          .join(' ')
                      : session.user?.email}
                  </span>
                  {/* Logout Button */}
                  <SignOutButton />
                </div>
              </>
            ) : (
              <div className='flex items-center space-x-3'>
                {/* Login Link */}
                <Link
                  href={PUBLIC_ROUTES.LOGIN}
                  className='inline-flex items-center px-4 py-2 border border-border text-sm font-medium rounded-lg text-foreground bg-card hover:bg-muted focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ring transition-colors shadow-sm'
                >
                  Sign In
                </Link>
                {/* Register Link  */}
                <Link
                  href={PUBLIC_ROUTES.REGISTER}
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
}
