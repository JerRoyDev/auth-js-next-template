import { auth } from '@/lib/auth/config/auth.config';
import SignOutButton from '@/components/auth/SignOutButton';
import { AUTH_ROUTES } from '@/lib/auth/constants/auth.constants';
import Link from 'next/link';

export default async function Header() {
  const session = await auth();

  return (
    <header className='bg-white shadow-sm border-b'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between items-center h-16'>
          {/* Logo/App Name */}
          <div className='flex items-center'>
            <Link href='/' className='text-xl font-bold text-gray-900'>
              Auth App
            </Link>
          </div>

          {/* Navigation */}
          <div className='flex items-center space-x-4'>
            {session ? (
              <>
                {/* User Info */}
                <span className='text-sm text-gray-600'>
                  Welcome, {session.user?.name || session.user?.email}
                </span>
                {/* Logout Button */}
                <SignOutButton />
              </>
            ) : (
              <>
                {/* Login Link */}
                <Link
                  href={AUTH_ROUTES.LOGIN}
                  className='inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-600 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors'
                >
                  Sign In
                </Link>
                {/* Register Link  */}
                <Link
                  href={AUTH_ROUTES.REGISTER}
                  className='inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors'
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
