import { auth } from '@/lib/auth/config/auth.config';
import SignOutButton from '@/components/auth/SignOutButton';
import { AUTH_ROUTES } from '@/lib/auth/constants/auth.constants';
import Link from 'next/link';

export default async function Header() {
  const session = await auth();

  return (
    <header className='bg-white shadow-sm border-b border-gray-200'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between items-center h-16'>
          {/* Logo/App Name */}
          <div className='flex items-center'>
            <Link
              href='/'
              className='text-xl font-bold text-gray-900 hover:text-gray-700 transition-colors'
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
                  <span className='text-sm text-gray-700 font-medium'>
                    Welcome, {session.user?.name || session.user?.email}
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
                  className='inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors shadow-sm'
                >
                  Logga in
                </Link>
                {/* Register Link  */}
                <Link
                  href={AUTH_ROUTES.REGISTER}
                  className='inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors shadow-sm'
                >
                  Registrera
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
