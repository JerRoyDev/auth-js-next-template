'use client';

import Link from 'next/link';
import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  parseAuthError,
  getAuthErrorMessage,
  shouldDisplayOnErrorPage,
  getErrorDisplayClasses,
} from '@/lib/auth/utils/error-handler';
import { OAuthButton } from '@/components/auth/OAuthButton';
import { AUTH_ROUTES } from '@/lib/auth/constants/auth.constants';

function AuthErrorContent() {
  const searchParams = useSearchParams();

  // Hämta error params från URL
  const errorParam = searchParams.get('error');
  const provider = searchParams.get('provider');
  const email = searchParams.get('email');

  // Parse error och få error info
  const errorType = parseAuthError(errorParam);
  const shouldShow = shouldDisplayOnErrorPage(errorType);

  // Fallback för okänt fel eller fel som inte ska visas här
  if (!errorParam || !shouldShow) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8'>
        <div className='max-w-md w-full space-y-8 text-center'>
          <h2 className='text-3xl font-bold text-gray-900 dark:text-white'>
            Something went wrong
          </h2>
          <p className='text-gray-600 dark:text-gray-400 text-base leading-relaxed'>
            An authentication error occurred. Please try again.
          </p>
          <Link
            href={AUTH_ROUTES.LOGIN}
            className='inline-flex items-center px-6 py-3 border border-transparent text-base font-semibold rounded-lg text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200'
          >
            Back to Sign In
          </Link>
        </div>
      </div>
    );
  }

  const errorInfo = getAuthErrorMessage({
    error: errorType,
    provider: provider || undefined,
    email: email || undefined,
  });

  const cssClasses = getErrorDisplayClasses(errorInfo);

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-md w-full space-y-8'>
        {/* Error Title */}
        <div className='text-center'>
          <h2 className='text-3xl font-bold text-gray-900 dark:text-white'>
            {errorInfo.title}
          </h2>
        </div>

        {/* Error Message */}
        <div className={cssClasses}>
          <p className='text-sm leading-relaxed'>{errorInfo.message}</p>
        </div>

        {/* Back to Sign In */}
        <div className='text-center'>
          <Link
            href={AUTH_ROUTES.LOGIN}
            className='inline-flex items-center px-6 py-3 border border-transparent text-base font-semibold rounded-lg text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200'
          >
            Back to Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function AuthErrorPage() {
  return (
    <Suspense
      fallback={
        <div className='min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900'>
          <div className='text-center'>
            <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto'></div>
            <p className='mt-4 text-gray-600 dark:text-gray-400'>Loading...</p>
          </div>
        </div>
      }
    >
      <AuthErrorContent />
    </Suspense>
  );
}
